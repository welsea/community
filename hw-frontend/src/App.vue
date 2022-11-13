<template>
  <div id="app">
    <Header></Header>
  </div>
</template>

<script>
import Header from './components/Header'
export default {
  name: 'app',
  components: {
    Header
  }
}
</script>

<style>
 body{
   margin:0px !important;
   background:#f6f6f6;
}

.icon, .iconfont {
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

.aixin_fill{
  color:#fa6d5a
}

.icon-aixin1{
  color:#fa6d5a
}
.icon-aixin{
  color:#fa6d5a
}
</style>