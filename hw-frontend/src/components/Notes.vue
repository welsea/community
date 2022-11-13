<template>
  <div>
    <div id="title1">版务</div>
    <div id="line"></div>
    <div id="textSection">
      <div class="note_item" v-for="item in notes" :key="item._id">
        <div class="note_title">{{item.title}}</div>
        <div>{{item.content}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'notes_list',
    data() {
      return {
        activeName: '',
      }
    },
    methods: {

    },
    created() {
      this.$store.dispatch('allNotes');

    },
    computed: {
      notes() {
        return this.$store.getters.allNotes;
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

  .note_item {
    background: white;
    padding: 20px;
    border-radius: 10px;
  }

  .note_title {
    font-size: 20px;
    border-bottom: 1px solid #ddd;
    margin: 0 0 10px;
  }

</style>
