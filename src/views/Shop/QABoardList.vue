<template>
  <div style="width: 100%">
    <v-card elevation="0" style="padding: 50px" class="mx-auto">
      <v-card-title><h4>문의 게시판</h4> </v-card-title>
      <br />
      <v-card style="padding: 20px">
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="QABoardList"
          :search="search"
          v-model="selected"
          item-key="num"
          :single-select="singleSelect"
          show-select
          @click:row="boardDetail"
        ></v-data-table>
        <template v-slot:top>
          <v-switch
            v-model="singleSelect"
            label="Single select"
            class="pa-3"
          ></v-switch>
        </template>
      </v-card>
      <br/>
      <div align="right">
        <v-btn depressed @click="DeleteSelectedPost" style="margin-right:10px">삭제</v-btn>
        <v-btn @click="WriteQA" dark color="hsl(231, 30%, 54%)">
          글 작성
        </v-btn> 
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
      singleSelect: false,
      selected: [],
      search: "",
      headers: [
        { text: "제목", value: "con", width: "25%" },
        { text: "타입", value: "type" },
        { text: "작성자", value: "writer" },
        { text: "작성일시", value: "datetime" },
        { text: "조회수", value: "hit" },
        { text: "num", value: "num", align: " d-none" },
      ],
    };
  },
  computed: {
    ...mapState(["QABoardList"]),
  },
  methods: {
    WriteQA() {
      if (this.$store.state.UserInfo.login_success === true) {
        Route.push({ name: "WriteQA" });
      } else {
        alert("로그인이 필요한 기능입니다.");
      }
    },
    boardDetail(row) {
      this.$store.dispatch("Get_QAPostDetails", row.num);
    },
    DeleteSelectedPost() {
      if (
        this.$store.state.UserInfo.login_success === true &&
        this.$store.state.UserInfo.auth.indexOf("ROLE_ADMIN") !== -1
      ) {
        this.$store.dispatch("DeleteSelectedPost", this.selected);
      } else {
        alert(
          "관리자 기능입니다.\n개인게시글은 게시글내에 삭제기능을 이용해주세요."
        );
      }
    },
  },
  created() {
    this.$store.dispatch("Get_QABoardList");
  },
};
</script>