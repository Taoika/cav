import { InputNumber, Button, Space } from 'antd'
import React, { useRef, useEffect, useState } from 'react'
import './index.css'

export default function CavSider({ setRefresh, refresh, setRun, run, fixLane, setMove, setNcar, setNlane, setSdistance, setSpeedxy, setInitPosition }) {
        // console.log('setRun->',setRun);
        const Ncar = React.useRef()
        // 车道数量
        const Nlane = React.useRef()
        // 安全距离     
        const Sdistance = React.useRef()

        // x方向速度大小
        // const Speedx = React.useRef()
        // y放行速度大小
        // const Speedy = React.useRef()
        // 车道数量 状态
        const [LaneNum, setLaneNum] = useState(fixLane ? 2 : 3);

        // 点击设置按钮
        const handleSet = () => {
                //清除所有定时器
                for (let j = 0; j < 1000; j++) {
                        clearInterval(j)
                }

                setRefresh(true)

                //数组是为了生成对应的li
                setMove(false)
                let arr = []
                let arrt = []
                let arrs = []
                while (Ncar.current.value--) {
                        arr.push(0)
                        arrt.push({ x: 200, y: 0 })
                        arrs.push({ x: 0, y: 0 })
                }
                setNcar(arr)
                setSpeedxy(arrs)
                setInitPosition(arrt)
                let arr1 = []
                while (Nlane.current.value--) {
                        arr1.push(0)
                }
                setNlane(arr1)

                setSdistance(Sdistance.current.value)

                // setSpeedx(Speedx.current.value)

                // setSpeedy(Speedy.current.value)
        }
        const onChange = () => {
                //清除所有定时器
                for (let j = 0; j < 1000; j++) {
                        clearInterval(j)
                }
                setRefresh(false)
        }

        // 设置默认值
        function handleDefault() {
                Ncar.current.value = 3;
                Nlane.current.value = 3;
                Sdistance.current.value = 110;
                //     Speedx.current.value = 5;
                //     Speedy.current.value = 5;
        }

        // 处理车道上限
        function handleLaneNum() {
                Nlane.current.blur();
                setLaneNum(Nlane.current.value);
        }

        // 点击提交按钮
        function submit() {
                //     handleSet();
                //数组是为了生成对应的li
                setMove(false)
                //清除所有定时器
                for (let j = 0; j < 1000; j++) {
                        clearInterval(j)
                }
                let arr = []
                let arrt = []

                while (Ncar.current.value--) {
                        arr.push(0)
                        arrt.push({ x: 200, y: 0 })
                }
                setNcar(arr)
                let arr1 = []
                while (Nlane.current.value--) {
                        arr1.push(0)
                }
                setNlane(arr1)

                setSdistance(Sdistance.current.value)

                run++;
                setRun(run++);
        }

        return (
                <div className="cav-sider">
                        <h2 className="cav-sider-head">Option</h2>
                        <div className="cav-sider-body">
                                <div className="cav-sider-carNum">
                                        Num of Car <InputNumber onChange={onChange} ref={Ncar} defaultValue={3}></InputNumber>
                                </div>
                                <div className="cav-sider-laneNum">
                                        Num of Lane <InputNumber ref={Nlane} max={4} min={1} defaultValue={fixLane ? 2 : 3} onBlur={handleLaneNum} onPressEnter={handleLaneNum} disabled={fixLane ? true : false}></InputNumber>
                                </div>
                                <div className="cav-sider-safe">
                                        Safe Distance <InputNumber ref={Sdistance} defaultValue={110} min={110} max={200} disabled={true}></InputNumber>
                                </div>
                                <div className="cav-sider-speed">
                                        <div className="cav-sider-speed-title">Speed</div>
                                        {/* <div className="cav-sider-speed-input">
                                                <Space direction="vertical">
                                                        <Space>x <InputNumber ref={Speedx} defaultValue={0} min={0} disabled={true}></InputNumber></Space> 
                                                        <Space>y <InputNumber ref={Speedy} defaultValue={0} min={0} disabled={true}></InputNumber></Space>
                                                </Space>
                                        </div> */}
                                </div>
                                <div className="cav-sider-button">
                                        <Button type='primary' onClick={handleSet}>Set</Button>
                                        <Button onClick={handleDefault}>Default</Button>
                                        <Button className='cav-sider-OKBtn' type='primary' onClick={submit}>OK</Button>
                                </div>
                        </div>
                </div>
        )
}
