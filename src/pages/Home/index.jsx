import {useEffect, useRef} from "react";
import * as echarts from "echarts";
import BarChart from "@/components/BarChart.jsx";


const Home = () => {

    return (
        <div>
            <div>
                <BarChart title={'三大框架满意度'}/>
                <BarChart title={'三大框架使用度'}/>
            </div>
        </div>
    )
}
export default Home