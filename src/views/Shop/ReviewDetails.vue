<template>
  <div style="width: 100%">
    <v-card elevation="0" style="padding: 50px" class="mx-auto">
      <v-card-title><h4>후기글</h4> </v-card-title>
      <br />
        <v-card style="padding: 20px">
          <v-list>
            <v-list-item>
              <v-list-item-content
                > <p class="text-md-center" style="font-size:20px">
                  {{ item.title }}
                </p></v-list-item-content
              >
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-action> 작성일시 : </v-list-item-action>
              <v-list-item-content>
                {{ item.datetime }}
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-action> 작성자 : </v-list-item-action>
              <v-list-item-content>
                {{ item.writer }}
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-action> 별점 : </v-list-item-action>
              <v-list-item-content>
                <v-rating
                  v-model="rating"
                  background-color="orange lighten-3"
                  color="orange"
                ></v-rating>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <br />
            <v-list-item>
              {{ item.content }}
            </v-list-item>
          </v-list>
        </v-card>
        <br />
        <div align="right">
          <v-btn depressed @click="DeleteReview" style="margin-right:10px;">삭제 </v-btn>
          <v-btn dark color="hsl(231, 30%, 54%)" @click="editReview">수정</v-btn>
        </div>
    </v-card>
  </div>
</template>
<script>
import Route from "@/router/index";
import { mapState } from "vuex";
export default {
  data() {
    return {
      item: this.$route.query.item,
      rating: this.$route.query.item.rating,
    };
  },
  computed: {
    ...mapState(["UserInfo"]),
  },
  methods: {
    DeleteReview() {
      if (this.UserInfo.auth.indexOf("ROLE_ADMIN") !== -1 || this.UserInfo.id === this.item.writer) {
        if(confirm("삭제 후 복구가 불가능합니다. 삭제하시겠습니까?")) {
          let list = [];
          list.push(this.item);
          this.$store.dispatch("DeleteReviews", list);
        }
      } else {
        alert("삭제권한이 없습니다.");
      }
    },
    editReview() {
      if (this.UserInfo.id === this.item.writer) {
        Route.push({ name: "EditReview", query: { item: this.item } });
      } else {
        alert("수정권한이 없습니다.");
      }
    },
  },
};
</script>