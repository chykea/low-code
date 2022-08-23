<template>
<div class="preview_box">
    <div class="preview">
        
        <template v-for="item in content" :key="item.id">
            <component 
            :is="item.type==='a'?Link:
            item.type==='button'?Btn:
            item.type==='p'?P:
            item.type === 'img' ? Img :
            item.type==='span'?Span:
            item.type==='textarea'?Textarea:''
            "

            :id="item.id"
            :childArray="item.childNode"
            :prop="item.prop"
            ></component>
        </template>
        
    </div>
</div>
</template>
<script setup>
import {onMounted, ref} from 'vue'
import service from '@/utils/ApplicationJson';
import Btn from './components/Btn/index.vue'
import P from './components/P/index.vue'
import Img from './components/Img/index.vue'
import Link from './components/Link/index.vue'
import Span from './components/Span/index.vue'
import Textarea from './components/Textarea/index.vue'
import { useRoute } from 'vue-router';


const route = useRoute()
let content = ref(null)
onMounted(() => {
    service.post('/page/getContent',{id:route.query.id}).then((res)=>{
        const {data} = res;
        content.value = data.pageContent
    }).catch((err)=>{})
})
</script>
<style lang='scss' scoped>
.preview_box{
    display: flex;
    justify-content: center;
    .preview{
        position: relative;
        width: 1536px;
        height: 840px;
        border: 1px solid red;
    }
}
</style>