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
	    labelzIndex:100,
	    zoom:4.5,
	    layers:[
	        new AMap.TileLayer({
	            zIndex:7
	        }),
	       
	    ]
	});
  },
  methods:{
  	schedule(){
  		var driving = new AMap.Driving({
  		        map: map,
  		        panel: "panel"
  		    }); 
  		driving.search([
  		        {keyword: '北京市地震局(公交站)',city:'北京'},
  		        {keyword: '亦庄文化园(地铁站)',city:'北京'}
  		    ], function(status, result) {
  		        // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
  		        if (status === 'complete') {
  		            log.success('绘制驾车路线完成')
  		        } else {
  		            log.error('获取驾车数据失败：' + result)
  		        }
  		    });
  	}
  }

}
</script>

<style scoped="scoped">
	.monitoring {
		width: 100%;
		height: 100%;
	}
</style>
