import {Spin} from 'antd'
import React,{useState,useEffect} from 'react'
import EChartsReact from 'echarts-for-react'
import "echarts-gl"
import { axiosGet } from './request'

// 封装3D散点图 参数为url（路径） data（请求体)
export default function MyScatter3D(props) {

    // loading状态
    const [loading, setLoading] = useState(false); 
    //是否显示加载中
    const [load, setLoad] = React.useState()
    // 此状态保存数据
    const [allData,setAllData]=useState(null);
    const [data,setData]=useState([]);
    const [count,setCount]=useState(1);
    const [len,setLen]=useState(39);
    // 记录请求路径
    const [url,setUrl]=useState({pointUrl:''});

    useEffect(()=>{
        setUrl(props);
    },[props.pointUrl])

    useEffect(()=>{
      if(props.ready1 && props.ready2) {
        setLoading(false);
        setCount(len);
      }
    },[props.ready1, props.ready2]);

    useEffect(()=>{
      if(len != 39 ){
        props.setReady1(true);
      }
    },[len]);

    // 发送请求获取数据
    useEffect(()=>{
      setLen(39);
      if(url.pointUrl){
        setLoading(true);
        axiosGet(url.pointUrl)
        .then(
          response=>{
              setAllData(response.data.data);
              setLen(response.data.data.length-1);
              if(!props.sync){
                setLoading(false);
                setCount(response.data.data.length-1);
              }
          },
          error=>{
            console.log(error);
          }
        )
      }
    },[url]);

    // 散点图配置
    const getOption=()=>{
        const option = {
            grid3D: {},
            xAxis3D: {
              min:-5,
              max:5,
            },
            yAxis3D: {
              min:-5,
              max:5,
            },
            zAxis3D: {
              min:0,
              max:len+1,
            },
            roam:true,
            dataset: {
              dimensions: [
                'timeOrder',
                'x',
                'y',
              ],
              source: data
            },
            series: [
              {
                type: 'scatter3D',
                symbolSize: 2,
                encode: {
                  x: 'x',
                  y: 'y',
                  z: 'timeOrder',
                  tooltip: [0, 1, 2, 3, 4]
                },
                itemStyle: {
                  color:'red',
                }
              }
            ]
          };
        return option;
    }

    // 定时更新数据
    useEffect(() => {
      if(len == 39) return ;
      if(props.setReady1){
        props.setReady1(false);
      }
      let timerId = null;
      const run = () => {
        if (count <= 0) {
          return () => {
            timerId && clearTimeout(timerId);
          };
        }
        setCount(count - 1);
        timerId = setTimeout(run, 1000);
        // 这下面为相关的业务代码
        if(allData){
          // len===count是重新开始渲染 所以直接用新增数据覆盖原有数据
          if(len===count){
            setData(allData[len - count].list);
          }else{
            setData(v=>[...v,...allData[len - count].list]);
          }
        }
      };                                                                         
      timerId = setTimeout(run, 1000);
      return () => {
        timerId && clearTimeout(timerId);
      };
    }, [count]);

  return (
    <Spin spinning={loading} size='large' tip='loading...'>
      <EChartsReact option={getOption()} style={{width:'100%',height:'100%'}} notMerge={false}></EChartsReact>
    </Spin>
  )
}
