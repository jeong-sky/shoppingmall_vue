<template>
  <div>
    <v-card elevation="0" style="padding: 50px" class="mx-auto">
      <v-container class="pa-1">
        <v-item-group v-model="selected" multiple>
          <v-row>
            <v-col
              v-for="item in productList_shop"
              :key="item.code"
              cols="12"
              md="3"
            >
              <v-item :value="item.code">
                <v-img
                  :src="require('@/assets/' + item.mainPhoto)"
                  height="250"
                  class="text-right pa-2"
                  @click="detailPage(item.code)"
                >
                  <v-btn icon v-on:click.stop @click="addHeartList(item.code)">
                    <v-icon>
                      {{
                        UserInfo.heartList.indexOf(item.code) !== -1
                          ? "mdi-heart"
                          : "mdi-heart-outline"
                      }}
                    </v-icon>
                  </v-btn>
                </v-img>
              </v-item>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              v-for="(item, i) in productList_shop"
              :key="i"
              cols="12"
              md="3"
            >
              <p style="text-align: center">{{ item.name }}</p>
            </v-col>
          </v-row>
        </v-item-group>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Route from "@/router/index";
export default {
  data: () => ({
    selected: [],
  }),
  computed: {
    ...mapState(["productList_shop", "UserInfo"]),
  },
  methods: {
    detailPage(code) {
      Route.push({ name: "ProductDetail", query: code });
    },
    addHeartList(code) {
      if (this.UserInfo.heartList.indexOf(code) === -1) {
        this.UserInfo.heartList.push(code);
      } else {
        let i = this.UserInfo.heartList.indexOf(code);
        this.UserInfo.heartList.splice(i, 1);
      }
    },
  },

  created() {},
};
</script>