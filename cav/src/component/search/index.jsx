import React from 'react'
import './index.css'
import searchIcon from '../../assets/images/search.png'

export default function Index(props) {
    const { setMsg } = props;
    const myRef = React.useRef();
    const search = () => {
        React.axios('get', `http://106.13.18.48/softwares/search?name=${myRef.current.value}&isVague=true`, 70401)
        .then(
            res => setMsg(res)
        )
    }
    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            search();
            e.preventDefault();
        }
    }
    return (
        <div className='search'>
            <input className='search-input' type="text" ref={myRef} onKeyDown={(e) => handleKeyDown(e)} placeholder='搜索'/>
            <button className='search-btn' onClick={search}><img src={searchIcon} alt="搜索" /></button>
        </div>
    )
}
