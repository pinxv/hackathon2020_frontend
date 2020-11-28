<template>
	<div style="width: 100%; height: 100%; background-color: rgba(41,41,61,.7);">
	<div id='carousel_container'>
		<el-carousel style="height: 140%;" type="card" :interval="4000">
		      <el-carousel-item v-for="item in 4" :key="item">
		        <h3 class="small"></h3>
		      </el-carousel-item>
		    </el-carousel>
	</div>
	<div id='inform_container'>
		<div id='inform1' class="infor">
			<el-card class="box-card" style="height: 100%;">
			  <div slot="header" class="clearfix">
			    <span>已上传货物数量</span>
			  </div>
			  <div class="welcome_span_container">
				<span>{{Uploaded}}</span>
			  </div>
			</el-card>
		</div>
		<div id='inform2' class="infor">
			<el-card class="box-card" style="height: 100%;">
			  <div slot="header" class="clearfix">
			    <span>安全货物数量</span>
			  </div>
			  <div class="welcome_span_container">
				<span>{{Safe}}</span>
			  </div>
			</el-card>
		</div>
		<div id='inform3' class="infor">
			<el-card class="box-card" style="height: 100%;">
			  <div slot="header" class="clearfix">
			    <span>危险货物数量</span>
			  </div>
			  <div class="welcome_span_container">
				<span>{{Danger}}</span>
			  </div>
			</el-card>
		</div>
	</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				Uploaded:0,
				Safe:0,
				Danger:0,
			}
		},
		created:function(){
			var that=this;
			this.$http.get("adminUser/countInfo").then(function(response){
				that.Uploaded=response.data.data.batchNum;
				that.Safe=response.data.data.safeNum;
				that.Danger=response.data.data.unsafeNum;
			},function(error){
				that.$message.error("提交失败！"+error);
			})
		}
	}
</script>

<style scoped="scoped">
	.el-carousel__item h3 {
	    color: #475669;
	    font-size: 14px;
	    opacity: 0.75;
	    line-height: 150px;
	    margin: 0;
	  }
	
	  .el-carousel__item:nth-child(2n) {
	     background-color: #99a9bf;
	  }
	  
	  .el-carousel__item:nth-child(2n+1) {
	     background-color: #d3dce6;
	  }
	  #carousel_container{
		  width: 80%; 
		  height: 36%; 
		  padding-left: 10%; 
		  padding-top: 5%; 
		  float: left;
	  }
	  .infor{
		  width: 17%;
		  height: 40%;
	  }
	  #inform1{
		float: left;
		padding-left: 16%;
		padding-top: 10%;
		height: 30%;
	  }
	  #inform2{
		float: left;
		padding-left: 16%;
	  	padding-top: 10%;
		height: 30%;
	  }
	  #inform3{
		float: left;
	  	padding-left: 16%;
	  	padding-top: 10%;
		height: 30%;
	  }
	  #inform_container{
		  float: left;
		  width: 90%;
	  }
	  .clearfix{
		  height: 20px;
		  text-align: center;
	  }
	  .welcome_span_container{
		  height: 100px;
		  text-align: center;
		  font-size: 60px;
		  font-weight: 700;
	  }
</style>
