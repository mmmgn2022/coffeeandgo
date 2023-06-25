<template>
  <div class="cart">
    <!-- ini nge mindahin data cart ke NavBar pake parameter updateCart agar notif nya sesuai jumlah order dalam cart ini state initial yg kita bikin sendiri bkn nama tabel db-->
    <NavBar :updateCart="cart" />
    <div class="container">
      <!-- breadcrumb -->
      <div class="row mt-4">
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link
                  to="/"
                  class="text-dark"
                  :style="{ textDecoration: 'none' }"
                  >Home</router-link
                >
              </li>
              <li class="breadcrumb-item">
                <router-link
                  to="/beverages"
                  class="text-dark"
                  :style="{ textDecoration: 'none' }"
                  >Beverages</router-link
                >
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                <span style="fontweight: bold"> Cart </span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <h2>
            My
            <strong>Cart</strong>
          </h2>
          <div class="table-responsive mt-3" style="overflowx: auto">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Picture</th>
                  <th scope="col">Beverage</th>
                  <th scope="col">Details</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Total</th>
                  <th scope="col">Cancel</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(cart, index) in cart" :key="cart.id" >
                  <th>{{ index + 1 }}</th>
                  <td>
                    <!-- <img
                      :src="'../assets/images/' + cart.products.picture"
                      class="img-fluid shadow"
                      width="250"
                    /> -->
                    <!-- products karena sesuai nama database json-server -->
                    <img
                      :src="cart.products.picture"
                      class="img-fluid shadow rounded"
                      :style="{
                        minWidth: '200px',
                        width: '200px',
                        height: '200px',
                      }"
                    />
                  </td>
                  <td>
                    <strong>{{ cart.products.name }}</strong>
                  </td>
                  <td>
                    {{ cart.details ? cart.details : "-" }}
                  </td>
                  <td>{{ cart.quantity }}</td>
                  <td>Rp. {{ cart.products.price }}</td>
                  <td>
                    <strong
                      >Rp. {{ cart.products.price * cart.quantity }}</strong
                    >
                  </td>
                  <td align="left" class="text-danger">
                    <!-- hapuscart change to deleteCart -->
                    <i class="bi bi-trash3" @click="deleteCart(cart.id)"></i>
                  </td>
                </tr>
                <tr>
                   <td></td>
                  <td colspan="6" align="right">
                    <!-- totalHarga change to totalPrice -->
                    <strong>Total Price :</strong>
                  </td>
                  <!-- ini untuk total semua dalam cart -->
                  <td align="right">
                    <strong>Rp. {{ totalPrice }}</strong>
                  </td>
                 
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  /* eslint-disable */
  name: "Cart",
  components: {
    NavBar,
  },
  data() {
    return {
      cart: [],
      order: {},
    };
  },
  methods: {
    setCart(data) {
      this.cart = data;
    },
    deleteCart(id) {
      axios
        .delete("http://localhost:3000/carts/" + id)
        .then(() => {
          this.$toast.error("Order deleted", {
            type: "error",
            position: "bottom",
            duration: 3000,
            dismissible: true,
            queue: true,
          });
          axios
            .get("http://localhost:3000/carts")
            .then((response) => {
              this.setCart(response.data);
              console.log(
                "ini isi dari response.data / update dari isi cart :",
                response.data
              );
            })
            .catch((err) =>
              console.log("ini error dari update get data cart :", err)
            );
        })
        .catch((err) => console.log("ini error dari delete data cart :", err));
    },
  },
  // di mounted pas akses page lsg axios get nya jalan
  mounted() {
    axios
      .get("http://localhost:3000/carts")
      .then((response) => {
        this.setCart(response.data);
        console.log("ini isi dari response.data / isi cart :", response.data);
        console.log(
          "Data type of data.products.price:",
          typeof response.data[0].products.price
        );
      })
      .catch((err) => console.log("ini error dari get data cart :", err));
  },
  // computed function itu buat menjumlahkan
  computed: {
    totalPrice() {
      const total = this.cart.reduce(function (items, data) {
        // price dari db, quantity dari fe
        return items + data.products.price * data.quantity;
      }, 0);
      console.log("ini isi dari final total dari fungsi totalPrice :", total); //testing
      return total;
    },
  },
};
</script>

<style></style>
