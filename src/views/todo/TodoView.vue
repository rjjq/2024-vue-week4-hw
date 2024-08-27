<template>
  <!-- ToDo List -->
  <div id="todoListPage" class="bg-half">
    <nav>
      <h1>
        <router-link to="/todo/all">ONLINE TODO LIST</router-link>
      </h1>
      <ul>
        <li class="todo_sm">
          <router-link to="/todo/all">{{ nickname }}的代辦</router-link>
        </li>
        <li><a @click="signOut">登出</a></li>
      </ul>
    </nav>
    <div class="conatiner todoListPage vhContainer">
      <div class="todoList_Content">
        <div class="inputBox">
          <input
            type="text"
            placeholder="請輸入待辦事項"
            v-model="newTodo"
            @keyup.enter="addTodo"
          />
          <a class="button" @click="addTodo" :class="{ disabled: !newTodo }">
            <font-awesome-icon :icon="['fas', 'plus']" />
          </a>
        </div>

        <div v-if="todoList.length == 0" class="alert alert-secondary text-center" role="alert">
          目前尚無待辦事項
        </div>
        <div v-else class="todoList_list">
          <ul class="todoList_tab">
            <li><router-link to="/todo/all">全部</router-link></li>
            <li><router-link to="/todo/pending">待完成</router-link></li>
            <li><router-link to="/todo/completed">已完成</router-link></li>
          </ul>
          <div class="todoList_items">
            <ul class="todoList_item">
              <router-view
                :todoList="todoList"
                @delTodo="delTodo"
                @toggleStatus="toggleStatus"
              ></router-view>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useloginStore } from '../../stores/loginStore'
import { storeToRefs } from 'pinia'

const loginStore = useloginStore()
const { nickname } = storeToRefs(loginStore)

const apiUrl = 'https://todolist-api.hexschool.io'
const todoToken = ref('')
const todoNickName = ref('')
import Swal from 'sweetalert2'

const router = useRouter()
// 登出
const signOut = async () => {
  try {
    await axios.post(`${apiUrl}/users/sign_out`, null, {
      headers: {
        Authorization: todoToken.value
      }
    })

    document.cookie = `todoToken=; max-age=0; path=/;`
    todoToken.value = ''

    document.cookie = `todoNickName=; max-age=0; path=/;`
    todoNickName.value = ''

    Swal.fire({
      icon: 'success',
      title: '登出成功',
      text: '即將跳轉到todo頁面...',
      showConfirmButton: false,
      timer: 1000
    }).then(() => {
      router.push('/login')
    })
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '登出失敗',
      text: `錯誤 : ${error.response.data.message}`,
      showConfirmButton: false,
      timer: 3000
    })
    console.log(error)
  }
  router.push('/login')
}

// 驗證
const validationLogin = async () => {
  try {
    if (!todoToken.value) {
      const response = await axios.get(`${apiUrl}/users/checkout`, {
        headers: {
          Authorization: todoToken.value
        }
      })

      if (!response.data.status) {
        document.cookie = `todoToken=; max-age=0; path=/;`
        Swal.fire({
          icon: 'error',
          title: '驗證失敗',
          text: '請重新登入...',
          showConfirmButton: false,
          timer: 1000
        }).then(() => {
          router.push('/login')
        })
      }
    }
  } catch (error) {
    document.cookie = `todoToken=; max-age=0; path=/;`

    Swal.fire({
      icon: 'error',
      title: '驗證失敗',
      text: `${error.response.data.message}`,
      showConfirmButton: false,
      timer: 1000
    }).then(() => {
      router.push('/login')
    })
    console.log(error)
  }
}

onMounted(() => {
  todoToken.value = document.cookie.replace(/(?:(?:^|.*;\s*)todoToken\s*=\s*([^;]*).*$)|^.*$/, '$1')

  todoNickName.value = document.cookie.replace(
    /(?:(?:^|.*;\s*)todoNickName\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  )

  nickname.value = todoNickName.value || ''

  validationLogin()
  getTodos()
})

// _TODO
const newTodo = ref('')
const addTodo = async () => {
  console.log('newTodo:', newTodo.value.trim)
  if (newTodo.value.trim() === '') {
    Swal.fire('待辦事項不得為空，請重新輸入...')

    newTodo.value = ''
    return
  }

  try {
    const response = await axios.post(
      `${apiUrl}/todos/`,
      {
        content: newTodo.value
      },
      {
        headers: {
          Authorization: todoToken.value
        }
      }
    )

    if (response.status == 201) {
      newTodo.value = ''
    }

    getTodos()
  } catch (error) {
    console.log(error)
  }
}

const todoList = ref([])
const getTodos = async () => {
  try {
    const response = await axios.get(`${apiUrl}/todos/`, {
      headers: {
        Authorization: todoToken.value
      }
    })

    if (response.status == 200) {
      todoList.value = response.data.data
    }
  } catch (error) {
    console.log(error)
  }
}

// _TODO : toggle
const toggleStatus = async (id) => {
  try {
    await axios.patch(`${apiUrl}/todos/${id}/toggle`, null, {
      headers: {
        Authorization: todoToken.value
      }
    })

    getTodos()
  } catch (error) {
    console.log(error)
  }
}

// _TODO : delte
const delTodo = async (id) => {
  try {
    await axios.delete(`${apiUrl}/todos/${id}`, {
      headers: {
        Authorization: todoToken.value
      }
    })

    getTodos()
  } catch (error) {
    console.log(error)
  }
}
</script>
