<template>
  <div>
    <!--标题  -->
    <div style="margin-bottom: 1rem">
      <el-input placeholder="请输入标题" v-model="articleForm.title">
        <template slot="prepend">标题</template>
      </el-input>
    </div>
    <!-- 标签  -->
    <div style="margin-bottom: 1rem">
      <el-tag style="margin-right: .2rem" :key="tag" v-for="tag in articleForm.tag" :closable="true" :close-transition="false" @close="handleClose(tag)">
        {{tag}}
      </el-tag>
      <el-input style="margin-top: .5rem" class="input-new-tag" v-if="inputVisible" v-model="addTagValue" ref="saveTagInput" size="mini" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">新增标签</el-button>
    </div>
    <!--编辑器  -->
    <markdown-editor v-model="articleForm.content" preview-class="markdown-body"></markdown-editor>
    <el-button type="info" @click="submitMark()">确定</el-button>
    <el-button type="danger" @click="cancelMark()">取消</el-button>
  </div>
</template>

<script>
import { markdownEditor } from 'vue-simplemde'
export default {
  components: { markdownEditor },
  name: 'ContentEdit',
  props: {
    editDate: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      articleForm: {
        title: '',
        tag : [],
        content: ''
      },
      inputVisible: false,
      addTagValue: ''
    }
  },
  methods: {
    // 关闭标签
    handleClose(tag) {
      this.articleForm.tag.splice(this.articleForm.tag.indexOf(tag), 1);
    },
    // 新增标签
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    // 确认标签
    handleInputConfirm() {
      let addTagValue = this.addTagValue;
      if (addTagValue) {
        this.articleForm.tag.push(addTagValue);
      }
      this.inputVisible = false;
      this.addTagValue = '';
    },
    // 取消文章
    cancelMark() {
      this.$emit('cancelMark')
    },
    // 提交文章
    submitMark() {
      console.log(this.articleForm)
      this.$emit('submitMark', this.articleForm)
    }
  },
  created () {
    // 判断是修改还是新增
    if (this.editDate.length == 0) {
      return
    } else {
      this.articleForm.title = this.editDate[0].title
      this.articleForm.tag = this.editDate[0].tag
      this.articleForm.content = this.editDate[0].content
    }
    // console.log(this.editDate)
  },
}
</script>

