<template>
  <div class="dashboard">
    <Row :gutter="20">
      <Col span="12">
        <Card>
          <div id="lineChart" ref="lineChart"></div>
        </Card>
      </Col>
      <Col span="12">
        <Card>
          <div id="pieChart" ref="pieChart"></div>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref, computed, nextTick } from "vue";
import { useEcharts, useEffect } from "@/hook/index.js"

const [
  lineChart,
  linedatalist,
  setlineDatalist,
  mylineChart,
  lineoption,
  setlineOption,
  initlineChart,
  clearlineChart,
  resizelineChart,
] = useEcharts();

const fontSize = (res, dom) => {
  let clientWidth = dom.value.clientWidth || window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      if (!clientWidth) return;
      let fontSize = 100 * (clientWidth / 1920);
      return res * fontSize;
}

setlineDatalist([
  {
    dayNum: 1,
    city: "1月"
  },
  {
    dayNum: 2,
    city: "2月"
  },
  {
    dayNum: 3,
    city: "3月"
  },
  {
    dayNum: 4,
    city: "4月"
  },
  {
    dayNum: 5,
    city: "5月"
  },
  {
    dayNum: 6,
    city: "6月"
  },
  {
    dayNum: 7,
    city: "7月"
  },
  {
    dayNum: 6,
    city: "8月"
  },
  {
    dayNum: 1,
    city: "9月"
  },
  {
    dayNum: 6,
    city: "10月"
  },
  {
    dayNum: 10,
    city: "11月"
  },
  {
    dayNum: 5,
    city: "12月"
  },
])

onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
    setlineOption({
    title: {
      text: '2022销售额',
      left: 'center',
      top: '10%',
      textStyle: {
        fontSize: fontSize(0.5, lineChart)
      }
    },
    "textStyle": {
      "color": "#515a6e",
      "fontSize": fontSize(0.25, lineChart)
    },
    "color": ["#63caff", "#49beff", "#03387a", "#03387a", "#03387a", "#6c93ee", "#a9abff", "#f7a23f", "#27bae7", "#ff6d9d", "#cb79ff", "#f95b5a", "#ccaf27", "#38b99c", "#93d0ff", "#bd74e0", "#fd77da", "#dea700"],
    "grid": {
      "containLabel": true,
      "left": '4%',
      "right": '4%',
      "bottom": '5%',
      "top": '30%'
    },
    "toolbox": {
      show: false,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ["line", "bar", "stack", "tiled"] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    "xAxis": {
      "nameTextStyle": {
        "color": "#515a6e",
        "padding": [0, 0, -10, 0],
        "fontSize": fontSize(0.35, lineChart)
      },
      "axisLabel": {
        "color": "#515a6e",
        "fontSize": fontSize(0.35, lineChart),
        "fontWeight": 'bold',
        "interval": 0,
        "formatter": (value) => {
          return value.split('').join('\n')
        }
      },
      "axisTick": {
        "lineStyle": {
          "color": "#384267",
          "width": 1
        },
        "show": true
      },
      "splitLine": {
        "show": false
      },
      "data": linedatalist.value.map(x => {
        return x.city
      }),
      "type": "category"
    },
    "yAxis": {
      "type": 'value',
      "nameTextStyle": {
        "color": "#515a6e",
        "padding": [0, 0, -10, 0],
        "fontSize": fontSize(0.25, lineChart)
      },
      "axisLabel": {
        "color": "#515a6e",
        "fontSize": fontSize(0.25, lineChart)
      },
      "axisTick": {
        "lineStyle": {
          "color": "#384267",
          "width": 1
        },
        "show": true
      },
    },
    "series": [
      {
      "data": linedatalist.value.map(x => {
        return x.dayNum
      }),
      "type": "bar",
      "barMaxWidth": "auto",
      "barWidth": fontSize(0.35, lineChart),
      "itemStyle": {
        "color": {
          "x": 0,
          "y": 0,
          "x2": 0,
          "y2": 1,
          "type": "linear",
          "global": false,
          "colorStops": [{
              "offset": 0,
              "color": "#0b9eff"
          }, {
              "offset": 1,
              "color": "#63caff"
          }]
        }
      },
      "label": {
        "show": true,
        "position": "top",
        "distance": 10,
      }
    }, 
    {
      "data": linedatalist.value.map(x => {
        return x.dayNum
      }),
      "type": "pictorialBar",
      "barMaxWidth": fontSize(0.35, lineChart),
      "symbolPosition": "end",
      "symbol": "diamond",
      "symbolOffset": [0, "-50%"],
      "symbolSize": [fontSize(0.35, lineChart), 12],
      "zlevel": 2
    }
    ],
    "tooltip": {
      "textStyle": {
        "fontSize": fontSize(0.25, lineChart)
      }
    }
  })
  }, 2000)
  
  })
})

useEffect(initlineChart, [lineoption])


const [
  pieChart,
  piedatalist,
  setpieDatalist,
  mypieChart,
  pieoption,
  setpieOption,
  initpieChart,
  clearpieChart,
  resizepieChart,
] = useEcharts();

setpieDatalist([
  { value: 1048, name: 'Search Engine' },
  { value: 735, name: 'Direct' },
  { value: 580, name: 'Email' },
  { value: 484, name: 'Union Ads' },
  { value: 300, name: 'Video Ads' }
])

onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
    setpieOption({
      title: {
        text: 'Referer of a Website',
        subtext: 'Fake Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: piedatalist.value,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })
  }, 2000)
  })
})

useEffect(initpieChart, [pieoption])

</script>

<style scoped>
.dashboard {
  width: 100%;
  margin-top: 10px;
}

#lineChart{
  width: 100%;
  height: 400px;
}

#pieChart{
  width: 100%;
  height: 400px;
}
</style>