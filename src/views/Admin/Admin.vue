<template>
  <div id="app">
    <v-app id="inspire">

    <v-card>
      <v-navigation-drawer
        app
        v-model="drawer"
        stateless
        value="true"
        mini-variant.sync="mini"
      >
        <v-list-group>
          <v-list-item slot="activator">
            <v-list-item-action> </v-list-item-action>
            <v-list-item-content>
              <font-awesome-icon icon="user" />
            </v-list-item-content>
          </v-list-item>
          <v-list-item router :to="{ name: 'User' }">
            <v-list-item-action> </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>회원관리</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item router :to="{ name: 'Point' }">
            <v-list-item-action> </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>포인트관리</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-group>
          <v-list-item slot="activator">
            <v-list-item-action> </v-list-item-action>
            <v-list-item-content>
              <font-awesome-icon icon="clipboard-list" />
            </v-list-item-content>
          </v-list-item>
          <v-list-item router :to="{ name: 'OrderList' }">
            <v-list-item-action> </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>주문내역관리</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item router :to="{ name: 'QABoard' }">
            <v-list-item-action> </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>문의게시판</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item router :to="{ name: 'ReviewList' }">
            <v-list-item-action> </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>후기관리</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-group>
          <v-list-item slot="activator">
            <v-list-item-action> </v-list-item-action>
            <v-list-item-content>
              <font-awesome-icon icon="shopping-cart" />
            </v-list-item-content>
          </v-list-item>
          <v-list-item router :to="{ name: 'Category' }">
            <v-list-item-action> </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>분류관리</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item router :to="{ name: 'Product' }">
            <v-list-item-action> </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>상품관리</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-group>
          <v-list-item slot="activator">
            <v-list-item-action> </v-list-item-action>
            <v-list-item-content>
              <font-awesome-icon icon="chart-bar" />
            </v-list-item-content>
          </v-list-item>
          <v-list-item router :to="{ name: 'Chart' }">
            <v-list-item-action> </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>통계</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-navigation-drawer>
      <v-app-bar app color="hsl(231, 30%, 54%)" dark>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>ADMINISTRATOR</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>
    </v-card>
    <v-main>
      <v-container class="fill-height" fluid>
        <router-view />
      </v-container>
    </v-main>
    <Footer />
    </v-app>
  </div>
</template>

<script>
import Footer from "@/views/Footer";
export default {
  data() {
    return {
      drawer: null,
    };
  },
  components: {
    Footer,
  },
};
</script>