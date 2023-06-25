<template>
  <div class="card card-product">
    <router-link
      :to="'/beverages/' + product.id"
      ><img
        :src="
          product.picture.includes('http')
            ? product.picture
            : 'assets/images/' + product.picture
        "
        :style="{
          backgroundSize: 'cover',
          maxWidth: '100%',
          maxHeight: '200px',
          cursor: 'pointer',
        }"
        class="card-img-top"
        alt="..."
    /></router-link>
    <div class="card-body">
      <h5 class="card-title">{{ product.name }}</h5>
      <p class="card-text">Price : Rp. {{ product.price }}</p>
      <router-link
        class="btn btn-warning text-white"
        :to="'/beverages/' + product.id"
        ><i class="bi-cart"></i> Order</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "CardProduct",
  props: ["product"],
};
</script>

<style></style>
