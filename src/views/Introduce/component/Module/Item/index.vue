<template>
    <div class="introduce-module-item">
        <div class="introduce-module-item-img">
            <img :src="imgSrc" alt="">
        </div>
        <div class="introduce-module-item-title">
            <p>{{prop.title}}</p>
        </div>
        <div class="introduce-module-item-describe">
            <p>{{prop.describe}}</p>
        </div>
    </div>
</template>
<script setup>
import {defineProps} from 'vue'
const prop = defineProps({
    title:String,
    describe:String,
    imgSrc:String
})
</script>
<style lang='scss' scoped>
.introduce-module-item{
    text-align: center;
    width: 250px;
    height: 230px;
    .introduce-module-item-title{
        &>p{
            font-size: 18px;
        }
    }
    .introduce-module-item-describe{
        margin-top: 14px;
        &>p{
            font-size: 14px;
            color: #7C7C7C;
        }
    }
}
</style>