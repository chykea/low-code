<template>
    <div class="introduce-container">
        <!-- 登录和介绍页面有一部分是相同的,所以就弄成插槽 -->
        <Use>
            <template v-slot:user_login>
                <LoginBtn/>
            </template>
            <template v-slot:container>
                <IntroduceContainer/>
            </template>
        </Use>
        <Guide/>
        <Module/>
        <Footer/>
    </div>
</template>
<script setup>
import Use from './component/Use/index.vue';
import Guide from './component/Guide/index.vue';
import Module from './component/Module/index.vue'
import Footer from './component/Footer/index.vue';
import IntroduceContainer from './component/Use/component/IntroduceContainer.vue';
import LoginBtn from './component/Use/component/LoginBtn.vue';
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