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
	<div style="width: 100%; height: 750px;" class="map_container">
      <amap
        cache-key="map"
        ref="map"
        view-mode="2D"
        map-style="amap://styles/whitesmoke"
        async
        :zoom.sync="zoom"
        :center.sync="center"
        :pitch.sync="pitch"
        :rotation.sync="rotation"
        :show-indoor-map="false"
        is-hotspot
        @hotspotclick="onHotspotClick"
      >
        <amap-marker
          :position="position"
          :label="{
            content: '疫情风险等级可视化地图',
            direction: 'bottom',
          }"
        />
      </amap>
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
      position: [116.473778, 39.990661],
      zoom: 4,
      pitch: 45,
      rotation: 0,
	  search_place:"",
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
  methods: {
    onHotspotClick(e) {
      if (e && e.lnglat) {
        this.center = [e.lnglat.lng, e.lnglat.lat];
      }
    },
	login() {
		this.$router.push("/login");
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