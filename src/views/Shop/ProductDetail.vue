<template>
  <div>
    <v-card elevation="0" class="mx-auto pd-3">
      <v-row>
        <div class="prd-info">
          <v-img v-if="productDetails_shop.mainPhoto"
            class="mx-auto"
            :src="require('@/assets/' + productDetails_shop.mainPhoto)"
            width="400"
            height="400"
          ></v-img>
        </div>
        <div class="prd-info">
          <v-card elevation="0" class="mx-auto">
            <v-card-title>{{ productDetails_shop.name }}</v-card-title>
            <v-card-text>
              <v-row class="mx-0">
                <v-rating
                  :value="productDetails_shop.rating"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                ></v-rating>
                <div class="grey--text ms-4">
                  {{ productDetails_shop.rating }}
                </div>
              </v-row>
              <v-row>
                <v-col cols="6">PRICE</v-col>
                <v-col cols="6">
                  {{ productDetails_shop.price }}원
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">상품요약정보</v-col>
                <v-col cols="6">
                  {{ productDetails_shop.descr }}
                </v-col>
              </v-row>
              <br/>
            </v-card-text>

            <v-container fluid>
              <div align="left">
                <v-select
                  :items="productDetails_shop.options_s"
                  label="Options"
                  dense
                  solo
                  v-model="option"
                  @change="addOption()"
                  style="width: 500px;"
                ></v-select>
              </div>
              <v-card style="width: 500px;" class="mg-b-30" v-for="(item, index) in selectedOption" :key="index">
                <v-row>
                  <v-col cols="10">
                    <v-card-text> 선택 : {{ item.option }} </v-card-text>
                  </v-col>
                  <v-col>
                    <v-btn depressed small @click="deleteOption(item, index)">x</v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="1"
                    ><v-btn depressed @click="minusCount(index)">-</v-btn></v-col
                  >
                  <v-col cols="2" align="right">{{
                    selectedOption[index].count
                  }}</v-col>
                  <v-col cols="1"
                    ><v-btn depressed @click="addCount(index)">+</v-btn></v-col
                  >
                  <v-col cols="6" align="right">
                    $ •
                    {{
                      productDetails_shop.price * selectedOption[index].count
                    }}</v-col
                  >
                </v-row>
              </v-card>
          </v-container>

            <v-row class="pd-3 mg-t-10">
              <v-col cols="2">
                <v-btn color="deep-purple lighten-2" text @click="order()">바로구매</v-btn>
              </v-col>
              <v-col cols="2">
                <v-btn
                  color="deep-purple lighten-2"
                  text
                  @click="insertWishList()"
                >
                  장바구니
                </v-btn>
              </v-col>
              <v-col cols="2">
                <v-btn
                  color="deep-purple lighten-2"
                  text
                  @click="addHeartList(productDetails_shop.code)"
                >
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </div>
      </v-row>
    </v-card>
    
    <v-divider class="mx-4 mg-t-50"></v-divider>

    <v-card align='center'>
     
      <v-card-text align='center'>
        <v-row class="mg-t-10 mg-b-30">
          <v-col cols="3"><h2>상품요약정보</h2></v-col>
          <v-col cols="9"></v-col>
        </v-row>
        <v-row>
          <v-col cols="3">제품소재</v-col>
          <v-col cols="9">
            {{ productDetails_shop.material }}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3">치수</v-col>
          <v-col cols="9">
            {{ productDetails_shop.size }}
          </v-col>
        </v-row>   
        <v-row>
          <v-col cols="3">제조사</v-col>
          <v-col cols="9">
            {{ productDetails_shop.manufacturer }}
          </v-col>
        </v-row>   
        <v-row>
          <v-col cols="3">세탁방법 및 취습시 주의사항</v-col>
          <v-col cols="9">
            {{ productDetails_shop.caution }}
          </v-col>
        </v-row>     
        <v-row>
          <v-col cols="3">상품 상세 설명</v-col>
          <v-col cols="9">
            {{ productDetails_shop.detail_desc }}
          </v-col>
        </v-row>
      </v-card-text>

      <v-col
        v-for="(item, index) in productDetails_shop.file_list"
        :key="index"
        style="padding: 200px"
      >
        <v-img :src="require('@/assets/' + item)"> </v-img>
      </v-col>
    </v-card>    

    <v-card elevation="0" style="padding: 50px" class="mx-auto">
      <v-card-title><h4>상품후기</h4> </v-card-title>
      <br />
      <v-container class="pa-1">
        <v-data-table
          @click:row="reviewDetails"
          :headers="headers"
          :items="ReviewList"
        ></v-data-table>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Route from "@/router/index";
export default {
  data() {
    return {
      code: this.$route.query,
      option: null,
      selectedOption: [],
      select: [],
      count: 1,
      headers: [
        { text: "제목", value: "title" },
        { text: "작성자", value: "writer" },
        { text: "작성일시", value: "datetime" },
      ],
    };
  },
  methods: {
    insertWishList() {
      if (this.UserInfo.login_success === true) {
        if (this.selectedOption.length !== 0) {
          this.$store.dispatch("Insert_WishItems", this.selectedOption);
        } else {
          alert("옵션을 선택해주세요.");
        }
      } else {
        alert("로그인이 필요합니다.");
      }
    },
    addOption() {
      if (this.select.indexOf(this.option) === -1) {
        this.select.push(this.option);
        this.selectedOption.push({
          code: this.productDetails_shop.code,
          option: this.option,
          count: this.count,
        });
      } else {
        for (let i = 0; i < this.selectedOption.length; i++) {
          if (this.selectedOption[i].option === this.option) {
            this.selectedOption[i].count++;
          }
        }
      }
    },
    addCount(index) {
      this.selectedOption[index].count++;
    },
    minusCount(index) {
      if (this.selectedOption[index].count > 1) {
        this.selectedOption[index].count--;
      }
    },
    deleteOption(item, index) {
      this.select.forEach((ele, idx) => {
        if(ele === item.option) {
          this.select.splice(idx, 1);
        }
      })
      this.selectedOption.splice(index, 1);
    },
    wishList() {
      if (this.UserInfo.login_success === true) {
        if (this.UserInfo.wishList.indexOf(this.code) === -1) {
          this.UserInfo.wishList.push(this.code);
          let user = {
            username: this.UserInfo.id,
            wishList: this.UserInfo.wishList,
          };
          this.$store.dispatch("Insert_WishList", user);
        }
      } else {
        alert("로그인이 필요합니다.");
      }
    },
    addHeartList(code) {
      if (this.UserInfo.heartList.indexOf(code) === -1) {
        this.UserInfo.heartList.push(code);
        alert("찜목록에 추가되었습니다.");
      } else {
        let i = this.UserInfo.heartList.indexOf(code);
        this.UserInfo.heartList.splice(i, 1);
        alert("찜목록에서 삭제되었습니다.");
      }
    },
    order() {
      if (this.UserInfo.login_success === true) {
        if (this.selectedOption.length !== 0) {
          Route.push({ name: "OrderForm", query: this.selectedOption });
        } else {
          alert("옵션을 선택해주세요.");
        }
      } else {
        alert("로그인이 필요합니다.");
      }
    },
    reviewDetails(row) {
      Route.push({ name: "ReviewDetails", query: { item: row } });
    },
  },
  computed: {
    ...mapState(["productDetails_shop", "UserInfo", "ReviewList"]),
  },
  created() {
    this.$store.dispatch("Get_ProductDetails_shop", this.code);
    this.$store.dispatch("Get_Reviews", this.$route.query);
  },
};
</script>