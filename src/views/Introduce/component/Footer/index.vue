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
    
    background-color: #16191E;
    display: flex;
    .introduce-footer-box{
        width: 100%;
        height: 260px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-content: space-around;
        .introduce-footer-title{
            
            &>p{
                text-align: center;
                color: #fff;
                font-size: 24px;
            }
            height: 30px;
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