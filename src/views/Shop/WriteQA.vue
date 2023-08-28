<template>
  <div>
    <v-card elevation="0" style="padding: 50px" class="mx-auto">
      <v-card-title><h4>문의 작성</h4> </v-card-title>
      <br />
        <v-card style="padding: 20px">
          <v-row>
            <v-col cols="12" sm="5">
              <v-text-field
                color="purple darken-2"
                label="제목"
                required
                v-model="title"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="2">
              <v-select
                v-model="titleType"
                :items="itmes"
                label=" 문의 종류"
                required
              ></v-select>
            </v-col>
          </v-row>
          <v-textarea
            rows="10"
            row-height="15"
            outlined
            label="문의 내용을 입력해주세요."
            v-model="content"
          ></v-textarea>
        </v-card>
        <br />
        <div align="right">
          <v-btn dark color="hsl(231, 30%, 54%)" @click="save">작성 완료</v-btn>
        </div>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      titleType: "",
      content: "",
      itmes: ["배송문의", "상품문의", "기타사항"],
    };
  },

  methods: {
    save() {
      let post = {
        title: this.title,
        type: this.titleType,
        content: this.content,
        writer: this.$store.state.UserInfo.id,
      };
      this.$store.dispatch("Save_QuestionPost", post);
    },
  },
};
</script>