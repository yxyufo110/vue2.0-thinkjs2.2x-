<template>
  <el-row>
    <el-col :span="22" :offset="1">
      <div class="grid-content bg-purple">
  
        <el-tabs type="border-card" @tab-click="checkTabs">
          <el-tab-pane label="用户管理">
            <el-form :model="userMsg" ref="userMsg" label-width="100px" class="demo-ruleForm">
              <el-form-item label="用户名" :rules="[
                                                        { required: true, message: '用户名不能为空'},
                                                      ]">
                <el-input :disabled="true" v-model="userMsg.userName" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pwd" :rules="[
                                                        { required: true, message: '密码不能为空'},
                                                      ]">
                <el-input type="password" v-model="userMsg.pwd" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="名称" prop="title" :rules="[
                                                        { required: true, message: '名称不能为空'},
                                                      ]">
                <el-input v-model="userMsg.title" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="描述" prop="desc">
                <el-input v-model="userMsg.desc" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('userMsg')">提交</el-button>
                <el-button @click="resetForm('userMsg')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="文章管理">
  
            <div v-if="contentList">
              <div class="add-content">
                <el-button type="success" icon="plus" size="small" @click="handleAdd()"></el-button>
              </div>
              <el-table :data="tableNowData" border style="width: 100%">
                <el-table-column label="ID" prop="_id">
                </el-table-column>
                <el-table-column label="标题" prop="title">
                </el-table-column>
                <el-table-column label="内容" prop="subContent">
                </el-table-column>
                <el-table-column label="标签" prop="tabTag">
                </el-table-column>
                <el-table-column label="最后修改时间" prop="newDate">
                </el-table-column>
                <el-table-column label="操作">
                  <template scope="scope">
                    <el-button type="primary" icon="edit" size="small" @click="handleEdit(scope.$index, scope.row)"></el-button>
                    <el-button type="danger" icon="delete" size="small" @click="handleDelete(scope.$index, scope.row)"></el-button>
                  </template>
                </el-table-column>
              </el-table>
              <PageNation @changePage="articleChangePage" :pageSize="articlePageSize" :totalNum="tableData.length" :currentPage="articlePage" style="text-align:right;margin-top:15px"></PageNation>
            </div>
  
            <div v-if="!contentList">
              <ContentEdit :editDate="contentEditDate" @cancelMark="cancelMarkEdit" @submitMark="submitMarkEdit"></ContentEdit>
            </div>
          </el-tab-pane>
          <el-tab-pane label="留言管理">
             <el-table :data="msgNowData" border style="width: 100%">
                <el-table-column label="ID" prop="_id">
                </el-table-column>
                <el-table-column label="名称" prop="name">
                </el-table-column>
                <el-table-column label="内容" prop="subContent">
                </el-table-column>
                <el-table-column label="时间" prop="newDate">
                </el-table-column>
                <el-table-column label="操作">
                  <template scope="scope">
                    <el-button type="primary" icon="view" size="small" @click="viewMsg(scope.$index, scope.row)"></el-button>
                    <el-button type="danger" icon="delete" size="small" @click="delMsg(scope.$index, scope.row)"></el-button>
                  </template>
                </el-table-column>
              </el-table>
            <PageNation @changePage="msgChangePage" :pageSize="msgPageSize" :totalNum="msgData.length" :currentPage="msgPage" style="text-align:right;margin-top:15px"></PageNation>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import PageNation from 'components/common/PageNation'
