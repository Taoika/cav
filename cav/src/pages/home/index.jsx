import React from 'react'
import './index.css'
import logo from '../../assets/images/logo.png'

export default function Home() {
  return (
    <div className="home-container">
      <div className="home">
        <div className="home-title"><img src={logo} alt="CAV System"/></div>
        <div className="home-content">
          <p><strong>Abstract</strong> - In recent years, with the development of artificial intelligence technology, vehicle self-driving technology has also been popularised and applied. However, the current vehicle self-driving technology has certain limitations and cannot solve problems such as road congestion that need to deal with complex road conditions. The current self-driving technology cannot effectively exchange traffic information between vehicles due to the lack of effective communication between vehicles in response to road congestion, and thus the delays caused by congestion cannot be solved.</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In order to solve this kind of problem, we need to use intelligent networked vehicle technology. Intelligent networked vehicle (CAV) is a key component of the next generation of intelligent transportation system. It will establish links driving vehicles with other driving vehicles, servers, etc. to improve the overall intelligent level of vehicles and deal with various complex situations. Moreover, it will reduce labour costs and improve transportation efficiency.</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In order to better popularise science intelligent networked vehicles (CAV), we have developed and implemented this visualisation platform for intelligent networked vehicle algorithms.</p>
        </div>
      </div>
    </div>

  )
}
