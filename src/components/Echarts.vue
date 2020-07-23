<template>
    <el-card>
        <el-row>
            <el-col :span="6">
                <div id="pie-charts" style="height:400px;width:400px">
                
                </div>
            </el-col>
            <el-col :span="8" :offset="1">
                <div id="pie1-charts" style="height:400px;width:500px">
                
                </div>
            </el-col>
            <el-col :span="6">
                <div class="echarts-wrap">
                    <div id="dev-echarts"></div>
                </div>
            </el-col>
        </el-row>

    </el-card>
</template>
	
<script>
let echarts = require('echarts')
export default {
    name: "echarts",
    data () {
      return {
        one: [],
        two: [],
        three: [],
        four: []
      }
    },
    mounted () {
      this.echartsG = this.$echarts.init(document.getElementById('dev-echarts'), 'dark')
      //this.loading()
      //this.initDrawDevEchart()
      this.drawPie()
      this.drawPie1()
    },
    computed: {
        initDrawDevEchart() {
            this.$axios.get("getEchartsUrl", {
                params: {
                  id: 1
                }
            }).then((response) => {
                this.one= response.data.one
                this.two= response.data.two
                this.three= response.data.three
                this.xAxis= response.data.xaxis

                this.echartsG.hideLoading()
                let optionG = {
                    backgroundColor: 'rgba(128, 128, 128, 0)',
                    title: {
                        text: 'loading效果演示',
                    },
                    dataZoom: {},
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['一', '二', '三']
                    },
                    xAxis: {
                        type: 'category',
                        // 调整柱状图位置
                        boundaryGap: true,
                        data: this.xAxis
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    series: [
                        {
                            name: '一',
                            type: 'bar',
                            data: this.one,
                        },
                        {
                            name: '二',
                            type: 'bar',
                            data: this.two
                        },
                        {
                            name: '三',
                            type: 'bar',
                            data: this.three
                        }
                    ]
                }
                this.echartsG.setOption(optionG)
            }).catch((err => {
                console.log(err)
            }))

        },
        loading: {
            get: function () {
                this.echartsG.setOption({
                    backgroundColor: 'rgba(128, 128, 128, 0)',
                    legend: {
                        data: ['一', '二', '三']
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: true,
                        data: []
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    series: [
                        {
                            name: '一',
                            type: 'bar',
                            data: []
                        },
                        {
                            name: '二',
                            type: 'bar',
                            data: []
                        },

                        {
                            name: '三',
                            type: 'bar',
                            data: []
                        }
                    ]

                })
                this.echartsG.showLoading({
                    text: '统计中，请稍候...'
                    , maskColor: 'rgba(3,3,8,0.5)',
                    textColor: '#fff600'
                })
            },
            set(e) {
            }
        }
    },
    methods: {
        drawPie1(){
            let myPieEcharts = echarts.init(document.getElementById('pie1-charts'))
            let option = {
                backgroundColor: '#005',
                title: {
                    text: 'Customized Pie',
                    left: 'center',
                    top: 20,
                    textStyle: {
                        color: '#ccc'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '50%'],
                        color: ["#1576d2", "#d14a82", "#26c1f2", "#a166ff", "#1271cc", "#272f67", "rgba(156, 43, 182, 1)"],
                        data: [
                            {value: 80, name: '华为'},
                            {value: 98, name: '苹果'},
                            {value: 10, name: '三星'},
                            {value: 80, name: '小米'},
                            {value: 35, name: '其他'}
                        ].sort(function (a, b) { return a.value - b.value; }),
                        label: {
                            "formatter":function formatterFunc(params) {
                                const values = params.data; // 内容
                                const formatter = [`{rect|}{name|${values.name}} ${values.value}%`, `${values.value}% {name|${values.name}}{rect|}`];
                                const midAngle = (values._startArc + values._endArc) / 2;
                                if (midAngle <= Math.PI) {
                                    return formatter[0];
                                } else {
                                    return formatter[1];
                                }
                            },
                            "rich": {
                                "name": {
                                    "color": '#fff',
                                    "borderColor": '#264884',
                                    "borderWidth": 1,
                                    "padding": [10, 15],
                                },
                                "rect":{
                                    "height": 12,
                                    "width": 8,
                                    "backgroundColor": "#264884"
                                }
                            }
                        },
                        labelLine: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        }
                    }
                ]
            }
            myPieEcharts.setOption(option)
        },
        drawPie(){
            let myPieEcharts = echarts.init(document.getElementById('pie-charts'))
            let option = {
                backgroundColor: '#005',
                title: {
                    text: 'Customized Pie',
                    left: 'center',
                    top: 20,
                    textStyle: {
                        color: '#ccc'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '50%'],
                        color: ["#1576d2", "#d14a82", "#26c1f2", "#a166ff", "#1271cc", "#272f67", "rgba(156, 43, 182, 1)"],
                        data: [
                            {value: 80, name: '华为'},
                            {value: 98, name: '苹果'},
                            {value: 10, name: '三星'},
                            {value: 80, name: '小米'},
                            {value: 35, name: '其他'}
                        ].sort(function (a, b) { return a.value - b.value; }),
                        label: {
                            // 这里定义了文本 百分比 是'value'样式的
                            formatter: '{name|{b}} {d}',//'{b}: {value|{d}}',
                            rich: {
                                // 这个'value'样式表示文字颜色为白色
                                name: {
                                color: '#fff',
                                }
                            }
                        },
                        labelLine: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        }
                    }
                ]
            }
            myPieEcharts.setOption(option)
        }
    }
}
</script>
