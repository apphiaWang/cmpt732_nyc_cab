const distance_data = `tip_range_index,min,q1,mean,median,q3,max
0,0.0,0.0707964601769912,0.15033663987906415,0.12313432835820898,0.20212765957446813,0.9854904236796286
1,0.0,0.0640394088669951,0.14885114101234967,0.13388668350775884,0.19454770755886,0.9919527896995708
2,0.0,0.07766990291262142,0.17378979816810614,0.14825762289981334,0.25781250000000006,0.9816849816849816
3,-1.141067505636904E-16,0.09090909090909098,0.1831099651082932,0.15254237288135597,0.24812030075187974,0.974964234620887
4,-0.24750499001996012,0.09090909090909095,0.17652959653567635,0.15094339622641506,0.24528301886792464,0.9864351600651112
5,-1.8839791482436704E-16,0.09090909090909098,0.17808089659090984,0.1463414634146342,0.24836601307189538,0.9733077087337177
6,-2.1795789440493876E-16,0.09638554216867477,0.18205044523972563,0.15337023770758712,0.24812030075187963,0.968186638388123
7,-2.140188963132832E-16,0.09090909090909098,0.18099130967595822,0.15094339622641506,0.244060475161987,0.9230177059276367
8,0.0,0.10256410256410264,0.18534747356220446,0.15094339622641506,0.2452830188679245,0.9133663366336634
9,0.0,0.11016949152542378,0.19934482546506135,0.16666666666666663,0.2708333333333333,0.9429223744292238
`;
// const distance_data = `tip_range_index,min,max,q1,mean,median,q3
// 0,0.0,0.9672346002621232,0.15865384615384617,0.24671310022398493,0.2417061611374408,0.33593750000000006
// 5,0.0,0.6529284164859002,0.14191419141914194,0.20916486256221187,0.1826923076923077,0.2721518987341772
// 10,0.0,0.7665369649805447,0.20245398773006137,0.2604110803210177,0.2638036809815951,0.32038834951456313
// 15,0.0,0.6774193548387096,0.20886075949367092,0.28632400874161645,0.27536231884057977,0.3689320388349515
// 20,0.0,0.726890756302521,0.20765027322404375,0.27572384906287356,0.2747559274755928,0.33673469387755106
// 25,-1.1278456123176195E-16,0.6323529411764707,0.21686746987951813,0.2898742936069327,0.29203539823008856,0.3689320388349514
// 30,1.2802571815497298E-16,0.6336996336996338,0.21348314606741575,0.2857498783593599,0.281045751633987,0.35483870967741943
// 35,0.0013934045517881234,0.8392282958199357,0.20886075949367083,0.2840167227164307,0.281045751633987,0.37499999999999994
// 40,0.002991026919242386,0.589041095890411,0.23913043478260873,0.296187109413675,0.29687500000000006,0.3975903614457832
// 100,0.0023023791250960197,0.6323529411764707,0.22619047619047622,0.30984398491953175,0.32038834951456313,0.3975903614457832
// `

function drawLineTip(canvas="canvas",) {
  const legends = ["q1", "median", "mean", "q3"];
    const myChart = echarts.init(document.getElementById(canvas));
    myChart.clear()
    const data = (feature) => d3.csvParse(distance_data).map(d => 100*parseFloat(d[feature]));
    // option.visualMap.max = Math.max(...heatmapData[pickcol])
    option = {
        title: {
          text: `Trip Distances of New York Cabs over Tip Ranges`,
        },
        toolbox: {
            show: true,
            feature: {
              saveAsImage: { show: true }
            }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
            legends,
            orient: 'vertical',
            right: 10,
            top: 'center',
            selected: {}
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            name: "tip range",
            // prettier-ignore
            data: ['0', "0-5", "5-10", "10-15", "15-20", "20-25","25-30", "30-35", "35-40", ">40"]
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: "other amount % "
            // logBase: Math.E,
          }
        ],
      };
    
    option.series = [];
    legends.map(feature => {
        option.series.push({
            name: feature,
            type: 'line',
            data: data(feature)
        });
    })
    option && myChart.setOption(option);
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