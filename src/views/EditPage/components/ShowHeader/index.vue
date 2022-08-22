<template>
    <div class="show_header">
      <form action="">
        <div class="left">
          <input type="text">
          <button type="reset">重命名</button>
        </div>
        <div class="right">
          <button class="presee">预览</button>
          <button class="save">保存</button>
          <button class="release">发布</button>
        </div>
      </form>
    </div>
</template>

<script>
</script>

<style>
  .show_header {
    float: left;
    width: 1017px;
    height: 103px;
    box-sizing: border-box;
    padding: 33px 66px;
    background-color: #f5f5f5;
  }
  .left {
    float: left;
  }
  form input {
    box-sizing: border-box;
    width: 160px;
    height: 42px;
    padding: 0 17px;
    margin-right: 19px;
    border: 1px solid #16191E;
    border-radius: 10px;
    background-color: #f5f5f5;
    outline: none; 
  }
  form button {
    border: none;
    font-size: 16px;
    font-family: Microsoft YaHei;
    background-color: transparent;
    cursor: pointer;
  }
  .right {
    float: left;
    width: 325px;
    height: 45px;
    margin-left: 330px;
  }
  .right button {
    width: 93px;
    height: 45px;
    margin-right: 23px;
    background: #FFFFFF;
    border-radius: 15px;
  }
  .right .release {
    margin-right: 0;
    background: #F7D94C;
  }
</style>