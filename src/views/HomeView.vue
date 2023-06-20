<template>
  <NavBar />
    <HeroSection />
  <div class="container home p-4">
    <div class="home">
      <div class="row mt-4">
        <div class="col">
          <h2>
            Best
            <strong>Coffee</strong>
          </h2>
        </div>
        <div class="col">
          <router-link
            to="/beverages"
            class="btn btn-warning text-white float-end"
          >
            See More <i class="bi bi-send"></i>
          </router-link>
        </div>
      </div>
      <div class="row mb-4">
        <!-- Desktop -->
        <div
          class="col-md-3 mt-4 d-none d-lg-block"
          v-for="product in products"
          :key="product.id"
        >
          <CardProduct :product="product" />
        </div>
        <!-- Medium Screen -->
        <div
          class="col-md-6 mt-4 d-lg-none"
          v-for="product in products"
          :key="product.id"
        >
          <CardProduct :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import HeroSection from "@/components/HeroSection.vue";
import CardProduct from "@/components/CardProduct.vue";
import axios from "axios";

export default {
  name: "HomeView",
  components: {
    NavBar,
    HeroSection,
    CardProduct,
  },
  data() {
    return {
      products: [], //nanti data product dilempar kesini dari fake api
    };
  },
  methods: {
    setProducts(data) {
      this.products = data;
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/best-products")
      .then((response) => this.setProducts(response.data))
      .catch((error) =>
        console.log("ini error dari get best products:", error)
      );
  },
};
</script>

<style>
@media (max-width: 576px) {
  .home {
    padding: 4px;
  }
}
</style>
