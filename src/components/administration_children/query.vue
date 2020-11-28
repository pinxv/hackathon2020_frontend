<template>
	<div>
		<div id="search_container" style="float: left; width: 60%; padding-left: 17%; padding-top: 3%;"  >
			<el-input id='input' v-model="id" placeholder="请输入单号"></el-input>
		</div>
		<div id="search_container" style="float: left;padding-left: 1%; padding-top: 3%;">
			<el-button id='search' @click="search">搜索</el-button>
		</div>
		<div id="table_container">
			 <el-table
			       :data="tableData"
			       style="width: 100%">
			       <el-table-column
			         prop="date"
			         label="日期"
			         width="180">
			       </el-table-column>
			       <el-table-column
			         prop="name"
			         label="中转站信息"
			         width="180">
			       </el-table-column>
			       <el-table-column
			         prop="address"
			         label="地址">
			       </el-table-column>
			     </el-table>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				tableData: [{
				            date: '2016-05-02',
				            name: '中转站',
				            address: '上海市普陀区金沙江路 1518 弄'
				          }, {
				            date: '2016-05-04',
				            name: '中转站',
				            address: '上海市普陀区金沙江路 1517 弄'
				          }, {
				            date: '2016-05-01',
				            name: '中转站',
				            address: '上海市普陀区金沙江路 1519 弄'
				          }, {
				            date: '2016-05-03',
				            name: '中转站',
				            address: '上海市普陀区金沙江路 1516 弄'
				          }],
			}
		},
		methods: {
			search(){
				
			}
		}
	}
</script>

<style scoped="scoped">
	#table_container{
		padding-top: 10%;
		padding-left: 10%;
		width: 80%;
	}
</style>
