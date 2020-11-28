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
	 var opts = {
	     subdistrict: 0,   //返回下一级行政区
	     extensions: 'all',  //返回行政区边界坐标组等具体信息
	 };
	 //实例化DistrictSearch
	 var district = new AMap.DistrictSearch(opts);
	 district.search('中国', function(status, result) {
	     var bounds = result.districtList[0].boundaries;
	     var mask = []
	     for(var i =0;i<bounds.length;i+=1){
	         mask.push([bounds[i]])
	     }
	     var disCountry = new AMap.DistrictLayer.World({
	         zIndex:0,
	         rejectMapMask:true
	     })
	     var object3Dlayer = new AMap.Object3DLayer({zIndex:1});
	     var map = new AMap.Map('map_container', {
	         mask:mask,
	         center:[105,37],
	         
	         viewMode:'3D',
	         labelzIndex:130,
	         zoom:4.5,
	         cursor:'pointer',
	         layers:[
	             new AMap.TileLayer({
	                 zIndex:7
	             }),
	             disCountry,
	             object3Dlayer,
	             new AMap.TileLayer.Satellite()
	         ]
	     });
	     var height = -5000;
	     var color = '#0088ffcc';//rgba
	     var prism = new AMap.Object3D.Wall({
	         path:bounds,
	         height:height,
	         color:color
	     });
	     prism.transparent = true
	     object3Dlayer.add(prism)
	 })

  },

}
</script>

<style scoped="scoped">
	.monitoring {
		width: 100%;
		height: 100%;
	}
	html,body,#map_container{
	    margin:0;
	    height:100%;
	    background-color:rgb(216, 238,250) !important
	}
</style>
