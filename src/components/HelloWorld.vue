<template>
  <div>
    <el-card>
      <el-row>
        <el-col :span="4">
            <div id = "databinding">
                <el-button v-on:click = "show = !show">点我</el-button>
                <transition name = "fade">
                    <p v-show = "show" v-bind:style = "styleobj">动画实例</p>
                </transition>
            </div>
            <div id = "databinding2">
              <el-button v-on:click = "show = !show">点我</el-button>
              <transition name="bounce">
                  <p v-if="show">菜鸟教程 -- 学的不仅是技术，更是梦想！！！</p>
              </transition>
            </div>
            <div>
              {{info}}
            </div>
        </el-col>
        <el-col :span="4">
          千米：<el-input v-model="kiometers" />
          米：<el-input v-model="meters" />
        </el-col>
        <el-col :span="4">
          <p>{{ message }}</p>
          <el-button type="success" v-on:click="reverseMessage">反转字符串</el-button>
        </el-col>
        <el-col :span="4">
           {{ message | capitalize }}
        </el-col>
        <el-col :span="4">
          <p>原始字符串: {{ message }}</p>
          <p>计算后反转字符串: {{ reversedMessage }}</p>
        </el-col>
      </el-row>
    </el-card>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-select v-model="value" filterable clearable  placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-button :plain="true" @click="open">打开消息提示</el-button>
        <el-button :plain="true" @click="openVn">VNode</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top:20px">
        <el-table
    :data="tableData"
    style="width: 100%"
    height="250">
    <el-table-column
      fixed
      prop="date"
      sortable
      label="日期"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="province"
      label="省份"
      width="120">
    </el-table-column>
    <el-table-column
      prop="city"
      label="市区"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="300">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="邮编"
      width="120">
    </el-table-column>
    <el-table-column label="操作">
      <div>
        <el-button icon="el-icon-search" circle></el-button>
        <el-button type="primary" icon="el-icon-edit" circle></el-button>
        <el-button type="success" icon="el-icon-check" circle></el-button>
        <el-button type="info" icon="el-icon-message" circle></el-button>
        <el-button type="warning" icon="el-icon-star-off" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" circle></el-button>
      </div>
    </el-table-column>
  </el-table>
    </el-row>
      <el-row>
        <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
              <el-tab-pane label="一般配置" name="first" :key="'first'">
                <p v-if="isFirst">一般配置tab页</p>
              </el-tab-pane>
              <el-tab-pane label="角色配置" name="second" :key="'second'">
                <p v-if="isSecond">角色配置tab页</p>
              </el-tab-pane>
              <el-tab-pane label="簇配置" name="three" :key="'three'">
                <p v-if="isThree">簇配置tab页</p>
              </el-tab-pane>
        </el-tabs>
      </el-row >
      <el-row style="margin-top:50px">
          <el-col :span="6">
              <el-form>
                  <el-form-item>
                    <el-date-picker
                        v-model="ruleForm"
                          type="daterange"
                          range-separator="-"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          value-format="yyyy-MM-dd"
                          format="yyyy-MM-dd"
                          :picker-options="pickerOptions1">
                    </el-date-picker>

                  </el-form-item>

              </el-form>
          </el-col>
          
          <el-col :span="4" style="display:none">
            <p id=''>后推时间：{{beforeTime}}</p>
            <p id=''>当前时间：{{currentTime}}</p>
            <p id=''>前进时间：{{afterTime}}</p>
          </el-col>
          <el-col :span="6">
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
        <!-- <el-col :span="5">
            <el-select  placeholder="请选择" v-model="clustername" @change="selectCluster">
              <el-option
                v-for="item in clusters"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
        </el-col> -->
      </el-row>
      <el-row>
        <el-col :span="9">
            <el-form>
                <el-form-item label="选择时间">
                    <el-date-picker
                      v-model="startDate"
                      type="date"
                      
                      placeholder="起始日期"
                      :picker-options="pickerOptionsStart" @change="changeEnd"></el-date-picker>
                    --
                    <el-date-picker
                      v-model="endDate"
                      type="date"
                      
                      placeholder="结束日期"
                      :picker-options="pickerOptionsEnd" @change="changeStart"></el-date-picker>
                </el-form-item>
            </el-form>
          </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top:50px">
          <el-col :span="15">
            <div id="lineArea" :style="{width: '1000px', height: '500px'}"></div>
          </el-col>
      </el-row>
      
  </div>
