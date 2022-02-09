import {useEffect, useState} from "react";
import axios from "axios";
import Chart from 'chart.js/auto';

export function NewChart(){

    const [bitcoinData, setBitcoinData] = useState();
    const [chart, setChart] = useState(null);
    
    useEffect(() => {  
        async function fetchChart(){
            try{
                const result = await axios.get("http://api.coindesk.com/v1/bpi/historical/close.json");
                setBitcoinData(result.data.bpi);
                } catch(error){
                    console.error(error)
                } 
            };
            fetchChart()
            
        }, []);

    console.log(bitcoinData)
    
    
    useEffect(() => {
        async function createChart(){
            const bitcoinDates = Object.keys(bitcoinData);
            console.log(bitcoinDates)
            const bitcoinPrices = Object.values(bitcoinData);
            console.log(bitcoinPrices)

            
                const ctx = document.getElementById("myCanvas").getContext("2d");
                const newChart = new Chart(ctx, {
                type: 'line',
                data: {
                  labels: bitcoinDates,
                  datasets: [
                    {
                      label: 'BitCoin Chart',
                      backgroundColor: 'rgb(255, 99, 132)',
                      borderColor: 'rgb(255, 99, 132)',
                      data: bitcoinPrices,
                    }
                  ]
                }
              });
              setChart(newChart)
            }
            createChart()     
    }, []);


    return (
        <div>
             <p>{<canvas id="myCanvas" />}</p>
        </div>
    )    
}