import React from 'react'
import { Outlet } from 'react-router-dom'
import './index.css'
import MySider from '../../component/sider'

export default function Thesis() {
  return (
    <div className='thesis'>
        <MySider 
          // thesisdsg='DSG' 
          // thesishsb='HSB' 
          // thesisrsrsp='RSRSP' 
          // thesismwms='MWMS-J&nbsp;&nbsp;&nbsp;MWMS-S'
          ThesisClassic='Classis'
          ThesisClusters='Clusters'
          ThesisEvent='Event'
        />
        <Outlet/>
    </div>
  )
}
