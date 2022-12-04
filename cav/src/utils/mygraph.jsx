import {Spin} from 'antd'
import React,{ useEffect,useState } from 'react'
import EChartsReact from 'echarts-for-react'
import { axiosGet } from './request'

// 封装关系图 传参为url（请求路径） data（请求参数）
export default function MyGraph(props) {

    // loading状态
    const [loading, setLoading] = useState(false);
    // 用于倒数
    const [count,setCount]=useState(-1);
    // 记录时间段的段数
    const [len,setLen]=useState(1);
    // 记录每一个时间段的点关系
    const [link,setLink]=useState([]);
    // 记录每一个时间段的点数据
    const [data,setData]=useState([]);
    // 记录全部关系
    const [allLink,setAllLink]=useState([]);
    // 记录全部点
    const [allData,setAllData]=useState([]);
    // 记录请求路径
    const [url,setUrl]=useState({pointUrl:'',linkUrl:''});
    // 重复
    const [repeat,setRepeat]=useState(0);
    // 固定点
    const fixedPoint=[
      {
        name:'a',
        x: 4,
        y: 4,
        itemStyle:{
          color:'white',
        }
      },
      {
        name:'b',
        x: 4,
        y: -4,
        itemStyle:{
          color:'white',
        }
      },
      {
        name:'c',
        x: -4,
        y: 4,
        itemStyle:{
          color:'white',
        }
      },
      {
        name:'d',
        x: -4,
        y: -4,
        itemStyle:{
          color:'white',
        }
      },
    ];

    // 临时存放点关系
    const [tempAllLink, setTempAllLink] = useState([]);

    // 随父组件改变url
    useEffect(()=>{
      setUrl(props);
    },[props.pointUrl])

    // 随父组件改变repeat
    useEffect(()=>{
      setCount(len);
      setRepeat(props.repeat);
    },[props.repeat]);

    // 状态1准备就绪
    useEffect(()=>{
      if(props.setReady1 && tempAllLink[0]){
        props.setReady1(true);
        console.log('状态1准备就绪');
      }
    },[tempAllLink]);

    // 状态1 状态2 准备就绪
    useEffect(()=>{
      if(props.ready1 && props.ready2){
        setLoading(false);
        setAllLink(tempAllLink);
        console.log('状态1 状态2 准备就绪');
      }
    },[props.ready1, props.ready2]);
  
    // 请求数据
    useEffect(()=>{
      if(url.pointUrl){
      // 请求点数据
      setLoading(true);
      axiosGet(url.pointUrl)
      .then(
          response=>{
            // 设置数据
            setAllData(response.data.data);
            setLen(response.data.data.length-1);
            setCount(response.data.data.length-1);
            // 请求点关系数据
            axiosGet(url.linkUrl)
            .then(
              response=>{
                let pointArr=[];
                setTempAllLink([]);
                setAllLink([]);
                let timeArr=response.data.data.map((x)=>{
                  // 每次进来都要初始化pointArr数组
                  pointArr=[];
                  for(const v of x.list){
                    for(const k of v.end){
                      pointArr.push({
                        source:v.id,
                        target:k+1,
                      })
                    }
                  }
                  return pointArr;
                })
                if(props.sync == true){
                  setTempAllLink(timeArr);
                } else{
                  setLoading(false);
                  setAllLink(timeArr);
                }
              },
              error=>{
                console.log(error);
              }
            )
          },
          error=>{
              console.log(error);
          }
      )
      }
    },[url])

    // 定时更新数据 这个定时器实际上是一个回调
    // 层层回调直到count为0 再从最底层开始返回并执行
    useEffect(() => {
      if(allLink[0]){
        let timerId = null;
        if(props.setReady1){
          props.setReady1(false);
          console.log('退了退了');
        } 
        // 定时器的回调函数
        const run = () => {
          if (count < 0) {
            return () => {
              timerId && clearTimeout(timerId);
            };
          }
          setCount(count - 1);
          timerId = setTimeout(run, 1000);
          // 逻辑代码
          if(len>-1){
            setData([...fixedPoint,...allData[len - count].list])
            if(len!=0){
              setLink(allLink[len - count]);
            }
          }
        };                                                                   
        timerId = setTimeout(run, 1000);
        return () => {
          timerId && clearTimeout(timerId);
        };
      }
    }, [allLink,link,repeat]);

    // 数据配置
    const getOption=()=>{
        // console.log(links);
        const option = {
            tooltip: {},
            series: [
              {
                name: '2D Live',
                type: 'graph',
                layout: 'none',
                symbolSize: 2,
                roam: true,
                edgeSymbol: ['circle', 'circle'],
                edgeSymbolSize: [1, 1],
                // links: link,
                data: data,
                lineStyle: {
                  opacity: 0.08,
                  width: 1,
                  curveness: 0,
                  color:'#aaa',
                },
                itemStyle: {
                  color:'red',
                },
                animation: 'auto',
                animationDuration: 1000,
                animationEasing: 'cubicInOut',
                animationThreshold: 2000,
                progressiveThreshold: 3000,
                progressive: 400,
                hoverLayerThreshold: 3000,
                useUTC: false,
              }
            ]       
          };
        return option;
    }

    return (
      <Spin spinning={loading} size='large' tip='loading...'>
          {/* notMerge 参数 更新数据时不合并 必须设置此参数才可以实时更新数据 盒子大小随时间段变化而变化=>解决echarts自适应带来的问题 */}
          <EChartsReact option={getOption()} style={{height:'100%',width:'100%'}} notMerge={true}/>
      </Spin>
    )
}
