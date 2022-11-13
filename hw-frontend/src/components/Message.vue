<template>
  <div>
    <div id="title1">留言</div>
    <div id="line"></div>
    <div id="enter_msg">
      <div style="margin:10px 5px;">写下你的留言</div>
      <div>
        <el-form :model="newMsg" label-width="80px">
          <el-form-item label="昵称">
            <el-input style="width:200px" v-model="newMsg.name" maxlength="20" show-word-limit placeholder="请输入你的昵称">
            </el-input>
          </el-form-item>
          <el-form-item label="选择头像">
            <el-radio-group v-model="newMsg.avatar">
              <el-radio label="https://s1.ax1x.com/2020/07/24/UjJBJP.jpg">
                <img class="avatar" src="https://s1.ax1x.com/2020/07/24/UjJBJP.jpg">
              </el-radio>
              <el-radio label="https://s1.ax1x.com/2020/07/24/UjJ0it.jpg">
                <img class="avatar" src="https://s1.ax1x.com/2020/07/24/UjJ0it.jpg" alt="">
              </el-radio>
              <el-radio label="https://s1.ax1x.com/2020/07/24/UjJdII.jpg">
                <img class="avatar" src="https://s1.ax1x.com/2020/07/24/UjJdII.jpg" alt="">
              </el-radio>
              <el-radio label="https://s1.ax1x.com/2020/07/24/UjJadA.jpg">
                <img class="avatar" src="https://s1.ax1x.com/2020/07/24/UjJadA.jpg" alt="">
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="内容">
            <editor api-key="qek0hdy0biduc64wdsnwqdgw1ppvote0x0n08pt25lukvqmh" v-model="newMsg.content" :init="{
            height:300
          }"></editor>
          </el-form-item>
          <el-form-item>
            <el-button @click="submitMsg" style="float:right;">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="msg_list">
      <div id="line" style="margin-bottom: 40px;"></div>
      <el-card style="margin-bottom:30px" v-for="item in msgs" :key="item._id" :body-style="{ padding: '0px' }"
        class="msg_item">
        <div class="msg_line_2_2">
          <img :src="item.avatar" alt="">
          <div style="font-size:17px;margin-left:5px">{{item.name}}</div>
        </div>
        <div>
          <div v-html="item.content"></div>
        </div>
        <!--
          :class="{ 'msg_ct':item.show_all}"
        <div @click="item.show_all != item.show_all"  style="font-size:14px;color:#888">
          <i v-if="item.show_all">点击展开</i>
          <i v-else>点击收起</i>
        </div>
        -->

        <div id="work_kudos" class="msg_kudos" @click="changeStatus(item._id)">
          <i class="icon icon-font icon-aixin1"></i>
          <div id="kudos_num">{{item.kudos}}</div>
        </div>
      </el-card>
    </div>
  </div>

</template>

<script>
  import Editor from '@tinymce/tinymce-vue'

  export default {
    components: {
      'editor': Editor
    },
    data() {
      return {
        newMsg: {
          name: '',
          content: '',
          avatar: '',
          kudos: 0
        },
        update_kudos: {
          name: '',
          content: '',
          avatar: '',
          kudos: 0,
          _id: ''
        }
      }
    },
    methods: {
      submitMsg() {
        this.$store.dispatch('addMsg', {
          msg: this.newMsg
        })
        // console.log(this.newMsg)
        location.reload();
      },
      unfold(id) {
        for (var i = 0; i < this.msgs.length; i++) {
          if (this.msgs[i]._id == id) {
            this.msgs[i].show_all = !this.msgs[i].show_all;
          }
        }
      },
      changeStatus(id) {
        for (var i = 0; i < this.msgs.length; i++) {
          if (this.msgs[i]._id == id) {

            //向后端更新kudos
            this.update_kudos.name = this.msgs[i].name;
            this.update_kudos.content = this.msgs[i].content;
            this.update_kudos.avatar = this.msgs[i].avatar;
            this.update_kudos._id = this.msgs[i]._id;

            this.update_kudos.kudos = this.msgs[i].kudos + 1;

            this.$store.dispatch('updateMsg', {
              msg: this.update_kudos
            });

          }
        }
      },
      changeMsg() {
        for (var i = 0; i < this.msgs.length; i++) {
          // this.msg_plus[i].name=this.msgs[i].name;
          // this.msg_plus[i].avatar=this.msgs[i].avatar;
          // this.msg_plus[i].content=this.msgs[i].content;
          // this.msg_plus[i]._id=this.msgs[i]._id;
          // this.msg_plus[i].kudos=this.msgs[i].kudos;
          this.msgs[i].click_kudos = false;
          this.msgs[i].show_all = true
        }
        // console.log(this.msgs[0].name)
        // console.log(this.msgs)
      }
    },
    computed: {
      msgs() {
        return this.$store.getters.allMsgs;
      }
    },
    watch: {
      "msgs": function () {
        this.changeMsg()
      }
    },
    created() {
      this.$store.dispatch('allMsgs');

    },
  }

</script>
<style>
  .msg_list {
    padding: 0 30px;
  }

  #title1 {
    font-size: 25px;
    text-decoration: solid;
  }

  #line {
    height: 1px;
    background: #ddd;
    margin: 15px 0;
  }

  #enter_msg {
    margin: 50px 30px;
  }

  .msg_line_2_2 {
    display: flex;
    padding: 15px 0;
    align-items: center;
  }

  .msg_line_2_2 img {
    width: 50px;
    border-radius: 50px;
    border: 1px solid #ddd;
  }

  .msg_item {
    padding: 20px;
  }

  .msg_line_1 {
    font-size: 20px;
  }

  .msg_line_1 img {
    width: 40px;
    border-radius: 20px;
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

  .msg_kudos {
    float: right;

  }

  .avatar {
    width: 50px;
    border-radius: 50px;
  }

  .msg_ct {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    overflow: hidden;
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
  }

  .msg_ct_full {}

</style>
