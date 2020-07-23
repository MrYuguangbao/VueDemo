<template>
    <div id="login-area">
        <el-form :model="loginModel" :rules="loginRules" ref="loginRef">
            <el-row>
                <el-col :span="4" :offset="10">
                    <el-row>
                        <el-col :span="24">
                            <label style="color:white;font-size:25px">YulasticSearch</label>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item prop="username">
                                <el-input id="username" v-mode="username"  placeholder="input account" >
                                    <i slot="prefix" class="el-input__icon el-icon-user"></i>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item prop="password">
                                <el-input id="password" v-mode="password"  placeholder="input password" show-password>
                                    <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-button style="width:100%" type="success" @click="login">Login</el-button>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
var usernameRules=(rule, value,callback)=>{
    if (!value){
      callback(new Error('请输入用户名'))
    }else {
      callback()
    }
  }
var passwordRules=(rule, value,callback)=>{
    if (!value){
      callback(new Error('请输入密码'))
    }else {
      callback()
    }
  }
export default {
  data () {
      return {
          username:'',
          password:'',
          loginRules:{
            username:[{required:true,trigger:'blur',validator:usernameRules}],
            password:[{required:true,trigger:'blur',validator:passwordRules}]
          }
      }
  },
  methods: {
    login () {
      this.$refs['loginRef'].validate((valid) => {
        if (valid) {
          this.$post('login', {
            username: document.getElementById('username').innerText,
            password: document.getElementById('password').innerText
          }, 'json')
            .then(result => {
              console.log('result:' + JSON.stringify(result, null, 2))
            }).catch(error => {
              console.log(error)
            })
        } else {
          this.$message.info('请检查输入项是否合法！')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
<style>
#login-area{
    position:absolute;
    top: 250px;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
}
.el-row {
    margin-bottom: 30px;
   
  }
</style>