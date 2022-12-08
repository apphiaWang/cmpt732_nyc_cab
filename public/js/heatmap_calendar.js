

function drawHeatmap(canvas="canvas", key="mean_percent") {
    const years = ["2017", "2018", "2019", "2020", "2021"];
    const filespath = years.map(y => {
        if (canvas=="heatmap-10")
            return `${window.myUrl}/public/data/time/date-${y}.csv`;
        return `${window.myUrl}/public/data/daily_yellow_${y}.csv`;
    });
    function getValue(obj, key="mean_percent") {
        if (key=="mean_percent" || key=="median_percent") {
            return  parseFloat(obj[key]).toFixed(2);
        } else
            return  parseInt(obj[key]);
    }    

    Promise.all(
        filespath.map(f => d3.csv(f))
      ).then(function(files) {
        const myChart = echarts.init(document.getElementById(canvas));
        myChart.clear()
        const option = {
            tooltip: {
            position: 'top',            
            formatter: function (p) {
                const format = echarts.time.format(p.data[0], '{yyyy}-{MM}-{dd}', false);
                return `${format} <br>${key}: ${p.data[1]}`;
            }
            },
            visualMap: {
                calculable: true,
                orient: 'vertical',
                left: '635',
                top: 'center',
            //   inRange: { color: ["#16BFFD", "#CB3066"] }
            },
            toolbox: {
                show: true,
                feature: {
                  saveAsImage: { show: true }
                }
            },
        };
        option.calendar =  years.map((year, i) => {
            const opt = {
                top: 55,
                left: 30 + 120 * i,
                cellSize: [15, 6],
                orient: 'vertical',
                range: year,
                monthLabel: {show: false},
            };
            if (i == 0) {
                opt.monthLabel.show = true;
            }
            return opt;
        })
        option.series = files.map((data, i) => {
            return {
                type: 'heatmap',
                coordinateSystem: 'calendar',
                calendarIndex: i,
                data: data.map(d => 
                    ([d["date"], getValue(d, key)])
                )
            };
        });
        const allvalues = files.flat().map(d => getValue(d, key));
        option.visualMap.min = Math.floor(Math.min(...allvalues));
        option.visualMap.max = Math.ceil(Math.max(...allvalues));
        option && myChart.setOption(option);
    }).catch(function(err) {
        alert("failed to load data "+err)
    })

}
