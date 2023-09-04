<template>
  <div class="mx-auto">
    <v-row dense>
        <v-card class="sub-menu">
          <v-list align="center">
            <v-list-item>
              <v-list-item-title>
                {{ UserInfo.name }}님 환영합니다.
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-action>
                <v-row>
                  <v-col> <font-awesome-icon icon="coins" />  </v-col>
                </v-row>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title align="right">
                  {{ formatPrice(UserInfo.point) }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <br />
            <div align="left">
              <v-divider></v-divider>
              <v-list-item router :to="{ name: 'shopUserInfo' }">
                <v-list-item-subtitle>
                  <br />
                  정보 수정
                </v-list-item-subtitle>
              </v-list-item>
              <v-list-item router :to="{ name: 'QABoardList' }">
                <v-list-item-subtitle>
                  <br />
                  문의 게시판
                </v-list-item-subtitle>
              </v-list-item>
              <v-list-item @click="unlink(UserInfo.id)">
                <v-list-item-subtitle>
                  <br />
                  회원 탈퇴
                </v-list-item-subtitle>
              </v-list-item>
            </div>
          </v-list>
        </v-card>

        <v-card class="table">
          <v-card-title><h4>주문내역조회</h4> </v-card-title>
          <v-divider></v-divider>
          <v-data-table
            @click:row="orderDetails"
            :headers="headers"
            :items="orderList"
            :search="search"
          >
          </v-data-table>
        </v-card>
   
    </v-row>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import Route from "@/router/index";
import { formatPrice } from "@/utils/common.js";

export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "주문번호", value: "orderCode" },
        { text: "주문일시", value: "datetime" },
        { text: "진행상황", value: "state" },
        { text: "사용포인트", value: "point" },
        { text: "결제금액", value: "total" },
      ],
    };
  },
  computed: {
    ...mapState(["UserInfo", "orderList"]),
  },
  methods: {
    ...mapActions(["Delete_User"]),
    formatPrice,
    unlink(id) {
      if (this.UserInfo.oauth === "kakao") {
        alert(
          "카카오 연동이 되어있습니다. 정보수정에서 연동해지시 자동탈퇴처리됩니다."
        );
      } else if(confirm("삭제된 회원정보는 복구가 불가능합니다. 탈퇴 하시겠습니까?")) {
        this.Delete_User(id);
      }
    },

    logOut() {
      this.$store.commit("LOGOUT");
    },
    orderDetails(row) {
      Route.push({ name: "OrderDetails", query: row.products });
    }
  },
  created() {
    this.$store.dispatch("Get_OrderSuccess_List", this.$store.state.UserInfo);
    this.$store.dispatch("UnpackToken");
  },
};
</script>