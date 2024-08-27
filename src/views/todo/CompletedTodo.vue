<template>
  <li v-for="todo in todoList.filter((todo) => todo.status)" :key="todo.id">
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
</template>

<script setup>
defineProps(['todoList'])

const emit = defineEmits(['delTodo', 'toggleStatus'])
</script>
