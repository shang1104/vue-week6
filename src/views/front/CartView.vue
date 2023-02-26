<template>
  <table class="table align-middle">
    <thead>
      <tr>
        <th></th>
        <th>品名</th>
        <th style="width: 150px">數量/單位</th>
        <th>單價</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="cart.carts">
        <tr v-for="item in cart.carts" :key="item.id">
          <td>
            <button type="button" class="btn btn-outline-danger btn-sm" @click="deleteItem(item)" :disabled="item.id === loadingItem">
              <i class="fas fa-spinner fa-pulse"></i> x </button>
          </td>
          <td> {{ item.product.title }} <div class="text-success"> 已套用優惠券 </div>
          </td>
          <td>
            <div class="input-group input-group-sm">
              <select name="" id="" class="form-control" v-model="item.qty" @change="updateCartItem(item)" :disabled="item.id === loadingItem">
                <option :value="i" v-for="i in 20" :key="i +'123'">{{ i }}</option>
              </select>
            </div>
          </td>
          <td class="text-end">
            <small class="text-success">折扣價：</small> {{ item.total }}
          </td>
        </tr>
      </template>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3" class="text-end">總計</td>
        <td class="text-end">{{ cart.total }}</td>
      </tr>
      <tr>
        <td colspan="3" class="text-end text-success">折扣價</td>
        <td class="text-end text-success">{{ cart.final_total }}</td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default {
  data() {
    return {
      products: [],
      productId: '',
      cart: {},
      loadingItem: '', //存id
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',

      }
    }
  },
  methods: {
    //取得購物車
    getCarts() {
      this.$http.get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart`)
        .then(res => {
          console.log('購物車', res.data);
          this.products = res.data.products
          this.cart = res.data.data
        })
    },
    //修改購物車
    updateCartItem(item) { //購物車的id , 產品的id
      const data = {
        product_id: item.product.id,
        qty: item.qty,
      };
      this.loadingItem = item.id
      // console.log(data, item.id);
      this.$http.put(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart/${item.id}`, { data })
        .then(res => {
          console.log('更新購物車', res.data);
          this.getCarts();
          this.loadingItem = '';
        })
    },
    deleteItem(item) { //購物車的id , 產品的id
      this.$http.delete(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart/${item.id}`)
        .then(res => {
          console.log('刪除購物車', res.data);
          this.getCarts();
        })
    },
    deleteAll() {
      this.$http.delete(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/carts`)
        .then(res => {
          console.log('清空購物車', res.data);
          this.getCarts();
        })
    },
    onSubmit() {
      console.log(`有跳出onSubmit`);
    },
    //電話認證
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需為正確的手機號碼格式'
    },
  },
  mounted() {
    this.getCarts();
  }
}
</script>