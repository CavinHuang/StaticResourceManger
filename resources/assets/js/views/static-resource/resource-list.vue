<style lang="less">
	@import '../../styles/common.less';
	@import '../tables/components/table.less';
</style>

<template>
	<div>
		<Row :gutter="10">
			<Col span="24">
			<Card>
				<p slot="title">
					<Icon type="mouse"></Icon>
					静态资源列表
			</p>
				<Row>
					<Input v-model="keywords" placeholder="请输入资源名称或者关键字或者标签搜搜..." style="width: 400px" />
					<span @click="handleSearch" style="margin: 0 10px;"><Button type="primary" icon="search">搜索</Button></span>
				</Row>
				<Row class="margin-top-10 searchable-table-con1">
					<Table :columns="tableColumns" :data="resourceList"></Table>
				</Row>
			</Card>
			</Col>
		</Row>
	</div>
</template>

<script>
  import * as table from '../tables/data/search';
  export default {
    name: 'searchable-table',
    data () {
      return {
        tableColumns: [{
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
            title: '所属项目',
            align: 'center',
            key: 'project',
            width: 200,
          },{
            title: '所属版本',
            align: 'center',
            key: 'version',
            width: 200,
          },{
            title: '资源类型',
            align: 'center',
            key: 'type',
            width: 200,
          },{
            title: '地址',
		        align: 'center',
		        width: 600,
		        key: 'url'
	        },{
            title: '操作',
            align: 'center',
            width: 400,
            key: 'handle',
            handle: ['edit', 'delete']
          }],
        resourceList: [],
        keywords: ''
      };
    },
    methods: {
      init () {
      
      },
      search (data, argumentObj) {
        let res = data;
        let dataClone = data;
        for (let argu in argumentObj) {
          if (argumentObj[argu].length > 0) {
            res = dataClone.filter(d => {
              return d[argu].indexOf(argumentObj[argu]) > -1;
            });
            dataClone = res;
          }
        }
        return res;
      },
      handleSearch(){}
    },
    mounted () {
      this.init();
    }
  };
</script>
