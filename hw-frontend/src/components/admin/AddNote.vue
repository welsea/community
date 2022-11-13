<template>
  <div>
    <el-form v-if="this.update" :model="update_note" label-width="80px">
      <el-form-item label="标题">
        <el-input class="fic_input" v-model="update_note.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" :row="2" v-model="update_note.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button  @click="updateNote">更新</el-button>
      </el-form-item>
    </el-form>



    <el-form v-else :model="note_form" label-width="80px">
      <el-form-item label="标题">
        <el-input class="fic_input" v-model="note_form.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" :row="2" v-model="note_form.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button  @click="submitNote">提交</el-button>
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
        note_form: {
          title:'',
          content:''
        },
        update_note: {
          title:'',
          content:'',
          _id:''
        },
        update: false
      }
    },
    methods: {
      submitNote() {
        this.$store.dispatch('addNote', {
          note: this.note_form
        })

        this.$router.push({
          path: '/housekeeper'
        })
      },
      updateNote() {
        this.$store.dispatch('updateNote', {
          note: this.update_note
        })
         this.$router.push({
          path: '/housekeeper'
        })
      },
      fetchData() {
        if (this.$route.query.id != null) {
          this.update = true;
          this.update_note.title = this.note.title;
          this.update_note.content = this.note.content;
          this.update_note._id = this.note._id;
        }
      }
    },
    created() {
      if (this.$route.query.id != null) {
        this.$store.dispatch('noteById', {
          id: this.$route.query.id
        });
        this.fetchData();
        // console.log('fec')
      }
    },
    computed: {
      note() {
        return this.$store.getters.noteById;
      },
    },
  }

</script>

<style>
  .fic_input {
    width: 200px;
  }

</style>
