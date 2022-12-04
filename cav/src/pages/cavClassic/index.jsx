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
export default function CavClassic() {
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
	const [Leftest, setLeftest] = useState(400)
	//屏幕坐标
	const [scrCoor, setScrCoor] = useState([{ x: 0, y: 0 }])
	//坐标系坐标
	const [coor, setCoor] = useState([{ x: 0, y: 0 }])
	//loading
	// const [Loading, setLoading] = useState(false)
	// run
	const [run, setRun] = useState(0);
	//设置阀门,只有当move为true时小车才能动
	const [move, setMove] = useState(false)
	useEffect(() => {
		if (Ncar.length > 0 && Nlane.length > 0 && Nlane[0] === 0 && Nlane[0] === 0) {
			// console.log(initPosition, 'initPosition');
			let temp = initPosition
			let max = { x: 100, y: 100 }
			let Lane = document.querySelector('.cavClassic-right-main')
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
			// console.log(temp, 'temp');
			// console.log(speedxy, 'speedxy');
			let data = {
				"cav_y": sysLine[0].y,
				"cav_x_x_list":
					temp.map((v, i) => (v.x))
				,
				"cav_x_y_list":
					temp.map((v, i) => (v.y))
				,
				"cav_v_x_list":
					temp.map((v, i) => (v.x))
				,
				"cav_v_y_list":
					temp.map((v, i) => (v.y))
				,
				"cav_r_x": 5,
				"cav_r_v": 6
			}
			let url = 'https://qgailab.com/cav-api/1/easy-task';
			setMove(false)
			setCoor([{ x: 0, y: 0 }])
			setScrCoor([{ x: 0, y: 0 }])
			// setLoading(true)
			axiosJSONPost(url, data).
				then(response => {
					// 这个格式是 [[[所有车的x坐标],[所有车的y坐标]],[],[]]
					console.log(response.data.data.location, 'response');
					let data = []
					response.data.data.location.map((v, i) => {
						data.push({ list: v[0].map((value, index) => ({ x: v[0][index], y: v[1][index] })) })
					})
					console.log(data);
					setCoor(data);
					// setLoading(false);
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

	return (
		<div className="cavClassic">
			<Context.Provider value={{ initPosition, setInitPosition }}>
				{/* {Loading ? <div className='video'> <video src={loading} autoPlay muted={true} loop={true}></video> </div> : ''} */}
				<CavSider refresh={refresh} setRefresh={setRefresh} setInitPosition={setInitPosition} setSpeedxy={setSpeedxy} setRun={setRun} run={run} setMove={setMove} setNcar={setNcar} setNlane={setNlane} setSdistance={setSdistance} />
				<div className="cavClassic-right">
					<div className="cavClassic-right-head">
						<Button><Space>Del <DeleteFilled /></Space></Button>
					</div>
					{refresh ? <div className='cavClassic-right-main'>
						{Ncar.map((value, index) => (<Car setLeftest={index === 0 ? setLeftest : ''} speedxy={speedxy} setSpeedxy={setSpeedxy} initPosition={initPosition} setInitPosition={setInitPosition} module='cavClassic' index={index} move={move} setMove={setMove} scrCoor={scrCoor.length > 10 && move ?
							scrCoor.map((v, i) => ({ y: v.list[index].y, x: v.list[index].x === Math.min(...v.list.map((vv, ii) => (vv.x))) ? Leftest : Leftest + (v.list[index].x - Math.min(...v.list.map((vv, ii) => (vv.x)))) }))
							: ''} angle={angle} key={index} setDis={setDis} setSpeed={setSpeed} />))}
						<Lane move={move} setScrCoor={setScrCoor} coor={coor} Nlane={Nlane} setSysLine={setSysLine} line={line} />
						<Line setLine={setLine} />
					</div> : ''}
				</div>
			</Context.Provider>
		</div>
	)
}
