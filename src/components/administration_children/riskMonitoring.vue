<template>
	<div class="monitoring">
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/welcome' }">主界面</el-breadcrumb-item>
		  <el-breadcrumb-item>风险监测</el-breadcrumb-item>
		</el-breadcrumb>
	
		<div style="width: 100%; height: 100%;" class="map_container" id="map_container">
		
	</div>
		<div style="width: 100%; height: 100%;" class="map_container" id="map_container">
			
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			
		}
	},
	mounted:function(){
	console.log("mounted");
	var map = new AMap.Map('map_container', {
	    center:[105,37],
	    
	    viewMode:'2D',
	    labelzIndex:130,
	    zoom:4.5,
	    layers:[
	        new AMap.TileLayer({
	            zIndex:7
	        }),
	       
	    ]
	});

  },

}
</script>

<style scoped="scoped">
	.monitoring {
		width: 100%;
		height: 100%;
	}
</style>
