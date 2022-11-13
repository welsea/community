<template>
  <div id="commend_page">
    <div id="title1">文区推荐</div>
    <div id="line"></div>
    <div id="work_commend">
      <el-row :gutter="24" type="flex" justify="space-between">
        <el-col :span="7">
          <el-card id="work1">
            <div id="work1_title" class="single_line">name</div>
            <div id="work1_info">
              <div>author</div>
              <div class="commend_contact">24342@mail.com</div>
              <div id="work_kudos">
                <i class="icon icon-font icon-aixin1 aixin_fill"></i>
                <div id="kudos_num">kudos</div>
              </div>
              <div class="work1_msg">总之就是推荐</div>
              <div class="to_btn">点击查看</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="16">
          <div id="instant_c">即时热门推荐</div>
          <div v-for="(item,i) in fics" :key="item._id" id="work_common"
            :class="{work_top3: i<3 , others_commend:i>=3}">
            <div class="commend_num">{{ i+1 }} <span v-if="i<3">-</span></div>
            <div class="commend_info">
              <div class="commend_title single_line" @click="jumpToItem(item._id,'fic')">{{item.name}}</div>
              <div class="commend_author">{{item.author}}</div>
              <div class="commend_abstract" v-if="i<3">{{item.summary}}</div>
            </div>
            <div id="work_kudos">
              <i class="icon icon-font icon-aixin1 aixin_fill"></i>
              <div id="kudos_num">{{item.kudos}}</div>
            </div>
          </div>
          <div class="to_fiction" @click="jumpToFic">点击查看更多 >> </div>
        </el-col>
      </el-row>
    </div>

    <div id="line"></div>
    <div id="title1" style="margin-top:100px;">图区推荐</div>
    <div class="more_btn" @click="jumpToPic">查看更多</div>
    <div class="intro">这里是图区推荐balabala</div>
    <div id="pic_commend" class="flex_content">
      <!--      
    <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide v-for="item in 10" :key="item">
-->
      <el-card v-for="item in imgs" :key="item._id" :body-style="{ padding: '0px' }" class="pic_commend_item"
        shadow="never">
        <img :src="item.url" @click="jumpToItem(item._id)" class="cimg_image">
        <div class="pic_commend_info">
          <div class="pic_commend_title" @click="jumpToItem(item._id,'img')">{{item.name}}</div>
          <div class="pic_commend_artist">{{item.artist}}</div>
          <div id="work_kudos">
            <i class="icon icon-font icon-aixin1 aixin_fill"></i>
            <div id="kudos_num">{{item.kudos}}</div>
          </div>
        </div>
      </el-card>
      <!--      
        </swiper-slide>
        <div class="swiper-button-next " slot="button-next"></div>
      </swiper>
-->

    </div>


    <div id="line"></div>
    <div id="title1" style="margin-top:100px;">视频推荐</div>
    <div class="more_btn" @click="jumpToVid">查看更多</div>
    <div class="intro">这里是视频推荐balabala</div>
    <div id="video_commend" class="flex_content">
      <!---      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide >
  -->
      <el-card v-for="item in videos" :key="item._id" :body-style="{ padding: '0px' }" class="video_commend_item">
        <img :src="item.face" class="cvideo_image">
        <div class="video_commend_info">
          <div class="video_commend_title single_line">
            <a :href="'https://www.bilibili.com/video/'+item.bv" target="_blank">{{item.name}}</a>
          </div>
          <div class="video_info_2">
            <!-- <div id="work_kudos">
              <i class="icon icon-font icon-aixin1 aixin_fill"></i>
              <div id="kudos_num">324</div>
            </div>
            -->
            <div class="video_commend_artist">
              <img src="../assets/user.png" alt="">{{item.owner}}</div>
          </div>
        </div>
      </el-card>
      <!--        </swiper-slide>
        <div class="swiper-button-next " slot="button-next"></div>
      </swiper>
-->
    </div>

    <div id="line"></div>
    <div id="title1" style="margin-top:100px;">精选留言</div>
    <div class="more_btn" @click="jumpToMsg">查看更多</div>
    <div class="intro">这里是精选留言balabala</div>
    <div id="msg_commend" style="margin-bottom:50px" class="flex_content">
      <!--      
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide v-for="item in 10" :key="item">
-->
      <el-card v-for="item in msgs" :key="item._id" :body-style="{ padding: '0px' }" class="msg_commend_item">
        <div class="msg_line1">
          <img :src="item.avatar" class="cmsg_image">
          <div class="msg_line1_2">
            <div>{{item.name}}</div>
            <div id="work_kudos">
              <i class="icon icon-font icon-aixin1 aixin_fill"></i>
              <div id="kudos_num">{{item.kudos}}</div>
            </div>
          </div>
        </div>
        <div class="msg_commend_ct">
          <div v-html="item.content"></div>
        </div>
      </el-card>
      <!--      
        </swiper-slide>
        <div class="swiper-button-next " slot="button-next"></div>
      </swiper>
-->
    </div>
  </div>
