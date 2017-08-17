<template>
<div>
      <div v-for="o in nowData" :key="o._id" class="text-item" @click="checkList(o)">
        <h1 class="content-title">{{o.title}}</h1>
        <div class="content-subtitle" v-html="o.newContent" v-highlight></div>
        <h3 class="content-time">{{o.newDate}}</h3>
      </div>
      <PageNation @changePage="articleChangePage" :pageSize="listSize" :totalNum="listNum" :currentPage="currentList" style="text-align: right;"></PageNation>
  </div>
</template>
<script>
import PageNation from 'components/common/PageNation'
import { Loading } from 'element-ui'
import moment from 'moment'
import marked from 'marked'
export default {
  name: 'RightContent',
  components: { PageNation },
  data() {
    return {
      listSize: 5, //每页显示条数
      listNum: 0, //数据总数
      currentList: 1, //当前页
      contentList: [],
      nowData: []//分页的数据
    }
  },
  created() {
    let loadingInstance = Loading.service({ fullscreen: true, text: '请稍后...' })
    this.$api.getAllArticle().then((res) => {
      loadingInstance.close()
      this.contentList = this.dealDate(res.data)
      this.listNum = this.contentList.length
      this.articleChangePage(1)
      console.log(this.nowData)
    }).catch((err) => {
      loadingInstance.close()
      this.$message({
        showClose: true,
        message: '网络错误，请稍后再试',
        type: 'warning'
      })
    })
  },
  methods: {
    // 分页
    articleChangePage(val) {
      this.currentList = val //当前页
      let initPage = (this.currentList - 1) * this.listSize // 从第几条数据开始分
      this.nowData = this.contentList.slice(initPage, this.listSize * val)
    },
    checkList(val) {
      this.$emit("checkContent", val)
    },
    dealDate(data) {
      moment.locale('zh-cn')
      data.forEach((item) => {
        item.newDate = moment(item.timer + '').format('l')
        item.newContent = marked(item.content)
      })
      return JSON.parse(JSON.stringify(data))
    }
  }
}
</script>

<style scoped>


.content-title {
  font-size: 18px;
  font-weight: bold;
}

.content-subtitle {
  text-indent: 28px;
  line-height: 20px;
  height: 100px;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 5px 0;
}

.content-time {
  margin-bottom: 20px;
  border-bottom: 1px solid #d1dbe5;
  padding-bottom: 5px;
  color: #d1dbe5
}

.text-item {
  cursor: pointer;
}

.text-item:hover {
  background: #EEF1F6
}
</style>


