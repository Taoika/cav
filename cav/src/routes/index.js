import { Navigate } from "react-router-dom";
import Thesis from "../pages/thesis";
import AlExe from "../pages/alexe";
import Home from "../pages/home";
import MasApp from '../pages/masapp'
import MasClassic from "../component/masclassic";
import MasClusters from "../component/masclusters";
import MasEvent from "../component/masevent";
import CavCalssic from '../pages/cavClassic'
import CavClusters from '../pages/cavClusters'
import CavEvent from '../pages/cavEvent'
import ThesisClassic from "../component/ThesisClassic";
import ThesisClusters from "../component/ThesisClusters";
import ThesisEvent from '../component/ThesisEvent'

const routes=[
    {
        path:'/home',
        element:<Home/>,
    },
    {
        path:'/alexe',
        element:<AlExe/>,
    },
    {
        path:'/thesis',
        element:<Thesis/>,
        children:[
            {
                path:'ThesisClassic',
                element:<ThesisClassic/>,
            },
            {
                path:'ThesisClusters',
                element:<ThesisClusters/>,
            },
            {
                path:'ThesisEvent',
                element:<ThesisEvent/>,
            },
            {
                path:'',
                element:<Navigate to='ThesisClassic'/>
            }
        ]
    },
    {
        path:'/masapp',
        element:<MasApp/>,
        children:[
            {
                path:'masclassic',
                element:<MasClassic/>,
            },
            {
                path:'masclusters',
                element:<MasClusters/>,
            },
            {
                path:'masevent',
                element:<MasEvent/>,
            },
            {
                path:'',
                element:<Navigate to='masclassic'/>
            }
        ]
    },
    {
        path:'cavClassic',
        element:<CavCalssic/>,
    },
    {
        path:'cavClusters',
        element:<CavClusters/>,
    },
    {
        path:'cavEvent',
        element:<CavEvent/>,
    },
    {
        path:'',
        element:<Navigate to='home'/>
    }
];

export default routes;