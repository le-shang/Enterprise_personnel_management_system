<script setup>
import { ref, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter()
const route = useRoute()

const collapsed = ref(true) // 侧栏收起状态
const asideItems = reactive([
  {
    path: 'adminHome',
    name: 'adminHome',
    label: '主页',
    icon: 'home-filled'
  },
  {
    path: 'employee',
    name: 'employee',
    label: '员工花名册',
    icon: 'schedule-outlined'
  }
])
const selectedKeys = ref([route.name])
</script>

<template>
  <a-layout>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible class="aside"
      @mouseenter="collapsed = false" @mouseleave="collapsed = true">
      <div class="logo" v-if="!collapsed">人事管理系统</div>
      <div class="logo" v-else>管理系统</div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="light" mode="inline" style="background-color: #defbb4; ">
        <a-menu-item v-for="item in asideItems" :key="item.name">
          <component :is="item.icon" />
          <span>{{ item.label }}</span>
          <router-link :to="item.path"></router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content :style="{ padding: '20px', background: '#fcfff7', minHeight: '280px' }">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>



<style lang="less" scoped>
.ant-layout {
  height: 100vh;
}

.aside {
  background-color: #defbb4;
  color: #333;

  .logo {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
  }
}
</style>