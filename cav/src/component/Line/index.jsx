import React,{ useState, useRef, useEffect } from 'react'
import './index.css'

export default function Line({setLine}) {

    const [xyz, setXyz] = useState({ y: 500 });

    const lineRef = useRef(null);

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
                // if (lastLeft) {
                    
                // }
                document.onmousemove = null;
                document.onmouseup = null;
                // 还原鼠标手
                obj.style.cursor = "grab";
            }
        }
    }

    // 拖曳功能
    useEffect(() => {
        if (lineRef) drag(lineRef.current, setXyz);
    }, []);

    useEffect(()=>{
        setLine([{x: xyz.x, y: xyz.y}]);
    },[xyz.y])

  return (
    <div className='Line' ref={lineRef} style={{ top: xyz.y }}></div>
  )
}
