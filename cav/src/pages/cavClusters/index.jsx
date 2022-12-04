import { DeleteFilled, EditOutlined } from '@ant-design/icons';
import { InputNumber, Button, Space, Popover } from 'antd'
import React, { useState, useEffect, useRef, createContext } from 'react'
import './index.css'
import CavSider from '../../component/cavSider';
import Car from '../../component/routeAndMove';
import Lane from '../../component/Lane';
import { axiosJSONPost, axiosGet } from '../../utils/request';
import axios from 'axios';
import loading from '../../assets/videos/loading.mp4'
import Line from '../../component/Line'

const sleep = (delay) => {
	var start = (new Date()).getTime();
	while ((new Date()).getTime() - start < delay) {
		continue;
	}
}
// export const Context = createContext()
export const Context = createContext()
export default function CavClusters() {
	const [Ncar, setNcar] = useState([])
	const [Nlane, setNlane] = useState([])
	const [Sdistance, setSdistance] = useState(0)
	const [speedxy, setSpeedxy] = useState([])
	const [initPosition, setInitPosition] = useState([])
	const [speed, setSpeed] = useState(6);
	const [dis, setDis] = useState(110);
	const [angle, setAngle] = useState({ x: 0, y: 0 });
	// 收敛线的屏幕坐标
	const [line, setLine] = useState([{ x: 0, y: 155 }]);
	// 收敛线的坐标轴坐标
	const [sysLine, setSysLine] = useState([{ x: 0, y: 0 }]);
	const [refresh, setRefresh] = useState(false)
	//最左边车辆的坐标
	const [Leftest, setLeftest] = useState(0)
	//屏幕坐标
	const [scrCoor, setScrCoor] = useState([{ x: 0, y: 0 }])
	//坐标系坐标
	const [coor, setCoor] = useState([{ x: 0, y: 0 }])
	// loading
	const [Loading, setLoading] = useState(false)
	// run
	const [run, setRun] = useState(0);
	//设置阀门,只有当move为true时小车才能动
	const [move, setMove] = useState(false)
	// 跟随车领导车数组
	const [carType, setCarType] = useState([]);


	// 点击run按钮
	useEffect(() => {
		if (Ncar.length > 0 && Nlane.length > 0 && Nlane[0] === 0 && Nlane[0] === 0) {
			// console.log(initPosition, 'initPosition');
			let temp = initPosition
			let max = { x: 100, y: 100 }
			let Lane = document.querySelector('.cavClusters-right-main')
			Lane.style.marginLeft = 0
			// obj宽度
			const clientWidth = Lane.clientWidth / 13;
			// obj长度
			const clientHeight = Lane.clientHeight;
			// obj左边距
			const offsetLeft = Lane.offsetLeft;
			// obj上边距
			const offsetTop = Lane.offsetTop;
			// 最大x
			const maxX = clientWidth;
			// 最大y
			const maxY = clientHeight;
			let maxy = 100
			temp.map((j) => {
				j.x = (j.x - offsetLeft) * max.x / clientWidth;
				j.y = (maxY - (j.y - offsetTop)) * max.y / maxY;
			})
			console.log(temp, 'temp');

			let cav_x_list = [];
			let cav_xL_list = [];

			// 队列数
			let formNUm = parseInt(( temp.length - 1 ) / 2);
			console.log('formNUm->',formNUm);

			cav_xL_list.push([[],[]]);
			for(let i = 0; i < formNUm; i++){
				cav_xL_list.push([[],[]]);
				cav_x_list.push([[],[]]);
			}
			
			if(temp.length % 2 === 1){ // 车总数为奇数 一辆跟随车配一辆领导车 领导车先进 
				for(const i in temp){
					if(i % 2 === 0){
						cav_xL_list[parseInt(i/2)][0].push(temp[i].x);
						cav_xL_list[parseInt(i/2)][1].push(temp[i].y);
					} else {
						cav_x_list[parseInt(i/2)][0].push(temp[i].x);
						cav_x_list[parseInt(i/2)][1].push(temp[i].y);
					}
				}
			} else if(temp.length % 2 === 0){ // 偶数 第一个队列多加一辆跟随车 跟随车先进
				cav_x_list[0][0].push(temp[0].x);
				cav_x_list[0][1].push(temp[0].y);
				for(const i in temp){
					if(i > 0){
						if(( i - 1 ) % 2 === 0){
							cav_xL_list[parseInt((i - 1) / 2)][0].push(temp[i].x);
							cav_xL_list[parseInt((i - 1) / 2)][1].push(temp[i].y);
						} else {
							cav_x_list[parseInt((i - 1) / 2)][0].push(temp[i].x);
							cav_x_list[parseInt((i - 1) / 2)][1].push(temp[i].y);
						}
					}
				}
			}
			console.log(cav_x_list, cav_xL_list);

			// 跟随车位置
			// let cav_x_list = [[[],[]],[[],[]],[[],[]]];
			// for(const i in temp){
			// 	if(i < 6){
			// 		cav_x_list[parseInt(i/2)][0].unshift(temp[i].x);
			// 		cav_x_list[parseInt(i/2)][1].unshift(temp[i].y);
			// 	}
			// }
			// console.log(cav_x_list);

			// let cav_xL_list = [[[],[]],[[],[]],[[],[]],[[],[]]];
			// for(const i in temp){
			// 	if(i > 5){
			// 		cav_xL_list[i - 6][0].unshift(temp[i].x);
			// 		cav_xL_list[i - 6][1].unshift(temp[i].y);
			// 	}
			// }
			// console.log(cav_xL_list);
			// console.log(speedxy, 'speedxy'); 

			let digital_0 = {
				"cav_x_list":[[[-1,4,8,12,0,16],[2,2,2,2,0,16]]],
				"cav_xL_list":[[[-4],[1]],[[17],[1]]],
				"cav_v_list":[[[10,10,10,10,10,10],[0,0,0,0,0,0]]],
				"cav_vL_list":[[[10],[0]],[[10],[0]]],
				"cav_r_list":[[[0,-4,8,8,16,16],[0,58,58,0,58,0]]],
				"cav_rL_list":[[[-4],[0]],[[20],[0]]]
			}

			let digital_1 = { 	
				// 跟随车位置
				"cav_x_list": 
					cav_x_list,
				// 领导车位置
				"cav_xL_list": 
					cav_xL_list,
				// 跟随车速度
				"cav_v_list": 
				[
					[
						[10, 10],
						[0, 0]
					],
					[
						[10, 10],
						[0, 0]
					],
					[
						[10, 10],
						[0, 0]
					]
				],
				// 领导车速度
				"cav_vL_list": 
				[
					[
						[10],
						[0]
					],
					[
						[20],
						[0]
					],
					[
						[20],
						[0]
					],
					[
						[10],
						[0]
					]
				],
				// 跟随车期望距离
				"cav_r_list":
				[
					[
						[0, -4],
						[0, 58]
					],
					[
						[8, 8],
						[58, 0]
					],
					[
						[16, 16],
						[58, 0]
					]
				],
				// 领导车期望距离
				"cav_rL_list": 
				[
					[
						[-4],
						[0]
					],
					[
						[4],
						[0]
					],
					[
						[12],
						[0]
					],
					[
						[20],
						[0]
					],
				],
			}

			let digital_2 = { 	
				// 跟随车位置
				"cav_x_list": 
					// cav_x_list,
				[
					[
						[-1, 4],
						[2, 2]
					],
					[
						[8, 12],
						[2, 2]
					],
					[
						[0, 16],
						[1, 2]
					]
				],
				// 领导车位置
				"cav_xL_list": 
					// cav_xL_list,
				[
					[
						[-4],
						[1]
					],
					[
						[3],
						[1]
					],
					[
						[10],
						[1]
					],
					[
						[17],
						[1]
					]
				],
				// 跟随车速度
				"cav_v_list": 
				[
					[
						[10, 10],
						[0, 0]
					],
					[
						[10, 10],
						[0, 0]
					],
					[
						[10, 10],
						[0, 0]
					]
				],
				// 领导车速度
				"cav_vL_list": 
				[
					[
						[10],
						[0]
					],
					[
						[20],
						[0]
					],
					[
						[20],
						[0]
					],
					[
						[10],
						[0]
					]
				],
				// 跟随车期望距离
				"cav_r_list":
				[
					[
						[0, -4],
						[0, 58]
					],
					[
						[8, 8],
						[58, 0]
					],
					[
						[16, 16],
						[58, 0]
					]
				],
				// 领导车期望距离
				"cav_rL_list": 
				[
					[
						[-4],
						[0]
					],
					[
						[4],
						[0]
					],
					[
						[12],
						[0]
					],
					[
						[20],
						[0]
					],
				],
			}

			let digital_3 = {
				// 跟随车位置
				"cav_x_list": 
					// cav_x_list,
				[
					[
						[-1, 4],
						[2, 2]
					],
				],
				// 领导车位置
				"cav_xL_list": 
					// cav_xL_list,
				[
					[
						[-4],
						[1]
					],
					[
						[17],
						[1]
					]
				],
				// 跟随车速度
				"cav_v_list": 
				[
					[
						[10, 10],
						[0, 0]
					],
				],
				// 领导车速度
				"cav_vL_list": 
				[
					[
						[10],
						[0]
					],
					[
						[10],
						[0]
					]
				],
				// 跟随车期望距离
				"cav_r_list":
				[
					[
						[0, -4],
						[0, 58]
					],
				],
				// 领导车期望距离
				"cav_rL_list": 
				[
					[
						[-4],
						[0]
					],
					[
						[20],
						[0]
					],
				],
			}

			let digital_4 = { 	
				// 跟随车位置
				"cav_x_list": 
					// cav_x_list,
				[
					[
						[-1, 4],
						[2, 2]
					],
					[
						[0, 16],
						[1, 2]
					]
				],
				// 领导车位置
				"cav_xL_list": 
					// cav_xL_list,
				[
					[
						[-4],
						[1]
					],
					[
						[3],
						[1]
					],
					[
						[17],
						[1]
					]
				],
				// 跟随车速度
				"cav_v_list": 
				[
					[
						[10, 10],
						[0, 0]
					],
					[
						[10, 10],
						[0, 0]
					]
				],
				// 领导车速度
				"cav_vL_list": 
				[
					[
						[10],
						[0]
					],
					[
						[20],
						[0]
					],
					[
						[10],
						[0]
					]
				],
				// 跟随车期望距离
				"cav_r_list":
				[
					[
						[0, -4],
						[0, 58]
					],
					[
						[8, 8],
						[58, 0]
					],
				],
				// 领导车期望距离
				"cav_rL_list": 
				[
					[
						[-4],
						[0]
					],
					[
						[4],
						[0]
					],
					[
						[20],
						[0]
					],
				],
			}

			let digital_5 = { 	
				// 跟随车位置
				"cav_x_list": 
					// cav_x_list,
				[
					[
						[-1],
						[2]
					],
					[
						[0],
						[1]
					]
				],
				// 领导车位置
				"cav_xL_list": 
					// cav_xL_list,
				[
					[
						[-4],
						[1]
					],
					[
						[17],
						[1]
					]
				],
				// 跟随车速度
				"cav_v_list": 
				[
					[
						[10],
						[0]
					],
					[
						[10],
						[0]
					]
				],
				// 领导车速度
				"cav_vL_list": 
				[
					[
						[10],
						[0]
					],
					[
						[10],
						[0]
					]
				],
				// 跟随车期望距离
				"cav_r_list":
				[
					[
						[0],
						[0]
					],
					[
						[8],
						[58]
					],
				],
				// 领导车期望距离
				"cav_rL_list": 
				[
					[
						[-4],
						[0]
					],
					[
						[20],
						[0]
					],
				],
			}

			let digital = { 	
				// 跟随车位置
				"cav_x_list": 
					cav_x_list,
				// 领导车位置
				"cav_xL_list": 
					cav_xL_list,
				// 跟随车速度
				"cav_v_list": 
					cav_x_list,
				// 领导车速度
				"cav_vL_list": 
					cav_xL_list,
				// 跟随车期望距离
				"cav_r_list":
				[
					[
						[0],
						[0]
					],
					[
						[16],
						[58]
					]
				],
				// 领导车期望距离
				"cav_rL_list": 
				[
					[
						[-4],
						[0]
					],
					[
						[12],
						[0]
					],
					[
						[20],
						[0]
					],
				],
			}
			
			let url = 'https://qgailab.com/cav-api/2/easy-task';
			setMove(false)
			setCoor([{ x: 0, y: 0 }])
			setScrCoor([{ x: 0, y: 0 }])
			// setLoading(true)
			axiosJSONPost(url, digital).
				then(response => {
					let data = [];
					console.log(response.data.data, 'response');
					// response.data.data.location.map((v, i) => {
					// 	data.push({ list: v[0].map((value, index) => ({ x: v[0][index], y: v[1][index] })) })
					// })
					const res_xL = response.data.data.xL_list;
					const res_x = response.data.data.x_list;
					response.data.data.x_list.map((v, i) => {
						let Obj = {
							list: [],
						};
						if(temp.length % 2 === 1){ // 奇数 先取领导车
							for(let i = 0; i < temp.length; i++){
								if(i % 2 === 0){
									Obj.list.push({ x: res_xL[i][parseInt(i/2)][0][0], y: res_xL[i][parseInt(i/2)][1][0] });
								} else {
									Obj.list.push({ x: res_x[i][parseInt(i/2)][0][0], y: res_x[i][parseInt(i/2)][1][0]});
								}
							}
						} else { // 偶数 先取跟随车
							console.log(res_x[i], res_x[i]);
							Obj.list.push({ x: res_x[i][0][0][0], y: res_x[i][0][1][0] });
							res_x[i][0][0][0] = res_x[i][1][0][0];
							res_xL[i][0][1][0] = res_xL[i][1][1][0];
							for(let i = 0; i < temp.length; i++){
								if(i % 2 === 0){
									Obj.list.push({ x: res_xL[i][parseInt((i - 1) / 2 )][0][0], y: res_xL[i][parseInt((i - 1) / 2)][1][0] });
								} else {
									Obj.list.push({ x: res_x[i][parseInt((i- 1) / 2)][0][0], y: res_x[i][parseInt((i - 1) / 2)][1][0]});
								}
							}
						}
						data.push(Obj);
						// let Obj = {
						// 	list: [],
						// };
						// for(const k of v){
						// 	Obj.list.push({x: k[0][0], y: k[1][0]});
						// 	Obj.list.push({x: k[0][1], y: k[1][1]});
						// }
						// for(const u of response.data.data.xL_list[i]){
						// 	Obj.list.push({x: u[0][0], y: u[1][0]});
						// }
						// data.push(Obj);
					})
					console.log(data);
					setCoor(data);
					setMove(true)
				})

		}
	}, [run])

	// useEffect(() => {
	// 	let data = {
	// 		"cav_y": 65,
	// 		"cav_x_x_list": [
	// 			6,
	// 			10,
	// 			16,
	// 			22
	// 		],
	// 		"cav_x_y_list": [
	// 			60,
	// 			40,
	// 			70,
	// 			90
	// 		],
	// 		"cav_v_x_list": [
	// 			10,
	// 			8,
	// 			9,
	// 			4
	// 		],
	// 		"cav_v_y_list": [
	// 			5,
	// 			4,
	// 			3,
	// 			1
	// 		],
	// 		"cav_r_x": 5,
	// 		"cav_r_v": 6
	// 	}
	// 	let url = 'http://10.21.71.79:8000/model/1/easy-task';
	// 	if (Ncar.length > 0 && Nlane.length > 0 && Nlane[0] === 0 && Nlane[0] === 0) {
	// 		setMove(false)
	// 		setCoor([{ x: 0, y: 0 }])
	// 		setScrCoor([{ x: 0, y: 0 }])
	// 		// setLoading(true)
	// 		axiosJSONPost(url,data).
	// 			then(response => { 
	// 				console.log(response.data.data.location);
	// 				// setCoor(response.data.data.location); 
	// 				// setLoading(false); 
	// 				// setMove(true) 
	// 			})
	// 	}
	// }, [run])

	// 获取小车的旋转角度和安全距离
	// useEffect(() => {
	// 	console.log(Speedx, Speedy,dis,speed);
	// 	// setAngle({ x: Speedx, y: Speedy })
	// }, [Speedx, Speedy,dis,speed])

	// 获取收敛线的坐标
	
	useEffect(() => {
		// console.log('sysLine',sysLine[0].x,sysLine[0].y);
	}, [sysLine]);

	useEffect(() => {
		// console.log(refresh, 'refresh');
	}, [refresh]);

	// 小车类型判断
	useEffect(() => {
		setCarType([]);
		let form = [];
		if(Ncar.length % 2 === 1){
			for(let i = 0; i < Ncar.length; i++){
				if(i % 2 === 0) form.push(1);
				else form.push(0);
			}
		} else{
			for(let i = 0; i < Ncar.length; i++){
				if(i % 2 === 0) form.push(0);
				else form.push(1);
			}
		}
		setCarType(form);
	},[Ncar.length]);

	return (
		<div className="cavClusters">
			<Context.Provider value={{ initPosition, setInitPosition }}>
				{/* {Loading ? <div className='video'> <video src={loading} autoPlay muted={true} loop={true}></video> </div> : ''} */}
				<CavSider refresh={refresh} setRefresh={setRefresh} setInitPosition={setInitPosition} setSpeedxy={setSpeedxy} setRun={setRun} run={run} setMove={setMove} setNcar={setNcar} setNlane={setNlane} setSdistance={setSdistance} />
				<div className="cavClusters-right">
					<div className="cavClusters-right-head">
						<Button><Space>Del <DeleteFilled /></Space></Button>
					</div>
					{refresh ? <div className='cavClusters-right-main'>
						{Ncar.map((value, index) => (
							<Car 
								setLeftest={index === 0 ? setLeftest : ''} 
								speedxy={speedxy} 
								setSpeedxy={setSpeedxy} 
								initPosition={initPosition} 
								setInitPosition={setInitPosition} 
								module='cavClusters' 
								index={index} 
								move={move} 
								setMove={setMove} 
								scrCoor={scrCoor.length > 10 && move ? scrCoor.map((v, i) => ({ y: v.list[index].y, x: v.list[index].x === Math.min(...v.list.map((vv, ii) => (vv.x))) ? Leftest : Leftest + (v.list[index].x - Math.min(...v.list.map((vv, ii) => (vv.x)))) })): ''} 
								angle={angle} 
								key={index} 
								setDis={setDis} 
								setSpeed={setSpeed}
								carType={carType[index]}
							/>))}
						<Lane move={move} setScrCoor={setScrCoor} coor={coor} Nlane={Nlane} setSysLine={setSysLine} line={line} />
						{/* <Line setLine={setLine} /> */}
					</div> : ''}
				</div>
			</Context.Provider>
		</div>
	)
}
