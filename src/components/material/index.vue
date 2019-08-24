<template>
  <Index>
    <template v-slot:content>
      <div>
        <Breadcrumb :style="{padding: '16px 2px'}">
          <BreadcrumbItem>主页</BreadcrumbItem>
          <BreadcrumbItem>点单管理</BreadcrumbItem>
          <BreadcrumbItem>物料管理</BreadcrumbItem>
        </Breadcrumb>
        <Row>
          <Col span="12" :style="{padding: '16px 0'}">
          <Button type="primary" @click="add" :style="{width: '100px'}" shape="circle">
            新增
          </Button>
          </Col>
          <Col span="12">
          </Col>
        </Row>
        <Table :data="tableData" :columns="tableColumns" stripe size="small">
          <template slot-scope="{ row, index }" slot="action">
            <Tooltip content="编辑">
              <Button @click="show(index)" shape="circle" size="small" type="info">
                编辑
              </Button>
            </Tooltip>
            <Tooltip content="删除">
              <Button @click="drop(index)" shape="circle" size="small" type="error">
                删除
              </Button>
            </Tooltip>
          </template>
        </Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="total" show-total size="small" :page-size="pagesize" @on-change="listChange" />
          </div>
        </div>
      </div>
      <material-info-modal @reloadPage="reload"></material-info-modal>
    </template>
  </Index>
</template>
<script>
  import Index from "@/components/index/index.vue";
  import MaterialInfoModal from '@/components/material/info.vue';
  export default {
    name: "Material",
    components: {
      Index,
      MaterialInfoModal
    },
    computed: {
      baseURL: {
        get() {
          return this.$store.state.setting.settings.baseURL;
        },
        set() {}
      }
    },
    mounted: function () {
      this.reload(1);
      //this.$store.dispatch('setOpenNames', ['2'])
    },
    data() {
      return {
        active: '2-1',
        pagesize: 8,
        total: 0,
        tableData: [],
        tableColumns: [{
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: "名称",
            key: "materialName"
          },
          {
            title: "售价",
            key: "materialPrice"
          },
          {
            title: "类别",
            key: "materialType",
            render: (h, params) => {
              const row = params.row;
              const color =
                row.materialType === '茶' ?
                "primary" :
                row.materialType === '咖啡' ?
                "success" :
                "error";
              const text =
                row.materialType

              return h(
                "Tag", {
                  props: {
                    type: "dot",
                    color: color
                  }
                },
                text
              );
            }
          },
          {
            title: "添加时间",
            key: "created"
          },
          {
            title: '操作',
            slot: 'action',
            width: 140,
            align: 'center'
          }
        ]
      };
    },
    methods: {
      add() {
        this.$store.dispatch('showMaterialModal', {})
      },
      reload(num) {
        var that = this;
        that
          .$http({
            baseURL: that.baseURL,
            url: "material/list",
            params: {
              materialType: '',
              materialName:'',
              pageNo: num - 1,
              pageSize: that.pagesize
            },
            method: "post",
            headers: {
              "Content-Type": "application/json",
              'Authorization': 'Bearer ' + that.$store.state.setting.login.token
            }
          })
          .then(function (data) {
            console.log('列表数据：', data);
            if (data.status === 200) {
              that.tableData = data.data.content;
              that.total = data.data.totalElements;
            }
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(() => {});
      },
      listChange(number) {
        this.reload(number);
      },
      show(index) {
        this.$store.dispatch('showMaterialModal', this.tableData[index])
      },
      drop(index) {
        this.$Modal.confirm({
          title: '确认',
          content: `<p>确认删除申请？</p>`,
          onOk: () => {
            var that = this
            var token = that.$store.state.modals.login.token
            that.$http({
                baseURL: that.baseURL,
                url: '/material/deleteSingle',
                data: {
                  projectCode: that.listdata[index].projectCode,
                  teamSysNo: that.listdata[index].teamSysNo,
                  idCardType: 1,
                  idCardNumber: that.listdata[index].cardnumber
                },
                method: 'post',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token
                }
              })
              .then(function (data) {

              }).catch(function (error) {
                that.$Notice.error({
                  title: '提醒',
                  desc: `${that.listdata[index].name} 删除异常！`
                })
              }).finally(() => {
                that.reload(1);
              })
          }
        })
      }
    }
  };

</script>
