import React from 'react'
import { Outlet } from 'react-router-dom'
import './index.css'
import MySider from '../../component/sider/index'

export default function MasApp() {
  return (
    <div className="masApp">
        <MySider masclassic='classic CAV model' masclusters='Multi-vehicle Clusters' masevent='Event Triggering' />
        <Outlet/>
    </div>
  )
}
