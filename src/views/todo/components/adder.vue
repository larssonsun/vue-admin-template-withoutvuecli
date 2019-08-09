<template>
  <div>
    <input placeholder="enter for submit" v-model="todoText" @keypress.enter="submit" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      todoText: ""
    };
  },
  methods: {
    submit() {
      let data = {
        text: this.todoText,
        status: "active"
      };
      this.$store
        .dispatch("todo/addData", { data: data })
        .then(rtData => {
          this.$store
            .dispatch("todo/getAllData")
            .then()
            .catch();
        })
        .catch(() => {});
    }
  }
};
</script>

