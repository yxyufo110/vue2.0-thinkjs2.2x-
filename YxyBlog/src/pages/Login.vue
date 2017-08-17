<template>
  <el-form style="margin-top:5%"  :model="loginForm" ref="loginForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户名" prop="userName" :rules="[
                { required: true, message: '用户名不能为空'},
              ]">
      <el-input v-model="loginForm.userName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pwd" :rules="[
                { required: true, message: '密码不能为空'},
              ]">
      <el-input type="password" v-model="loginForm.pwd" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item style="text-align: center;">
      <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
      <el-button @click="resetForm('loginForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { Loading } from 'element-ui';
export default {
  data() {
    return {
      loginForm: {
        userName: '',
        pwd: ''
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let loadingInstance = Loading.service({ fullscreen: true, text: '请稍后...' })
          this.$api.login(this.loginForm).then((res) => {
            loadingInstance.close()
            // 判断是否登录成功
            if (res.errno != 0) {
              this.$message({
                showClose: true,
                message: '用户名密码输入错误',
                type: 'error'
              })
            } else {
              this.$message({
                showClose: true,
                message: '登录成功',
                type: 'success'
              })
              document.cookie = 'userInfo'+ res.data
              this.$router.push('/adminIndex')
            }
          }).catch((err) => {
            loadingInstance.close()
            this.$message({
              showClose: true,
              message: '网络错误，请稍后再试',
              type: 'warning'
            })
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>