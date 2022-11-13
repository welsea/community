<template>
  <div>
    <div id="title1"><i class="el-icon-search"></i> 找到{{fics.length+imgs.length+videos.length}}条结果</div>
    <div id="line"></div>
    <el-row :gutter="24" type="flex" justify="space-between">
      <el-col :span="8">
        <el-radio-group v-model="radio" fill="#ffab11" @change="radioChange">
          <el-radio-button class="work-select-item" label="1">文区</el-radio-button>
          <el-radio-button class="work-select-item" label="2">图区</el-radio-button>
          <el-radio-button class="work-select-item" label="3">视频区</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <div class="search_results">
    
      <div v-if="select_work==1">
        <div v-if="fics.length==0">
          未找到符合搜索结果的【文区】内容
        </div>
        <div v-else>
          <div class="result_item" v-for="(fic,i) in fics" :key="fic._id">
            <div style="width:5%;text-align:center"> {{i+1}}</div>
            <div style="width:80%">
              <div @click="jumpToItem(fic._id)">{{fic.name}}</div>
              <div style="font-size:14px;margin:10px 0">{{fic.author}}</div>
            </div>
            <div style="width:10%">
              <div id="work_kudos">
                <i class="icon icon-font icon-aixin1 aixin_fill"></i>
                <div id="kudos_num">{{fic.kudos}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="select_work==2">
        <div v-if="imgs.length==0">
          未找到符合搜索结果的【图区】内容
        </div>
        <div v-else>
          <el-row :gutter="24">
            <el-col :span="8" v-for="img in imgs" :key="img._id">
              <div style="marginBottom:30px">
                <el-card :body-style="{ padding: '0px' }">
                  <img @click="jumpToItem(img._id)" :src="img.url" class="img_image">
                  <div style="padding: 14px;">
                    <span @click="jumpToItem(img._id)">{{img.name}}</span>
                    <div id="work_kudos">
                      <i class="icon icon-font icon-aixin1 aixin_fill"></i>
                      <div id="kudos_num">{{ img.kudos }}</div>
                    </div>
                    <div class="bottom clearfix">
                      <div class="author_info">
                        <i class="icon icon-font icon-account-fill" style="font-size:20px"></i>
                        <span>{{ img.artist }}</span>
                      </div>
                    </div>
                  </div>
                </el-card>
              </div>
            </el-col>
          </el-row>
        </div>

      </div>

      <div v-else>
        <div v-if="videos.length==0">
          未找到符合搜索结果的【视频区】内容
        </div>
        <div v-else>
          <el-card style="margin-bottom: 30px;padding:10px;" v-for="(item,i) in videos" :key="i"
            class="video_commend_item">
            <el-row class="video_item">
              <el-col :span="6">
                <div id="video_img">
                  <img :src="item.face" class="video_image">
                </div>
              </el-col>
              <el-col :span="17">
                <div id="info">
                  <div id="work_name" class="single_line">
                    <a :href="'https://www.bilibili.com/video/'+item.bv" target="_blank">{{item.name}}</a>
                  </div>
                  <div id="work_author">{{item.owner}}</div>
                  <!--       <div id="work_kudos">
                                        <i class="icon icon-font icon-aixin1 aixin_fill"></i>
                                        <div id="kudos_num">{{item.aid}}</div>
                                    </div>
                                    -->
                  <div class="work_abstract two_line">
                    {{item.desc}}
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </div>

      </div>


    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        radio: '1',
        value: 'time',
        select_work: 1,
        from:''
      }
    },
    methods: {
      radioChange(value) {
        this.select_work = value;
        // if(value==='3')
        //     this.getVideoMsg();
      },
      jumpToItem(id) {
        if (this.select_work === 1) {
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
    created() {

      this.$store.dispatch('findImgs', {
        kw: this.$route.query.kw
      });
      this.$store.dispatch('findFics', {
        kw: this.$route.query.kw
      });
      this.$store.dispatch('findVideos', {
        kw: this.$route.query.kw
      });

    },
    computed: {
      imgs() {
        return this.$store.getters.allImgs;
      },
      fics() {
        return this.$store.getters.allFics;
      },
      videos() {
        return this.$store.getters.allVideos;
      },

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

  .search_results {
    margin: 50px 20px;
  }

  .result_item {
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    padding: 20px 0;
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

  .img_image {
    width: 100%;
    display: block;
    height: 250px;
    -o-object-fit: cover;
    object-fit: cover;
  }

  #video_img {
    width: 240px;
    background: #fff;
    display: inline-block;
    border-radius: 20px;
  }

  .video_image {
    width: 250px;
    display: block;
    height: 150px;
    object-fit: cover;
  }

  .video_item {
    display: flex;
    align-items: center;
  }

</style>
