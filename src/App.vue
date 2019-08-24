<template>
  <div id="app">
    <!--
    <img src="./assets/logo.png">
    -->
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App'
  }

</script>

<style>
  #app {
    font-family: 'Microsoft Yahei', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background: #404757;
    padding: 0;
    margin: 0;
    font-size: 14px;
  }

</style>
