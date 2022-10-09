<template>
  <div id="tip_box">
    {{ content }}
  </div>
</template>

<script>
export default {
  name: "Tip",
  props: {
    type: {
      String,
      default: "error"
    },
    content: {
      String,
      default: "success"
    },
    data() {
      return {
        color: ""
      }
    }

  },
  created() {
    this.color = this.type === "success" ? "#67c23a" : "#f56c6c"
  }
}
</script>

<style scoped>
#tip_box {
  position: fixed;
  border-radius: 1px;
  right: -100%;
  top: 20%;
  height: 25px;
  line-height: 25px;
  min-width: 200px;
  background: v-bind(color);
  color: white;
  text-align: center;
  padding-left: 1rem;
  padding-right: 1rem;
  animation: tip_move 4s;
}

@keyframes tip_move {
  30% {
    right: 20px;
    top: 20%;
    opacity: 1;
  }
  70% {
    right: 20px;
    top: 20%;
    opacity: 1;
  }
  100% {
    top: 20px;
    right: 20px;
    opacity: 0;
  }
}
</style>