<template>
  <div class="hero">
    <div class="container">
    <!-- Desktop -->
      <div class="d-none d-md-block p-2">
        <div class="row mt-4">
          <div class="col-md-6">
            <div class="d-flex h-100">
              <div class="justify-content-center align-self-center">
                <h2>
                  <strong>Delicious Coffee Menu,</strong>
                  <br />in Your Gadget
                </h2>
                <p>Come choose and order your favorite coffee</p>
                <router-link class="btn btn-lg btn-warning text-white" to="/beverages">
                  <i class="bi-arrow-right"></i>
                  Order
                </router-link>
              </div>
            </div>
          </div>
          <img
            src="../assets/images/hero.svg"
            :style="{ width: '40%', height: '50%' }"
            class="img-fluid col-md-6 ms-auto"
            alt="hero"
          />
        </div>
    </div>

    <!-- Mobile -->
    <div class="d-sm-block d-md-none p-4">
      <div class="row mt-4">
        <img
          src="../assets/images/hero.svg"
          class="img-fluid col-md-6 mb-3"
        />
        <div class="col-md-6">
          <div class="d-flex h-100">
            <div class="justify-content-center align-self-center">
              <h2>
                <strong>Delicious Coffee Menu,</strong>
                <br />in Your Gadget
              </h2>
              <p>Come choose and order your favorite coffee</p>
              <button class="btn btn-lg btn-warning">
                <i class="bi-arrow-right"></i>Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  </div>
</template>

<script>
// eslint-disable-next-line vue/multi-word-component-names
/* eslint-disable */
export default {
  name: "Hero",
};
</script>

<style>

</style>
