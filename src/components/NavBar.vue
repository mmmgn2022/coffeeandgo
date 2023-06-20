<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container">
      <a class="navbar-brand" href="#">
        <img
          class="logo"
          src="../assets/images/coffeeandgo_logo.png"
          alt=""
        />
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
              <span class="badge bg-success ms-2">0</span>
              </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style>
.logo {
  margin-left: 10px;
  width: 40px;
  height: 40px;
}
</style>
