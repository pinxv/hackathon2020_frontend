<template>
	<div class="login_container">
		<div class="img_header">
		</div>
		<div class="img_title">
			<img src="../assets/img/冯虚御风标题白色.png" alt="">
		</div>

		
	  <!-- 登录模块 -->
	  <div class="login_box">
	    <!-- 登录表单 -->
	    <el-form label-width="0px" class="login_form" :model="login_form" :rules="login_form_rules" ref="loginFormRef">
	      <!-- 用户名 -->
	      <el-form-item prop="username" style="margin-bottom: 30px;">
	        <el-input prefix-icon="el-icon-user-solid" v-model="login_form.username"></el-input>
	      </el-form-item>
	      <!-- 密码 -->
	      <el-form-item prop="password">
	        <el-input prefix-icon="el-icon-lock" v-model="login_form.password" type="password"></el-input>
	      </el-form-item>
	      <!-- 按钮区域 -->
	      <el-form-item class="button_container">
	        <el-button type="success" id="button_login" @click="login">登录</el-button>
	        <el-button type="primary" id="button_register">注册</el-button>
	      </el-form-item>
	    </el-form>
	  </div>
	</div>
</template>

<script>
	export default {
		data() {
		  return {
		    //登录表单数据绑定对象
		    login_form: {
		      username:'',
		      password:''
		    },
		    login_form_rules:{
		      //验证输入是否合法
		      username:[
		        {required:true,message:"请输入用户名",trigger:"blur"},
		        {min:3,max:10,message:"长度在3到10个字符",trigger:"blur"}
		      ],
		      //验证密码是否合法
		      password:[
		        {required:true,message:"请输入密码",trigger:"blur"},
		        {min:6,max:12,message:"长度在6到12个字符",trigger:"blur"}
		      ]
		    },
			
		  }
		},

		methods: {
			login() {
				var that=this;
				this.$http.post("adminUser/login",{"username":that.login_form.username,"password":that.login_form.password}).then(function(response){
					window.sessionStorage.setItem('sessionId',response.data.data.username)
					that.$message.success("登录成功！");
					that.$router.push('/administration')
				},function(error){
					that.$message.error("登录失败！");
				})
			}
		}
	}
</script>

<style scoped="scoped">
	/* 登录容器样式 */
	.login_container {
	  background-color: rgba(255,255,255,.5);
	  height: 100%;
	}

	.img_header {
		height: 30%;
		background-image: url(../assets/img/路.jpg);
		background-size: cover;
	}
	.img_title {
		position: absolute;
		left: 50%;
		top: 10%;
		transform: translateX(-20%);
	}
	
	.login_box {
	  width: 525px;
	  height: 350px;
	  background-color: white;
	  border-radius: 10px;
	  position: absolute;
	  left: 50%;
	  top: 50%;
	  transform: translate(-50%, -50%);
	  box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.3);
	  z-index: 2;
	}
	
	
	#avatar_img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	  background-color: #eee;
	}
	/* 登录表单样式 */
	.login_form {
	  position: absolute;
	  top: 30%;
	  width: 100%;
	  padding: 0 15%;
	  box-sizing: border-box;
	}
	/* 按钮样式 */
	.button_container {
	  position: relative;
	  bottom: 0;
	  top: 30%;
	  left: 19%;
	}
	#button_login {
		margin-right: 80px;
	}
</style>
