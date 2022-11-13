<template>
  <div>
    <el-container>
      <el-header>
        <el-row :gutter="24" :body-style="{marginBottom:'20px'}">
          <el-col :span="18" :offset="3">
            <el-menu :default-active="this.$route.path" router mode="horizontal" background-color="#f6f6f6"
              active-text-color="#ffd04b">
              <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
                {{ item.navItem}}
              </el-menu-item>
            </el-menu>
            <h1 class="header_h1">
              <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="search_e"
                @keyup.enter.native="search">
              </el-input>
            </h1>
          </el-col>
        </el-row>
      </el-header>
      <el-main class="main-container">
        <el-row :gutter="24">
          <el-col :span="18" :offset="3">
            <router-view></router-view>
          </el-col>
        </el-row>
      </el-main>
      <el-footer id="footer">
        <Footer></Footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import Footer from './Footer.vue'
  export default {
    components: {
      Footer
    },
    data() {
      return {
        navList: [{
            name: '/',
            navItem: "首页"
          },
          {
            name: '/work',
            navItem: "作品库"
          },
          {
            name: '/commend',
            navItem: "推荐"
          },
          {
            name: '/message',
            navItem: "留言"
          },
          {
            name: '/notes',
            navItem: "版务"
          }

        ],
        circleUrl: '.../public/icon.jpg',
        search_e: '',
        activeIndex: '1',
        activeIndex2: '1'
      }
    },
    methods: {
      // handleSelect(key,keyPath){
      //     console.log(key,path)
      // }
      search() {
        this.$router.push({
          path: '/search',
          query: {
            kw: this.search_e
          }
        })

        if (this.$route.path == '/search') {
          location.reload()
        }
      }
    }


  }

</script>

<style>
  .el-menu.el-menu--horizontal {
    border-bottom: none !important;
  }

  .el-menu {
    float: left
  }

  .header_h1 {
    float: right;
  }



  .el-menu-item a {
    text-decoration: none;
  }

  .el-menu-item {
    background-color: #f6f6f6 !important;
  }

  #blankItem {
    width: 23%;
    max-width: 20%;
    cursor: default;
  }

  #otherItem {
    cursor: default;
    opacity: 1 !important;
  }

  #footer {
    background: black;
    height: auto !important;
    padding: 30px 0 50px 0;
  }

  .main-container {
    min-height: 700px;
  }

</style>
