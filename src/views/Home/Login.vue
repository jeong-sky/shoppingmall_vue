<template>
  <v-container class="login-form">
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-toolbar color="hsl(231, 30%, 54%)" dark flat>
            <v-toolbar-title> LOGIN </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                label="username"
                name="login"
                prepend-icon="mdi-account"
                v-model="username"
                type="text">
              </v-text-field>
              <v-text-field
                id="password"
                label="password"
                name="password"
                prepend-icon="mdi-lock"
                v-model="password"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="hsl(231, 30%, 54%)"
              dark
              @click="LoginUser({ username: username, password: password })"
              >LOGIN</v-btn
            >
            <v-btn
              color="#ECEFF1"
              v-if="$route.name !== 'shopLogin'"
              router
              :to="{ name: 'SignUp' }"
              >JOIN US
            </v-btn>
            <v-btn color="#ECEFF1" v-else router :to="{ name: 'shopSignUp' }">
              JOIN US
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <br />
    <a href="https://kauth.kakao.com/oauth/authorize?client_id=48b81001e6fa3b0a79971bff9c289b97&redirect_uri=http://192.168.35.121:8080/auth&response_type=code">
      <img src="@/assets/kakao_login_medium_narrow.png" style="height: 40px" />
    </a>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Route from "@/router/index";
export default {
  name: "Login",

  data() {
    return {
      username: null,
      password: null,
    };
  },
  methods: {
    ...mapActions(["LoginUser"]),
  },
  computed: {
    ...mapState(["UserInfo"]),
  },
};
</script>