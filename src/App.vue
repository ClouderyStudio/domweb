<script setup>
import { ref } from 'vue'

const currentDomain = ref(window.location.hostname || window.location.host)
const officialSite = 'https://www.cldery.com'
</script>

<template>
  <div class="page">
    <div class="card">
      <h1 class="title">云术工作室</h1>
      <p class="text">
        您正在访问的域名
        <span class="domain">{{ currentDomain }}</span>
        属于云术工作室
      </p>
      <p class="text">您可以点击下面的按钮跳转到云术工作室官网</p>
      <a class="button" :href="officialSite">进入云术工作室官网（www.cldery.com）</a>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'PingFang SC', 'Microsoft YaHei', 'Segoe UI', sans-serif;
}

.page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 24px;
}

.card {
  background: #ffffff;
  border-radius: 16px;
  padding: 48px 40px;
  max-width: 520px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.title {
  font-size: 28px;
  color: #333;
  margin-bottom: 24px;
}

.text {
  font-size: 16px;
  color: #555;
  line-height: 1.8;
  margin-bottom: 8px;
}

.domain {
  color: #667eea;
  font-weight: 600;
  word-break: break-all;
}

.button {
  display: inline-block;
  margin-top: 24px;
  padding: 14px 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  font-size: 16px;
  text-decoration: none;
  border-radius: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(102, 126, 234, 0.4);
}
</style>
