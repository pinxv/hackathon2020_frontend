<template>
	<div style="width: 100%; height: 100%; background-color: rgba(41,41,61,.7);">
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
		
		<!--搜索-->
		<div id="search_container" style="float: left; width: 60%; padding-left: 17%; padding-top: 3%;"  >
			<el-input id='input' v-model="UUID" placeholder="请输入单号"></el-input>
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
			         label="货物信息"
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
				UUID:'',
				ruleForm: {
				  name: '',
				  //num:'',
				  place:'',
				  time:'',
				},
				tableData: [],
			}
		},
		methods: {
			search(){
				var that=this;
				this.$http.get("adminUser/getDetailsByUUID",{params:{UUID:this.UUID}}).then(function(response){
					console.log(response);
					that.UUID=response.data.data.uuid;
					for(var i=0;i<response.data.data.placeList.length;i++){
						var newobj={
							date: response.data.data.placeList[i].time,
							name: response.data.data.description,
							address: response.data.data.placeList[i].place
						}
						that.tableData.push(newobj);
					}
					//that.ruleForm.num=response.data.data.sum.toString();
					that.tableVisible=true;
				},function(error){
					that.$message.error("提交失败！"+error);
				})
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
				var table_transer=this;
				reader.readAsDataURL(file.raw);
				reader.onload=function(e){
					var that=this;
					console.log(that.result);
					table_transer.$http.post("adminUser/getDetails",{"base64":that.result}).then(function(response){
						console.log(response.data.data);
						for(var i=0;i<response.data.data.placeList.length;i++){
							var newobj={
								date: response.data.data.placeList[i].time,
								name: response.data.data.description,
								address: response.data.data.placeList[i].place
							}
							table_transer.tableData.push(newobj);
						}
						table_transer.UUID=response.data.data.batchNumber;
						table_transer.ruleForm.name=response.data.data.description;
						table_transer.tableVisible=true;
						table_transer.dialogVisible=false;
					},function(error){
						that.$message.error("提交失败！");
					})
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
