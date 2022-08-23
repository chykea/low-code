<template>
  <div class="adjustment">
      <div id="editBox"></div>
  </div>
</template>

<script>
</script>

<style>
 .adjustment {
  display: flex;
  justify-content: center;
  width: 290px;
  height: 843px;
  background: #FFFFFF;
  box-shadow: 0px 2px 21px 0px rgba(158,158,158,0.16);
  padding-right: 6px; 
  overflow-y: hidden;
  }
  .adjustment:hover {
    overflow-y: auto;
  }
  .adjustment::-webkit-scrollbar {
      width: 4px;    
  }
  .adjustment::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      background: rgba(0,0,0,0.2);
  }
  .adjustment::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      border-radius: 0;
      background: rgba(0,0,0,0.1);
  }
</style>