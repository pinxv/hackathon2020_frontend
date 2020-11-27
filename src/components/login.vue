<template>
	<div class="login">
		<div class="login_container">
			<el-button type="primary" @click="login">登录</el-button>
			<el-button type="success">注册</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
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
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
	}
</style>
