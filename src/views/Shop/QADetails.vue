<template>
  <div style="width: 100%">
    <v-card elevation="0" style="padding: 50px" class="mx-auto">
      <v-card-title><h4>게시글</h4> </v-card-title>
      <br />
        <v-card style="padding: 20px">
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <p class="text-md-center" style="font-size:20px">
                  {{ QAPost.title }}
                </p>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-action> 작성자 : </v-list-item-action>
              <v-list-item-content>
                {{ QAPost.writer }}
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-action> 작성 일자 : </v-list-item-action>
              <v-list-item-content>
                {{ QAPost.datetime }}
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <br />
            <v-list-item>
              {{ QAPost.content }}
            </v-list-item>
          </v-list>
        </v-card>

        <v-card v-if="QAPost.a_title && QAPost.a_content" style="margin-top:30px;padding: 20px">
          <v-card-title><h4>[답변]</h4> </v-card-title>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <p class="text-md-center" style="font-size:20px">
                  {{ QAPost.a_title }}
                </p>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-action> 작성자 : </v-list-item-action>
              <v-list-item-content>
                {{ QAPost.a_writer }}
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-action> 작성 일자 : </v-list-item-action>
              <v-list-item-content>
                {{ QAPost.a_datetime }}
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <br />
            <v-list-item>
              {{ QAPost.a_content }}
            </v-list-item>
          </v-list>
        </v-card>

        <br />
        <div align="right">
          <v-btn depressed @click="DeletePost" style="margin-right:10px;">삭제 </v-btn>
          <v-btn
           v-if="!QAPost.a_title"
           dark color="hsl(231, 30%, 54%)" @click="WriteAnswer">답변 작성</v-btn>
        </div>
    </v-card>
  </div>
</template>
<script>
import Route from "@/router/index";
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["QAPost", "UserInfo"]),
  },
  methods: {
    WriteAnswer() {
      if (
        this.$store.state.UserInfo.login_success === true &&
        this.UserInfo.auth.indexOf("ROLE_ADMIN") !== -1
      ) {
        if (Route.currentRoute.matched[0].name === "Shop") {
          Route.push({ name: "WriteAnswer", query: this.QAPost });
        } else {
          Route.push({ name: "WriteAnswer_admin", query: this.QAPost });
        }
      } else {
        alert("관리자 기능입니다.");
      }
    },
    DeletePost() {
      if (
        this.UserInfo.auth.indexOf("ROLE_ADMIN") !== -1 ||
        this.UserInfo.id === this.QAPost.writer
      ) {
        let list = [];
        list.push(this.QAPost);
        this.$store.dispatch("DeleteSelectedPost", list);
      } else {
        alert("삭제권한이 없습니다.");
      }
    },
  },
};
</script>