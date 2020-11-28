<template>
  <div class="home">
	<div id='dialog_container'>
		<el-dialog
		  title="上传照片"
		  :visible.sync="dialogVisible"
		  width="30%">
		  <el-upload
		    class="upload-demo"
			ref='upload'
			:file-list="fileList"
		    drag
			:auto-upload="false"
		    action=""
		    multiple>
		    <i class="el-icon-upload"></i>
		    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
		    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
		  </el-upload>
		  <span>请上传照片</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
	<div class="search_place">
	  <el-input
	    placeholder="请输入溯源码查询"
	    prefix-icon="el-icon-search"
	    v-model="search_place"
	  	id="search_place">
	   </el-input>
	</div>
	<div id="scan_container">
		<el-button id="scan" icon="logo.png" circle style="width: 100px; height: 100px;" @click="scan_dialog">扫码</el-button>
	</div>
	<div class="list_of_risk_area">
		<el-table
		      :data="list_of_risk_area_data"
		      style="width: 100%" stripe>
		      <el-table-column
		        prop="date"
		        label="时间"
				sortable
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
	  dialogVisible:false,
	  map:{},
      center: [116.473778, 39.990661],
      zoom: 4,
      pitch: 45,
      rotation: 0,
	  search_place:"",
	  //风险等级地点信息
	  risk_level_areas:[{longitude:111,latitude:35,riskLevel:100}],
	  //相关风险新闻
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
	this.map = map;
	console.log(this.map);
	this.getRiskLevelInfo(map);
  },

  //在页面加载后请求风险地区信息
  created:function() {
	console.log("created");
  },
  methods: {
	login() {
		this.$router.push("/login");
	},
	getRiskLevelInfo(map) {
		var that = this;
		// 发送请求，请求风险地区经纬度
		this.$http.get('RiskLevel').then(function(response){
			if(response.data.code === 200){
				that.$message.success("风险地区信息加载成功！");
				//加载用户信息
				that.risk_level_areas = response.data.data;
				console.log("risk_level_areas已更新");
				// 重新绘制标记
				that.drawRiskLevelMarker(map);
			}
			else {
				that.$message.error("风险地区信息加载失败！");
			}
		},function(error){
			that.$message.error("风险地区信息加载失败！");
			console.log(error);
		})
	},
	// 为地图绘制风险地区标记
	drawRiskLevelMarker(map) {
		var i = 0;
		map.clearMap();//刷新地图覆盖物
		console.log("正在绘制标记");
		console.log(this.risk_level_areas);
		for(i = 0; i < this.risk_level_areas.length; i++){
			// 创建一个 Marker 实例：
			var text = this.risk_level_areas[i].riskLevel === 100? "中风险":"高风险";
			var marker = new AMap.Marker({
			    position: new AMap.LngLat(this.risk_level_areas[i].longitude,this.risk_level_areas[i].latitude),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			    title: '高风险'
			});
			
			// 将创建的点标记添加到已有的地图实例：
			map.add(marker);
			this.drawBounds(map,this.risk_level_areas[i].adcode,null,[]);
		}
		console.log("绘制标记完成");
	},
	//行政区划绘制
	drawBounds(map,adcode,district,polygons) {
	        //加载行政区划插件
	        if(!district){
	            //实例化DistrictSearch
	            var opts = {
	                subdistrict: 0,   //获取边界不需要返回下级行政区
	                extensions: 'all',  //返回行政区边界坐标组等具体信息
	                level: 'district'  //查询行政级别为 市
	            };
	            district = new AMap.DistrictSearch(opts);
	        }
	        //行政区查询
	        district.setLevel('city')
	        district.search(adcode, function(status, result) {
	            polygons = [];
	            var bounds = result.districtList[0].boundaries;
	            if (bounds) {
	                for (var i = 0, l = bounds.length; i < l; i++) {
	                    //生成行政区划polygon
	                    var polygon = new AMap.Polygon({
	                        strokeWeight: 1,
	                        path: bounds[i],
	                        fillOpacity: 0.4,
	                        fillColor: 'red',
	                        strokeColor: 'red'
	                    });
	                    polygons.push(polygon);
	                }
	            }
	            map.add(polygons)
	        });
	    },
		scan_dialog(){
			this.dialogVisible=true;
		},
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
	#scan_container{
		position: absolute;
		right: 1%;
		top: 5%;
		z-index: 2;
		width: 10%;
		height: 10%;
	}
</style>