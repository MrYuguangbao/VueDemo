<template>
  <div>
      <el-row>
          <el-col :span="7">
            <p id=''>后推时间：{{beforeTime}}</p>
            <p id=''>当前时间：{{currentTime}}</p>
            <p id=''>前进时间：{{afterTime}}</p>
          </el-col>
          <el-col :span="10">
            <div id='box'>
              <div
                id='con1'
                ref='con1'
                :class='{anim:animate==true}'
                @mouseenter='mEnter'
                @mouseleave='mLeave'
              >
                <p v-for = '(item,index) in sortedItems' v-bind:key = 'index'>
                  测试数据--attr1:{{item.name}},attr2:{{item.date}},attr3:{{item.age}}
                </p>
              </div>
            </div>
        </el-col>
        <el-col :span="5">
            <el-select  placeholder="请选择" v-model="clustername" @change="selectCluster">
              <el-option
                v-for="item in clusters"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top:50px">
            <div id="lineArea" :style="{width: '1000px', height: '500px'}"></div>
      </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      beforeTime: '',
      currentTime: '',
      afterTime: '',
      animate: false,
      sortedItems: [],
      items: [
        // 消息列表对应的数组
        { name: '数据源1', date: '2020-06-29 11:10:23', age: 17 },
        { name: '数据源2', date: '2020-06-29 11:10:30', age: 14 },
        { name: '数据源3', date: '2020-06-29 11:10:14', age: 20 },
        { name: '数据源3', date: '2020-06-29 11:08:04', age: 18 },
        { name: '数据源3', date: '2020-06-29 11:09:04', age: 16 },
        { name: '数据源3', date: '2020-06-29 11:10:24', age: 19 }
      ],
      clustername: 'c',
      clusters: [
        {value: 'a', name: '第一个选项'},
        {value: 'b', name: '第二个选项'},
        {value: 'c', name: '第三个选项'}
      ]
    }
  },
  created () {
    this.currenttime()
    this.sorted()
    this.drawEcharts()
  },
  // computed: {
  //   sortedItems: function () {
  //     let that = this
  //     let result = that.items
  //     result.sort(function (arg1, arg2) {
  //       let compare1 = arg1['date']
  //       let compare2 = arg2['date']
  //       return compare1 > compare2 ? -1 : compare1 < compare2 ? 1 : 0
  //     })
  //     return result
  //   }
  // },
  mounted () {
    // this.timer1 = setInterval(this.scroll, 2000)
  },
  methods: {
    currenttime () {
      // setInterval(this.getTime, 1000)
      let yy = new Date().getFullYear()
      let mm = new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)
      let dd = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()
      let hh = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()
      let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
      let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()
      this.currentTime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss
      this.beforeTime = this.getBeforeOrAfterTime(this.currentTime, '-', 30 * 60 * 1000)
      this.afterTime = this.getBeforeOrAfterTime(this.currentTime, '+', 30 * 60 * 1000)
      // console.log('5天前：' + this.getBeforeOrAfterTime(this.currentTime, '-', 5 * 24 * 60 * 60 * 1000))
    },
    /**
     * param 当前时间
     * op 表示之前或之后的时间
     * duration 表示范围
     */
    getBeforeOrAfterTime (param, op, duration) {
      let result = (param + '').split(' ')
      let e = result[0]
      let year = e.substring(0, 4)
      let month = e.substring(5, 7)
      let day = e.substring(8, 10)

      let t = result[1]
      let hour = t.substring(0, 2)
      let minute = t.substring(3, 5)
      let second = t.substring(6)
      let now = new Date(year, month - 1, day, hour, minute, second)
      let temp
      if (op === '-') {
        temp = now.getTime() - duration
      } else {
        temp = now.getTime() + duration
      }
      let beforeResult = new Date(temp)
      year = beforeResult.getFullYear()
      month = beforeResult.getMonth() + 1 < 10 ? '0' + (beforeResult.getMonth() + 1) : (beforeResult.getMonth() + 1)
      day = beforeResult.getDate() < 10 ? '0' + beforeResult.getDate() : beforeResult.getDate()
      hour = beforeResult.getHours() < 10 ? '0' + beforeResult.getHours() : beforeResult.getHours()
      minute = beforeResult.getMinutes() < 10 ? '0' + beforeResult.getMinutes() : beforeResult.getMinutes()
      second = beforeResult.getSeconds() < 10 ? '0' + beforeResult.getSeconds() : beforeResult.getSeconds()
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
    },
    drawEcharts () {
      let myChart = this.$echarts.init(document.getElementById('lineArea'))
      myChart.setOption({
              title: {
                  text: '折线图堆叠'
              },
              tooltip: {
                  trigger: 'axis'
              },
              legend: {
                  data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
              },
              grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
              },
              toolbox: {
                  feature: {
                      saveAsImage: {}
                  }
              },
              xAxis: {
                  type: 'category',
                  boundaryGap: false,
                  data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
              },
              yAxis: {
                  type: 'value'
              },
              series: [
                  {
                      name: '邮件营销',
                      type: 'line',
                      stack: '总量',
                      data: [120, 132, 101, 134, 90, 230, 210]
                  },
                  {
                      name: '联盟广告',
                      type: 'line',
                      stack: '总量',
                      data: [220, 182, 191, 234, 290, 330, 310]
                  },
                  {
                      name: '视频广告',
                      type: 'line',
                      stack: '总量',
                      data: [150, 232, 201, 154, 190, 330, 410]
                  },
                  {
                      name: '直接访问',
                      type: 'line',
                      stack: '总量',
                      data: [320, 332, 301, 334, 390, 330, 320]
                  },
                  {
                      name: '搜索引擎',
                      type: 'line',
                      stack: '总量',
                      data: [820, 932, 901, 934, 1290, 1330, 1320]
                  }
              ]
      })
    },
    sorted () {
      let that = this
      let result = that.items
      result.sort(function (arg1, arg2) {
        let compare1 = arg1['date']
        let compare2 = arg2['date']
        return compare1 > compare2 ? -1 : compare1 < compare2 ? 1 : 0
      })
      this.sortedItems = result
    },
    scroll () {
      console.log('---------------------')
      // if (this.items.length > 13) {
        let con1 = this.$refs.con1
        con1.style.marginTop = '-30px'
        this.animate = !this.animate
        var that = this // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
        setTimeout(function () {
            that.sortedItems.push(that.sortedItems[0])
            that.sortedItems.shift()
            con1.style.marginTop = '0px'
            that.animate = !that.animate // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
        }, 1000)
      // }
    },
    mEnter () {
      clearInterval(this.timer1)
    },
    mLeave () {
      this.timer1 = setInterval(this.scroll, 2000)
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
* {
  margin: 0;
  padding: 0;
}
#box {
  width: 600px;
  height: 155px;
  line-height: 30px;
  overflow: hidden;
  padding-left: 30px;
  border: 1px solid black;
  transition: all 0.5s;
}
.anim {
  transition: all 0.5s;
}
#con1 li {
  list-style: none;
  line-height: 30px;
  height: 30px;
}
</style>
