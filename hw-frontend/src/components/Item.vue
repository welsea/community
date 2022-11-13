<template>
  <div>
    <div id="title1">作品详情</div>
    <div id="line"></div>

    <div v-if="from=='fics'" class="fic_container">
      <div class="fic_name">{{fic.name}}</div>
      <div class="fic_author">{{fic.author}}</div>
      <div class="fic_sum">
        <i>Summary:</i>
        <div>
          <i>
            {{fic.summary}}
          </i>
        </div>
      </div>
      <div class="fic_content" v-html="fic.content"></div>
      <div style="display: flex;justify-content: flex-end;">
        <div id="work_kudos" @click="updateKudos">
          <i class="icon icon-font icon-aixin1 aixin_fill"></i>
          <div id="kudos_num">{{fic.kudos}}</div>
        </div>
      </div>

    </div>

    <div v-else class="img_container">
      <div class="img_info">
        <div class="img_1">作品名：</div>
        <div class="img_2">{{img.name}}</div>
        <div class="img_1">画手：</div>
        <div class="img_2">{{img.artist}}</div>
      </div>
      <div class="img_content">
        <img :src="img.url" alt="">
        
        <div id="work_kudos" @click="updateKudos">
          <i class="icon icon-font icon-aixin1 aixin_fill"></i>
          <div id="kudos_num">{{img.kudos}}</div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        from: '',
        item: [],
        id: '',

      }
    },
    methods: {
      fetchData() {
        this.from = this.$route.query.from;
        this.id = this.$route.query.id;
      },
      updateKudos() {
        if (this.from == 'fics') {
          this.fic.kudos += 1;
          this.$store.dispatch('updateFic', {
            fic: this.fic
          });
        } else {
          this.img.kudos += 1;
          this.$store.dispatch('updateImg', {
            img: this.img
          });
        }
      }
    },
    computed: {
      img() {
        return this.$store.getters.imgById;
      },
      fic() {
        return this.$store.getters.ficById;
      }
    },
    created() {
      this.fetchData();
      if (this.$route.query.from == 'imgs') {
        this.$store.dispatch('imgById', {
          id: this.$route.query.id
        });
      } else {
        this.$store.dispatch('ficById', {
          id: this.$route.query.id
        });
      }

    },
  }

</script>
<style>
  #title1 {
    font-size: 25px;
    text-decoration: solid;
  }

  #line {
    height: 1px;
    background: #ddd;
    margin: 15px 0;
  }

  .img_1 {
    font-size: 12px;
    color: #888;
  }

  .img_2 {
    padding-left: 40px;
    margin: 0 0 30px;
  }

  #work_kudos {
    background: #fff;
    padding: 5px 6px;
    border-radius: 20px;
    font-size: 11px;
    color: #999;
    line-height: 13px;
    display: flex;
    justify-content: center;
    width: fit-content;
    border: 1px solid #fad4d3;
    margin: 5px 0;
    height: fit-content;
  }

  .img_container {
    width: 90%;
    display: flex;
    align-items: self-start;
  }

  .img_content{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .img_content>img {
    width: 100%;
  }

  .img_info {
    width: 30%;
    padding: 30px 20px;
    background: white;
    border-radius: 10px;
    margin: 0 20px;
  }

  .img_content {}


  /**fic */

  .fic_container {
    background: white;
    border-radius: 10px;
    padding: 30px;
  }

  .fic_name {
    font-size: 24px;
    margin: 0 0 20px;
    text-align: center;
  }

  .fic_author {
    text-align: center;
    margin: 20px;
  }

  .fic_sum {
    margin: auto;

    padding: 20px 0;
    width: 40%;
  }

  .fic_sum>div {
    border-top: 1px solid #ddd;
    padding: 5px 10px;
  }

  .fic_content {
    padding: 100px 30px;
  }

</style>
