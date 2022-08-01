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
        height: 580px;
        background-color: #000000;
        .introduce-guide-box{
            width: 1536px;
            height: 580px;
            margin: 0 auto;
            display: flex;
            .introduce-guide-title{
                width: 275px;
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
                width: 1259px;
                border-left: 1px #7C7C7C solid;
                border-right: 1px #7C7C7C solid;
            }
        }
    }
</style>