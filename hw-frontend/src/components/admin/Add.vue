<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="管理文章" name="fic">
        <router-link to='/add_fic'>添加文章</router-link>
        <div class="img_list">
          <el-row :guter="20" style="padding:0 20px">
            <el-col :span="10">名字</el-col>
            <el-col :span="6">作者</el-col>
            <el-col :span="6" style="text-align:center">操作</el-col>
          </el-row>
          <div class="img_item" v-for="fic in fics" :key="fic._id">
            <el-row :gutter="20">
              <el-col :span="10">{{fic.name}}</el-col>
              <el-col :span="6">{{fic.author}}</el-col>
              <el-col :span="6" style="text-align:center">
                <el-button @click="updateFic(fic._id)" plain>edit</el-button>
                <el-button @click="deleteFic(fic._id)" type="warning" plain>delete</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="管理图片" name="img">
        <router-link to="/add_img">添加图片</router-link>
        <div class="img_list">
          <el-row :guter="20" style="padding:0 20px">
            <el-col :span="6">名字</el-col>
            <el-col :span="6">作者</el-col>
            <el-col :span="6">图片</el-col>
            <el-col :span="6" style="text-align:center">操作</el-col>
          </el-row>
          <div class="img_item" v-for="img in imgs" :key="img._id">
            <el-row :gutter="20">
              <el-col :span="6">{{img.name}}</el-col>
              <el-col :span="6">{{img.artist}}</el-col>
              <el-col :span="6"><img class="img" :src="img.url" alt=""></el-col>
              <el-col :span="6" style="text-align:center">
                <el-button @click="updateImg(img._id)" plain>edit</el-button>
                <el-button @click="deleteImg(img._id)" type="warning" plain>delete</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="管理视频" name="video">
        <router-link to="/add_vid">添加视频</router-link>
        <div style="margin:20px 0">* 推荐的排序是由大至小</div>
        <div class="img_list">
          <el-row :guter="20" style="padding:0 20px">
            <el-col :span="6">名字</el-col>
            <el-col :span="6">up主</el-col>
            <el-col :span="6">推荐排序</el-col>
            <el-col :span="6" style="text-align:center">操作</el-col>
          </el-row>
          <div class="img_item" v-for="vid in videos" :key="vid._id">
            <el-row :gutter="20">
              <el-col :span="6">{{vid.name}}</el-col>
              <el-col :span="6">{{vid.owner}}</el-col>
              <el-col :span="6">{{vid.kudos}}</el-col>
              <el-col :span="6" style="text-align:center">
                <el-button @click="updateVid(vid._id)" plain>edit</el-button>
                <el-button @click="deleteVid(vid._id)" type="warning" plain>delete</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-tab-pane>
      </el-tab-pane>
      <el-tab-pane label="管理版务" name="note">
        <router-link to="/add_note">添加版务</router-link>
        <div class="img_list">
          <el-row :guter="20" style="padding:0 20px">
            <el-col :span="16">名字</el-col>
            <el-col :span="6" style="text-align:center">操作</el-col>
          </el-row>
          <div class="img_item" v-for="item in notes" :key="item._id">
            <el-row :gutter="20">
              <el-col :span="16">{{item.title}}</el-col>
              <el-col :span="6" style="text-align:center">
                <el-button @click="updateNote(item._id)" plain>edit</el-button>
                <el-button @click="deleteNote(item._id)" type="warning" plain>delete</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-tab-pane>
      </el-tab-pane>
      <el-tab-pane label="管理留言" name="msg">
        <div class="img_list">
          <el-row :guter="20" style="padding:0 20px">
            <el-col :span="6">名字</el-col>
            <el-col :span="10">内容</el-col>
            <el-col :span="6" style="text-align:center">操作</el-col>
          </el-row>
          <div class="img_item" v-for="msg in msgs" :key="msg._id">
            <el-row :gutter="20">
              <el-col :span="6">{{msg.name}}</el-col>
              <el-col :span="10"><div v-html="msg.content"></div></el-col>
              <el-col :span="6" style="text-align:center">
                <el-button @click="deleteMsg(msg._id)" type="warning" plain>delete</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'fic',
      }
    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
      },

      //img
      updateImg(key) {
        // console.log(key)
        this.key = key;
        this.$router.push({
          path: '/add_img',
          query: {
            id: this.key
          }
        })
      },
      deleteImg(key) {
        this.key = key;
        this.$store.dispatch('removeImg', {
          imgId: this.key
        });
      },

      //fic
      updateFic(key) {
        this.key = key;
        this.$router.push({
          path: '/add_fic',
          query: {
            id: this.key,
          }
        })
      },
      deleteFic(key) {
        this.key = key;
        this.$store.dispatch('removeFic', {
          ficId: this.key
        });
      },

      //vid
      updateVid(key) {
        this.key = key;
        this.$router.push({
          path: '/add_vid',
          query: {
            id: this.key,
          }
        })
      },
      deleteVid(key) {
        this.key = key;
        this.$store.dispatch('removeVid', {
          vidId: this.key
        });
      },

      //note
      updateNote(key) {
        this.key = key;
        this.$router.push({
          path: '/add_note',
          query: {
            id: this.key,
          }
        })
      },
      deleteNote(key) {
        this.key = key;
        this.$store.dispatch('removeNote', {
          noteId: this.key
        });
      },

      //msg
      deleteMsg(key) {
        this.key = key;
        this.$store.dispatch('removeMsg', {
          msgId: this.key
        });
      },
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
      notes() {
        return this.$store.getters.allNotes;
      },
      msgs() {
        return this.$store.getters.allMsgs;
      },
      
    },
    created() {
      this.$store.dispatch('allImgs');
      this.$store.dispatch('allFics');
      this.$store.dispatch('allVideos');
      this.$store.dispatch('allNotes');
      this.$store.dispatch('allMsgs');


    },
  }

</script>

<style>
  .img_form {
    border: 1px solid #ddd;
    margin: 20px 0;
    padding: 20px;
    border-radius: 20px;
  }

  .img_input {
    width: 200px;
  }

  .img_list {
    background: white;
    padding: 10px 20px;
    border-radius: 20px;
  }

  .img_item {
    margin: 20px 0;
    border-top: 1px solid #ddd;
    padding: 10px 20px;
  }

  .img {
    width: 50px;
    height: 50px;
    display: block;
    -o-object-fit: cover;
    object-fit: cover;
  }

</style>
