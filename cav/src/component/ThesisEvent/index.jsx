import React from 'react'
import './index.css'

export default function ThesisEvent() {

  // 跳转
  function handleJump(e){
    e.preventDefault();
    // 在react中想要跳转并且打开新页面得这样
    const w=window.open('about:blank');
    w.location.href="http://qgailab.com/paper-static/cav/cav3.pdf"
  }

  // Research on lane switching strategy of vehicles between two platoons based on event triggering mechanism
  // Xie Guangqiang, Dai Jingang, Li Yang, Xu Haoran (School of Computers, Guangdong University of Technology, Guangzhou 510000, China)
  // Abstract: In order to solve the problem of lane changing in the dual platoon composed of CAV, this model proposed a dis- tributed cooperative lane changing strategy based on event triggering. In this strategy, this paper designed a second-order con- sensus control protocol for the dual platoon system. At the same time, in order to reduce the frequent update of CAV's con- troller, it also designed an event trigger based on combining measurement. It used the designed of Lyapunov function and the analysis of Zeno behavior to prove the stability and feasibility of the algorithm. The simulation results show that the designed control protocol can make the dual platoon system consensus, effectively reduce the update frequency of CAV controller and re- duce the system energy consumption. By comparison, it proves the effectiveness of the model, and the convergence of this tem is faster. sys-
  // Key words: multi-agent systems; distributed event-trigger mechanism; Lyapunov; distributed cooperative lane changing strategy

  return (
    <div className="ThesisEvent-container">
        <div className='ThesisEvent'>
        <div className="ThesisEvent-title">Research on lane switching strategy of vehicles between two platoons based on event triggering mechanism</div>
        <div className="ThesisEvent-author">by Xie Guangqiang, Dai Jingang, Li Yang, Xu Haoran</div>
        <div className="ThesisEvent-original"><a href='#' onClick={(Event)=>{handleJump(Event)}}>Click to see original&gt;&gt;</a></div>
        <div className="ThesisEvent-abstract-title">Abstract</div>
        <div className="ThesisEvent-abstract">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In order to solve the problem of lane changing in the dual platoon composed of CAV, this model proposed a dis- tributed cooperative lane changing strategy based on event triggering. In this strategy, this paper designed a second-order con- sensus control protocol for the dual platoon system. At the same time, in order to reduce the frequent update of CAV's con- troller, it also designed an event trigger based on combining measurement. It used the designed of Lyapunov function and the analysis of Zeno behavior to prove the stability and feasibility of the algorithm. The simulation results show that the designed control protocol can make the dual platoon system consensus, effectively reduce the update frequency of CAV controller and re- duce the system energy consumption. By comparison, it proves the effectiveness of the model, and the convergence of this tem is faster. system is faster</div>
        <div className="ThesisEvent-keyWord-title">Keyword</div>
        <div className="ThesisEvent-keyWord">Multi-agent systems; Distributed event-trigger mechanism; Lyapunov; Distributed cooperative lane changing strategy</div>
        <div className="ThesisEvent-publication-title">Article</div>
        <div className="ThesisEvent-publication">Application Research of Computers</div>
        <div className="ThesisEvent-date-title">Data</div>
        <div className="ThesisEvent-date">Oct. 2021</div>
      </div>
    </div>

  )
}
