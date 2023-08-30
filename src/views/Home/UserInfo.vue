<template>
  <div>
    <v-card elevation="0" style="padding: 50px" class="mx-auto">
      <v-card-title><h4>회원 정보 수정</h4> </v-card-title>
      <br />
      <v-card style="padding: 50px;" class="mx-auto">
        <v-list>
          <v-list-item style="margin-left:5%;margin-right:5%;">
            <v-list-item-action style="min-width: 20%"> 이름 </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                <v-text-field
                  v-model="name"
                >
                </v-text-field>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item style="margin-left:5%;margin-right:5%;">
            <v-list-item-action style="min-width: 20%"> 주소 </v-list-item-action>


            <v-list-item-content v-if="!modifyAddress">
              <v-list-item-title>
                {{ address }}
                <v-btn @click="changeAddress()" depressed style="margin-left:15px">
                  주소 변경
                </v-btn> 
              </v-list-item-title>
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

          <v-divider></v-divider>

          <v-list-item style="margin-left:5%;margin-right:5%;">
            <v-list-item-action style="min-width: 20%"> 연락처 </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                <v-text-field
                  v-model="phone"
                  :placeholder="UserInfo.phone"
                  @input="onPhoneInput"
                  oninput="javascript: this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                >
                </v-text-field>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item style="margin-left:5%;margin-right:5%;margin-top:2%;">
            <v-list-item-action style="min-width: 20%"> 권한 </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ UserInfo.AUTH }}
                <v-btn v-if="isAdmin === true" depressed @click="deleteRoleAdmin" style="margin-left:15px">
                  권한 취소
                </v-btn>
                <v-btn v-else depressed @click="addRoleAdmin" style="margin-left:15px">
                  권한 부여
                </v-btn>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item v-if="this.UserInfo.oauth === 'kakao'" style="margin-left:5%;margin-right:5%;">
            <v-divider></v-divider>
            <v-list-item-action style="min-width: 20%">
              카카오계정
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                <v-btn depressed @click="kakaoUnlink">연동해지</v-btn>
              </v-list-item-title>
              <v-list-item-subtitle
                ><br />
                * 카카오 연동해지시 자동 탈퇴처리됩니다.</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
      <br />
      <div align="right">
        <v-btn dark color="hsl(231, 30%, 54%)" @click="UpdateUserInfo">
          수정 완료
        </v-btn>
      </div>
    </v-card>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { formatPhoneNumber, removeHyphens } from "@/utils/common.js";

export default {
  data() {
    return {
      name: null,
      phone: null,
      postcode: null,
      address: "",
      detailAddress: "",
      extraAddress: "",
      modifyAddress: false
    };
  },
  computed: {
    ...mapState(["UserInfo"]),
    isAdmin() {
      if (this.UserInfo.auth.indexOf("ROLE_ADMIN") === -1) {
        return false;
      } else return true;
    },
  },
  methods: {
    ...mapActions([
      "Add_Role",
      "Delete_Role",
      "KakaoUnlink",
      "Update_UserInfo"
    ]),
    //카카오연동해지
    kakaoUnlink() {
      this.KakaoUnlink();
    },
    //관리자권한부여
    addRoleAdmin() {
      let User = {
        username: this.UserInfo.id,
        name: this.UserInfo.name,
      };
      this.Add_Role(User);
    },
    //권한삭제
    deleteRoleAdmin() {
      this.Delete_Role(this.UserInfo.id);
    },

    //주소찾기API
    execDaumPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          if (this.extraAddress !== "") {
            this.extraAddress = "";
          }
          if (data.userSelectedType === "R") {
            // 사용자가 도로명 주소를 선택했을 경우
            this.address = data.roadAddress;
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            this.address = data.jibunAddress;
          }

          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          if (data.userSelectedType === "R") {
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
              this.extraAddress += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== "" && data.apartment === "Y") {
              this.extraAddress +=
                this.extraAddress !== ""
                  ? `, ${data.buildingName}`
                  : data.buildingName;
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (this.extraAddress !== "") {
              this.extraAddress = `(${this.extraAddress})`;
            }
          } else {
            this.extraAddress = "";
          }
          // 우편번호를 입력한다.
          this.postcode = data.zonecode;
        },
      }).open();
    },
    UpdateUserInfo() {
      let userInfo = {
        username: this.UserInfo.id,
        phone: "",
        address: this.address,
        postcode: this.postcode,
      };

      if (!!this.name) {
        userInfo.name = this.name;
      } else {
        userInfo.name = this.UserInfo.name;
      }
      if (!!this.phone) {
        userInfo.phone = removeHyphens(this.phone);
      } else {
        userInfo.phone = this.UserInfo.phone;
      }
      if (!this.postcode && this.address === "") {
        alert("주소를 입력해주세요.");
        return false;
      }

      if(!this.postcode) {
        userInfo.postcode = this.UserInfo.postcode;
      }
      if(this.address === "") {
        userInfo.address = this.UserInfo.address;
      }

      this.detailAddress ? userInfo.address += (' '+this.detailAddress) : '';
      this.extraAddress ? userInfo.address += (' '+this.extraAddress) : '';
    
      this.Update_UserInfo(userInfo);
      
    },
    changeAddress() {
      this.modifyAddress = true;
      this.postcode = null;
      this.address = "";
    },
    onPhoneInput() {
      this.phone = formatPhoneNumber(this.phone);
    }
  },
  created() {
    // UserInfo가 정의되었을 때에만 값을 초기화
    if (this.UserInfo) {
      this.name = this.UserInfo.name;
      this.phone = formatPhoneNumber(this.UserInfo.phone);
      this.postcode = this.UserInfo.postcode;
      this.address = this.UserInfo.address;
    }
  }
};
</script>