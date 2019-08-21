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
  }

  .avatar {
    float: right;
  }

</style>
<template>
  <div class="layout">
    <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
      <Menu theme="dark" width="auto" :open-names="['1']" size="small" :active-name="activeMenuName"
        @on-select="activeMenuNameSelected">
        <MenuGroup title="海上世界后台管理" :style="{backgroundColor: '#17233d',padding:'8px 0'}"></MenuGroup>
        <Submenu name="1">
          <template slot="title">
            <Icon type="ios-chatboxes"></Icon>预约管理
          </template>
          <MenuItem name="1-1">待审核</MenuItem>
          <MenuItem name="1-2">已受理</MenuItem>
          <MenuItem name="1-3">黑名单</MenuItem>
        </Submenu>
        <Submenu name="2">
          <template slot="title">
            <Icon type="ios-cafe"></Icon>点单管理
          </template>
          <MenuItem name="2-1">物料管理</MenuItem>
          <MenuItem name="2-2">待处理</MenuItem>
          <MenuItem name="2-3">已处理</MenuItem>
        </Submenu>
        <Submenu name="3">
          <template slot="title">
            <Icon type="md-hand"></Icon>门禁管理
          </template>
          <MenuItem name="3-1">设备配置</MenuItem>
          <MenuItem name="3-2">门禁日志</MenuItem>
        </Submenu>
        <Submenu name="4">
          <template slot="title">
            <Icon type="md-cog"></Icon>系统管理
          </template>
          <MenuItem name="4-1">用户管理</MenuItem>
          <MenuItem name="4-2">系统配置</MenuItem>
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
      }
    },
    mounted() {
      this.activeMenuName = '1-1';
    },
    data() {
      return {
        activeMenuName: ''
      }
    },
    methods: {
      activeMenuNameSelected(name) {
        console.log(name);
      }
    }
  };

</script>
