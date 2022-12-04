import { InputNumber, Popover, Space } from 'antd';
import React from 'react'
import { useEffect, useState, useRef, useContext } from 'react';
// import { Context } from '../../pages/cavClassic'

import './index.css'
import Car from '../../assets/images/car.png'
import CarRed from '../../assets/images/carRed.png'
// 这个组件就是一整个可以跟随鼠标移动的元素 还需要根据实际情况限制图像的距离
//sleep
const sleep = (delay) => {
    var start = (new Date()).getTime();
    while ((new Date()).getTime() - start < delay) {
        continue;
    }
}
export default function RouteAndMove(props) {
    // const { Ncar, Nlane } = useContext(Context)
    // 图像位置状态

    const [xyz, setXyz] = useState({ x: 200, y: 120 });
    const [trixyz, setTrixyz] = useState({ x: 200, y: 120 });
    const [bubxyz, setBubxyz] = useState({ x: 90, y: 70 })
    const [numxyz, setNumxyz] = useState({ x: 90, y: 70 })

    const [show, setShow] = useState(false);
    const [carP, setCarP] = useState({ x: 0, y: 0 })
    const [carAngle, setCarAngle] = useState(0);

    // 图像旋转状态
    const [angle, setAngle] = useState(0);
    const [i, setI] = useState(0)
    const mother = 100
    // 盒子元素
    const car1 = useRef(null);
    //小三角
    const triangle = useRef(null);
    // 速度大小所在输入框
    const speedRef = useRef(null);
    // 安全距离所在输入框
    const disRef = useRef(null);
    //半径R
    const R = 70
    function handleShow() {
        setShow(!show);
    }
    // useEffect(() => {
    //     console.log(props.initPosition, 'change');
    //     if (props.initPosition && props.initPosition[props.index] && props.initPosition[props.index].x === 200 && props.initPosition[props.index].y === 0) {
    //         console.log('需要初始化');
    //         setXyz({ x: 200, y: 100 })
    //     }
    // }, [props.initPosition])
    //处理鼠标旋转图像
    const rotate = (obj, set) => {
        obj.onmousedown = (event) => {
            event = event || window.event;
            // 阻止默认事件
            event.preventDefault();

            // 鼠标手
            obj.style.cursor = "grabbing";

            // 计算鼠标当前坐标 = 鼠标按下坐标 - 元素当前坐标(距离父元素距离)
            // div的水平偏移量  鼠标.clentX - 元素.offsetLeft
            // div的垂直偏移量  鼠标.clentY - 元素.offsetTop
            var ol = event.clientX - obj.offsetLeft;
            var ot = event.clientY - obj.offsetTop;
            // 绑定鼠标移动事件
            document.onmousemove = (event2) => {
                event2 = event2 || window.event;
                // 计算移动距离 = 当前鼠标坐标 - 鼠标按下坐标
                var left = event2.clientX - ol;
                var top = event2.clientY - ot;
                var car = car1.current
                let o = toCenter({ x: car.offsetLeft, y: car.offsetTop })
                setCarP(o);
                if ((left - o.x) !== 0) {
                    let angle = Math.atan((top - o.y) / (left - o.x))
                    setCarAngle(angle);
                    // angle = angle > 90 ? -angle : angle
                    // console.log(speedRef.current?.value);
                    let tempY = speedRef.current?.value * Math.sin(angle)
                    let tempX = speedRef.current?.value * Math.cos(angle)
                    let speed = props?.speedxy
                    speed[props.index].x = event2.clientX < carP.x ? -tempX : tempX
                    speed[props.index].y = event2.clientX > carP.x ? -tempY : tempY
                    props.setSpeedxy(speed)
                    // props?.setSpeedx(event2.clientX<o.x?-tempX:tempX);
                    // props?.setSpeedy(event2.clientX>o.x?-tempY:tempY);
                    // console.log(event2.clientX>o.x?-tempY:tempY, event2.clientX<o.x?-tempX:tempX,'y','x');
                    let x, y
                    if (left < o.x) {
                        x = o.x - tempX;
                        y = o.y - tempY;
                    } else {
                        x = o.x + tempX;
                        y = o.y + tempY;
                    }
                    set({ x, y });
                    angle = angle * 57
                    left < o.x ? setAngle(180 + angle) : setAngle(angle)

                }

            }

            // 绑定一个鼠标松开事件
            document.onmouseup = (e) => {
                // 取消鼠标移动事件
                document.onmousemove = null;
                document.onmouseup = null;
                // 还原鼠标手
                obj.style.cursor = "grab";
            }
        }
    }
    // 处理鼠标拖曳图像
    const drag = (obj, set) => {
        // 鼠标被按下
        obj.onmousedown = (event) => {
            event = event || window.event;
            // 阻止默认事件
            event.preventDefault();

            // 鼠标手
            obj.style.cursor = "grabbing";

            // clintWidth是元素的实际宽度 包括padding
            var maxMoveX = window.innerWidth - obj.clientWidth;
            var maxMoveY = window.innerHeight - obj.clientHeight;

            // 计算鼠标当前坐标 = 鼠标按下坐标 - 元素当前坐标(距离父元素距离)
            // div的水平偏移量  鼠标.clentX - 元素.offsetLeft
            // div的垂直偏移量  鼠标.clentY - 元素.offsetTop
            var ol = event.clientX - obj.offsetLeft;
            var ot = event.clientY - obj.offsetTop;
            var lastTop, lastLeft
            // 绑定鼠标移动事件
            document.onmousemove = (event2) => {
                event2 = event2 || window.event;
                // 计算移动距离 = 当前鼠标坐标 - 鼠标按下坐标
                var left = event2.clientX - ol;
                var top = event2.clientY - ot;

                // 判断左右移动距离
                if (left >= maxMoveX) {
                    left = maxMoveX;
                } else if (left <= 0) {
                    left = 0;
                }
                // 判断上下移动距离
                if (top >= maxMoveY) {
                    top = maxMoveY;
                } else if (top <= 0) {
                    top = 0;
                }
                lastTop = top;
                lastLeft = left;

                set({ x: left, y: top });
            }

            // 绑定一个鼠标松开事件
            document.onmouseup = (e) => {

                // 取消鼠标移动事件
                if (lastLeft) {
                    coorTransform(lastLeft, lastTop, setXyz)

                }
                document.onmousemove = null;
                document.onmouseup = null;
                // 还原鼠标手
                obj.style.cursor = "grab";
            }
        }
    }

    //拖曳后吸附坐标转换
    //处理拖曳 屏幕坐标转换坐标系坐标
    const coorTransform = (x, targetY, set) => {
        // obj长度
        // console.log(`.Lane`);
        var lis = document.querySelector(`.Lane`).children

        let min = 100000;
        let last = 0;
        for (let i = 0; i < lis.length; i++) {
            let center = lis[i].offsetTop + lis[i].clientHeight / 2
            let y = targetY + 25
            if (Math.abs(center - y) < min) {
                min = Math.abs(center - y)
                last = center;
            }
        }
        if (props.initPosition) {
            let position = props.initPosition
            if (position[props.index]) {
                if (props.setLeftest) {
                    // console.log(x, 'x');
                    props.setLeftest(x)
                }
                position[props.index].x = x
                position[props.index].y = last - 25 + 50
                props.setInitPosition(position)
            } else {
                console.log('error');
            }

        }
        set({ x, y: last - 25 })
    }

    useEffect(() => {
        if (props.scrCoor.length > 10 && props.move) {
            let i = 0;
            let count = [];
            props.scrCoor[0].y < props.scrCoor[props.scrCoor.length - 1].y ? setAngle(10) : setAngle(-10)
            const timer = setInterval(() => {
                // && Math.abs(props.scrCoor[i].y - props.scrCoor[i + 1].y) <= 2
                if (i < props.scrCoor.length - 1 && props.move) {
                    const x = props.scrCoor[i].x + 'px';
                    const y = props.scrCoor[i].y - 28 + 'px';
                    var cars = document.querySelectorAll('.car')
                    let car = cars[props.index]
                    // if (car.offsetTop !== 120) {
                    let angle = car.offsetTop - y.split('p')[0]
                    count.push(angle)
                    if (count.length === 15) {
                        let avar = count.reduce((pre, cur) => (pre + cur)) / 10
                        setAngle(-avar * 5)
                        count = []
                    }
                    // if (Math.abs(angle) < 1 && angle !== 0) {
                    //     count++;
                    //     if (count >= 10 && count < 100) {
                    //         let tz = 10;
                    //         let tf = -10;
                    //         let timer1 = setInterval(() => {
                    //             angle < 0 ? setAngle(tz--) : setAngle(tf++)
                    //             if (tz < 0 || tf > 0) {
                    //                 clearInterval(timer1)
                    //             }
                    //         }, 50)
                    //         count = 120
                    //     }
                    // }
                    // Math.abs(angle) - 20 <= 0 ? setAngle(angle) : angle > 0 ? setAngle(20) : setAngle(-20)
                    // if (props.index === 0) {
                    //     console.log(-angle * 10);
                    // }
                    // setAngle(-angle * 5)
                    // if (Math.abs(angle) < 1 && angle !== 0) {
                    //     setAngle(0)
                    // } else if (angle > 0 && angle !== -10) {
                    //     setAngle(-10)
                    // } else if (angle < 0 && angle !== 10) {
                    //     setAngle(10)
                    // }
                    // }
                    setXyz({ x, y })
                    var lane = document.querySelector(`.${props?.module}-right-main`)
                    lane.style.marginLeft = (-i) * 10 + 'px'
                    i++
                } else {
                    props.setMove(false)
                    clearInterval(timer)
                    setAngle(0)
                }
            }, 50)
        }
    }, [props.scrCoor])

    // 拖曳功能
    useEffect(() => {
        if (car1) drag(car1.current, setXyz);
        if (triangle && !props?.notRotate) rotate(triangle.current, setTrixyz);
    }, []);

    // 将x,y形式的速度转换成角度形式的速度 Promise
    function speedTransform(xy, speed) {
        return new Promise((resolve, reject) => {
            const x = xy?.x;
            const y = xy?.y;
            const n = x >= 0 ? Math.asin(y / speed) / (Math.PI / 180) :
                y >= 0 ? Math.asin(-y / speed) / (Math.PI / 180) + 180 :
                    Math.asin(-y / speed) / (Math.PI / 180) - 180;
            resolve(-n);
        })

    }

    // 旋转功能
    useEffect(() => {
        // asin的返回值在 -2/pi ~ 2/pi 这个范围内
        const x = props?.angle.x;
        const y = props?.angle.y
        let speed = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        speedTransform({ x: x, y: y }, speed).then((value) => {
            setAngle(value)
        })
    }, [props.angle]);

    //让小三角和气泡跟着小车移动
    useEffect(() => {
        let temp = toCenter(xyz)
        temp.x = temp.x + R + 'px'
        temp.y = temp.y + 'px'
        setTrixyz(temp)
        let bubTemp = toCenter(xyz);
        // bubTemp.x = `calc(${bubTemp.x}px - 8vw)`;
        // bubTemp.y = `calc(${bubTemp.y}px - 5vw)`;
        bubTemp.x = `calc(${bubTemp.x}px - 170px)`;
        bubTemp.y = `calc(${bubTemp.y}px - 70px)`;
        setBubxyz(bubTemp);
        let numxyz = toCenter(xyz);
        // bubTemp.x = `calc(${bubTemp.x}px - 8vw)`;
        // bubTemp.y = `calc(${bubTemp.y}px - 5vw)`;
        numxyz.x = `calc(${numxyz.x}px - 8px)`;
        numxyz.y = `calc(${numxyz.y}px - 4px)`;
        setNumxyz(numxyz)
    }, [xyz]);

    //坐标转换,从左上角转换到车的正中间(注意传回两个数字,不是px)
    const toCenter = (xyz) => {
        let toCenterX = 57
        let toCenterY = 12
        let x = Number.parseInt(xyz.x) + toCenterX
        let y = Number.parseInt(xyz.y) + toCenterY
        return { x, y }
    }

    function handleSet() {
        props?.setDis(disRef.current?.value);
        props?.setSpeed(speedRef.current?.value);
        // 绑定鼠标移动事件
        document.onmousemove = (event2) => {
            event2 = event2 || window.event;
            let tempY = speedRef.current?.value * Math.sin(angle)
            let tempX = speedRef.current?.value * Math.cos(angle)
            let speed = props?.speedxy
            speed[props.index].x = event2.clientX < carP.x ? -tempX : tempX
            speed[props.index].y = event2.clientX > carP.x ? -tempY : tempY
            props.setSpeedxy(speed)
            // props?.setSpeedx(event2.clientX<carP.x?-tempX:tempX);
            // props?.setSpeedy(event2.clientX>carP.x?-tempY:tempY);
            document.onmousemove = null;
        }
    }

    return (
        <div className='routeAndMove'>
            <img className='car' src={props.carType === 1 ? CarRed : Car} ref={car1} onDoubleClick={handleShow} style={{ left: xyz.x, top: xyz.y, transform: `rotate(${angle}deg)` }} width='150px' alt="myCar" />
            <div style={{ fontSize: '26px', position: 'absolute', zIndex: '2', left: numxyz.x, top: numxyz.y, color: props.carType ===1 ? `red` : `black`}}>{props.index}</div>
            <div className={show ? props.carType ? "bubble red show" : "bubble blue show" : "bubble"} style={{ left: bubxyz.x, top: bubxyz.y }}>
                <Space>Speed:<InputNumber ref={speedRef} controls={false} onChange={handleSet} defaultValue={6}></InputNumber></Space>
                <Space>safe Distance:<InputNumber ref={disRef} controls={false} onChange={handleSet} defaultValue={115}></InputNumber></Space>
            </div>
            {/* 鼠标拖动前面的小三角进行旋转 */}
            <div className='triangle' ref={triangle} style={{ left: trixyz.x, top: trixyz.y }}></div>
        </div>
    )
}
