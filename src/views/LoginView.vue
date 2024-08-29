<template>
  <!-- login_page -->
  <div id="loginPage" class="bg-yellow">
    <div class="conatiner loginPage vhContainer">
      <div class="side">
        <a href="#"
          ><img
            class="logoImg"
            src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png"
            alt=""
        /></a>
        <img
          class="d-m-n"
          src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png"
          alt="workImg"
        />
      </div>
      <div>
        <form class="formControls" action="index.html">
          <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
          <label class="formControls_label" for="email">Email</label>
          <input
            class="formControls_input"
            type="text"
            id="email"
            name="email"
            placeholder="請輸入 email"
            v-model="signInData.email"
            autocomplete="current-email"
            @blur="validateEmail"
            required
          />
          <span v-if="showError">此欄位不可留空</span>
          <label class="formControls_label" for="pwd">密碼</label>
          <input
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd"
            placeholder="請輸入密碼"
            @keyup.enter="signIn"
            v-model="signInData.password"
            autocomplete="current-password"
            required
          />
          <input class="formControls_btnSubmit" type="button" value="登入" @click="signIn" />
          <router-link class="formControls_btnLink" to="/signUp">註冊帳號</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Swal from 'sweetalert2'

import { useloginStore } from '../stores/loginStore'
import { storeToRefs } from 'pinia'

const loginStore = useloginStore()
const { email, nickname } = storeToRefs(loginStore)

const apiUrl = 'https://todolist-api.hexschool.io'
// 登入
const signInData = ref({
  email: '',
  password: ''
})

const router = useRouter()
const signIn = async () => {
  try {
    const response = await axios.post(`${apiUrl}/users/sign_in`, signInData.value)

    document.cookie = `todoToken=${response.data.token}; expires=${getExpDate(response.data.exp)}; path=/`
    document.cookie = `todoNickName=${response.data.nickname} ; expires=${getExpDate(response.data.exp)}; path=/`

    Swal.fire({
      icon: 'success',
      title: '登入成功',
      text: '即將跳轉到todo頁面...',
      showConfirmButton: false,
      timer: 1000
    }).then(() => {
      email.value = signInData.value.email
      nickname.value = response.data.nickname

      router.push('/todo/all')
    })
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '登入失敗',
      text: error.response.data.message
    })
  }
}

const showError = ref(false)
const validateEmail = () => {
  showError.value = signInData.value.email.trim() === ''
}

const getExpDate = (expFromApi) => {
  // 將秒轉換為毫秒
  const expMilliseconds = expFromApi * 1000

  // 創建Date物件
  const expDate = new Date(expMilliseconds)

  // 獲取正確格式的expires字符串
  const expires = expDate.toUTCString()

  return expires
}

const route = useRoute()
onMounted(() => {
  signInData.value.email = route.query.email || ''
  signInData.value.password = route.query.password || ''
})
</script>
