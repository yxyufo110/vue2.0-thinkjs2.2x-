<template>

        <div class="grid-content bg-purple">
          <el-row class="tac">
            <el-col :span="24">
              <!--头像及描述-->
              <div class="left-title">
                <div>
                  <img src="../../assets/imgs/logo.png" >
                </div>
                <p class="p-name">yxy</p>
                <p class="p-line"></p>
                <p class="p-desc">一掉描述</p>
              </div>
              <div class="line"></div>
              <!--横行导航-->
              <el-menu  class="el-menu-demo" mode="horizontal" @select="checkMenu">
                <el-menu-item index="1" style="width:33%;text-align:center" title="编辑">
                  <i class="el-icon-edit"></i>
                </el-menu-item>
                <el-menu-item index="2" style="width:33%;text-align:center" title="分享">
                  <i class="el-icon-share"></i>
                </el-menu-item>
                <el-menu-item index="3" style="width:33%;text-align:center" title="收藏">
                  <i class="el-icon-star-on"></i>
                </el-menu-item>
              </el-menu>
  
              <!--竖行导航-->
              <el-menu mode="vertical" default-active="4" class="el-menu-vertical-demo" @select="checkMenu">
                <el-menu-item-group>
                  <el-menu-item index="4" style="text-align:center">
                    首页</el-menu-item>
                  <el-menu-item index="5" style="text-align:center">
                    关于我</el-menu-item>
                  <el-menu-item index="6" style="text-align:center">
                    留言</el-menu-item>
                </el-menu-item-group>
              </el-menu>
            </el-col>
          </el-row>
        </div>
</template>
<script>
export default {
  name: 'LeftMenu',
  methods: {
    checkMenu(index, val) {
     this.$emit('checkMenu',index)
    }
  }
}
</script>

<style scoped>
/*.box {
  overflow: hidden;
  
}*/
.left-title {
  background: #ffffff
}
.left-title div {
  width: 50%;
  height: 120px;
  margin-left: 25% 
}
.left-title img {
  width: 100%;
  height: 100%
}
.p-name{
  width: 100%;
  text-align: center;
  font-size: 18px;
}
.p-desc{
  width: 100%;
  text-align: center;
}
.p-line{
  width: 30%;
    height: 10px;
    border-bottom: 1px solid #cecece;
    margin-left: 35%;
    margin-bottom: 10px;
}
.grid-content {
  border-radius: 5px;
  min-height: 36px;
  border:1px solid #d1dbe5;
  margin:20px 0;
box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-menu{
  background: #ffffff
}
</style>


