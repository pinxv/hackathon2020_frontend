<template>
	<div class="administration">
		<el-container class="container">
			<!-- 头部 -->
		  <el-header>
			  <!-- logo -->
			  <div class="logo">
				  <img src="../assets/logo.png" alt="" width="50px" height="50px">
				  <span>网站控制台</span>
				  
			  </div>
			  <!-- 账号信息 -->
			  <div class="info">
				  账号信息
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
				      background-color="#545c64"
				      text-color="#fff"
				      active-text-color="#ffd04b"
					  :collapse="isCollapse"
					  :collapse-transition="false"
					  :router="true">
					  <!-- 欢迎界面 -->
					  <el-menu-item index="/welcome">
					    <i class="el-icon-setting"></i>
					    <span slot="title">主界面</span>
					  </el-menu-item>
					  <!-- 货物管理侧边栏 -->
				      <el-submenu index="1">
				        <template slot="title">
				          <i class="el-icon-location"></i>
				          <span>货物管理</span>
				        </template>
				        <el-menu-item-group>
				          <el-menu-item index="/query">货物数据查询</el-menu-item>
				          <el-menu-item index="/upload">货物数据上传</el-menu-item>
						  <el-menu-item index="/modify">货物数据修改</el-menu-item>
				        </el-menu-item-group>
				        <!-- 风险监测侧边栏 -->
				      </el-submenu>
				      <el-menu-item index="/riskMonitoring">
				        <i class="el-icon-menu"></i>
				        <span slot="title">风险监测</span>
				      </el-menu-item>
					  <!-- 返回首页 -->
				      <el-menu-item index="/home">
				        <i class="el-icon-setting"></i>
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

<style>
	.administration {
		height: 100%;
	}
	.container {
		height: 100%;
		
	}
	/* 头部 */
	.el-header {
	  background-color: #B3C0D1;
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  
	 }
	  /* 侧边栏 */
	.el-aside {
	  background-color: rgb(84,92,100);
	 }
	 /* 解决侧边栏不对齐问题 */
	.el-menu {
		border-right: none !important;
	}
	/* 实现侧边栏的折叠 */  
	.toggle-button {
		background-color: rgba(84,92,100,.2);
		color: white;
		font-size: 10px;
		line-height: 22px;
		text-align: center;
		letter-spacing: 0.2em;
		cursor: pointer;
	}
	.el-main {
	    background-color: #E9EEF3;
	    
	}
	
	  
</style>
