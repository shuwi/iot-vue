<style scope>
  body {
    background: #fff;
    padding: 0;
    margin: 0；
  }

  .ivu-layout {
    background: #fff;
  }

  .ivu-menu-item-group-title {
    color: #fff !important;
    font-weight: 800;
    font-size: 15px !important;
  }

  .avatar {
    float: right;
  }

</style>
<template>
  <div class="layout">
    <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
      <Menu theme="dark" width="auto" size="small" @on-select="activeMenuNameSelected" :open-names="openNames"
        :active-name="activeName" ref="child">
        <MenuGroup :style="{backgroundColor: '#17233d',padding:'8px 0', textAlign:'center'}" title="海上世界后台管理系统">
        </MenuGroup>
        <Submenu name="a">
          <template slot="title">
            <Icon type="ios-chatboxes"></Icon>预约管理
          </template>
          <MenuItem name="a-1" :to="{ name: 'Apply'}" replace>待审核</MenuItem>
          <MenuItem name="a-2">已受理</MenuItem>
          <MenuItem name="a-3">黑名单</MenuItem>
        </Submenu>
        <Submenu name="b">
          <template slot="title">
            <Icon type="ios-cafe"></Icon>点单管理
          </template>
          <MenuItem name="b-1" :to="{ name: 'Material'}" replace>物料管理</MenuItem>
          <MenuItem name="b-2">待处理</MenuItem>
          <MenuItem name="b-3">已处理</MenuItem>
        </Submenu>
        <Submenu name="c">
          <template slot="title">
            <Icon type="md-hand"></Icon>门禁管理
          </template>
          <MenuItem name="c-1">设备配置</MenuItem>
          <MenuItem name="c-2">门禁日志</MenuItem>
        </Submenu>
        <Submenu name="d">
          <template slot="title">
            <Icon type="md-cog"></Icon>系统管理
          </template>
          <MenuItem name="d-1">用户管理</MenuItem>
          <MenuItem name="d-2">系统配置</MenuItem>
        </Submenu>
      </Menu>
    </Sider>
    <Layout :style="{marginLeft: '200px'}">
      <Header :style="{background: '#17233d'}">
        <div class="avatar">
          <Dropdown trigger="click">
            <Button type="success">
              {{userName}}
              <Icon type="ios-arrow-down"></Icon>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem>个人信息</DropdownItem>
              <DropdownItem>退出系统</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </Header>
      <Content :style="{padding: '0 16px 16px'}">
        <slot name="content"></slot>
      </Content>
    </Layout>
  </div>
</template>
<script>
  export default {
    name: "index",
    computed: {
      userName() {
        return this.$store.state.setting.login.username;
      },
      openNames() {
        if (this.$store.state.setting.settings.openNames !== null)
          if (typeof this.$store.state.setting.settings.openNames !== 'undefined') {
            return new Array(this.$store.state.setting.settings.openNames);
          }
      },
      activeName() {
        if (this.$store.state.setting.settings.activeName !== null)
          if (typeof this.$store.state.setting.settings.activeName !== 'undefined') {
            return this.$store.state.setting.settings.activeName
          }
      }
    },
    mounted() {
    },
    data() {
      return {}
    },
    methods: {
      activeMenuNameSelected(name) {
        if (typeof name !== null) {
          if (typeof name !== 'undefined') {
            this.$store.dispatch("setActiveName", name);
            if (typeof name.split('-')[0] !== 'undefined')
              this.$store.dispatch("setOpenNames", new Array(name.split('-')[0]));
          }
        }
      }
    }
  };

</script>
