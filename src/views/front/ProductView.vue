<template>
  這是單一產品
  <h2>{{ product.title }}</h2>
  <img :src="product.imageUrl" alt="" />
</template>
<script>
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default {
  data() {
    return {
      product: {},
    };
  },
  methods: {
    getProducts() {
      // console.log(`this.$route.params`, this.$route.params);
      const { id } = this.$route.params;
      this.$http
        .get(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/product/${id}`)
        .then((res) => {
          this.product = res.data.product;
        });
    },
  },
  mounted() {
    this.getProducts();
  },
};
//做到新增產品單一頁面的練習（老師剛coding玩)
</script>
