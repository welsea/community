<template>
  <div>
    <el-form v-if="this.update" :model="update_img" label-width="80px">
      <el-form-item label="名字">
        <el-input class="fic_input" v-model="update_img.name"></el-input>
      </el-form-item>
      <el-form-item label="画手">
        <el-input class="fic_input" v-model="update_img.artist"></el-input>
      </el-form-item>
      <el-form-item label="url">
        <el-input v-model="update_img.url"></el-input>
        <img style="width:500px" :src="update_img.url"/>
      </el-form-item>
      <el-form-item>
        <el-button  @click="updateImg">更新</el-button>
      </el-form-item>
    </el-form>



    <el-form v-else :model="img_form" label-width="80px">
      <el-form-item label="名字">
        <el-input class="fic_input" v-model="img_form.name"></el-input>
      </el-form-item>
      <el-form-item label="画手">
        <el-input class="fic_input" v-model="img_form.artist"></el-input>
      </el-form-item>
      <el-form-item label="url">
        <el-input v-model="img_form.url"></el-input>
        <img style="width:500px" :src="img_form.url" alt="">
      </el-form-item>
      <el-form-item>
        <el-button  @click="submitImg">提交</el-button>
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
        img_form: {
          name: '',
          artist: '',
          url:'',
          kudos: 0
        },
        update_img: {
          name: '',
          artist: '',
          url:'',
          kudos: 0,
          _id:''
        },
        update: false
      }
    },
    methods: {
      submitImg() {
        this.$store.dispatch('addImg', {
          img: this.img_form
        })
        // console.log(this.img_form)

        this.$router.push({
          path: '/housekeeper'
        })
      },
      updateImg() {
        this.$store.dispatch('updateImg', {
          img: this.update_img
        })
         this.$router.push({
          path: '/housekeeper'
        })
      },
      fetchData() {
        if (this.$route.query.id != null) {
          this.update = true;
          this.update_img.name = this.img.name;
          this.update_img.artist = this.img.artist;
          this.update_img.kudos = this.img.kudos;
          this.update_img.url=this.img.url;
          this.update_img._id = this.img._id;
        }
      }
    },
    created() {
      if (this.$route.query.id != null) {
        this.$store.dispatch('imgById', {
          id: this.$route.query.id
        });
        this.fetchData();
        console.log('fec')
      }
    },
    computed: {
      img() {
        return this.$store.getters.imgById;
      },
    },
  }

</script>

<style>
  .fic_input {
    width: 200px;
  }

</style>
