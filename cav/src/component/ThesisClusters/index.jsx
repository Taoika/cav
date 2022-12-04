import React from 'react'
import './index.css'

export default function ThesisClusters() {

  // 跳转
  function handleJump(e){
    e.preventDefault();
    // 在react中想要跳转并且打开新页面得这样
    const w=window.open('about:blank');
    w.location.href="http://qgailab.com/paper-static/cav/cav2.pdf"
  }

//   Multi-platoon consensus protocol based on multi-vehicle clusters
// Xie Guangqiang, Wu Yanbin, Li Yang, Xu Haoran (School of Computers, Guangdong University of Technology, Guangzhou 510000, China)
// Abstract: Aiming at the problem of vehicle traffic under reducing lanes, this paper proposed a multi-formation horizontal and longitudinal consistency protocol based on multi-vehicle clusters. It not only guaranteed the consistency of the, state of the leader and the follower in the cluster, but also ensured the consistency of the state of the leader among the clusters, so that all vehicles in the cluster could pass lanes to reduce intersections. It used Routh's stability theory and Lyapunov method to ana- lyze the consistency and stability of the control protocol. The simulation experiment results verify that the proposed horizontal and longitudinal protocols can make the multi-vehicle clusters converge uniformly, and can increase road throughput and re- duce the total travel time while meeting the different vehicle lane change ratio.
// Key words: lane reduction; connected and automated vehicles; multi-agent systems; leader-follower consensus; distributed platoon

  return (
    <div className="ThesisClusters-container">
        <div className='ThesisClusters'>
        <div className="ThesisClusters-title">Multi-platoon consensus protocol based on multi-vehicle clusters</div>
        <div className="ThesisClusters-author">by Xie Guangqiang, Wu Yanbin, Li Yang, Xu Haoran</div>
        <div className="ThesisClusters-original"><a href='#' onClick={(Event)=>{handleJump(Event)}}>Click to see original&gt;&gt;</a></div>
        <div className="ThesisClusters-abstract-title">Abstract</div>
        <div className="ThesisClusters-abstract">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Aiming at the problem of vehicle traffic under reducing lanes, this paper proposed a multi-formation horizontal and longitudinal consistency protocol based on multi-vehicle clusters. It not only guaranteed the consistency of the, state of the leader and the follower in the cluster, but also ensured the consistency of the state of the leader among the clusters, so that all vehicles in the cluster could pass lanes to reduce intersections. It used Routh's stability theory and Lyapunov method to ana- lyze the consistency and stability of the control protocol. The simulation experiment results verify that the proposed horizontal and longitudinal protocols can make the multi-vehicle clusters converge uniformly, and can increase road throughput and re- duce the total travel time while meeting the different vehicle lane change ratio.</div>
        <div className="ThesisClusters-keyWord-title">Keyword</div>
        <div className="ThesisClusters-keyWord">Lane reduction; Connected and automated vehicles; Multi-agent systems; Leader-follower consensus; Distributed platoon</div>
        <div className="ThesisClusters-publication-title">Article</div>
        <div className="ThesisClusters-publication">Application Research of Computers</div>
        <div className="ThesisClusters-date-title">Data</div>
        <div className="ThesisClusters-date">Oct. 2021</div>
      </div>
    </div>

  )
}
