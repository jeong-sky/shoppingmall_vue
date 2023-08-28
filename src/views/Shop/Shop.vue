<template>
  <div id="app">
    <v-app id="inspire">

      <v-app-bar app color="#EDE7F6" dark>

        <div style="width:100%;text-align:center;">
          <v-btn depressed color="#EDE7F6" router :to="{ name: 'Main' }">
            <h1 class="font-weight-bold basil--text">purple</h1>
          </v-btn>
        </div>

        <div style="display: inherit;" v-if="this.UserInfo.login_success === false">
          <v-btn depressed color="#EDE7F6" text-align router :to="{ name: 'shopLogin' }">
            <p class="font-weight-bold basil--text">LOGIN</p>
          </v-btn>
          <v-btn depressed color="#EDE7F6" text-align router :to="{ name: 'shopSignUp' }">
            <p class="font-weight-bold basil--text">JOIN US</p>
          </v-btn>
          <v-btn depressed color="#EDE7F6" text-align router :to="{ name: 'HeartList' }">
            <p class="font-weight-bold basil--text"><font-awesome-icon icon="heart" /></p>
          </v-btn>
        </div>

         <div style="display: inherit;" v-if="this.UserInfo.login_success === true">
          <v-btn depressed color="#EDE7F6" text-align @click="logOut">
            <p class="font-weight-bold basil--text">LOGOUT</p>
          </v-btn>
          <v-btn depressed color="#EDE7F6" text-align router :to="{ name: 'shopMypage' }">
            <p class="font-weight-bold basil--text">MY PAGE</p>
          </v-btn>
          <v-btn depressed color="#EDE7F6" text-align router :to="{ name: 'WishList' }">
            <p class="font-weight-bold basil--text">CART</p>
          </v-btn>
          <v-btn depressed color="#EDE7F6" text-align router :to="{ name: 'HeartList' }">
            <p class="font-weight-bold basil--text"><font-awesome-icon icon="heart" /></p>
          </v-btn>
         </div> 
    
        <template v-slot:extension>
          <v-tabs
            v-model="tab"
            background-color="transparent"
            color="hsl(231, 30%, 54%)"
            grow 
          >
            <v-tab
              v-for="(item, index) in Menu"
              :key="index"
              @click="productlist(item)"
            >
              {{ item.name }}
            </v-tab>
          </v-tabs>
        </template>
      </v-app-bar>
      <v-main>
        <router-view />
      </v-main>
      <Footer />
    </v-app>
  </div>
</template>
<style>
/* Helper classes */
.basil--text {
  color: hsl(235, 8%, 72%) !important;
}
</style>
<script>
import Footer from "@/views/Footer";
import Login from "@/views/Home/Login";
import Route from "@/router/index";
import ProductList from "@/views/Shop/ProductList";
import { mapState } from "vuex";
export default {
  data() {
    return {
      drawer: false,
      tab: null,
      items: ["Appetizers", "Entrees", "Deserts", "Cocktails"],
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
  components: {
    Footer,
    Login,
    ProductList,
  },
  computed: {
    ...mapState(["UserInfo", "Menu"]),
  },
  methods: {
    logOut() {
      this.$store.commit("LOGOUT");
    },
    productlist(item) {
      this.$store.dispatch("Get_ProductList_shop", item.code);
      Route.push({ name: "ProductList", query: item });
    },
  },
  created() {
    this.$store.dispatch("Get_Menu");
  },
};
</script>