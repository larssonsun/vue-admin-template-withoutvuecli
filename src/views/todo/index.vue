<template>
  <div>
    <data-filter></data-filter>
    <todo-main></todo-main>
    <adder></adder>
  </div>
</template>
<script>
import todoMain from "./components/main";
import adder from "./components/adder";
import dataFilter from "./components/dataFilter";

export default {
  name: "com-todo",
  components: {
    dataFilter,
    todoMain,
    adder
  }
};
</script>

