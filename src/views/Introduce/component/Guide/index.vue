<template>
    <div class="introduce-guide">
        <div class="introduce-guide-box">
            <div class="introduce-guide-title">
                <div class="introduce-guide-title-box">
                    <p>Novice</p>
                    <p>Guide</p>
                </div>
            </div>
            <div class="introduce-guide-video"></div>
        </div>
    </div>
</template>
<script setup>
</script>
<style lang='scss' scoped>
    .introduce-guide{
        height: auto !important;
        min-height: 580px;
        background-color: #000000;
        display: flex;
        justify-content: center;
        .introduce-guide-box{
            width: 100%;
            height: 580px;
            display: flex;
            justify-content: space-evenly;
            .introduce-guide-title{
                display: flex;
                justify-content: center;
                align-items: center;
                font-family: 'BerlinSansFBDemi-Bold';
                color: #fff;
                .introduce-guide-title-box{
                    height: 96px;
                    &>p{
                        font-size: 36px;
                        &:nth-child(2){
                            margin-top: 15px;
                        }
                    }
                }
            }
            .introduce-guide-video{
                // width: 1259px;
                max-width: 650px;
                width: 100%;
                border-left: 1px #7C7C7C solid;
                border-right: 1px #7C7C7C solid;
            }
            @media (max-width:960px) {
                .introduce-guide-title{
                    display: none;
                }
            }
        }
    }
</style>