<template>
<div class="introduce-use-go">
    <div class="introduce-use-title">
        <p>LowCode</p>
        <p class="color-siliver">design</p>
    </div>
    <div class="introduce-use-intro">
        <h3>零代码实现网页界面</h3>
        <h3>10分钟搭建完成</h3>
        <h3>方便快捷</h3>
    </div>
    <div class="introduce-use-gotouse">
        <button><span>开始使用</span><span >→</span></button>
    </div>
</div>
</template>
<script setup>
</script>
<style lang='scss' scoped>
.introduce-use-go{
    position: absolute;
    left: 168px;
    top: 142px;
    height: 340px;
    width: 293px;
    // background-color: #bfa;
    .introduce-use-title{
        &>p{
            font-size: 72px;
            font-family: 'BerlinSansFBDemi-Bold';
        }
    }
    .introduce-use-intro{
        margin-top: 10px;
    }
    .introduce-use-gotouse{
        margin-top: 30px;
        // display: flex;
        // justify-content: center;
        &>button{
            border: none;
            cursor: pointer;
            width: 186px;
            height: 62px;
            background: #F7D94C;
            transition: all .3s;
            border-radius: 31px;
            font-size: 20px;
            font-weight: bold;
        }
        &>button:hover{
            box-shadow: 1px 6px 51px 0px rgba(247,215,64,0.8800);
        }
    }
}
</style>