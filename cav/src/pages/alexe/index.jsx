import { InputNumber,Button,Space,Tooltip,Modal } from 'antd';
import React,{ useState,useEffect,useRef } from 'react'
import './index.css'
import { axiosFormDataPost,axiosGet } from '../../utils/request';
import MySelect from '../../utils/myselect'
import MyUpload from '../../component/upload';
import MyGraph from '../../utils/mygraph'
import MyScatter3D from '../../utils/myscatter3d';

export default function AlExe() {

    // 静态图 焦点处理
    const blurRef=useRef();

    // formData
    const fromData=new FormData();

    // 帧数
    const [allFrames,setAllFrames]=useState(1);
    // 第几帧
    const [frame,setFrame]=useState(0);
    // 文件
    const [file,setFile]=useState(null);
    // 算法模型
    const [model,setModel]=useState('DSG');
    // DP
    const [dp,setDp]=useState('true');
    // 隐私范围
    const [rc,setRc]=useState('1');
    // 对话框是否可见;
    const [isModalVisible, setIsModalVisible] = useState(false);
    // 重复播放
    const [repeat,setRepeat]=useState(0);
    // 静图请求路径
    const [frameUrl,setFrameUrl]=useState({
        framePointUrl:'',
        frameLinkUrl:'',
    })

    // 文件上传的处理函数
    function handleUpload(value){
        setFile(value);
    }

    // 算法选择
    function handleModel(value){
        setModel(value)
    }

    // dp选择
    function handleDp(value){
        setDp(value)
    }

    // 隐私范围
    const onChange = (value) => {
        setRc(`${value}`)
    };

    // 运行
    function handleRun(){
        fromData.append("file1",file);
        fromData.append("algorithm",model);
        fromData.append("isDP",dp);
        fromData.append("rc",rc);
        axiosFormDataPost('http://qgailab.com/algorithmVisualization/api/file/upload',fromData)
        .then(
            response=>{
                if(response.data.data.code===200){
                    setIsModalVisible(true)
                }else {
                    Modal.error({
                        title: 'There is something error',
                        content:response.data.data.msg,
                      });
                }
            },
            error=>{
                console.log(error);
            }
        )
    }

    // 选取静态图的处理函数
    const handleFrame = (e) => {
        if(e.target.value<=allFrames){
            setFrame(e.target.value);
            setFrameUrl({
                framePointUrl:`http://qgailab.com/algorithmVisualization/api/point/timeOrder?tableName=DSG_5_200&timeOrder=${e.target.value}&polishId=true`,
                frameLinkUrl:`http://qgailab.com/algorithmVisualization/api/adjacency/timeOrder?tableName=DSG_5_200&timeOrder=${e.target.value}&polishId=true`,
            });
        }
    };

    // 静态图选取 回车事件
    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            blurRef?.current?.blur();
            e.preventDefault();
        }
    }

    // 处理重复播放
    function handleRepeat(){
        setRepeat(repeat + 1);
    }

    // 确认进行运算
    const handleOk = () => {
        setIsModalVisible(false);
        // axiosGet('http://qgailab.com/algorithmVisualization/algorithm/run')
        // .then(
        //   response=>{
        //     ;
        //   },
        //   error=>{
        //     console.log(error);
        //   }
        // )
    };
    
    // 取消运算
    const handleCancel = () => {
        setIsModalVisible(false);
      };

    // 获取总帧数
    useEffect(()=>{
        axiosGet(`http://qgailab.com/algorithmVisualization/api/point/quantity?tableName=${model}_5_200`)
        .then(
            response=>{
                if(response.data.code===200){
                    setAllFrames(response.data.data-1);
                }
            },
            error=>{
                console.log(error);
            }
        )
    },[model])

  return (
    <div className="alExe">
        <Modal title="Attention" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <p>Your file has been uploaded.</p>
            <p>It may take a relatively <strong>long running time</strong>, which is usually <strong>not more than 24 hours.</strong></p>
            <p>Click <strong>OK</strong> button we will <strong>start training.</strong></p>
        </Modal>
        <div className="alExe-subNav">
            <div className="alExe-select">
                <div className="alExe-model">
                    <span>Model</span>
                    <MySelect option={['DSG','HSB','RSRSP','MWMS-J','MWMS-S']} handleSelect={handleModel}/>
                </div>
                <div className="alExe-dp">
                    <span>Dp</span>
                    <MySelect option={['true','false']} handleSelect={handleDp}/>
                </div>
                <div className="alExe-sensitive">
                    <span>Sensitive range</span>
                    <InputNumber min={0.0000001} defaultValue={1} step={1} onChange={onChange} 
                    />
                </div>
            </div>
            <div className="alExe-right">
                <div className="alExe-file">
                    <div className="alExe-upload"><MyUpload handleUpload={handleUpload}/></div>
                </div>
                <div className="alExe-btn"><Button onClick={handleRun}>Submit</Button></div>
            </div>
        </div>
        <div className="alExe-content">
            <div className="alExe-2DStatic">
                <div className="alExe-content-head">
                    <div className="alExe-content-head-title">2D Static</div>
                    <Space>
                        Time
                        <Tooltip title={`the number must be larger than 0 and less than ${allFrames}` }color='rgba(237, 90, 101, 1)' placement="topLeft">
                            <InputNumber 
                                min={0} 
                                max={allFrames} 
                                defaultValue={0} 
                                step={1} 
                                onBlur={(Event)=>handleFrame(Event)} 
                                onKeyDown={(e) => handleKeyDown(e)}
                                ref={blurRef}
                            />
                        </Tooltip>
                    </Space>
                </div>
                <div className="alExe-content-show">
                    <MyGraph 
                            pointUrl={`http://qgailab.com/algorithmVisualization/api/point/timeOrder?tableName=DSG_5_200&timeOrder=${frame}&polishId=true`}
                            linkUrl={`http://qgailab.com/algorithmVisualization/api/adjacency/timeOrder?tableName=DSG_5_200&timeOrder=${frame}&polishId=true`}
                            repeat={0}
                        >
                    </MyGraph>
                </div>
            </div>
            <div className="alExe-2DLive">
                <div className="alExe-content-head">
                    <div className="alExe-content-head-title">2D Live</div>
                    <Button onClick={handleRepeat}>Again</Button>
                </div>
                <div className="alExe-content-show">
                    <MyGraph 
                        pointUrl={`http://qgailab.com/algorithmVisualization/api/point?tableName=DSG_5_200&amount=30&polishId=true`}
                        linkUrl={`http://qgailab.com/algorithmVisualization/api/adjacency?tableName=DSG_5_200&amount=30&polishId=true`}
                        // pointUrl={'http://localhost:8000/pointGraph'}
                        // linkUrl={'http://localhost:8000/linkGraph'}
                        repeat={repeat}
                    >
                    </MyGraph>
                </div>
            </div>
            <div className="alExe-3D">
                <div className="alExe-content-head">
                    <div className="alExe-content-head-title">3D Live</div>
                </div>
                <div className="alExe-content-show">
                    <MyScatter3D 
                        pointUrl={`http://qgailab.com/algorithmVisualization/api/point?tableName=DSG_5_200&amount=30&polishId=true`}
                    >
                    </MyScatter3D>
                </div>
            </div>
        </div>
    </div>

  )
}
