<template>
  <el-card>
    <el-row>
      <el-col :span="6">
        <el-carousel height="200px" direction="vertical" :autoplay="true" interval="1000">
          <el-carousel-item v-for="item in 3" :key="item">
            <h3 class="medium">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <!-- <el-col :span="4">
          <div id="box">
            <div
            style="height:60px"
            id="con1"
            ref="con1"
            :class="{anim:animate==true}"
            @mouseenter="mEnter"
            @mouseleave="mLeave"
            >
            <p v-for="item in items" :key="item.name">{{item.name}}</p>
            </div>
          </div>
      </el-col> -->
      <el-col :span="12">
          <el-table :data="tableData" height="250" border style="width: 100%">
            <el-table-column prop="date" label="日期" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
          </el-table>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
export default {
  name: 'Search',
  data () {
    return {
      items: [
        // 消息列表对应的数组
        { name: "马云" },
        { name: "雷军" },
        { name: "王勤1" },
        { name: "王勤2" },
        { name: "王勤3" },
        { name: "王勤4" },
        { name: "王勤5" }
      ],
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    }
  },
  // computed: {
  //   newDataList: function () {
  //     return this.sortKey(this.tableData, 'date')
  //   }
  // },
  mounted () {
    this.timer1 = setInterval(this.scroll, 1000)
  },
  methods: {
    scroll () {
      let con1 = this.$refs.con1
      con1.style.marginTop = '-30px'
      this.animate = !this.animate
      var that = this // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
      setTimeout(function () {
        that.items.push(that.items[0])
        that.items.shift()
        con1.style.marginTop = '0px'
        that.animate = !that.animate // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
      }, 500)
    },
    mEnter () {
      clearInterval(this.timer1)
    },
    mLeave () {
      this.timer1 = setInterval(this.scroll, 1000)
    }
  }
}
</script>
<style>
.el-carousel__item h3 {
  color: #475669
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6
}
#box {
  width: 300px;
  height: 175px;
  line-height: 30px;
  overflow: hidden;
  padding-left: 30px;
  border: 1px solid black;
  transition: all 0.5s;
}
</style>
