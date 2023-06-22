<template>
  <div class="beverage-detail">
    <NavBar />
    <div class="container">
      <!-- breadcrumb -->
      <div class="row mt-4">
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-dark">Home</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/beverages" class="text-dark"
                  >Beverages</router-link
                >
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Beverage Detail
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-md-6">
          <!-- ada yg aneh disini kalo ternary dia gamau (uncaught runtime error : $data.product.picture is undefined) tp kalau 1 per 1 mau, memang agak beda sama cardproduct itu component yg dikeluarkan di home sama bevergae list page, kalo di beverage detail page ini axiosnya lsg di file yg sama   -->

          <!-- <img
            :src="
              product.picture.includes('http')
                ? product.picture
                : '../assets/images/' + product.picture
            "
            class="img-fluid shadow"
            alt="..."
          /> -->

          <img
            :src="product.picture"
            class="img-fluid shadow"
            alt="..."
          />
          <!-- <img :src="'../assets/images/' + product.picture" class="img-fluid shadow" alt="..." /> -->
        </div>
        <div class="col-md-6">
          <h2>
            <strong>{{ product.name }}</strong>
          </h2>
          <hr />
          <h4>
            Price :
            <strong>Rp. {{ product.price }}</strong>
          </h4>
          <form class="mt-4" v-on:submit.prevent>
            <div class="form-group">
              <!-- jumlah_pemesanan change to quantity -->
              <label for="quantity">Quantity</label>
              <input
                type="number"
                class="form-control mt-1"
                v-model="order.quantity"
              />
            </div>
            <div class="form-group mt-4">
              <!-- keterangan change to details -->
              <label for="details">Order Details</label>
              <textarea
                v-model="order.details"
                class="form-control mt-1"
                rows="5"
                placeholder="Example: large, less sugar, cold, less ice, extra shot, grass jelly..."
              ></textarea>
            </div>
            <!-- pemesanan change to order -->
            <button
              type="submit"
              class="btn btn-warning mt-4 text-white"
              @click="order"
            >
              <i class="bi-cart"></i> Order
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
  name: "BeverageDetail",
  components: {
    NavBar,
  },
  data() {
    return {
      product: {},
      order: {},
    };
  },
  methods: {
    setProduct(data) {
      this.product = data;
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/products/" + this.$route.params.id)
      .then((response) => {
        this.setProduct(response.data);
        console.log(
          "ini isi dari response.data get products by params id",
          response.data
        );
      })
      .catch((error) => console.log(error));
  },
};
</script>

<style></style>
