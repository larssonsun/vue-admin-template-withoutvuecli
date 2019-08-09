<template>
  <div>
    <button
      class="filter-button"
      v-for="(item, idx) in bttns"
      :key="idx"
      @click="filteData(item)"
    >{{item.bttnName}}</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bttns: [
        { bttnName: "全部", bttnValue: "all" },
        { bttnName: "未完成", bttnValue: "active" },
        { bttnName: "已完成", bttnValue: "completed" }
      ]
    };
  },
  methods: {
    all() {
      this.$store
        .dispatch("todo/getAllData")
        .then()
        .catch();
    },
    completed() {
      this.$store
        .dispatch("todo/getCompletedData")
        .then()
        .catch();
    },
    active() {
      this.$store
        .dispatch("todo/getActiveData")
        .then()
        .catch();
    },
    filteData({ bttnValue: v }) {
      switch (v) {
        case "all":
          this.all();
          break;
        case "active":
          this.active();
          break;
        case "completed":
          this.completed();
          break;
      }
    }
  }
};
</script>
<style scoped>
</style>

