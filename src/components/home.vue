<template>
  <div class="home">
	<div class="search_place">
	  <el-input
	    placeholder="请输入溯源码查询"
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
	  risk_level_areas:[],
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
  //在页面加载后请求风险地区信息
  created() {
  	this.getRiskLevelInfo();
  },
  mounted:function(){

	 var map = new AMap.Map('map_container', {
	        zoom:4,//级别
	        center: [116.397428, 39.90923],//中心点坐标
	        viewMode:'2D'//使用3D视图
	    });
	//循环构造风险地区标记
	var i = 0;
	for (i = 0; i < this.risk_level_areas.length; i++){
		// 创建一个 Marker 实例：
		var risk_level_area = this.risk_level_areas[i];
		var marker = new AMap.Marker({
		    position: new AMap.LngLat(risk_level_area.longitude, risk_level_area.latitude),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
		    title: risk_level_area.risk_level ==='100'? "中风险":"高风险"
		});
		
		// 将创建的点标记添加到已有的地图实例：
		map.add(marker);
	}
  },
  
  methods: {
	login() {
		this.$router.push("/login");
	},
	getRiskLevelInfo() {
		var that = this;
		// 发送请求，请求风险地区经纬度
		this.$http.get('RiskLevel').then(function(response){
			if(response.data.code === 200){
				that.$message.success("风险地区信息加载成功！");
				//加载用户信息
				that.risk_level_areas = response.data;
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
</style>