<template>
  <Modal width="420" id="machine-info-modal" v-model="isVisible" @on-visible-change="visibleChange"
    :mask-closable="false" :closable="true" :footer-hide="true">
    <p slot="header" style="color:#333;text-align:left">
      <Icon type="ios-information-circle"></Icon>
      <span>{{opt}}冥想室预约单</span>
    </p>
    <Form ref="formInline" :model="formInline" :label-width="120" :rules="ruleValidate">
      <FormItem label="预约日期" prop="applyDate">
        <DatePicker type="date" placeholder="请选择开始时间" v-model="formInline.applyDate" :clearable="false"
          format="yyyy-MM-dd">
        </DatePicker>
      </FormItem>
      <FormItem label="预约时间段" prop="fromTo">
        <RadioGroup v-model="formInline.fromTo" @on-change="roomtypeChange">
          <Radio label="09:00-10:30"></Radio>
          <Radio label="10:30-12:00"></Radio>
          <Radio label="14:00-16:00"></Radio>
          <Radio label="16:00-18:00"></Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="预约人姓名" prop="userName">
        <Input v-model="formInline.userName" placeholder="填写预约人姓名" :style="{width: '200px'}"></Input>
      </FormItem>
      <FormItem label="预约人联系电话" prop="userPhone">
        <Input v-model="formInline.userPhone" placeholder="填写预约人联系电话" :style="{width: '200px'}"></Input>
      </FormItem>
      <FormItem label="预约单位" prop="userOrg">
        <Input v-model="formInline.userOrg" placeholder="填写预约单位" :style="{width: '200px'}"></Input>
      </FormItem>
      <FormItem label="预约说明" prop="applyDes">
        <Input v-model="formInline.applyDes" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="填写预约说明"
          :style="{width: '220px'}"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" style="width:150px;" @click="handleSubmit('formInline')" :loading="loading">提交</Button>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
  export default {
    name: "machine-info-modal",
    computed: {
      isVisible: {
        get() {
          return this.$store.state.setting.applyModal.isVisible;
        },
        set(value) {}
      },
      opt() {
        return this.$store.state.setting.applyModal.formInline === null ?
          "新增" :
          "修改";
      },
      baseURL: {
        get() {
          return this.$store.state.setting.settings.baseURL;
        },
        set() {}
      }
    },
    data() {
      return {
        loading: false,
        formInline: {
          userId: "",
          applyType: "冥想室",
          userName: "",
          userPhone: "",
          userOrg: "",
          applyDate: "",
          fromTo: '',
          applyDes: ''
        },
        ruleValidate: {
          fromTo: [{
            required: true,
            message: "请选择预约时间段"
          }],
          userPhone: [{
            required: true,
            message: "请填写预约人联系电话"
          }],
          userName: [{
            required: true,
            message: "请填写预约人姓名"
          }],
          applyDate: [{
            required: true,
            message: "请选择日期"
          }],
          userOrg: [{
            required: true,
            message: "请填写预约单位"
          }]
        }
      };
    },
    methods: {
      visibleChange(isVisible) {
        if (isVisible) {
          if (this.$store.state.setting.applyModal.formInline !== null) {
            this.disabled = true;
            this.formInline = this.$store.state.setting.applyModal.formInline;
            console.log(this.formInline)
          }
        } else {
          this.closeModal();
        }
      },
      closeModal() {
        this.$store.dispatch("hideApplyModal");
        this.$emit("reloadPage", 1);
        this.$refs['formInline'].resetFields();
      },
      roomtypeChange(val) {
        console.log(val);
      },
      handleSubmit(name) {
        this.$refs[name].validate(valid => {
          if (!valid) {
            this.$Message.error("输入验证失败!");
            return;
          }
          var that = this;
          that.loading = true;
          console.log(that.$store.state.setting.login.token)
          var moment = require('moment');
          that.formInline.userId = that.$store.state.setting.login.username;
          that.formInline.applyDate = moment(that.formInline.applyDate).format('YYYY-MM-DD hh:mm:ss')
          that
            .$http({
              baseURL: that.baseURL,
              url: "roomapply/new",
              data: that.formInline,
              method: "post",
              headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + that.$store.state.setting.login.token
              }
            })
            .then(function (data) {
              console.log(data);
              if (data.data.code !== 0) {
                that.$Notice.error({
                  title: "提醒",
                  desc: data.data.message
                });
                return;
              } else {
                that.$Notice.success({
                  title: "提醒",
                  desc: `${that.$store.state.setting.applyModal.formInline !== null?'修改':'添加'}成功！`
                });
              }
            })
            .catch(function (error) {
              that.$Message.error("新增异常");
              console.log(error);
            })
            .finally(() => {
              that.loading = false;
              that.closeModal();
            });
        });
      }
    }
  };

</script>
<style scope>
</style>
