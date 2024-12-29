// 2hr

import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Button } from "@/components/ui/button"; // Ensure this path is correct for your project structure
// import { useDispatch, useSelector } from "react-redux";
// import { fetchmarketchart } from "@/State/Coin/Action";

const timeseries = [
    {
        keyword: "Digital_Currency_Daily",
        key: "Time Series (Daily)",
        label: "1 Day",
        value: 1,
    },
    {
        keyword: "Digital_Currency_Weekly",
        key: "Weekly Time Series",
        label: "1 Week",
        value: 7,
    },
    {
        keyword: "Digital_Currency_Monthly",
        key: "Monthly Time Series",
        label: "1 Month",
        value: 30,
    },

    {
        keyword: "Digital_Currency_Yearly",
        key: "Yearly Time Series",
        label: "1 year",
        value: 365,
    }
];

const StockChart = () => {
    // const dispatch=useDispatch()

    // const {coin}=useSelector(store=>store)


    const [activeLabel, setActiveLabel] = useState("1 Day");

    const series = [
        {
          data: [
            100, 350, 420, 380, 500, 600, 450, 3200, 300, 1500,
            2200, 1800, 2900, 3100, 4200, 5100, 4300, 3900, 6200, 7100,
            5400, 3200, 6500, 4800, 7200, 8500, 9200, 8800, 7900, 5600,
            6700, 7500, 8900, 9400, 6600, 5800, 7600, 9800, 8300, 9000,
            9500, 10200, 10700, 11300, 11800, 12400, 13100, 13700, 14300, 14900,
            100, 350, 420, 380, 500, 600, 450, 3200, 300, 1500,
            2200, 1800, 2900, 3100, 4200, 5100, 4300, 3900, 6200, 7100,
            5400, 3200, 6500, 4800, 7200, 8500, 9200, 8800, 7900, 5600,
            6700, 7500, 8900, 9400, 6600, 5800, 7600, 9800, 8300, 9000,
            9500, 10200, 10700, 11300, 11800, 12400, 13100, 13700, 14300, 14900,
            100, 350, 420, 380, 500, 600, 450, 3200, 300, 1500,
            2200, 1800, 2900, 3100, 4200, 5100, 4300, 3900, 6200, 7100,
            5400, 3200, 6500, 4800, 7200, 8500, 9200, 8800, 7900, 5600,
            6700, 7500, 8900, 9400, 6600, 5800, 7600, 9800, 8300, 9000,
            9500, 10200, 10700, 11300, 11800, 12400, 13100, 13700, 14300, 14900,
            100, 350, 420, 380, 500, 600, 450, 3200, 300, 1500,
            2200, 1800, 2900, 3100, 4200, 5100, 4300, 3900, 6200, 7100,
            5400, 3200, 6500, 4800, 7200, 8500, 9200, 8800, 7900, 5600,
            6700, 7500, 8900, 9400, 6600, 5800, 7600, 9800, 8300, 9000,
            9500, 10200, 10700, 11300, 11800, 12400, 13100, 13700, 14300, 14900,
            100, 350, 420, 380, 500, 600, 450, 3200, 300, 1500,
            2200, 1800, 2900, 3100, 4200, 5100, 4300, 3900, 6200, 7100,
            5400, 3200, 6500, 4800, 7200, 8500, 9200, 8800, 7900, 5600,
            6700, 7500, 8900, 9400, 6600, 5800, 7600, 9800, 8300, 9000,
            9500, 10200, 10700, 11300, 11800, 12400, 13100, 13700, 14300, 14900

          ],
        },
      ];
      
    const options = {
        chart: {
            id: "area-datetime",
            type: "area",
            height: 450,
            zoom: {
                autoScaleYaxis: true,
            },
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            type: "datetime",
            tickAmount: 6,
        },
        markers: {
            colors: ["#758AA2"],
            strokeColor: "#fff",
            size: 0,
            strokeWidth: 1,
            style: "hollow",
        },
        tooltip: {
            theme: "dark",
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100],
            },
        },
        grid: {
            borderColor: "#4753SE",
            strokeDashArray: 4,
            show: true,
        },
    };

    const handleActiveLabel = (value) => {
        setActiveLabel(value);
        // Logic to update the chart data based on the selected time series
    };

    // useEffect(()=>{
    //     dispatch(fetchmarketchart({coinId,days:activeLabel.value,jwt:localStorage.getItem("jwt")}))
    // },[dispatch,coinId,activeLabel])

    return (
        <div>
            <div className="space-x-3">
                {timeseries.map((item) => (
                    <Button
                        key={item.label}
                        variant={activeLabel.label == item.label ? "default" : "outline"}
                        onClick={() => handleActiveLabel(item)}
                    >
                        {item.label}
                    </Button>
                ))}
            </div>
            <div id="chart-timelines">
                <ReactApexChart options={options} series={series} height={450} type="area" />
            </div>
        </div>
    );
};

export default StockChart;
