<template>
	<div class="monitoring">
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
	        zoom:4,//级别
	        center: [116.397428, 39.90923],//中心点坐标
	        viewMode:'2D'
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
