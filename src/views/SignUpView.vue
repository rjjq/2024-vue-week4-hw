<template>
  <!-- sign up -->
  <div id="signUpPage" class="bg-yellow">
    <div class="conatiner signUpPage vhContainer">
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
          <h2 class="formControls_txt">註冊帳號</h2>
          <label class="formControls_label" for="email">Email</label>
          <input
            class="formControls_input"
            type="text"
            id="email"
            name="email"
            placeholder="請輸入 email"
            v-model="signUpData.email"
            autocomplete="email"
            required
          />
          <label class="formControls_label" for="name">您的暱稱</label>
          <input
            class="formControls_input"
            type="text"
            name="name"
            id="name"
            v-model="signUpData.nickname"
            placeholder="請輸入您的暱稱"
          />
          <label class="formControls_label" for="pwd">密碼</label>
          <input
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd"
            v-model="signUpData.password"
            placeholder="請輸入密碼"
            autocomplete="new-password"
            required
          />
          <label class="formControls_label" for="pwd">再次輸入密碼</label>
          <input
            class="formControls_input"
            type="password"
            name="confirm_pwd"
            id="confirm_pwd"
            v-model="signUpData.confirmPassword"
            @keyup.enter="signUp"
            placeholder="請再次輸入密碼"
            autocomplete="new-password"
            required
          />
          <input
            class="formControls_btnSubmit"
            type="button"
            @click="signUp"
            value="註冊帳號"
            :disabled="isLoading"
          />
          <router-link class="formControls_btnLink" to="/login">登入</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'
const router = useRouter()

const apiUrl = 'https://todolist-api.hexschool.io'
// 註冊
const signUpData = ref({
  email: '',
  password: '',
  nickname: '',
  confirmPassword: ''
})

const isLoading = ref(false)
const signUp = async () => {
  if (signUpData.value.password !== signUpData.value.confirmPassword) {
    Swal.fire('輸入密碼不符，請重新確認')
    return
  }

  isLoading.value = true
  try {
    await axios.post(`${apiUrl}/users/sign_up`, signUpData.value)
    Swal.fire(`${signUpData.value.email}: 註冊成功`).then(() => {
      router.push({
        path: '/login',
        query: { email: signUpData.value.email, password: signUpData.value.password }
      })
    })
  } catch (error) {
    console.log(error)
    if (error.response.data.message instanceof Array) {
      Swal.fire(error.response.data.message?.join('\n'))
    } else {
      Swal.fire(error.response.data.message)
    }
  } finally {
    isLoading.value = false
  }
}
</script>
