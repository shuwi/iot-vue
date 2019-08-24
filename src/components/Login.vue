<template>
  <div class="login">
    <Content :style="{padding: '0 50px', margin: '20px auto'}">
      <Card style="width:450px;margin:0 auto;" dis-hover>
        <Divider class="title" dashed>{{ msg }}</Divider>
        <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="120">
          <FormItem prop="user" label="用户名">
            <Input type="text" v-model="formInline.user" placeholder="用户名" style="width:200px;">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password" label="密码">
            <Input
              type="password"
              v-model="formInline.password"
              placeholder="密码"
              style="width:200px;"
            >
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              @click="handleSubmit('formInline')"
              :loading="loading"
              shape="circle"
              style="width:180px;font-size:14px;"
            >登录</Button>
          </FormItem>
        </Form>
      </Card>
    </Content>
  </div>
</template>

<script>
export default {
  name: "Login",
  computed: {
    baseURL: {
      get() {
        return this.$store.state.setting.settings.baseURL;
      },
      set() {}
    },
    appname() {
      return this.$store.state.setting.settings.appName;
    }
  },
  data() {
    return {
      loading: false,
      msg: "系统登录",
      formInline: {
        user: "",
        password: ""
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "请填写用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请填写密码",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密码不能小于6位",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (!valid) {
          this.$Message.error("输入验证失败!");
          return;
        }
        var md5 = require("js-md5");
        var that = this;
        that.$Spin.show();
        that.loading = true;
        that
          .$http({
            baseURL: that.baseURL,
            url: "login",
            data: {
              username: that.formInline.user,
              password: that.formInline.password
            },
            method: "post",
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(function(data) {
            console.log(data);
            if (data.data.code === -2) {
                that.$Notice.error({
                  title: "提醒",
                  desc: "登录失败，请核实账号！"
                });
                return;
              }
            that.$store.dispatch("setToken", data.data.token);
            that.$store.dispatch("setUserName", that.formInline.user);
            that.$Notice.success({
              title: "提醒",
              desc: "登录成功！"
            });
            that.$router.replace("Apply");
          })
          .catch(function(error) {
            that.$Message.error("登录异常，请联系管理员");
            console.log(error);
          })
          .finally(() => {
            that.$Spin.hide();
            that.loading = false;
          });
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  margin: 100px auto;
  padding: 20px 0;
}

.title {
  margin-bottom: 20px;
  margin-top: 10px;
  font-weight: 800;
  font-size: 15px;
}
</style>
