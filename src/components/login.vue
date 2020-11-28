<template>
	<div class="login">
		<div class="login_container">
			<img id='pic' src="../assets/logo.png"/>
			<el-input class="input" v-model="account" placeholder="请输入账号" style="top: 40%;"></el-input>
			<el-input class="input" v-model="password" placeholder="请输入密码" style="top: 50%;"></el-input>
			<el-button id='login' type="primary" @click="login">登录</el-button>
			<el-button id='reg' type="success">注册</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				account:'',
				password:'',
			}
		},
		methods: {
			login() {
				this.$router.push('/administration')
			}
		}
	}
</script>

<style scoped="scoped">
	.login_container {
		position: absolute;
		width: 50%;
		height: 50%;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
	}
	.input{
		left: 20%;
		width: 60%;
		height: 10%;
	}
	#login{
		position: absolute;
		width: 10%;
		left: 27%;
		top:80%
	}
	#reg{
		position: absolute;
		width: 10%;
		left: 64%;
		top:80%
	}
	#pic{
		position: absolute;
		width: 30%;
		height: 30%;
		left: 35%;
	}
</style>
