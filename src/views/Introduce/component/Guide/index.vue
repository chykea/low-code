<template>
    <div class="introduce-guide">
        <div class="introduce-guide-box">
            <div class="introduce-guide-title">
                <div class="introduce-guide-title-box">
                    <p>Novice</p>
                    <p>Guide</p>
                </div>
            </div>
            <div class="introduce-guide-video">
                <VueVideo :options="options"></VueVideo>
            </div>
        </div>
    </div>
</template>
<script setup>
import VueVideo from 'vue3-video-play'
import "vue3-video-play/dist/style.css";
import { reactive } from "vue";

let options = reactive({
      width: "800px", //播放器高度
      height: "450px", //播放器高度
      color: "#409eff", //主题色
      title: "", //视频名称
      src: null,
      muted: false, //静音
      webFullScreen: false,
      speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
      autoPlay: false, //自动播放
      loop: false, //循环播放
      mirror: false, //镜像画面
      ligthOff: true, //关灯模式
      volume: 0.3, //默认音量大小
      control: true, //是否显示控制
      controlBtns: [
        "audioTrack",
        "quality",
        "speedRate",
        "volume",
        "setting",
        "pip",
        "pageFullScreen",
        "fullScreen",
      ], //显示所有按钮,
    })

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
            // .introduce-guide-video{
            //     // width: 1259px;
            //     max-width: 650px;
            //     width: 100%;
            //     border-left: 1px #7C7C7C solid;
            //     border-right: 1px #7C7C7C solid;
            // }
            @media (max-width:960px) {
                .introduce-guide-title{
                    display: none;
                }
            }
        }
    }
</style>