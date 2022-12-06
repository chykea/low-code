<template>
    <div class="form-container">
        <Use>
            <!-- 登录与注册 -->
            <template v-slot:container>
                <FormContainer />
            </template>
        </Use>
    </div>
</template>
<script setup lang="ts">
import Use from '@/views/Introduce/component/Use/index.vue'
import FormContainer from './component/FormContainer/index.vue'


</script>
<style lang='scss' scoped>
.form-container {
    font-family: 'BerlinSansFBDemi-Bold';
    min-height: 936px;
}
</style>