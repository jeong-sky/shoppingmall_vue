<template>
  <div style="width: 100%">
    <v-card elevation="0" style="padding: 50px" class="mx-auto">
      <v-card-title><h4>주문서 작성</h4> </v-card-title>
      <br />
      <v-card style="padding: 20px">
        <v-row v-for="(item, index) in orderRequest" :key="index">
          <v-col cols="4">
            <v-img
              class="mx-auto"
              :src="require('@/assets/' + item.product.mainPhoto)"
              width="120"
              height="120"
            ></v-img>
          </v-col>
          <v-col cols="2">
            <v-card-text>{{ item.product.name }}</v-card-text>
          </v-col>
          <v-col cols="2">
            <v-card-text>옵션 : {{ item.option }} </v-card-text>
          </v-col>
          <v-col cols="2">
            <v-card-text>수량 : {{ item.count }} </v-card-text>
          </v-col>
          <v-col cols="2">
            <v-card-text
              >판매가 : {{ formatPrice(item.product.price * item.count) }}
            </v-card-text>
          </v-col>
        </v-row>
        <br />
        <v-divider></v-divider>
        <br />
        <v-row>
          <v-col cols="6">
            <v-list>
              <v-list-item>
                <v-list-item-content><h3>주문하시는 분</h3> </v-list-item-content>
              </v-list-item>
              <v-list-item style="margin-left:5%;margin-right:5%;">
                <v-list-item-action style="min-width: 20%"> 이름 </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    <v-text-field
                      v-model="name">
                    </v-text-field>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item style="margin-left:5%;margin-right:5%;">
                <v-list-item-action style="min-width: 20%"> 주소 </v-list-item-action>
                <v-list-item-content v-if="!modifyAddress" style="display: block;">
                    {{ address }}
                    <br/>
                  <v-btn @click="changeAddress()" depressed class="mg-t-10">
                    주소 변경
                  </v-btn> 
                </v-list-item-content>
                <v-list-item-content v-else>
                  <div style="display: flex;">
                    <v-text-field
                      v-model="postcode"
                      placeholder="우편번호"
                    >
                    </v-text-field>
                    <v-btn depressed @click="execDaumPostcode()" style="margin-left:10px">우편번호 찾기</v-btn>
                  </div>
                  <v-text-field
                    style="display: contents;"
                    v-model="address"
                    placeholder="주소"
                  >
                  </v-text-field>
                  <v-text-field
                    style="display: contents;"
                    v-model="detailAddress"
                    placeholder="상세 주소"
                  >
                  </v-text-field>
                  <v-text-field
                    style="display: contents;"
                    v-model="extraAddress"
                    placeholder="참고 항목"
                  >
                  </v-text-field>
                </v-list-item-content>
              </v-list-item>

              <!-- <v-list-item style="margin-left:5%;margin-right:5%;">
                <v-list-item-action style="min-width: 20%"> 주소 </v-list-item-action>
                <v-list-item-content>
                  <div style="display: flex;">
                    <v-text-field
                      v-model="postcode"
                      placeholder="우편번호"
                    >
                    </v-text-field>
                    <v-btn depressed @click="execDaumPostcode()" style="margin-left:10px">우편번호 찾기</v-btn>
                  </div>
                  <v-text-field
                    style="display: contents;"
                    v-model="address"
                    placeholder="주소"
                  >
                  </v-text-field>
                  <v-text-field
                    style="display: contents;"
                    v-model="detailAddress"
                    placeholder="상세 주소"
                  >
                  </v-text-field>
                  <v-text-field
                    style="display: contents;"
                    v-model="extraAddress"
                    placeholder="참고 항목"
                  >
                  </v-text-field>
                </v-list-item-content>
              </v-list-item> -->

              <v-list-item style="margin-left:5%;margin-right:5%;">
                <v-list-item-action style="min-width: 20%"> 연락처 </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    <v-text-field
                      v-model="phone"
                      @input="onPhoneInput"
                      oninput="javascript: this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                    >
                    </v-text-field>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="6">
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <h3>받으시는 분</h3> 
                  <v-checkbox v-model="check"></v-checkbox>주문자와 동일
                </v-list-item-content>
              </v-list-item>
              <ReceiverInfo v-if="this.check === false"/>
            </v-list>
          </v-col>
        </v-row>
        <br />
        <v-divider></v-divider>
        <br />
        <v-row>
          <v-col cols="6">
            <v-list>
              <v-list-item>
                <v-list-item-content><h3>포인트사용</h3> </v-list-item-content>
              </v-list-item>
              
              <v-list-item>
                <v-list-item-action style="width: 100px">
                  사용포인트
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    <v-row align="center">
                      <v-col cols="12" md="9">
                        <v-text-field
                          v-model="point"
                          placeholder="0"
                          @input="checkPoint"
                          oninput="javascript: this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                        ></v-text-field>
                      </v-col>
                      점
                    </v-row>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-action style="width: 100px">
                  보유 포인트
                </v-list-item-action>
                <v-list-item-content>
                  {{ formatPrice(this.UserInfo.point) }}점
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="6">
            <v-list>
              <v-list-item>
                <v-list-item-action style="width: 100px">
                  결제금액
                </v-list-item-action>
                <v-list-item-content>
                  <v-card-text>상품 : {{ formatPrice(this.price) }}</v-card-text>
                  <v-card-text
                    >배송비 :
                    {{ this.shipping === 0 ? "무료배송" : '2,500' }}
                  </v-card-text>
                  <v-card-text>총계 : {{ this.total ? formatPrice(this.total) : '0' }} </v-card-text>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-action style="width: 150px">
                  결제하기
                </v-list-item-action>
                <v-list-item-content>
                  <a @click="kakaopay()">
                    <img
                      style="padding-top: 10px"
                      height="40px"
                      src="@/assets/payment_icon_yellow_medium.png"
                    />
                  </a>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card>
    </v-card>
  </div>
