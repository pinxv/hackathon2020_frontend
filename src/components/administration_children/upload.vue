<template>
	<div>
		
	<div style="padding-top: 5%;">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
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
		    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
		    <el-button @click="resetForm('ruleForm')">重置</el-button>
		  </el-form-item>
		</el-form>
	</div>
	</div>
</template>

<script scoped="scoped">
	export default {
		data() {
		      return {
		        ruleForm: {
		          name: '',
				  num:'',
				  start_place:'',
				  end_place:'',
		          //region: '',
		          //date1: '',
		          //date2: '',
		          //delivery: false,
		          //type: [],
		          //resource: '',
		          //desc: ''
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
		          /**region: [
		            { required: true, message: '请选择活动区域', trigger: 'change' }
		          ],
		          date1: [
		            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
		          ],
		          date2: [
		            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
		          ],
		          /**type: [
		            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
		          ],
		          resource: [
		            { required: true, message: '请选择活动资源', trigger: 'change' }
		          ],
		          desc: [
		            { required: true, message: '请填写活动形式', trigger: 'blur' }
		          ]**/
		        }
		      };
		    },
			/**created:function(){
				var that=this;
				AMap.plugin('AMap.Geolocation', function() {
				        var geolocation = new AMap.Geolocation({
				            enableHighAccuracy: true,//是否使用高精度定位，默认:true
				            timeout: 10000,          //超过10秒后停止定位，默认：5s //定位成功后是否自动调整地图视野到定位点
				
				        });
				        geolocation.getCurrentPosition(function(status,result){
				            if(status=='complete'){
				                that.start_place=result.addressComponent.province+result.addressComponent.city+result.addressComponent.district+result.addressComponent.street;
				            }else{
				                alert("请求出错"+result.info+result.message);
				            }
				        });
				    });
			},**/
			methods: {
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
</style>
