import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const API_BASE = 'localhost:3000/api/v1';
Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    //版务
    note: {},
    notes: [],
    //图
    img: {},
    imgs: [],
    //文
    fic: {},
    fics: [],
    //视频
    video: {},
    videos: [],
    //留言
    msg: {},
    msgs: [],

  },
  mutations: {
    ADD_NOTE(state, payload) {
      const {
        note
      } = payload;
      state.notes.push(note);
    },
    ALL_NOTES(state, payload) {
      const {
        notes
      } = payload;

      state.notes = notes;
    },
    REMOVE_NOTE(state, payload) {
      const {
        noteId
      } = payload;
      state.notes = state.notes.filter(
        note => note._id !== noteId
      );
    },
    UPDATE_NOTE(state, payload) {
      const {
        note: newNote
      } = payload;
      state.note = newNote;
      state.notes = state.notes.map(note => {
        if (note._id === newNote._id) {
          return newNote;
        }
        return note;
      });
      state.note = newNote;
    },
    NOTE_BY_ID(state, payload) {
      const {
        note
      } = payload;
      state.note = note;
    },

    //图
    ALL_IMGS(state, payload) {
      const {
        imgs
      } = payload;
      state.imgs = imgs;
    },
    ADD_IMG(state, payload) {
      const {
        img
      } = payload;
      state.imgs.push(img);
    },
    IMG_BY_ID(state, payload) {
      const {
        img
      } = payload;
      state.img = img;
    },
    REMOVE_IMG(state, payload) {
      const {
        imgId
      } = payload;
      state.imgs = state.imgs.filter(
        img => img._id !== imgId
      );
    },
    UPDATE_IMG(state, payload) {
      const {
        img: newImg
      } = payload;
      state.img = newImg;
      state.imgs = state.imgs.map(img => {
        if (img._id === newImg._id) {
          return newImg;
        }
        return img;
      });
      state.img = newImg;
    },


    //fic
    ALL_FICS(state, payload) {
      const {
        fics
      } = payload;
      state.fics = fics;
    },
    ADD_FIC(state, payload) {
      const {
        fic
      } = payload;
      state.fics.push(fic);
    },
    FIC_BY_ID(state, payload) {
      const {
        fic
      } = payload;
      state.fic = fic;
    },
    REMOVE_FIC(state, payload) {
      const {
        ficId
      } = payload;
      state.fics = state.fics.filter(
        fic => fic._id !== ficId
      );
    },
    UPDATE_FIC(state, payload) {
      const {
        fic: newFic
      } = payload;
      state.fic = newFic;
      state.fics = state.fics.map(fic => {
        if (fic._id === newFic._id) {
          return newFic;
        }
        return fic;
      });
      state.fic = newFic;
    },

    //video
    ALL_VIDEOS(state, payload) {
      const {
        videos
      } = payload;
      state.videos = videos;
    },
    ADD_VIDEO(state, payload) {
      const {
        video
      } = payload;
      state.videos.push(video);
    },
    REMOVE_VIDEO(state, payload) {
      const {
        videoId
      } = payload;
      state.videos = state.videos.filter(
        video => video._id !== videoId
      );
    },
    UPDATE_VIDEO(state, payload) {
      const {
        video: newVideo
      } = payload;
      state.video = newVideo;
      state.videos = state.videos.map(video => {
        if (video._id === newVideo._id) {
          return newVideo;
        }
        return video;
      });
      state.video = newVideo;
    },
    VIDEO_BY_ID(state, payload) {
      const {
        video
      } = payload;
      state.video = video;
    },

    //MSG
    ALL_MSGS(state, payload) {
      const {
        msgs
      } = payload;
      state.msgs = msgs;
    },
    ADD_MSG(state, payload) {
      const {
        msg
      } = payload;
      state.msgs.push(msg);
    },
    REMOVE_MSG(state, payload) {
      const {
        msgId
      } = payload;
      state.msgs = state.msgs.filter(
        msg => msg._id !== msgId
      );
    },
    UPDATE_MSG(state, payload) {
      const {
        msg: newMsg
      } = payload;
      state.msg = newMsg;
      state.msgs = state.msgs.map(msg => {
        if (msg._id === newMsg._id) {
          return newMsg;
        }
        return msg;
      });
      state.msg = newMsg;
    },
  },
  getters: {
    allNotes(state) {
      return state.notes;
    },
    noteById(state) {
      return state.note;
    },

    allImgs(state) {
      return state.imgs;
    },
    imgById(state) {
      return state.img;
    },

    allFics(state) {
      return state.fics;
    },
    ficById(state) {
      return state.fic;
    },

    allVideos(state) {
      return state.videos;
    },
    videoById(state) {
      return state.video;
    },

    allMsgs(state) {
      return state.msgs;
    },

  },
  actions: {
    allNotes({
      commit
    }) {
      axios.get(`${API_BASE}/notes`).then(response => {
        // console.log('response', response);
        commit('ALL_NOTES', {
          notes: response.data,
        })
      })
    },
    addNote({
      commit
    }, payload) {
      const {
        note
      } = payload;

      axios.post(`${API_BASE}/note/add`, note).then(response => {
        // console.log('response', response);
        commit('ADD_NOTE', {
          note: response.data,
        })
      })
    },
    noteById({
      commit
    }, payload) {
      const {
        id
      } = payload;
      axios.get(`${API_BASE}/note?id=${id}`).then(response => {
        commit('NOTE_BY_ID', {
          note: response.data
        });
      })
    },
    removeNote({
      commit
    }, payload) {

      const {
        noteId
      } = payload;
      axios
        .delete(`${API_BASE}/note/delete?id=${noteId}`)
        .then(() => {
          commit('REMOVE_NOTE', {
            noteId
          });
          Message({
            message: "删除成功！",
            type: "success"
          });
        })
        .catch(() => {
          Message.error("删除失败！");
        });
    },
    updateNote({
      commit
    }, payload) {

      const {
        note
      } = payload;
      axios
        .put(`${API_BASE}/note/update?id=${note._id}`, note)
        .then(response => {
          commit('UPDATE_NOTE', {
            note: note
          });
          Message({
            message: "更新成功！",
            type: "success"
          });
        })
        .catch(() => {
          Message.error("更新失败！");
        });
    },

    //img
    allImgs({
      commit
    }) {
      axios.get(`${API_BASE}/imgs`).then(response => {
        // console.log('response', response);
        commit('ALL_IMGS', {
          imgs: response.data,
        })
      })
    },
    allImgsSort({
      commit
    }, payload) {
      axios.get(`${API_BASE}/imgs/sort`).then(response => {
        // console.log('response', response);
        commit('ALL_IMGS', {
          imgs: response.data,
        })
      })
    },
    limitImgs({
      commit
    }, payload) {
      axios.get(`${API_BASE}/imgs/commend`).then(response => {
        // console.log('response', response);
        commit('ALL_IMGS', {
          imgs: response.data,
        })
      })
    },
    imgById({
      commit
    }, payload) {
      const {
        id
      } = payload;
      axios.get(`${API_BASE}/img?id=${id}`).then(response => {
        commit('IMG_BY_ID', {
          img: response.data
        });
      })
    },
    findImgs({
      commit
    }, payload) {
      const {
        kw
      } = payload;
      axios.get(`${API_BASE}/imgs/find?kw=${kw}`).then(response => {
        commit('ALL_IMGS', {
          imgs: response.data
        });
      })
    },
    addImg({
      commit
    }, payload) {
      const {
        img
      } = payload;

      axios.post(`${API_BASE}/img/add`, img).then(response => {
        commit('ADD_IMG', {
          img: response.data,
        })
      })
    },
    removeImg({
      commit
    }, payload) {

      const {
        imgId
      } = payload;
      axios
        .delete(`${API_BASE}/img/delete?id=${imgId}`)
        .then(() => {
          // 返回 imgId，用于删除本地对应的商品
          commit('REMOVE_IMG', {
            imgId
          });
          Message({
            message: "删除成功！",
            type: "success"
          });
        })
        .catch(() => {
          Message.error("删除失败！");
        });
    },
    updateImg({
      commit
    }, payload) {

      const {
        img
      } = payload;
      axios
        .put(`${API_BASE}/img/update?id=${img._id}`, img)
        .then(response => {
          commit('UPDATE_IMG', {
            img: img
          });
          Message({
            message: "更新成功！",
            type: "success"
          });
        })
        .catch(() => {
          Message.error("更新失败！");
        });
    },



    //fic
    allFics({
      commit
    }) {
      axios.get(`${API_BASE}/fics`).then(response => {
        commit('ALL_FICS', {
          fics: response.data,
        })
      })
    },
    allFicsSort({
      commit
    }, payload) {
      axios.get(`${API_BASE}/fics/sort`).then(response => {
        commit('ALL_FICS', {
          fics: response.data,
        })
      })
    },
    limitFics({
      commit
    }, payload) {
      axios.get(`${API_BASE}/fics/commend`).then(response => {
        commit('ALL_FICS', {
          fics: response.data,
        })
      })
    },
    ficById({
      commit
    }, payload) {
      const {
        id
      } = payload;
      axios.get(`${API_BASE}/fic?id=${id}`).then(response => {
        commit('FIC_BY_ID', {
          fic: response.data
        });
      })
    },
    findFics({
      commit
    }, payload) {
      const {
        kw
      } = payload;
      axios.get(`${API_BASE}/fics/find?kw=${kw}`).then(response => {
        commit('ALL_FICS', {
          fics: response.data
        });
      })
    },
    addFic({
      commit
    }, payload) {
      const {
        fic
      } = payload;

      axios.post(`${API_BASE}/fic/add`, fic).then(response => {
        commit('ADD_FIC', {
          fic: response.data,
        })
      })
    },
    removeFic({
      commit
    }, payload) {

      const {
        ficId
      } = payload;
      axios
        .delete(`${API_BASE}/fic/delete?id=${ficId}`)
        .then(() => {
          // 返回 ficId，用于删除本地对应的商品
          commit('REMOVE_FIC', {
            ficId
          });
          Message({
            message: "删除成功！",
            type: "success"
          });
        })
        .catch(() => {
          Message.error("删除失败！");
        });
    },
    updateFic({
      commit
    }, payload) {

      const {
        fic
      } = payload;
      axios
        .put(`${API_BASE}/fic/update?id=${fic._id}`, fic)
        .then(response => {
          commit('UPDATE_FIC', {
            fic: fic
          });
          Message({
            message: "更新成功！",
            type: "success"
          });
        })
        .catch(() => {
          Message.error("更新失败！");
        });
    },


    //video
    allVideos({
      commit
    }) {
      axios.get(`${API_BASE}/videos`).then(response => {
        commit('ALL_VIDEOS', {
          videos: response.data,
        })
      })
    },
    allVideosSort({
      commit
    }, payload) {
      axios.get(`${API_BASE}/videos/sort`).then(response => {
        commit('ALL_VIDEOS', {
          videos: response.data,
        })
      })
    },
    limitVideos({
      commit
    }, payload) {
      axios.get(`${API_BASE}/videos/commend`).then(response => {
        commit('ALL_VIDEOS', {
          videos: response.data,
        })
      })
    },
    findVideos({
      commit
    }, payload) {
      const {
        kw
      } = payload;
      axios.get(`${API_BASE}/videos/find?kw=${kw}`).then(response => {
        commit('ALL_VIDEOS', {
          videos: response.data
        });
      })
    },
    videoById({
      commit
    }, payload) {
      const {
        id
      } = payload;
      axios.get(`${API_BASE}/video?id=${id}`).then(response => {
        commit('VIDEO_BY_ID', {
          video: response.data
        });
      })
    },
    addVideo({
      commit
    }, payload) {
      const {
        video
      } = payload;

      axios.post(`${API_BASE}/video/add`, video).then(response => {
        commit('ADD_VIDEO', {
          video: response.data,
        })
      })
    },
    removeVideo({
      commit
    }, payload) {

      const {
        videoId
      } = payload;
      axios
        .delete(`${API_BASE}/video/delete?id=${videoId}`)
        .then(() => {
          // 返回 videoId，用于删除本地对应的商品
          commit('REMOVE_VIDEO', {
            videoId
          });
          Message({
            message: "删除成功！",
            type: "success"
          });
        })
        .catch(() => {
          Message.error("删除失败！");
        });
    },
    updateVideo({
      commit
    }, payload) {

      const {
        video
      } = payload;
      axios
        .put(`${API_BASE}/video/update?id=${video._id}`, video)
        .then(response => {
          commit('UPDATE_VIDEO', {
            video: video
          });
          Message({
            message: "更新成功！",
            type: "success"
          });
        })
        .catch(() => {
          Message.error("更新失败！");
        });
    },



    //msg
    allMsgs({
      commit
    }) {
      axios.get(`${API_BASE}/msgs`).then(response => {
        commit('ALL_MSGS', {
          msgs: response.data,
        })
      })
    },
    allMsgsSort({
      commit
    }, payload) {
      axios.get(`${API_BASE}/msgs/sort`).then(response => {
        commit('ALL_MSGS', {
          msgs: response.data,
        })
      })
    },
    limitMsgs({
      commit
    }, payload) {
      axios.get(`${API_BASE}/msgs/commend`).then(response => {
        commit('ALL_MSGS', {
          msgs: response.data,
        })
      })
    },
    addMsg({
      commit
    }, payload) {
      const {
        msg
      } = payload;

      axios.post(`${API_BASE}/msg/add`, msg).then(response => {
        commit('ADD_MSG', {
          msg: response.data,
        })
      })
    },
    removeMsg({
      commit
    }, payload) {

      const {
        msgId
      } = payload;
      axios
        .delete(`${API_BASE}/msg/delete?id=${msgId}`)
        .then(() => {
          // 返回 msgId，用于删除本地对应的商品
          commit('REMOVE_MSG', {
            msgId
          });
          Message({
            message: "删除成功！",
            type: "success"
          });
        })
        .catch(() => {
          Message.error("删除失败！");
        });
    },
    updateMsg({
      commit
    }, payload) {

      const {
        msg
      } = payload;
      axios
        .put(`${API_BASE}/msg/update?id=${msg._id}`, msg)
        .then(response => {
          commit('UPDATE_MSG', {
            msg: msg
          });
          Message({
            message: "更新成功！",
            type: "success"
          });
        })
        .catch(() => {
          Message.error("更新失败！");
        });
    },
  }
})