</template>
<script>
  // import {
  //   Swiper,
  //   SwiperSlide,
  // } from 'vue-awesome-swiper'
  // import 'swiper/swiper-bundle.css'

  export default {
    name: 'carrousel',
    // components: {
    //   Swiper,
    //   SwiperSlide
    // },
    data() {
      return {
        // swiperOptions: {
        //   slidesPerView: 3,
        //   spaceBetween: 20,
        //   // initialSlide: 0,
        //   navigation: {
        //     nextEl: '.swiper-button-next',
        //     // prevEl: '.swiper-button-prev'
        //   },
        // }
        from: ''
      }
    },
    created() {
      this.$store.dispatch('limitImgs');
      this.$store.dispatch('limitFics');
      this.$store.dispatch('limitVideos');
      this.$store.dispatch('limitMsgs');
    },
    computed: {
      // swiper() {
      //   return this.$refs.mySwiper.$swiper
      // }
      imgs() {
        return this.$store.getters.allImgs;
      },
      fics() {
        return this.$store.getters.allFics;
      },
      videos() {
        return this.$store.getters.allVideos;
      },
      msgs() {
        return this.$store.getters.allMsgs;
      }

    },
    methods: {
      jumpToFic() {
        this.$router.push({
          path: '/work',
          query: {
            select_work: 1
          }
        })
      },
      jumpToPic() {
        this.$router.push({
          path: '/work',
          query: {
            select_work: 2
          }
        })
      },
      jumpToVid() {
        this.$router.push({
          path: '/work',
          query: {
            select_work: 3
          }
        })
      },
      jumpToMsg() {
        this.$router.push({
          path: '/message'
        })
      },
      jumpToItem(id, from) {
        if (from == 'fic') {
          this.from = "fics"
        } else {
          this.from = "imgs"
        }
        this.$router.push({
          path: '/item',
          query: {
            id: id,
            from: this.from,
          }
        })

      },
    },
    mounted() {
      // console.log('Current Swiper instance object', this.swiper)
    }
  }

</script>

<style>
  .flex_content {
    display: flex;
    justify-content: space-between;
  }

  .cimg_image {
    width: 100%;
    display: block;
    height: 250px;
    object-fit: cover;
  }

  .cvideo_image {
    width: 100%;
    display: block;
    height: 200px;
    object-fit: cover;
  }

  .cmsg_image {
    display: block;
    object-fit: cover;
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

  #kudos {
    display: inline;
    width: 13px;
    height: 13px;
    line-height: 13px;
  }

  .commend_abstract {
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  .single_line {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .msg_commend_ct {
    margin: 10px;
    -webkit-line-clamp: 8;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;

  }

  .msg_line1_2 {
    padding: 5px 10px 0;
    font-size: 17px;
  }

  .msg_commend_item {
    width: 25%;
    padding: 20px;
  }

  .msg_line1 {
    display: flex;
  }

  .msg_line1 img {
    width: 80px;
    border-radius: 20px;
  }

  .more_btn {
    font-size: 12px;
    border: 1px solid #ddd;
    width: fit-content;
    padding: 5px 15px;
    background: white;
    border-radius: 10px;
    position: relative;
    top: -30px;
    /* right: 0px; */
    float: right;
    right: 40px;
  }

  .video_commend_artist {
    display: flex;
    align-items: center;
  }

  .video_commend_artist>img {
    width: 15px;
    height: 15px;
    margin-right: 2px;
    top: 1px;
    position: relative;
  }

  .video_info_2 {
    display: flex;
    justify-content: space-between;
    margin: 10px 0 0;
    align-items: center;
    font-size: 13px;
  }

  .video_commend_info {
    padding: 10px 20px;
  }

  .video_commend_item {
    width: 30%;
  }

  .swiper-button-next {
    right: 0px;
  }

  :root {
    --swiper-theme-color: #ffab11;
  }

  .pic_commend_title {
    margin: 10px 5px;
  }

  .pic_commend_artist {
    font-size: 14px;
    margin-left: 5px;
    margin-bottom: 5px;
  }

  .intro {
    font-size: 14px;
    margin: 15px 0 30px;
  }

  .pic_commend_item {
    width: 30%;
    background-color: #f6f6f6 !important;
    border: none !important;
  }

  .to_fiction {
    border: 1px solid #ddd;
    padding: 5px 0;
    text-align: center;
    border-radius: 10px;
    font-size: 14px;
    width: 60%;
    background: white;
    margin: auto;
    margin-top: 40px;
  }

  #work_common {
    display: flex;
    border-top: 1px solid #ddd;
    align-items: center;
  }

  .others_commend {
    font-size: 13px;
    padding: 10px 0;
  }

  .commend_num {
    width: 10%;
    text-align: center;
  }

  .commend_info {
    width: 80%;
    margin-right: 10px;
  }

  .work_top3 .commend_title {
    font-size: 17px;
  }

  .work_top3 .commend_author {
    font-size: 14px;
    margin-bottom: 5px;
  }

  .commend_author {
    color: #888;
    margin-top: 5px;
  }

  .work_top3 .commend_abstract {
    font-size: 14px;
  }

  .work_top3>.commend_num {
    font-size: 20px;
  }

  .work_top3 {
    font-size: 14px;
    padding: 15px 0;
  }

  .work_top3>div {
    display: inline-block;
  }

  #instant_c {
    margin-bottom: 40px;
    font-size: 18px;
  }

  .to_btn {
    border: 1px solid #ddd;
    padding: 5px 0;
    text-align: center;
    border-radius: 10px;
    margin: 20px 0;
  }

  .work1_msg {
    padding: 10px 0;
    border-top: 1px solid #ddd;
  }

  #work1_info>#work_kudos {
    margin: 10px 0;
  }

  #work_commend {
    margin: 40px 0;
  }

  #work_commend #work1 {
    border-radius: 20px;
  }

  #work1_title {
    font-size: 18px;
    margin: 10px 0;

  }

  #work1_info {
    font-size: 13px;
  }

  #commend_page {
    word-wrap: break-word;
  }

</style>
