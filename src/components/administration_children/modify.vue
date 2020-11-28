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
		
		<!--搜索-->
		<div id="search_container" style="float: left; width: 60%; padding-left: 17%; padding-top: 3%;"  >
			<el-input id='input' v-model="id" placeholder="请输入单号"></el-input>
		</div>
		<div id="search_container" style="float: left;padding-left: 1%; padding-top: 3%;">
			<el-button id='search' @click="search">查询</el-button>
			<el-button id='scan' @click="scan_dialog">扫码查询</el-button>
		</div>
		<!--搜索成功后弹出填写信息表单-->
		<div id="form_container">
			 <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-if="search_result">
			   <el-form-item label="货物名称" prop="name" style="width: 40%;">
			     <el-input v-model="ruleForm.name"></el-input>
			   </el-form-item>
			   <el-form-item label="货物数量" prop="num" style="width: 20%;">
			     <el-input v-model="ruleForm.num"></el-input>
			   </el-form-item>
			   <el-form-item label="发货地址" prop="start_place"  style="width: 40%;">
			     <el-input v-model="ruleForm.start_place"></el-input>
			   </el-form-item>
			   <el-form-item label="收货地址" prop="end_place"  style="width: 40%;">
			     <el-input v-model="ruleForm.end_place"></el-input>
			   </el-form-item>
			   <!--<el-form-item label="活动区域" prop="region">
			     <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
			       <el-option label="区域一" value="shanghai"></el-option>
			       <el-option label="区域二" value="beijing"></el-option>
			     </el-select>
			   </el-form-item>
			   <el-form-item label="发货时间" required>
			     <el-col :span="11">
			       <el-form-item prop="date1">
			         <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
			       </el-form-item>
			     </el-col>
			     <el-col class="line" :span="2">-</el-col>
			     <el-col :span="11">
			       <el-form-item prop="date2">
			         <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
			       </el-form-item>
			     </el-col>
			   </el-form-item>
			   <el-form-item label="即时配送" prop="delivery">
			     <el-switch v-model="ruleForm.delivery"></el-switch>
			   </el-form-item>
			   <el-form-item label="活动性质" prop="type">
			     <el-checkbox-group v-model="ruleForm.type">
			       <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
			       <el-checkbox label="地推活动" name="type"></el-checkbox>
			       <el-checkbox label="线下主题活动" name="type"></el-checkbox>
			       <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
			     </el-checkbox-group>
			   </el-form-item>
			   <el-form-item label="特殊资源" prop="resource">
			     <el-radio-group v-model="ruleForm.resource">
			       <el-radio label="线上品牌商赞助"></el-radio>
			       <el-radio label="线下场地免费"></el-radio>
			     </el-radio-group>
			   </el-form-item>
			   <el-form-item label="活动形式" prop="desc">
			     <el-input type="textarea" v-model="ruleForm.desc"></el-input>
			   </el-form-item>-->
			   <el-form-item>
			     <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
			     <el-button @click="resetForm('ruleForm')">重置</el-button>
			   </el-form-item>
			 </el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dialogVisible:false,
				search_result:false,
				id:'',
				//表单信息
				ruleForm: {
				  name: '',
				  num:'',
				  start_place:'',
				  end_place:'',
				  /*region: '',
				  date1: '',
				  date2: '',
				  delivery: false,
				  type: [],
				  resource: '',
				  desc: ''*/
				},
				rules: {
				  name: [
				    { required: true, message: '请输入货物名称', trigger: 'blur' },
				    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
				  ],
				  num: [
				    { required: true, message: '请输入货物数量', trigger: 'blur' },
				    { min: 1, max: 7, message: '长度在 1 到 7 个字符', trigger: 'blur' }
				  ],
				  start_place: [
				    { required: true, message: '请输入起始地点', trigger: 'blur' },
				    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
				  ],
				  end_place: [
				    { required: true, message: '请输入目的地', trigger: 'blur' },
				    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
				  ],
				  /*region: [
				    { required: true, message: '请选择活动区域', trigger: 'change' }
				  ],
				  date1: [
				    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
				  ],
				  date2: [
				    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
				  ],
				  type: [
				    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
				  ],
				  resource: [
				    { required: true, message: '请选择活动资源', trigger: 'change' }
				  ],
				  desc: [
				    { required: true, message: '请填写活动形式', trigger: 'blur' }
				  ]*/
				}
			}
		},
		methods: {
			search(){
				this.search_result=true;
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
			submitForm(formName) {
			  this.$refs[formName].validate((valid) => {
			    if (valid) {
									var that=this;
									this.$http.post("adminUser/importCargoBatch",{"creator":window.sessionStorage.getItem('sessionId'),"description":that.ruleForm.name
									,"sum":that.ruleForm.num,"destination":that.ruleForm.end_place,"place":that.ruleForm.start_place}).then(function(response){
										that.$message.success("提交成功！");
									},function(error){
										that.$message.error("提交失败！");
									})
			    } else {
			      alert('提交错误');
			      return false;
			    }
			  });
			},
			resetForm(formName) {
			  this.$refs[formName].resetFields();
			}
		}
	}
</script>

<style scoped="scoped">
	#form_container{
		padding-top: 10%;
		padding-left: 10%;
		width: 80%;
	}
	.upload /deep/ .el-upload-dragger{
		width: 100%;
		
	}
</style>