</template>
<script>
import { mapState } from "vuex";
import ReceiverInfo from "@/views/Shop/ReceiverInfo";
import { formatPhoneNumber, removeHyphens, formatPrice } from "@/utils/common.js";

export default {
  data() {
    return {
      check: true,
      name: null,
      phone: null,
      postcode: null,
      address: "",
      detailAddress: "",
      extraAddress: "",
      price_: 0,
      point: null,
      modifyAddress: false
    };
  },
  computed: {
    ...mapState(["UserInfo", "orderRequest", "orderInfo"]),
    price: {
      get() {
        for (let i = 0; i < this.orderRequest.length; i++) {
          let item =
            this.orderRequest[i].product.price * this.orderRequest[i].count;
          this.price_ = this.price_ + item;
        }
        return this.price_;
      },
    },
    shipping: {
      get() {
        let ship = false;
        for (let i = 0; i < this.orderRequest.length; i++) {
          this.orderRequest[i].product.shipping === "쇼핑몰 기본설정 사용"
            ? (ship = true)
            : "";
        }
        if (ship === true) {
          return 2500;
        } else {
          return 0;
        }
      },
    },
    total: {
      get() {
        if(this.price + this.shipping - this.point < 0) {
          return this.price + this.shipping;
          
        } else {
          return this.price + this.shipping - this.point;
        }
      },
    },
  },
  components: {
    ReceiverInfo,
  },
  methods: {
    formatPrice,
    execDaumPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          if (this.extraAddress !== "") {
            this.extraAddress = "";
          }
          if (data.userSelectedType === "R") {
            this.address = data.roadAddress;
          } else {
            this.address = data.jibunAddress;
          }
          if (data.userSelectedType === "R") {
            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
              this.extraAddress += data.bname;
            }
            if (data.buildingName !== "" && data.apartment === "Y") {
              this.extraAddress +=
                this.extraAddress !== ""
                  ? `, ${data.buildingName}`
                  : data.buildingName;
            }
            if (this.extraAddress !== "") {
              this.extraAddress = `(${this.extraAddress})`;
            }
          } else {
            this.extraAddress = "";
          }
          this.postcode = data.zonecode;
        },
      }).open();
    },
    checkPoint() {
      if (this.point > this.UserInfo.point) {
        alert("보유포인트가 부족합니다.");
        this.point = 0;

      } else if (this.point > this.price + this.shipping) {
        alert("결제 금액 아래로 설정이 가능합니다.");
        this.point = this.price + this.shipping;
      }
    },
    kakaopay() {
      let info = {
        products: this.orderRequest,
        userInfo: {
          username: this.UserInfo.id,
          name: this.name,
          phone: removeHyphens(this.phone),
          address: this.address,
          postcode: this.postcode,
        },
        payway: "카카오페이",
        point: this.point,
        total: this.total,
        check: this.check,
      };

      if (!this.name || this.name === '') {
        alert("주문자 이름을 입력해주세요.");
        return false;
      } else if (this.phone === null) {
        alert("주문자 연락처를 입력해주세요.");
        return false;
      } else if (!this.postcode && this.address === "") {
        alert("주문자 주소를 입력해주세요.");
        return false;
      } else if (
        this.orderInfo.receiverInfo.receiver_name === "" ||
        this.orderInfo.receiverInfo.receiver_phone === "" ||
        this.orderInfo.receiverInfo.receiver_postcode === ""
      ) {
        if (!this.check) {
          alert("수취인 정보를 정확히 입력해주세요.");
          return false;
        }
      }
      
      if(!this.postcode) {
        userInfo.postcode = this.UserInfo.postcode;
      }
      if(this.address === "") {
        userInfo.address = this.UserInfo.address;
      }

      this.$store.dispatch("Buy_items", info);
      
    },
    onPhoneInput() {
      this.phone = formatPhoneNumber(this.phone);
    },
    changeAddress() {
      this.modifyAddress = true;
      this.postcode = null;
      this.address = "";
    },
  },
  created() {
    this.$store.dispatch("Get_OrderList", this.$route.query);
    this.price_ = 0;

    if (this.UserInfo) {
      this.name = this.UserInfo.name;
      this.phone = formatPhoneNumber(this.UserInfo.phone);
      this.postcode = this.UserInfo.postcode;
      this.address = this.UserInfo.address;
    }
  },
};
</script>