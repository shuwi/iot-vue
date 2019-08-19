<template>
  <div class="hello">
    <h1>{{appname}} {{ msg }}</h1>
    <Content :style="{padding: '0 50px', margin: '20px auto'}">
      <Card style="width:450px;margin:0 auto;" dis-hover>
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
          <FormItem prop="user">
            <Input
              type="text"
              v-model="formInline.user"
              placeholder="用户名"
              size="large"
              style="width:300px;margin:5px auto;"
            >
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input
              type="password"
              v-model="formInline.password"
              placeholder="密码"
              size="large"
              style="width:300px;margin:5px auto;"
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
              style="width:110px;font-size:14px;margin-left:10px;"
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
          this.$Message.error("验证失败!");
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
              userName: that.formInline.user,
              password: md5(that.formInline.password),
              role: "admin"
            },
            method: "post",
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(function(data) {
            console.log(md5(that.formInline.password));
            if (data.data.code !== 200) {
              that.$Notice.error({
                title: "提醒",
                desc: data.data.message
              });
              return;
            }
            that.$store.dispatch("setToken", data.data.message);
            that.$Notice.info({
              title: "提醒",
              desc: "登录成功！"
            });
            that.$router.push('Index')
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
</style>
