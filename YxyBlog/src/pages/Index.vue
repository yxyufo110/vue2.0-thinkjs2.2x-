<template>
  <div class="box">
  
    <el-row :gutter="20">
      <el-col :span="6" :offset="1">
        <LeftMenu @checkMenu="checkSMenu"></LeftMenu>
      </el-col>
      <el-col :span="15" :offset="1">
        <el-tabs type="border-card">
          <el-tab-pane :label="PLabel">
            <div v-if="menuIndex == '4'">
              <RightContent @checkContent="oneContent" v-if="showList"></RightContent>
              <XArticle @back="backList()" v-if="!showList" :articleData="oneArticle"></XArticle>
            </div>
            <AboutMe v-if="menuIndex == '5'"></AboutMe>
            <LeaveMsg v-if="menuIndex == '6'"></LeaveMsg>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  
  </div>
</template>

<script>
import LeftMenu from 'components/common/LeftMenu'
import RightContent from 'components/common/RightContent'
import XArticle from 'components/common/Article'
import AboutMe from 'components/common/AboutMe'
import LeaveMsg from 'components/common/LeaveMsg'
export default {
  components: { LeftMenu, RightContent, XArticle, AboutMe, LeaveMsg },
  data() {
    return {
      allData: [],
      PLabel: '首页',
      showList: true,
      menuIndex: '4'
    }
  },
  created() {
  },
  methods: {
    oneContent(val) {
      this.showList = false
      this.oneArticle = val
      this.PLabel = val.title
      console.log(val)
    },
    backList() {
      this.showList = true
      this.PLabel = '首页'
    },
    checkSMenu(val) {
      if (val == '1') {
        this.$router.push('/adminIndex')
      }
      if (val == '3') {
         this.$message.warning('请使用Ctrl + D来收藏本站')
      }
      // 关于我
       if (val == '4') {
        this.menuIndex = val
        this.backList()
      }
      if (val == '5') {
        this.menuIndex = val
        this.PLabel = '关于我'
      }
      if (val == '6') {
        this.menuIndex = val
        this.PLabel = '留言'
      }
    }
  }
}
</script>
<style scoped>
.el-tabs {
  margin: 20px 0
}
</style>

