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
			path:[],
			map:{},
		}
	},
	mounted:function(){
	console.log("mounted");
	this.map = new AMap.Map('map_container', {
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
	var that=this;
	this.$http.get("adminUser/history",{params:{username:window.sessionStorage.getItem("sessionId")}}).then(function(response){
		var geocoder = new AMap.Geocoder({
		    city: '全国'
		  }) 
		  //console.log(response.data.data);
		for(var i=0;i<response.data.data.length;i++){
			var count=i;
			var input=response.data.data[i];
			that.getloc(input,geocoder,that.map);
				
			
		}
	},function(error){
		that.$message.error("提交失败！"+error);
	})
  },
  methods:{
  	getloc: async function(data,geocoder,map){
		var obj={
			isSafe:data.isSafe,
			path:new Array(),
		}
		var destll;
		var placell; 
		geocoder.getLocation(data.destination, function(status, result) {
		    if (status === 'complete' && result.info === 'OK') {
		         destll=result.geocodes[0].location;
				 obj.path.push(destll);
				 geocoder.getLocation(data.place, function(status, result) {
				     if (status === 'complete' && result.info === 'OK') {
				          placell=result.geocodes[0].location;
				 		  obj.path.push(placell)
						  var polyline = new AMap.Polyline({
						      path: obj.path,  
						  	  map:map,
							  labelzIndex:130,
						      borderWeight: 2, // 线条宽度，默认为 1
						      strokeColor: 'green', // 线条颜色
						      lineJoin: 'round' // 折线拐点连接处样式
						  });
						  if(obj.isSafe===false){
						  	polyline.setOptions({strokeColor:"#ff8033"})
						  } 
						  console.log(map);
						  
				     }
				   })  
		    }
		  })
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
