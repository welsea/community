<template>
  <div>
    <el-form v-if="this.update" :model="update_video" label-width="80px">
      <el-form-item label="名字">
        <el-input class="fic_input" v-model="update_video.name"></el-input>
      </el-form-item>
      <el-form-item label="up">
        <el-input class="fic_input" v-model="update_video.owner"></el-input>
      </el-form-item>
      <el-form-item label="bv">
        <el-input  class="fic_input" v-model="update_video.bv"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input type="textarea" :row="2" v-model="update_video.desc"></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <el-input v-model="update_video.face"></el-input>
        <img style="width:500px" :src="update_video.face" />
      </el-form-item>
      <el-form-item label="是否推荐">
        <el-input class="fic_input" v-model="update_video.kudos"></el-input>
        <div>推荐页按照数字从大至小排序</div>
      </el-form-item>
      <el-form-item>
        <el-button @click="updateVideo">更新</el-button>
      </el-form-item>
    </el-form>



    <el-form v-else :model="video_form" label-width="80px">
     <el-form-item label="名字">
        <el-input class="fic_input" v-model="video_form.name"></el-input>
      </el-form-item>
      <el-form-item label="up">
        <el-input class="fic_input" v-model="video_form.owner"></el-input>
      </el-form-item>
      <el-form-item label="bv">
        <el-input class="fic_input" v-model="video_form.bv"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input type="textarea" :row="2" v-model="video_form.desc"></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <el-input v-model="video_form.face"></el-input>
        <img style="width:500px" :src="video_form.face" />
      </el-form-item>
      <el-form-item label="是否推荐">
        <el-input class="fic_input" v-model="video_form.kudos"></el-input>
        <div>推荐页按照数字从大至小排序</div>

      </el-form-item>
      <el-form-item>
        <el-button @click="submitVideo">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
//   import Editor from '@tinymce/tinymce-vue'
  // <el-input type="textarea" :rows="20" v-model="fic_form.content"></el-input>
  export default {
    components: {
    //   'editor': Editor
    },
    data() {
      return {
        video_form: {
          name:'',
          owner:'',
          bv:'',
          desc:'',
          face:'',
          kudos:0
        },
        update_video: {
          name:'',
          owner:'',
          bv:'',
          desc:'',
          face:'',
          kudos:0,
          _id:''
        },
        update: false
      }
    },
    methods: {
      submitVideo() {
        this.$store.dispatch('addVideo', {
          video: this.video_form
        })

        this.$router.push({
          path: '/housekeeper'
        })
      },
      updateVideo() {
        this.$store.dispatch('updateVideo', {
          video: this.update_video
        })
         this.$router.push({
          path: '/housekeeper'
        })
      },
      fetchData() {
        if (this.$route.query.id != null) {
          this.update = true;
          this.update_video.name = this.video.name;
          this.update_video.desc = this.video.desc;
          this.update_video.face = this.video.face;
          this.update_video.bv = this.video.bv;
          this.update_video.owner = this.video.owner;
          this.update_video.kudos = this.video.kudos;
          this.update_video._id = this.video._id;
        }
      }
    },
    created() {
      if (this.$route.query.id != null) {
        this.$store.dispatch('videoById', {
          id: this.$route.query.id
        });
        this.fetchData();
        // console.log('fec')
      }
    },
    computed: {
      video() {
        return this.$store.getters.videoById;
      },
    },
  }

</script>

<style>
  .fic_input {
    width: 200px;
  }

</style>
