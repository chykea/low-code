<template>
  <div class="app-container">
    <router-view></router-view>
  </div>
</template>
<script setup>

</script>
<style lang="scss" scoped>
  
  .app-container{
    margin: 0 auto;
  }
  // 自定义字体
    @font-face{
        font-family: 'BerlinSansFBDemi-Bold';
        src: url('@/assets/font/Berlin\ Sans\ FB\ Demi\ Bold.ttf');
    }
</style>
