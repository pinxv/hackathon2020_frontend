<template>
	<div class="administration">
		<el-container class="container">
			<!-- 头部 -->
		  <el-header>
			  <!-- logo -->
			  <div class="logo">
				  <img src="../assets/img/冯虚御风标题.png" alt="" width="500px" height="50px">
				  
				  
			  </div>
			  
			  <!-- 账号信息 -->
			  <div class="info">
				  <el-menu
				    :default-active="activeIndex2"
				    class="el-menu-demo"
				    mode="horizontal"
				    @select="handleSelect"
				    background-color=rgb(51,51,61)
				    text-color=rgb(32,192,252)
				    active-text-color="#ffd04b">
				    <el-menu-item index="1">消息中心</el-menu-item>
				    <el-menu-item index="2">账户信息</el-menu-item>
				    
				  </el-menu>
			  </div>
		  </el-header>
		  <el-container>
			  <!-- 左侧边栏 -->
		    <el-aside :width="isCollapse ? '64px':'200px'">
				<div class="toggle-button" @click="toggle_collapse">|||</div>
				 <el-menu
				      default-active="2"
				      class="el-menu-vertical-demo"
				      @open="handleOpen"
				      @close="handleClose"
				      background-color=rgb(51,51,61)
				      text-color="#fff"
				      active-text-color="#ffd04b"
					  :collapse="isCollapse"
					  :collapse-transition="false"
					  :router="true">
					  <!-- 欢迎界面 -->
					  <el-menu-item index="/welcome">
					    <i class="el-icon-s-platform"></i>
					    <span slot="title">主界面</span>
					  </el-menu-item>
					  <!-- 货物管理侧边栏 -->
				      <el-submenu index="1">
				        <template slot="title">
				          <i class="el-icon-s-goods"></i>
				          <span>货物管理</span>
				        </template>
				        <el-menu-item-group>
				          <el-menu-item index="/query">
							  <i class="el-icon-search"></i>
							  <span>货物数据查询</span>
							  </el-menu-item>
				          <el-menu-item index="/upload">
							  <i class="el-icon-upload2"></i>
							  <span>货物数据上传</span>
						  </el-menu-item>
						  <el-menu-item index="/modify">
							  <i class="el-icon-refresh"></i>
							  <span>货物数据更新</span>
						  </el-menu-item>
				        </el-menu-item-group>
				        <!-- 风险监测侧边栏 -->
				      </el-submenu>
				      <el-menu-item index="/riskMonitoring">
				        <i class="el-icon-map-location"></i>
				        <span slot="title">风险监测</span>
				      </el-menu-item>
					  <!-- 返回首页 -->
				      <el-menu-item index="/home">
				        <i class="el-icon-back"></i>
				        <span slot="title">退出登录</span>
				      </el-menu-item>
					  
				    </el-menu>
			</el-aside>
			<!-- 右侧主要区域 -->
		    <el-main>
				<!-- 路由占位符 -->
				<router-view></router-view>
			</el-main>
		  </el-container>
		</el-container>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				//是否折叠侧边栏
				isCollapse:false
			}
		},
		methods: {
			// 折叠侧边栏
			toggle_collapse() {
				this.isCollapse = ! this.isCollapse
			}
		}
	}
</script>

<style scoped="scoped">
	.administration {
		height: 100%;
		background-color: rgb(31,31,41);
	}
	.container {
		height: 100%;
		
	}
	/* 头部 */
	.el-header {
	  background-color: rgb(50,50,61);
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  margin-bottom: 10px;
	 }
	  /* 侧边栏 */
	.el-aside {
		margin-top: 10px;
	  background-color: rgb(51,51,61);
	  border-radius: 10px;
	 }
	 .info {
		 background-color: rgb(51,51,61);
	 }
	 /* 解决侧边栏不对齐问题 */
	.el-menu {
		border-right: none !important;
	}
	/* 实现侧边栏的折叠 */  
	.toggle-button {
		background-color: rgb(51,51,61);
		color: white;
		font-size: 10px;
		line-height: 22px;
		text-align: center;
		letter-spacing: 0.2em;
		cursor: pointer;
	}
	/* 主要内容 */
	.el-main {
		margin: 10px;
		padding: 0;
		border-color: rgba(0,90,115);
		border-style: solid;
		border-width: 3px;
		border-radius: 5px;
	}
	#console{
		display: inline-block;
		height: 50%;
		left: 20%;
	}
	
	  
</style>
