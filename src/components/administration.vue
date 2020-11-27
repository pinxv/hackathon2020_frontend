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
		    <el-aside width="200px">
				 <el-menu
				      default-active="2"
				      class="el-menu-vertical-demo"
				      @open="handleOpen"
				      @close="handleClose"
				      background-color="#545c64"
				      text-color="#fff"
				      active-text-color="#ffd04b">
				      <el-submenu index="1">
				        <template slot="title">
				          <i class="el-icon-location"></i>
				          <span>货物管理</span>
				        </template>
				        <el-menu-item-group>
				          <el-menu-item index="1-1">货物数据查询</el-menu-item>
				          <el-menu-item index="1-2">货物数据上传</el-menu-item>
						  <el-menu-item index="1-2">货物数据修改</el-menu-item>
				        </el-menu-item-group>
				        
				      </el-submenu>
				      <el-menu-item index="2">
				        <i class="el-icon-menu"></i>
				        <span slot="title">风险监测</span>
				      </el-menu-item>
				      <el-menu-item index="4">
				        <i class="el-icon-setting"></i>
				        <span slot="title">返回首页</span>
				      </el-menu-item>
				    </el-menu>
			</el-aside>
			<!-- 右侧主要区域 -->
		    <el-main>Main</el-main>
		  </el-container>
		</el-container>
	</div>
</template>

<script>
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
	  
	.el-aside {
	  background-color: #D3DCE6;
	  border-right: none;
	 }
	  
	.el-main {
	    background-color: #E9EEF3;
	    
	}
	  
</style>
