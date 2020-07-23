<template>
  <div >
    <el-row>
      <el-color-picker v-model="color1"></el-color-picker>
    </el-row>
    <el-row>
      <el-radio-group v-model="labelPosition" size="small">
        <el-radio-button label="left">左对齐</el-radio-button>
        <el-radio-button label="right">右对齐</el-radio-button>
        <el-radio-button label="top">顶部对齐</el-radio-button>
      </el-radio-group>
      <div style="margin: 20px;"></div>
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="名称">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-input v-model="formLabelAlign.region"></el-input>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input v-model="formLabelAlign.type"></el-input>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row style="margin-top:10px">
        <el-tooltip class="item" effect="light" content="重启" placement="bottom">
          <el-button plain type="warning" style="font-size:24px" size="mini" icon="el-icon-refresh" @click.stop="restart(scope)"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="启动" placement="bottom">
          <el-button plain type="success" style="font-size:24px" size="mini" icon="el-icon-video-play" @click.stop="start(scope)"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="停止" placement="bottom">
          <el-button plain type="danger" style="font-size:24px" size="mini" icon="el-icon-video-pause" @click.stop="end(scope)"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="基础配置" placement="bottom">
          <el-button plain type="primary" style="font-size:24px" size="mini" icon="el-icon-edit" @click.stop="basicConfig(scope)"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="分布式配置" placement="bottom">
          <el-button plain type="info" style="font-size:24px" size="mini" icon="el-icon-edit-outline" @click.stop="distributedConfig(scope)"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="删除" placement="bottom">
          <el-button plain type="warning"  style="font-size:24px" size="mini" icon="el-icon-delete" @click.stop="delCluster(scope)"></el-button>
        </el-tooltip>
    </el-row>
    <el-row style="margin-top:10px">
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
      <el-col :span="9">
          <el-table v-loading="loading" :data="tableData" height="250" border style="width: 100%">
            <el-table-column prop="date" label="日期" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
          </el-table>
      </el-col>
      <el-col :span="9">
          <el-table
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          :data="tableData" height="250" border style="width: 100%">
            <el-table-column prop="date" label="日期" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
          </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <el-button
          type="primary"
          @click="openFullScreen1"
          v-loading.fullscreen.lock="fullscreenLoading">
          指令方式
        </el-button>
      </el-col>
      <el-col :span="4">
        <el-button
          type="primary"
          @click="openFullScreen2">
          服务方式
        </el-button>
      </el-col>
      <el-col :span="4">
        <el-button
          type="primary" icon="el-icon-search">
          查询
        </el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" size="medium" icon="el-icon-search" @click="searchTable">搜索表格</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" :loading="loadingBtn" @click="search">{{loadingBtn?'搜索中':'搜索'}}</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'Search',
  data () {
    return {
      color1: '#409EFF',
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      loadingBtn: false,
      fullscreenLoading: false,
      loading: false,
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
    searchTable () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 3000)
    },
    search () {
      this.loadingBtn = true
      setTimeout(() => {
        this.loadingBtn = false
      }, 2000)
    },
    openFullScreen1 () {
      this.fullscreenLoading = true
      setTimeout(() => {
        this.fullscreenLoading = false
      }, 2000)
    },
    openFullScreen2 () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loading.close()
      }, 2000)
    },
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