</template>

<script>
export default {
  data () {
    return {
      info:null,
      show:true,
      styleobj:{
        fontSize:'30px',
        color:'red'
      },
      kiometers:0,
      meters:0,
      message:"elasticsearch",
      jsonArray: {
        'node2': 'master',
        '*': 'master',
        'node1': 'master',
        'node3': 'master'
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }],
      activeName: 'first',
      isFirst: true,
      isSecond: false,
      isThree: false,
      pickerOptionsStart: {},
      pickerOptionsEnd: {},
      startDate: '',
      endDate: '',
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
  filters : {
    capitalize (val){
      if(!val) return ''
      val = val.toString()
      return val.toUpperCase()
    }
  },
  created () {
    this.currenttime()
    this.sorted()
    this.sortJson(this.jsonArray)
  },
  computed: {
    reversedMessage(){
      return this.message.split('').reverse().join('')
    }
    /* sortedItems: function () {
      let that = this
      let result = that.items
      result.sort(function (arg1, arg2) {
        let compare1 = arg1['date']
        let compare2 = arg2['date']
        return compare1 > compare2 ? -1 : compare1 < compare2 ? 1 : 0
      })
      return result
    } */
  },
  mounted () {
    this.drawEcharts()
    // this.timer1 = setInterval(this.scroll, 2000)
    axios
      .get('https://www.runoob.com/try/ajax/json_demo.json')
      .then(response => (this.info = response))
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });
  },
  /* watch(){
    kiometers(val){
      this.kiometers = val
      this.meters = this.kiometers*1000
    },
    meters(val){
      this.kiometers = val/1000
      this.meters = val
    }
  }, */
  methods: {
    reverseMessage () {
      let that = this
      this.message = that.message.split('').reverse().join('')
    },
    sortJson (e) {
      let resObj = {}
      let obj = Object.keys(e).sort()
      for(let i=0;i<obj.length;i++){
        let key = obj[i]
        resObj[key] = e[key]
      }
      console.log("resObj:"+JSON.stringify(resObj,null,2))
      return resObj
    },
    open () {
      this.$message.info('这是一条消息提示')
    },
    openVn () {
      const h = this.$createElement
      this.$message({
        message: h('p', null, [
          h('span', null, '内容可以是 '),
          h('i', { style: 'color: teal' }, 'VNode')
        ])
      })
    },
    handleClick (tab) {
      if (tab.name === 'first') {
        this.isFirst = true
        this.isSecond = false
        this.isThree = false
      } else if (tab.name === 'second') {
        this.isFirst = false
        this.isSecond = true
        this.isThree = false
      } else if (tab.name === 'three') {
        this.isFirst = false
        this.isSecond = false
        this.isThree = true
      }
    },
    pickerOptions1: {
      onPick: (obj) => {
        this.pickerMinDate = new Date(obj.minDate).getTime()
        console.log(obj)
      },
      disabledDate: (time) => {
        if (this.pickerMinDate) {
          const day1 =  2 * 24 * 3600 * 1000
          let maxTime = this.pickerMinDate + day1
          let minTime = this.pickerMinDate - day1
          return time.getTime() > maxTime || time.getTime() < minTime || time.getTime() > Date.now()-1 * 24 * 3600 * 1000
        } else {
          return time.getTime() > Date.now() - 1 * 24 * 3600 * 1000
        }
      }
    },
    changeStart () {
      this.pickerOptionsStart = Object.assign({}, this.pickerOptionsStart, {
        disabledDate: (time) => {
          return time.getTime() < this.endDate - 5 * 24 * 60 * 60 * 1000
        }
      })
    },
    changeEnd () {
      this.pickerOptionsEnd = Object.assign({}, this.pickerOptionsEnd, {
        disabledDate: (time) => {
          return time.getTime() - 5 * 24 * 60 * 60 * 1000 > this.startDate
        }
      })
    },
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
        /* toolbox: {
            feature: {
                saveAsImage: {}
            }
        }, */
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
.fade-enter-active, .fade-leave-active {
    transition: opacity 2s
}
.fade-enter, .fade-leave-to{
    opacity: 0
}
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
