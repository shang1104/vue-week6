<template>
  這是酷酷的後台
  <router-link to="/admin/products">後台產品列表</router-link> |
  <router-link to="/admin/orders">後台訂單列表</router-link> |
  <router-link to="/">回前台</router-link> |
  <a href="#" @click.prevent="logout">登出</a>
  <hr />
  <RouterView></RouterView>
</template>

<script>
const { VITE_APP_URL } = import.meta.env;
import { RouterView } from "vue-router";
export default {
  components: {
    RouterView,
  },
  methods: {
    logout() {
      document.cookie = `hexToken=; expires=${new Date()}`;
      this.$router.push('/login')
    },
    checkLogin() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      this.$http.defaults.headers.common.Authorization = token;
      //https://vue3-course-api.hexschool.io/v2/api/user/check
      const url = `${VITE_APP_URL}api/user/check`
      this.$http.post(url)
        .then((res) => {
          console.log(res);
          if (res.data.success === false) {
            this.$router.push('/login')
          }
        })
    },
  }, mounted() {
    this.checkLogin();
  }
};
</script>
