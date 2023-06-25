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
                <tr v-for="(cart, index) in cart" :key="cart.id">
                  <th>{{ index + 1 }}</th>
                  <td>
                    <!-- products karena sesuai nama database json-server -->
                    <img
                      :src="getImageSource()"
                      class="img-fluid rounded"
                      alt="..."
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
                    <i class="bi bi-trash3" @click="deleteCart(cart.id)"></i>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td colspan="6" align="right">
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

      <!-- Form Checkout -->
      <div class="row justify-content-end">
        <div class="col-md-4">
          <form class="mt-4" v-on:submit.prevent>
            <div class="form-group">
              <label for="name">Name :</label>
              <input
                type="text"
                class="form-control mt-1"
                v-model="order.name"
              />
            </div>
            <div class="form-group mt-4">
              <label for="tableNumber">Table Number :</label>
              <input
                type="text"
                class="form-control mt-1"
                v-model="order.tableNumber"
              />
            </div>

            <button
              type="submit"
              class="btn btn-warning float-right text-white mt-4"
              @click="checkOut"
            >
              <i class="bi bi-cart-check"></i> Check Out
            </button>
          </form>
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
    getImageSource() {
      if (this.cart[0].products.picture && this.cart[0].products.picture.includes("http")) {
        return this.cart[0].products.picture;
      } else {
        return "../assets/images/" + this.cart[0].products.picture;
      }
    },
    deleteCart(id) {
      axios
        .delete("http://localhost:3000/carts/" + id) //params
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
              // console.log(
              //   "ini isi dari response.data / update dari isi cart :",
              //   response.data
              // ); // testing
            })
            .catch((err) =>
              console.log("ini error dari update get data cart :", err)
            );
        })
        .catch((err) => console.log("ini error dari delete data cart :", err));
    },
    checkOut() {
      if (!this.order.name && !this.order.tableNumber) {
        this.$toast.error(" Fill the Name and Table Number field", {
          type: "error",
          position: "bottom",
          duration: 3000,
          dismissible: true,
          queue: true,
        });
        return;
      }
      this.order.cart = this.cart;
      axios
        .post("http://localhost:3000/orders", this.order) //post new data di db orders
        .then(() => {
          // delete data orders from db carts
          this.cart.map(function (item) {
            return axios
              .delete("http://localhost:3000/carts/" + item.id)
              .catch((err) =>
                console.log(
                  "ini error dari delete semua data order cart setelah checkout :",
                  err
                )
              );
          });
          console.log("Check out success"); //testing
          this.$toast.success("Check out success", {
            type: "success",
            position: "bottom",
            duration: 3000,
            dismissible: true,
            queue: true,
          });
          // redirect to checkout success page
          this.$router.push("/checkout"); // page barunya path nya ini, nama pagenya CheckOut.vue
        });
    },
  },
  // di mounted pas akses page lsg axios get nya jalan
  mounted() {
    axios
      .get("http://localhost:3000/carts")
      .then((response) => {
        this.setCart(response.data);
        console.log("ini isi dari response.data / isi cart :", response.data); //testing
        // console.log(
        //   "Data type of data.products.price:",
        //   typeof response.data[0].products.price
        // ); // testing
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
      // console.log("ini isi dari final total dari fungsi totalPrice :", total); //testing
      return total;
    },
  },
};
</script>

<style></style>