import ContentEdit from 'components/common/ContentEdit'
import { Loading } from 'element-ui';
import moment from 'moment'
export default {
  components: { PageNation, ContentEdit },
  data() {
    return {
      input: '# hello',
      contentList: true,
      userMsg: {
        userName: '',
        pwd: '',
        title: '',
        desc: ''
      },
      tableData: [], //文章表格的全部数据
      msgData: [], //留言的全部数据
      tableNowData: [], //文章表格当前页的数据
      msgNowData: [],
      articlePage: 1, // 文章列表当前页
      articlePageSize: 5,
      msgPage: 1, // 留言列表当前页
      msgPageSize: 5,
      contentEditDate: {}
    }
  },
  methods: {
    dealTableData(data) {
      moment.locale('zh-cn')
      data.forEach((item) => {
        item.tabTag = item.tag.join(',')
        item.subContent =  item.content.slice(0, 8) + '...'
        item.newDate = moment(item.timer + '').format('l')
      })
      return JSON.parse(JSON.stringify(data))
    },
    dealMsgData(data) {
      moment.locale('zh-cn')
      data.forEach((item) => {
        item.subContent =  item.content.slice(0, 8) + '...'
        item.newDate = moment(item.timer + '').format('l')
      })
      return JSON.parse(JSON.stringify(data))
    },
    // 文章分页
    articleChangePage(val) {
      this.articlePage = val //当前页
      let initPage = (this.articlePage - 1) * this.articlePageSize // 从第几条数据开始分
      this.tableNowData = this.tableData.slice(initPage, this.articlePageSize * val)
    },
    msgChangePage(val) {
      this.msgPage = val //当前页
      let initPage = (this.msgPage - 1) * this.msgPageSize // 从第几条数据开始分
      this.msgNowData = this.msgData.slice(initPage, this.msgPageSize * val)
    },
    // 编辑文章
    handleEdit(index, row) {
      console.log(index, row)
      this.contentEditDate = [row]
      this.contentList = false
    },
    // 删除文章
    handleDelete(index, row) {
      let loadingInstance = Loading.service({ fullscreen: true, text: '请稍后...' })
      this.$api.delArticle({ _id: row._id }).then((res) => {
        // console.log(res)
        loadingInstance.close()
        if (res.errno === 0) {
          this.$message.success('删除成功')
          let data = this.dealTableData(res.data)
          this.tableData = data
          this.articleChangePage(1)
        } else {
          this.$message.error('该数据已失效')
        }
      }).catch((err) => {
        loadingInstance.close()
        this.$message.warning('网络错误，请稍后再试')
      })
    },
    // 删除留言 
    delMsg(index, row) {
    let loadingInstance = Loading.service({ fullscreen: true, text: '请稍后...' })
      this.$api.delMsg({ _id: row._id }).then((res) => {
        // console.log(res)
        loadingInstance.close()
        if (res.errno === 0) {
          this.$message.success('删除成功')
          let data = this.dealMsgData(res.data)
          this.msgData = data
          this.msgChangePage(1)
        } else {
          this.$message.error('该数据已失效')
        }
      }).catch((err) => {
        loadingInstance.close()
        this.$message.warning('网络错误，请稍后再试')
      })
    },
    // 查看留言
    viewMsg(index, row){
     this.$alert(row.content, '留言', {
          confirmButtonText: '确定'
        });
    },
    // 新增文章
    handleAdd(index, row) {
      // console.log(index, row);
      this.contentEditDate = []
      this.contentList = false
    },
    // 取消文章
    cancelMarkEdit() {
      this.contentList = true
    },
    // 提交文章
    submitMarkEdit(val) {
      let loadingInstance = Loading.service({ fullscreen: true, text: '请稍后...' })
      // 判断是新增还是修改
      if (this.contentEditDate.length == 0) {
        this.$api.addArticle(val).then((res => {
          if (res.errno === 0) {
            this.contentList = true
            let data = this.dealTableData(res.data)
            this.tableData = data
            this.articleChangePage(1)
            loadingInstance.close()
            this.$message.success('添加成功')
          } else {
            loadingInstance.close()
            this.$message.error('添加失败')
          }
        })).catch((err) => {
          loadingInstance.close()
          this.$message.warning('网络错误，请稍后再试')
        })
      } else {
        let editVal = val
        editVal._id = this.contentEditDate[0]._id
        this.$api.editArticle(editVal).then((res => {

          if (res.errno === 0) {
            this.contentList = true
            let data = this.dealTableData(res.data)
            this.msgData = data
            this.articleChangePage(1)
            loadingInstance.close()
            this.$message.success('修改成功')

          } else {
            loadingInstance.close()
            this.$message.error('修改失败')
          }
        })).catch((err) => {
          loadingInstance.close()
          this.$message.warning('网络错误，请稍后再试')
        })
      }
    },
    // 切换panel
    checkTabs(val) {
      console.log(val.index)
      // 列表界面
      if (val.index === '1') {
        let loadingInstance = Loading.service({ fullscreen: true, text: '请稍后...' })
        this.$api.getAllArticle().then((res) => {
          // 处理表格数据
          loadingInstance.close()
          let data = this.dealTableData(res.data)
          this.tableData = data
          this.articleChangePage(1)

        }).catch((err) => {
          loadingInstance.close()
          this.$message({
            showClose: true,
            message: '网络错误，请稍后再试',
            type: 'warning'
          })
        })
      }
      // 留言列表
      if (val.index === '2') {
        let loadingInstance = Loading.service({ fullscreen: true, text: '请稍后...' })
        this.$api.getAllMsg().then((res) => {
          // 处理表格数据
          loadingInstance.close()
          let data = this.dealMsgData(res.data)
          this.msgData = data
          this.msgChangePage(1)
          console.log(this.msgNowData)
        }).catch((err) => {
          loadingInstance.close()
          this.$message({
            showClose: true,
            message: '网络错误，请稍后再试',
            type: 'warning'
          })
        })
      }
    },
    // 修改用户信息
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let loadingInstance = Loading.service({ fullscreen: true, text: '请稍后...' })
          this.$api.changePwd(this.userMsg).then((res) => {
            loadingInstance.close()
            console.log(res)
            if (res.errno === 0) {
              this.$message({
                showClose: true,
                message: '修改成功',
                type: 'success'
              })
            } else {
              this.$message({
                showClose: true,
                message: '数据未改变',
                type: 'error'
              })
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
          return false
        }
      });
    },
    // 表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {
    // 判断是否登录
    // 有cookie
    if (document.cookie.indexOf('userInfo') >= 0) {
      let loadingInstance = Loading.service({ fullscreen: true, text: '请稍后...' })
      this.$api.userMsg().then((res) => {
        loadingInstance.close()
        let msg = res.data[0]
        this.userMsg.userName = msg.userName
        this.userMsg.pwd = msg.pwd
        this.userMsg.title = msg.title
        this.userMsg.desc = msg.desc
      }).catch((err) => {
        loadingInstance.close()
        this.$message({
          showClose: true,
          message: '网络错误，请稍后再试',
          type: 'warning'
        })
      })
      // 没有cookie
    } else {
      this.$message({
        showClose: true,
        message: '请先登录',
        type: 'warning'
      })
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.grid-content {
  margin: 20px 0
}
.add-content {
  width: 100%;
  text-align: right;
  margin-bottom: 15px
}
</style>