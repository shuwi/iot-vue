<template>
  <Modal width="420" id="machine-info-modal" v-model="isVisible" @on-visible-change="visibleChange"
    :mask-closable="false" :closable="true" :footer-hide="true">
    <p slot="header" style="color:#333;text-align:left">
      <Icon type="ios-information-circle"></Icon>
      <span>{{opt}}物料</span>
    </p>
    <Form ref="formInline" :model="formInline" :label-width="120" :rules="ruleValidate">
      <FormItem label="物料类型">
        <RadioGroup v-model="formInline.materialType" type="button" @on-change="typeChange">
          <Radio label="茶"></Radio>
          <Radio label="咖啡"></Radio>
          <Radio label="饮料"></Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="名称" prop="materialName">
        <Input v-model="formInline.materialName" placeholder="填写名称" :style="{width: '200px'}"
          :disabled="disabled"></Input>
      </FormItem>
      <FormItem label="缩略图" prop="thumbnail">
        <Upload action="//jsonplaceholder.typicode.com/posts/" :data="uploadData" :max-size="500" :on-success="uploadSuccess">
          <Button icon="md-cloud-upload" type="info">点击上传</Button>
        </Upload>
      </FormItem>
      <FormItem label="售价" prop="materialPrice">
        <Input v-model="formInline.materialPrice" placeholder="填写售价" :style="{width: '200px'}"></Input>
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
          return this.$store.state.setting.materialModal.isVisible;
        },
        set(value) {}
      },
      opt() {
        return this.$store.state.setting.materialModal.formInline === null ?
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
        disabled: false,
        loading: false,
        uploadData: {},
        formInline: {
          id: 0,
          materialType: "",
          materialName: "",
          materialPrice: "",
          thumbnail: 'ghhdhh'
        },
        ruleValidate: {
          materialType: [{
            required: true,
            message: "请选择物料类型"
          }],
          materialName: [{
            required: true,
            message: "请填写物料名称"
          }],
          materialPrice: [{
            required: true,
            message: "请填写售价"
          }]
        }
      };
    },
    methods: {
      visibleChange(isVisible) {
        if (isVisible) {
          if (this.$store.state.setting.materialModal.formInline !== null) {
            this.disabled = true;
            this.formInline = this.$store.state.setting.materialModal.formInline;
          }
        } else {
          this.closeModal();
        }
      },
      closeModal() {
        this.$store.dispatch("hideMaterialModal");
        this.$emit("reloadPage", 1);
        this.$refs['formInline'].resetFields();
      },
      typeChange(val) {
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
          var data = {
            createdBy: that.$store.state.setting.login.username,
            materialType: that.formInline.materialType,
            materialName: that.formInline.materialName,
            materialPrice: that.formInline.materialPrice,
            thumbnail: 'ghhdhh'
          };
          if (that.$store.state.setting.materialModal.formInline !== null) {
            data = that.$store.state.setting.materialModal.formInline;
            data.createdBy = that.$store.state.setting.login.username;
          }
          that
            .$http({
              baseURL: that.baseURL,
              url: "material/new",
              data: data,
              method: "post",
              headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + that.$store.state.setting.login.token
              }
            })
            .then(function (data) {
              if (data.data.code !== 0) {
                that.$Notice.error({
                  title: "提醒",
                  desc: data.data.message
                });
                return;
              } else {
                that.$Notice.success({
                  title: "提醒",
                  desc: `${that.$store.state.setting.materialModal.formInline !== null?'修改':'添加'}成功！`
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
      },
      uploadSuccess(response, file, fileList){
        console.log(response);
        console.log(file);
        console.log(fileList);
      }
    }
  };

</script>
<style scope>
</style>
