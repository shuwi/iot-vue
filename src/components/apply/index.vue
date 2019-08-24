<template>
  <Index>
    <template v-slot:content>
      <div>
        <Breadcrumb :style="{padding: '16px 2px'}">
          <BreadcrumbItem>主页</BreadcrumbItem>
          <BreadcrumbItem>预约管理</BreadcrumbItem>
          <BreadcrumbItem>待审核</BreadcrumbItem>
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
      <apply-modal @reloadPage="reload"></apply-modal>
    </template>
  </Index>
</template>
<script>
  import Index from "@/components/index/index.vue";
  import ApplyModal from '@/components/apply/info.vue';
  export default {
    name: "Apply",
    components: {
      Index,
      ApplyModal
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
      this.reload(1)
      //this.$store.dispatch('setOpenNames', ['1'])
    },
    data() {
      return {
        active: '1-1',
        pagesize: 8,
        total: 0,
        tableData: [],
        tableColumns: [{
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: "申请人",
            key: "userName"
          },
          {
            title: "联系方式",
            key: "userPhone"
          },
          {
            title: "类别",
            key: "applyType",
            render: (h, params) => {
              const row = params.row;
              const color =
                row.applyType === '访客' ?
                "primary" :
                row.applyType === '冥想室' ?
                "success" :
                "error";
              const text =
                row.applyType

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
            title: "时间段",
            key: "fromTo"
          },
          {
            title: "日期",
            key: "applyDate",
            render: (h, params) => {
              const row = params.row;
              var moment = require('moment');
              const text =
                moment(row.applyDate).format('YYYY-MM-DD');

              return h(
                "span", {
                  props: {
                    
                  }
                },
                text
              );
            }
          },
          {
            title: "申请提交时间",
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
        this.$store.dispatch('showApplyModal', {})
      },
      reload(num) {
        var that = this;
        that
          .$http({
            baseURL: that.baseURL,
            url: "roomapply/list",
            params: {
              type: 0,
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
        this.$store.dispatch('showApplyModal', this.tableData[index])
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
                url: '/appPersonnel/deleteSingle',
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
