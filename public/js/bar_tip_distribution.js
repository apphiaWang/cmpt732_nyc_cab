function drawBarTip(canvas="canvas", color="yellow") {
  Promise.all([
    d3.csv(`/public/data/tip_dis_${color}.csv`)
  ]).then(function(files) {
          // const year = "2017";
    const years = ["2017", "2018", "2019", "2020", "2021"];
    const myChart = echarts.init(document.getElementById(canvas));
    myChart.clear()

    // option.visualMap.max = Math.max(...heatmapData[pickcol])
    option = {
        title: {
          text: `Tip range distribution of New York ${color.charAt(0).toUpperCase() + color.slice(1)} Cabs`,
        },
        toolbox: {
            show: true,
            feature: {
              magicType: { show: true, type: ['line', 'bar'] },
              saveAsImage: { show: true }
            }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
            data: years,
            orient: 'vertical',
            right: 10,
            top: 'center',
            selected: {}
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            name: "tip range in %",
            // prettier-ignore
            data: ['0', "0-5", "5-10", "10-15", "15-20", "20-25","25-30", "30-35", "35-40", ">40"]
          }
        ],
        yAxis: [
          {
            type: 'value', name: "number of trips",
            // logBase: Math.E,
          }
        ],
      };
    
    option.series = [];
    years.forEach(yr => {
        option.legend.selected[yr] = true
        option.series.push({
            name: yr,
            type: 'bar',
            data: files[0].filter(d => d.year == yr).map(d => parseInt(d["count"]))
        });
    });
    option && myChart.setOption(option);
  }).catch(function(err) {
      // handle error here
  })
  
}

/*
    const option = {
        title: {
            top: 30,
            left: 'center',
            text: 'Daily Max Tip From 2017 to 2021'
        },
        tooltip: {
            formatter: function (p) {
                const format = echarts.time.format(p.data[0], '{yyyy}-{MM}-{dd}', false);
                return format + '<br> max tip:' + p.data[1];
            }
        },
        visualMap: {
            min, max,
            // type: 'piecewise',
            orient: 'horizontal',
            left: 'center',
            top: 50,
            calculable: true,
            inRange: {
                color: ["#ffb56b", "#1f005c"]
            }
        },
        calendar: [
           {
                top: 120,
                left: 30,
                right: 30,
                cellSize: ['auto', 13],
                range: '2017',
                itemStyle: {
                borderWidth: 0.5
                },
            },
            {
                top: 220,
                left: 30,
                right: 30,
                cellSize: ['auto', 13],
                range: '2018',
                itemStyle: {
                borderWidth: 0.5
                },
                monthLabel: {show: false},
            },
            {
                top: 320,
                left: 30,
                right: 30,
                cellSize: ['auto', 13],
                range: '2019',
                itemStyle: {
                borderWidth: 0.5
                },
                monthLabel: {show: false},
            },

        ],
        series: [
            {
              type: 'heatmap',
              coordinateSystem: 'calendar',
              calendarIndex: 0,
              data: getData('2017')
            },
            {
              type: 'heatmap',
              coordinateSystem: 'calendar',
              calendarIndex: 1,
              data: getData('2018')
            },
            {
              type: 'heatmap',
              coordinateSystem: 'calendar',
              calendarIndex: 2,
              data: getData('2019')
            },
        ]
    };
*/