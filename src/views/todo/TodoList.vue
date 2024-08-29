<template>
  <li v-for="todo in todoList" :key="todo.id">
    <label class="todoList_label">
      <input
        class="todoList_input"
        type="checkbox"
        v-model="todo.status"
        @click="emit('toggleStatus', todo.id)"
      />
      <span>{{ todo.content }}</span>
    </label>
    <a href="#" @click.prevent="emit('delTodo', todo.id)">
      <font-awesome-icon :icon="['fas', 'times']" />
    </a>
  </li>

  <div class="todoList_statistics">
    <p>{{ pendingCount }} 個待完成項目</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps(['todoList', 'doneCount'])

const emit = defineEmits(['delTodo', 'toggleStatus'])

// _TODO : peinding count
const pendingCount = computed(() => {
  return props.todoList.filter((todo) => !todo.status).length || 0
})
</script>
