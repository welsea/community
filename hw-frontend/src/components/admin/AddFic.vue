<template>
  <div>
    <el-form v-if="this.update" class="fic_form" :model="update_fic" label-width="80px">
      <el-form-item label="名字">
        <el-input class="fic_input" v-model="update_fic.name"></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input class="fic_input" v-model="update_fic.author"></el-input>
      </el-form-item>
      <el-form-item label="summary">
        <el-input type="textarea" :rows="4" v-model="update_fic.summary"></el-input>
      </el-form-item>
      <el-form-item label="content">
        <editor api-key="qek0hdy0biduc64wdsnwqdgw1ppvote0x0n08pt25lukvqmh" v-model="update_fic.content" :init="{
            height:500
          }"></editor>
      </el-form-item>
      <el-form-item>
        <el-button  @click="updateFic">提交</el-button>
      </el-form-item>
    </el-form>



    <el-form v-else class="fic_form" :model="fic_form" label-width="80px">
      <el-form-item label="名字">
        <el-input class="fic_input" v-model="fic_form.name"></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input class="fic_input" v-model="fic_form.author"></el-input>
      </el-form-item>
      <el-form-item label="summary">
        <el-input type="textarea" :rows="4" v-model="fic_form.summary"></el-input>
      </el-form-item>
      <el-form-item label="content">
        <editor api-key="qek0hdy0biduc64wdsnwqdgw1ppvote0x0n08pt25lukvqmh" v-model="fic_form.content" :init="{
            height:500
          }"></editor>
      </el-form-item>
      <el-form-item>
        <el-button  @click="submitFic">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import Editor from '@tinymce/tinymce-vue'
  // <el-input type="textarea" :rows="20" v-model="fic_form.content"></el-input>
  export default {
    components: {
      'editor': Editor
    },
    data() {
      return {
        fic_form: {
          name: '',
          author: '',
          summary: '',
          content: '',
          kudos: 0
        },
        update_fic: {
          name: '',
          author: '',
          summary: '',
          content: '',
          kudos: 0,
          _id:''
        },
        update: false
      }
    },
    methods: {
      submitFic() {
        this.$store.dispatch('addFic', {
          fic: this.fic_form
        })
        // console.log(this.fic_form)

        this.$router.push({
          path: '/housekeeper'
        })
      },
      updateFic() {
        this.$store.dispatch('updateFic', {
          fic: this.update_fic
        });
         this.$router.push({
          path: '/housekeeper'
        })
      },
      fetchData() {
        if (this.$route.query.id != null) {
          this.update = true;
          this.update_fic.name = this.fic.name;
          this.update_fic.author = this.fic.author;
          this.update_fic.summary = this.fic.summary;
          this.update_fic.content = this.fic.content;
          this.update_fic.kudos = this.fic.kudos;
          this.update_fic._id = this.fic._id;
        }
      }
    },
    created() {
      if (this.$route.query.id != null) {
        this.$store.dispatch('ficById', {
          id: this.$route.query.id
        });
        this.fetchData();
      }
    },
    computed: {
      fic() {
        return this.$store.getters.ficById;
      },
    },
  }

</script>

<style>
  .fic_input {
    width: 200px;
  }

</style>
