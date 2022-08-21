<template>
  <div class="materia-wrap">
    <div class="materia">
      <div class="materia-surface">
        <img :src="preview" />
      </div>
    </div>
    <p>{{prop.val}}</p>
  </div>
</template>

<script setup>
import{onMounted, ref} from 'vue';
import{myModlePre} from '@/api/modlePre';
const preview=ref('');
const prop = defineProps({
  id: Number,
  index: Number,
  val:String
});
// modlePre(prop.id,preview.value);
 onMounted(()=>{
  const data={id:prop.id}
  myModlePre('/con/getPreview',data).then(res=>{
        // console.log(res.data);
        if(res.data.code==200){
            preview.value=res.data.preview;
        }
    },err=>{
        console.log(err.message);
    })
 })
</script>

<style>
.materia-wrap {
  position: relative;
  width: 203px;
  height: 164px;
  margin-right: 40px;
  margin-bottom: 32px;
  text-align: center;
}
.materia {
  position: relative;
  width: inherit;
  height: 124px;
  background: #f1f1f1;
  /* background: #17191a; */
  border-radius: 10px;
}
.materia-wrap p {
  height: 30px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #17191a;
  line-height: 30px;
}
.materia-surface {
  position: absolute;
  top: 23px;
  left: 41px;
  width: 120px;
  height: 78px;
  /* background: #333; */
}
.materia-surface img{
  width: inherit;
  height: inherit;
}
</style>