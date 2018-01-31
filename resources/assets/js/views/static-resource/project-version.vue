<template>
	<Row class="margin-top-10">
		<Col span="24">
		<Card>
			<Button type="success" @click="showAddModel()">新增</Button>
			<Button type="warning" @click="deleteAll()">批量删除</Button>
		</Card>
		<Card>
			<p slot="title">
				<Icon type="ios-keypad"></Icon>
				项目版本列表
	    </p>
			<Row :gutter="12">
				<Col span="24">
				<div class="edittable-table-height-con">
					<can-edit-table
					refs="table4"
					v-model="editInlineAndCellData"
					@on-cell-change="handleCellChange"
					@on-change="handleChange"
					@on-delete="handleDel"
					@on-selection-change="selectChange"
					@on-select-all="selectChange"
					@on-select="selectChange"
					:editIncell="true"
					:columns-list="editInlineAndCellColumn"
					></can-edit-table>
				</div>
				</Col>
			</Row>
		</Card>
		</Col>
		<Modal
		v-model="addModelStatus"
		@on-ok="onModelOk('formCustom')"
		:loading="modelLoading"
		title="添加版本">
			<Form ref="formCustom" :model="editProjectData" :rules="ruleCustom" :label-width="80">
				<FormItem label="所属项目" prop="project_id">
					<Select v-model="editProjectData.project_id" @on-change="selectProjectChange" :label-in-value="true">
						<Option v-for="(item, i) in project" v-model="item.id" :key="item.id">{{item.name}}</Option>
					</Select>
				</FormItem>
				<FormItem label="版本号" prop="name">
					<Input type="text" v-model="editProjectData.name"></Input>
				</FormItem>
				<FormItem label="版本说明" prop="site">
					<Input type="textarea" v-model="editProjectData.remake"></Input>
				</FormItem>
				<FormItem label="更新说明" prop="readme"><slot name="label">可以是地址也可以是内容</slot>
					<Input type="textarea" v-model="editProjectData.update_remake" ></Input>
				</FormItem>
			</Form>
		</Modal>
	</Row>
</template>
<script>
  import canEditTable from '../tables/components/canEditTable.vue';
  import util from '../../libs/util'
  export default {
    data () {
      return {
        editInlineAndCellColumn: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '序号',
            width: 80,
            align: 'center',
            key: 'id'
          },
          {
            title: '项目版本号',
            align: 'center',
            key: 'name',
            width: 200,
            editable: true
          },
          {
            title: '所属项目',
            align: 'center',
            key: 'project',
            width: 300,
          },
          {
            title: '版本说明',
            align: 'center',
            width: 400,
            key: 'remake',
            editable: true
          },
          {
            title: '更新说明',
            align: 'center',
            width: 420,
            key: 'update_remake',
            editable: true
          },
          {
            title: '操作',
            align: 'center',
            width: 200,
            key: 'handle',
            handle: ['edit', 'delete']
          }
        ],
        editInlineAndCellData: [],
        saveTableData: [],
        editProjectData: {
          name: '',
          open_url: '',
          site: '',
          readme: '',
          remake: ''
        },
        ruleCustom: {
          name: { required: true, message: '名称不能为空', trigger: 'blur' }
        },
        selectId: [],
        projectLabel: 0,
        project:[],
        tableSelectAllStatus: false,
        addModelStatus: false,
        modelLoading: true
      }
    },
    methods: {
      getListData () {
        this.$axios.get('/api/project', {}).then(res => {
          if(res.success){
            // this.editInlineAndCellData = this.saveTableData = res.data.data
	          this.project = res.data.data
          }
        })
      },
      getVersion(){
        this.$axios.get('/api/project_version', {}).then(res => {
          if(res.success){
            this.editInlineAndCellData = this.saveTableData = res.data.data
          }
        })
      },
      handleDel (val, index) {
        this.$axios({url:'/api/project_version',method: 'delete', data: {ids: this.saveTableData[index]['id']}}).then(res => {
          if(res.success) {
            this.$Message.success('删除了第' + (index + 1) + '行数据');
            this.saveTableData.splice(index, 1)
          }
        })
        return false;
      },
      handleCellChange (val, index, key) {
        let data = {}
        data['id'] = this.saveTableData[index].id
        data[key] = val[index][key]

        this.updateServerData(data).then(res => {
          if(res.success) {
            this.$Message.success('修改了第 ' + (index + 1) + ' 行列名为 ' + key + ' 的数据');
          }else{
            this.$Message.error('修改失败')
          }
        })

      },
      handleChange (val, index) {
        let data = {}

        this.getEditColum().forEach((value, i) => {
          data[value] = val[index][value]
        })
        data['id'] = val[index]['id']
        this.updateServerData(data).then(res => {
          if(res.success) {
            this.$Message.success('成功修改了第' + (index + 1) + '行数据');
          }else{
            this.$Message.error('修改失败')
          }
        })
      },
      getEditColum(){
        let arr = [];
        this.editInlineAndCellColumn.forEach((val, index) => {
          if(val.hasOwnProperty('editable') && val.editable) {
            arr.push(val.key)
          }
        })
        return arr;
      },
      updateServerData(data){
        return new Promise((resolve, reject) => {
          this.$axios.post('/api/project_version', data).then(res => {
            resolve(res)
          }).catch(e => {
            reject(e)
          })
        })
      },
      showAddModel(){
        this.addModelStatus = true
      },
      selectChange(val, raw){
        this.selectId = util.getIdFromData(val)
      },
      selectProjectChange(val){
        this.projectLabel = val.label
      },
      onModelOk(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 服务器交互
            this.$axios.post('/api/project_version', this.editProjectData).then(res => {
              if(res.success) {
                if(!res.data.is_update) {
                  this.editProjectData['id'] = res.data.last_id
	                this.editProjectData['project'] =this.projectLabel
                  this.editInlineAndCellData.push(this.editProjectData)
                  // this.saveTableData.push(this.editProjectData)
                  this.$Message.success('操作成功', 2)
                  this.addModelStatus = false
                }else{
                  this.$Message.error('操作失败', 2)
                }
              }
            })
          }
        })
        setTimeout(() => {
          this.modelLoading = false;
          this.$nextTick(() => {
            this.modelLoading = true;
          });
        }, 2000);
        return false
      },
      cancel(){},
      deleteAll(){
        let ids = this.selectId.join(',')
        this.$axios({url:'/api/project_version',method: 'delete', data: {ids: ids}}).then(res => {
          if(res.success) {
            this.$Message.success('删除了第' + ids + '行数据');
            for(let i = 0; i < this.selectId.length; i++) {
              this.saveTableData.splice(this.selectId[i], 1)
            }
          }
        })
        return false;
      }
    },
    components: {
      canEditTable
    },
    created(){
      this.getListData();
      this.getVersion();
    }
  }
</script>
<style>

</style>
