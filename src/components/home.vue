<template>
  <div class="home">
	<div class="search_place">
	  <el-input
	    placeholder="请输入地点"
	    prefix-icon="el-icon-search"
	    v-model="search_place"
	  	id="search_place">
	   </el-input>
	</div>
	<div class="list_of_risk_area">
		<el-table
		      :data="list_of_risk_area_data"
		      style="width: 100%" stripe>
		      <el-table-column
		        prop="date"
		        label="时间"
		        width="100">
		      </el-table-column>
		      <el-table-column
		        prop="risk_level"
		        label="风险等级"
		        width="50">
		      </el-table-column>
		      <el-table-column
		        prop="area"
		        label="地点">
		      </el-table-column>
		    </el-table>
	</div>
	<div style="width: 100%; height: 100%;" class="map_container" id="map_container">

    </div>
	<div class="login_button_container">
		<el-button type="primary" @click="login">管理员登录</el-button>
	</div>
  </div>
</template>



<script>
	
export default {
  data() {
    return {
      center: [116.473778, 39.990661],
      zoom: 4,
      pitch: 45,
      rotation: 0,
	  search_place:"",
	  //风险等级地点信息
	  risk_level_area:[],
	  list_of_risk_area_data:[{
            date: '2016-05-02',
            risk_level: '高',
            area: '上海市普陀区金沙江路'
          }, {
            date: '2016-05-02',
            risk_level: '高',
            area: '上海市普陀区金沙江路'
          }, {
            date: '2016-05-02',
            risk_level: '高',
            area: '上海市普陀区金沙江路'
          }, {
            date: '2016-05-02',
            risk_level: '高',
            area: '上海市普陀区金沙江路'
          }]
    };
	
  },
  mounted:function(){

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
  //在页面加载后请求风险地区信息
  created() {
  	this.getRiskLevelInfo();
  },
  methods: {
	login() {
		this.$router.push("/login");
	},
	getRiskLevelInfo() {
		var that = this;
		// 发送请求，请求风险地区经纬度
		this.$http.get('/risklevel/getall').then(function(response){
			if(response.data.code === 200){
				that.$message.success("风险地区信息加载成功！");
				//加载用户信息
				that.risk_level_area = response.data;
			}
			else {
				that.$message.error("风险地区信息加载失败！");
			}
		},function(error){
			that.$message.error("风险地区信息加载失败！");
			console.log(error);
		})
	}
  },
};
</script>


<style scoped="scoped">
	.home {
		margin: 0;
		padding: 0;
	}
	/* 搜索框 */
	.search_place {
		width: 300px;
		position: absolute;
		left: 50%;
		top: 5px;
		z-index: 2;
		transform: translateX(-50%);
	}
	/* 风险地区列表 */
	.list_of_risk_area {
			position: absolute;
			left: 5px;
			top: 50%;
			transform: translateY(-50%);
			z-index: 2;
			width: 300px;
	}
	/* 地图容器 */
	.map_container {
		position: absolute;
		left: 0;
		top: 0;
	}
	/* 登录按钮 */
	.login_button_container {
		position: absolute;
		right: 5px;
		bottom: 5px;
		z-index: 2;
	}
	html,body,#map_container{
	    margin:0;
	    height:100%;
	    background-color:rgb(216, 238,250) !important
	}
</style>