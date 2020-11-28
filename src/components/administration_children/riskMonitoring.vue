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
	    center:[105,37],
	    mapStyle: 'amap://styles/blue',
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
