<template>
  <div>
    <v-list-item style="margin-left:5%;margin-right:5%;">
      <v-list-item-action style="min-width: 20%"> 이름 </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>
          <v-text-field
            v-model="receiver_name"
            placeholder="받으시는 분 성함"
          >
          </v-text-field>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item style="margin-left:5%;margin-right:5%;">
      <v-list-item-action style="min-width: 20%"> 주소 </v-list-item-action>
      <v-list-item-content>
        <div style="display: flex;">
          <v-text-field
            v-model="receiver_postcode"
            placeholder="우편번호"
          >
          </v-text-field>
          <v-btn depressed @click="execDaumPostcode()" style="margin-left:10px">우편번호 찾기</v-btn>
        </div>
        <v-text-field
          style="display: contents;"
          v-model="receiver_address" 
          placeholder="주소"
        >
        </v-text-field>
        <v-text-field
          style="display: contents;"
          v-model="receiver_detailAddress"
          placeholder="상세주소"
        >
        </v-text-field>
        <v-text-field
          style="display: contents;"
          v-model="receiver_extraAddress"
          placeholder="참고항목"
        >
        </v-text-field>
      </v-list-item-content>
    </v-list-item>
    <v-list-item style="margin-left:5%;margin-right:5%;">
      <v-list-item-action style="min-width: 20%"> 연락처 </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>
          <v-text-field
            v-model="receiver_phone"
            placeholder="받으시는 분 연락처"
          >
          </v-text-field>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>
<script>
export default {
  data() {
    return {
      receiver_address: "",
      receiver_detailAddress: "",
      receiver_extraAddress: "",
    };
  },
  computed: {
    receiver_name: {
      get() {
        return this.$store.state.orderInfo.receiverInfo.receiver_name;
      },
      set(value) {
        this.$store.commit("update_receiver_name", value);
      },
    },
    receiver_phone: {
      get() {
        return this.$store.state.orderInfo.receiverInfo.receiver_phone;
      },
      set(value) {
        this.$store.commit("update_receiver_phone", value);
      },
    },
    receiver_postcode: {
      get() {
        return this.$store.state.orderInfo.receiverInfo.receiver_postcode;
      },
      set(value) {
        this.$store.commit("update_receiver_postcode", value);
      },
    },
    address: {
      get() {
        return this.$store.state.orderInfo.receiverInfo.address;
      },
      set(value) {
        this.$store.commit("update_final_address", value);
      },
    },
  },
  methods: {
    execDaumPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          if (this.receiver_extraAddress !== "") {
            this.receiver_extraAddress = "";
          }
          if (data.userSelectedType === "R") {
            this.receiver_address = data.roadAddress;
          } else {
            this.receiver_address = data.jibunAddress;
          }
          if (data.userSelectedType === "R") {
            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
              this.receiver_extraAddress += data.bname;
            }
            if (data.buildingName !== "" && data.apartment === "Y") {
              this.receiver_extraAddress +=
                this.receiver_extraAddress !== ""
                  ? `, ${data.buildingName}`
                  : data.buildingName;
            }
            if (this.receiver_extraAddress !== "") {
              this.receiver_extraAddress = `(${this.receiver_extraAddress})`;
            }
          } else {
            this.receiver_extraAddress = "";
          }
          this.receiver_postcode = data.zonecode;
          this.address =
            this.receiver_address +
            " " +
            this.receiver_detailAddress +
            " " +
            this.receiver_extraAddress;
        },
      }).open();
    },
  },
  created() {
    this.$store.state.orderInfo.receiverInfo = {
      receiver_name: "",
      receiver_phone: "",
      receiver_postcode: "",
      address: "",
    };
  },
};
</script>