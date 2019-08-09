<template>
  <div class="login-container">
    <div class="todo-item" :key="index" v-for="(item, index) in cptedTodoData">
      <div
        class="todo-item-check"
        :class="getTodoItemCheckClass(item)"
        @click="changeTodoStatus(item)"
      ></div>
      <div>{{ item.text }}</div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      currentItemStatus: "active"
    };
  },
  computed: {
    ...mapState({
      localData(state){
        return state.todo.localData
      }
    }),
    cptedTodoData() {
      return this.localData;
    }
  },
  methods: {
    getTodoItemCheckClass(item) {
      return { checked: item.status === "completed" };
    },
    changeTodoStatus(item) {
      item.status === "active"
        ? (item.status = "completed")
        : (item.status = "active");
    }
  },
  created() {
    this.$store
      .dispatch("todo/getAllData")
      .then()
      .catch();
  }
};
</script>
<style scoped>
div.checked {
  background-color: brown;
}

div.todo-item {
  height: 50px;
}

div.todo-item-check {
  float: left;
  width: 30px;
  height: 30px;
  border: 1px solid #bbbbbb;
  border-radius: 50%;
}
</style>

