<template>
  <div style="margin-top:20px;">
    <div id="slide">
      <el-carousel indicator-position="outside" autoplay>
        <el-carousel-item v-for="item in 3" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div id="textSection">
      <div id="title">版务</div>
      <div id="collapse">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item  v-for="(item,i) in notes" :title="item.title"  :key="i" :name="i">
            <div>{{item.content}}</div>
          </el-collapse-item>
        </el-collapse>
      </div>

    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: '',
      }
    },
    created() {
      this.$store.dispatch('allNotes')
    },
    computed: {
      notes() {
        return this.$store.getters.allNotes;

      }
    },
  }

</script>
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  #textSection {
    margin: 20px 0;
    background: white;
    padding: 50px 40px;
    border-radius: 10px;
    font-size: 18px;
  }

  #title {
    font-size: 20px;
    text-decoration: solid;
    margin-bottom: 40px;
  }

  #collapse {
    padding: 0 0 20px 0;
  }

</style>
