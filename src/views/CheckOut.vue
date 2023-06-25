<template>
  <div class="checkout-success">
    <NavBar />
    <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col text-center">
          <img src="../assets/images/checkout.svg" class="mb-5" alt="..." width="300" />
          <h1 class="mb-5"><strong>Success!!</strong></h1>
          <h4 class="mb-5">Your order is being processed <br> Please wait...</h4>
           <router-link
            to="/"
            class="btn btn-warning btn-lg text-white"
          >
            Back to Home
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "CheckOut",
  components: {
    NavBar,
  },
};
</script>

<style>
</style>