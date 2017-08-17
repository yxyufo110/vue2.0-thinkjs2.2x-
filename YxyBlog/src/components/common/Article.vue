<template>
  <div>
    <div  class="text-item" >
      <p><i class="el-icon-caret-left" title="返回" @click="back()"></i></p>
        <h1 class="content-title">{{articleData.title}}</h1>
        <h3 class="content-time">最后修改时间：{{articleData.newDate}}</h3>
        <el-tag style="margin-right:10px" type="primary" v-for="tag in  articleData.tag">{{tag}}</el-tag>
        <div class="content-subtitle" v-html="articleData.newContent" v-highlight></div>
        
      </div>
  </div>
</template>

<script>
export default {
  name: 'Article',
  props: {
    articleData: {
      type: Object,
      default: {}
    }
  },
  methods: {
    back() {
      this.$emit("back")
    }
  }
}
</script>


<style scoped>
.content-title {
  font-size: 18px;
  font-weight: bold;
  text-align: center
}
.content-subtitle {
  text-indent: 28px;
  line-height: 20px;
  /* display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical; */
  /* overflow: hidden; */
  margin: 15px 0;
  /* color: #777 */
}

.content-time {
  margin-bottom: 20px;
  border-bottom: 1px solid #d1dbe5;
  padding-bottom: 5px;
  color: #d1dbe5
}

.el-icon-caret-left {
  cursor: pointer;
  color: #8492a6;
  font-size: 24px
}


</style>


