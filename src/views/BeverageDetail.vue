<template>
  <div class="beverage-detail">
    <NavBar />
    <div class="container p-4">
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
                <span style="fontweight: bold"> Beverage Order </span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row mt-3">
        <!-- Desktop -->
        <div class="col-md-6 mb-4 d-none d-xl-block">
          <img
            :src="getImageSource()"
            class="img-fluid rounded"
            alt="..."
            :style="{
              maxWidth: '100vw',
              maxHeight: '60vh',
              width: '500px',
              height: '500px',
            }"
          />
        </div>
        <!-- Large Screen -->
        <div
          class="col-md-6 mb-4 d-none d-xl-none d-lg-block d-md-none d-sm-none d-xs-none"
        >
          <img
            :src="getImageSource()"
            class="img-fluid rounded"
            alt="..."
            :style="{
              maxWidth: '35vw',
              maxHeight: '50vh',
              width: '500px',
              height: '500px',
            }"
          />
        </div>
        <!-- Medium Screen -->
        <div
          class="col-md-6 mb-4 d-none d-xl-none d-lg-none d-md-block d-sm-none d-xs-none"
        >
          <img
            :src="getImageSource()"
            class="img-fluid rounded"
            alt="..."
            :style="{
              width: '500px',
              height: '400px',
            }"
          />
        </div>
        <!-- Small Screen -->
        <div class="col-md-6 mb-4 d-md-none d-sm-block d-xs-block">
          <img
            :src="getImageSource()"
            class="img-fluid rounded"
            alt="..."
            :style="{
              maxWidth: '85vw',
              maxHeight: '50vh',
              width: '500px',
              height: '500px',
            }"
          />
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
          <!-- v-on:submit.prevent biar klo klik pesan gak reload -->
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
                rows="2"
                placeholder="Example: large, less sugar, cold, less ice, extra shot, grass jelly..."
              ></textarea>
            </div>
            <!-- pemesanan change to order -->
            <!-- userOrder itu di method kalo di klik button Order baru jalan -->
            <button
              type="submit"
              class="btn btn-warning mt-4 text-white"
              @click="userOrder"
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
    getImageSource() {
      if (this.product.picture && this.product.picture.includes("http")) {
        return this.product.picture;
      } else {
        return "../assets/images/" + this.product.picture;
      }
    },
    userOrder() {
      if (!this.order.quantity) {
        this.$toast.error("Please enter the quantity", {
          type: "error",
          position: "bottom",
          duration: 3000,
          dismissible: true,
          queue: true,
        });
        return;
      }
      console.log("ini isi this.order :", this.order);
      this.order.products = this.product;
      console.log("ini isi this.product dari userOrder :", this.product);
      axios
        .post("http://localhost:3000/carts/", this.order)
        .then(() => {
          console.log("Order success"); //testing
          this.$toast.success("Order placed", {
            type: "success",
            position: "bottom",
            duration: 3000,
            dismissible: true,
            queue: true,
          });
          // Redirect to the home page
          this.$router.push("/");
        })
        .catch((err) => {
          console.log("ini error dari userOrder axios post :", err);
          this.$toast.error("Failed to place order", {
            type: "error",
            position: "bottom",
            duration: 3000,
            dismissible: true,
            queue: true,
          });
        });
    },
  },
  // di mounted pas akses page lsg axios get nya jalan
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
      .catch((err) => console.log("ini error dari get data products params id", err));
  },
};
</script>

<style></style>
