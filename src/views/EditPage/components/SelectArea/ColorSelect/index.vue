<template>
  <div class="block">
    <el-color-picker></el-color-picker>
  </div>
</template>

<script>
  export default {
    props: ['modelValue'],
    methods: {
          handleClick() {
              this.$emit('update:modelValue', this.modelValue);
          }
    },
    data() {
      return {
        color1: '#409EFF',
        color2: null
      }
    }
  };
</script>