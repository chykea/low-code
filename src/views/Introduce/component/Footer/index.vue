<template>
    <div class="introduce-footer">
        <div class="introduce-footer-box">
            <div class="introduce-footer-title">
                <p>LC Design</p>
            </div>
            <div class="introduce-footer-list-box">
                <ul class="introduce-footer-list">
                    <li v-for="item in list" :key="item"><a href="###">{{item.content}}</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup>
import {ref} from 'vue'
let list = ref([
    {
        content:'关于我们'
    },{
        content:'服务咨询'
    },{
        content:'新闻中心'
    },{
        content:'联系我们'
    }
])
</script>
<style lang='scss' scoped>
.introduce-footer{
    height: 265px;
    background-color: #16191E;
    
    .introduce-footer-box{
        width: 1536px;
        margin: 0 auto;
        height: 100%;
        
        // display: flex;
        // justify-content: center;
        // align-items: center;
        .introduce-footer-title{
            padding: 69px 0 42px 0;
            &>p{
                text-align: center;
                color: #fff;
                font-size: 24px;
            }
        }

        .introduce-footer-list{
            display: flex;
            justify-content: space-evenly;
            &>li>a{
                font-size: 18px;
                color: #C2C2C2;
            }
        }
    }
}
</style>