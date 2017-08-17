<template>
  <div class="block">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalNum">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'PageNation',
  methods: {
    handleSizeChange(val) {
      // 切换每页显示时触发
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // 切换当前页时触发
      this.$emit('changePage', val)
      console.log(`当前页: ${val}`);
    }
  },
  props: {
    pageSize: {
      type: Number,
      default: 0 //每页显示数据条数
    },
    totalNum: {
      type: Number,
      default: 0 //数据总数
    },
    currentPage: {
      type: Number,
      default: 1 //当前页
    }
  },
  data() {
    return {
      pageSizes: [5]
    };
  }
}
</script>

