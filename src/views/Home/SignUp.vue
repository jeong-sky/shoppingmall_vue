<template>
  <v-container class="login-form">
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-toolbar color="hsl(231, 30%, 54%)" dark flat>
            <v-toolbar-title> Sign Up </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                label="username"
                name="UserId"
                prepend-icon="mdi-account"
                v-model="UserId"
                type="text">
              </v-text-field>

              <v-text-field
                id="UserPassword"
                label="password"
                name="UserPassword"
                prepend-icon="mdi-lock"
                v-model="UserPassword"
                type="password"
              ></v-text-field>

              <v-text-field
                id="UserName"
                label="name"
                name="UserName"
                prepend-icon="mdi-card-account-details"
                v-model="UserName"
                type="text"
              ></v-text-field>

              <v-text-field
                id="Phone"
                label="phone number"
                name="Phone"
                prepend-icon="mdi-phone"
                v-model="Phone"
                type="text"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="hsl(231, 30%, 54%)" dark @click="SignUp">Sign Up</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "SignUp",
  data() {
    return {
      UserId: null,
      UserPassword: null,
      UserName: null,
      Phone: null,
    };
  },
  methods: {
    ...mapActions(["NewUsers"]),
    SignUp() {
      let Users = {
        username: this.UserId,
        password: this.UserPassword,
        name: this.UserName,
        phone: this.Phone,
      };
      this.NewUsers(Users);
    },
  },
};
</script>