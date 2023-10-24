import {useEffect, useRef} from "react";
import * as echarts from "echarts";

const BarChart = ({title}) => {
    const chartRef = useRef(null)
    useEffect(() => {
        const chartDom = chartRef.current
        const myChart = echarts.init(chartDom);
        let option;

        option = {
            title:{
                text:title,
                show:true
            },
            xAxis: {
                type: 'category',
                data: ['vue','angular','react']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [10,40,70],
                    type: 'bar'
                }
            ]
        };

        option && myChart.setOption(option);

    }, []);
    return (
        <div style={{width:'500px',height:'400px'}} ref={chartRef}>

        </div>
    )
}
export default BarChart