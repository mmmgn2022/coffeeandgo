<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container">
      <a class="navbar-brand" href="#">
        <img class="logo" src="../assets/images/coffeeandgo_logo.png" alt="" />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/"
              >Home<span class="sr-only"></span
            ></router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/beverages"
              >Beverages</router-link
            >
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/cart"
              >Cart
              <i class="bi-cart"></i>
              <span class="badge bg-success ms-2"> {{ updateCart ? updateCart.length : sumOrder.length }} </span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
export default {
  name: "NavBar",
  data() {
    return {
      sumOrder: [],
    };
  },
  props: ["updateCart"],
  methods: {
    setCountOrder(data) {
      this.sumOrder = data;
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/carts") // hitung banyaknya order di DB carts (bukan dr jumlah total quantity)
      .then((response) => {
        this.setCountOrder(response.data);
        // console.log(
        //   "ini isi dari jumlah order dapat dari cart di navbar :",
        //   response.data
        // ); // testing
      })
      .catch((err) =>
        console.log("ini error dari jumlah order dapat dari cart di navbar :", err)
      );
  },
};
</script>

<style>
.logo {
  margin-left: 10px;
  width: 40px;
  height: 40px;
}
</style>
