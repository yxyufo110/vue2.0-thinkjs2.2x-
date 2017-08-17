<template>
  <div>
    <div>
      <el-input placeholder="请输入您的名称" v-model="form.name">
        <template slot="prepend">用户名</template>
      </el-input>
    </div>
    <div class="area">
      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入留言内容" v-model="form.content">
      </el-input>
    </div>
    <p style="text-align: center;">
      <el-button type="primary" @click="submit()">留言</el-button>
    </p>
  </div>
</template>

<script>
import { Loading } from 'element-ui';
export default {
  name: 'LeaveMsg',
  data() {
    return {
      form: {
        name: '',
        content: ''
      }
    }
  },
  methods: {
    submit() {
      if (this.form.name == '') {
        this.form.name = '游客'
      }
      let loadingInstance = Loading.service({ fullscreen: true, text: '请稍后...' })
      this.$api.leaveMsg(this.form).then((res) => {
        loadingInstance.close()
        if (res.errno === 0) {
          this.$message.success('留言成功')
        } else {
          this.$message.error('留言失败')
        }
      }).catch((err) => {
        loadingInstance.close()
        this.$message.warning('网络错误，请稍后再试')
      })
    }
  }
}
</script>

<style scoped>
.area {
  margin: 1rem 0
}
</style>


