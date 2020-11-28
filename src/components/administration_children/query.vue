<template>
	<div>
		<!--扫码相关弹窗-->
		<div id='dialog_container'>
			<el-dialog
			  class="upload_dialog"
			  title="上传照片"
			  :visible.sync="dialogVisible"
			  width="30%">
			  <el-upload
			    class="upload"
				ref='upload'
				:on-change="onUpload"
				:auto-upload="false"
			    action=""
				drag
			    multiple>
			    <i class="el-icon-upload"></i>
			    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
			    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过1M</div>
			  </el-upload>
			  <span>请上传照片</span>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="dialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			  </span>
			</el-dialog>
		</div>
		<!--导航栏-->
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/welcome' }">主界面</el-breadcrumb-item>
		  <el-breadcrumb-item>货物管理</el-breadcrumb-item>
		  <el-breadcrumb-item>货物数据查询</el-breadcrumb-item>
		</el-breadcrumb>
		<!--搜索-->
		<div id="search_container" style="float: left; width: 60%; padding-left: 17%; padding-top: 3%;"  >
			<el-input id='input' v-model="id" placeholder="请输入单号"></el-input>
		</div>
		<div id="search_container" style="float: left;padding-left: 1%; padding-top: 3%;">
			<el-button id='search' @click="search">查询</el-button>
			<el-button id='scan' @click="scan_dialog">扫码查询</el-button>
		</div>
		<!--搜索成功后得到信息-->
		<div id="table_container">
			 <el-table
			       :data="tableData"
			       style="width: 100%" v-if="tableVisible">
			       <el-table-column
			         prop="date"
			         label="日期"
					 sortable
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
				tableVisible:false,
				dialogVisible:false,
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
				this.tableVisible=true;
			},
			scan_dialog(){
				this.dialogVisible=true;
			},
			//上传数据
			onUpload(file){
				const isIMAGE=(file.raw.type ==='image/jpeg' || file.raw.type ==='image/png');
				const isOversize=file.size/1024/1024<1;
				if(!isIMAGE){
					this.$message.error('图片格式错误');
					return false;
				}
				if(!isOversize){
					this.$message.error('图片过大');
					return false;
				}
				var reader=new FileReader();
				reader.readAsDataURL(file.raw);
				reader.onload=function(e){
					alert(this.result);
				}
			},
		}
	}
</script>

<style scoped="scoped">
	#table_container{
		padding-top: 10%;
		padding-left: 10%;
		width: 80%;
	}
	.upload /deep/ .el-upload-dragger{
		width: 100%;
		
	}
</style>
