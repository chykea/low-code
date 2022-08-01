<template>
    <div class="introduce-container">
        <Use/>
        <Guide/>
        <Module/>
    </div>
</template>
<script setup>
import Use from './component/Use/index.vue';
import Guide from './component/Guide/index.vue';
import Module from './component/Module/index.vue'
</script>
<style lang='scss' scoped>
    @font-face{
        font-family: 'BerlinSansFBDemi-Bold';
        src: url('../../assets/font/Berlin Sans FB Demi Bold.ttf');
    }
   .color-siliver{
        color: #AAAAAA;
    }
</style>