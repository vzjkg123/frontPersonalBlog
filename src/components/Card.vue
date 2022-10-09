<template>
  <div id="card">
    <span id="time_box">{{ time }}</span>
    <div id="description">{{ desc }}</div>
  </div>
</template>

<script>

export default {
  name: "Card",
  props: {
    time: String,
    desc: String
  },

}
</script>

<style scoped>
#card {
  width: 80%;
  height: 100px;
  margin: 10px 10%;
  border-radius: 5px;
  border: solid gray 1px;
}

#time_box {
  display: block;
  font-style: italic;
  font-size: 16px;
}

#description{
  display: block;
  text-align: center;
  font-size: 20px;
}
</style>