<script setup>
// 全局化设置，中文
import zhCN from 'ant-design-vue/es/locale/zh_CN';
</script>

<template>
  <a-config-provider :locale="zhCN">
    <router-view></router-view>
  </a-config-provider>
</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  font-family: Helvetica, Tahoma, Arial;
}

a {
  text-decoration: none;
  color: #333;
}

&::placeholder {
  font-size: 14px;
  color: #808080;

}
</style>
