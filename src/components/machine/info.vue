<template>
  <Modal width="420" id="machine-info-modal" v-model="isVisible" @on-visible-change="visibleChange"
    :mask-closable="false" :closable="true" :footer-hide="true">
    <p slot="header" style="color:#333;text-align:left">
      <Icon type="ios-information-circle"></Icon>
      <span>{{opt}}预约单</span>
    </p>
    <Form ref="formInline" :model="formInline" :label-width="120" :rules="ruleValidate">
      <FormItem label="预约类型">
        <RadioGroup v-model="formInline.roomtype" type="button" @on-change="roomtypeChange">
          <Radio label="访客"></Radio>
          <Radio label="会议室"></Radio>
          <Radio label="冥想室"></Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="预约开始时间" prop="begintime">
        <DatePicker type="datetime" placeholder="请选择开始时间" v-model="formInline.begintime" :clearable="false" format="yyyy-MM-dd HH:mm:ss">
        </DatePicker>
      </FormItem>
      <FormItem label="预约结束时间" prop="endtime">
        <DatePicker type="datetime" placeholder="请选择结束时间" v-model="formInline.endtime" :clearable="false" format="yyyy-MM-dd HH:mm:ss"></DatePicker>
      </FormItem>
      <FormItem label="预约人姓名" prop="guestname">
        <Input v-model="formInline.guestname" placeholder="填写预约人姓名" :style="{width: '200px'}"></Input>
      </FormItem>
      <FormItem label="预约人联系电话" prop="guestphone">
        <Input v-model="formInline.guestphone" placeholder="填写预约人联系电话" :style="{width: '200px'}"></Input>
      </FormItem>
      <FormItem label="预约说明" prop="guestcontent">
        <Input v-model="formInline.guestcontent" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
          placeholder="填写预约说明" :style="{width: '220px'}"></Input>
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
          console.log(this.$store.state.setting.machineModal.isVisible);
          return this.$store.state.setting.machineModal.isVisible;
        },
        set(value) {}
      },
      opt() {
        return this.$store.state.setting.machineModal.formInline === null ?
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
          id: 0,
          roomtype: "",
          begintime: "",
          endtime: "",
          guestname: "",
          guestphone: "",
          guestcontent: ""
        },
        ruleValidate: {
          roomtype: [{
            required: true,
            message: "请选择预约类型"
          }],
          guestphone: [{
            required: true,
            message: "请填写预约人联系电话"
          }],
          guestname: [{
            required: true,
            message: "请填写预约人姓名"
          }],
          begintime: [{
            required: true,
            message: "请选择开始时间"
          }],
          endtime: [{
            required: true,
            message: "请选择结束时间"
          }]
        }
      };
    },
    methods: {
      visibleChange(isVisible) {
        if (isVisible) {
          console.log("可显示");
        } else {
          this.closeModal();
        }
      },
      closeModal() {
        this.$store.dispatch("hideMachineModal");
        this.$emit("reloadPage");
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
          that
            .$http({
              baseURL: that.baseURL,
              url: "roomapply/new",
              data: {
                applyDes: that.formInline.guestcontent,
                applyType: that.formInline.roomtype,
                begin: moment(that.formInline.begintime).format('YYYY-MM-DD HH:mm:ss'),
                end: moment(that.formInline.endtime).format('YYYY-MM-DD HH:mm:ss'),
                openId: 'deno378734823748',
                userId: that.$store.state.setting.login.username,
                userName: that.formInline.guestname,
                userPhone: that.formInline.guestphone
              },
              method: "post",
              headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + that.$store.state.setting.login.token
              }
            })
            .then(function (data) {
              console.log(data);
              if(data.data.code !== 0){
                  that.$Notice.error({
                  title: "提醒",
                  desc: data.data.message
                });
                return;
              }else{
                that.$Notice.success({
                  title: "提醒",
                  desc: "添加成功！"
                });
            }})
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
