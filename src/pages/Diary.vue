<template>
  <div>
    <div v-for="o in data" :key="o.id">
      <card :time=o.time :desc=o.description></card>
    </div>
  </div>
</template>

<script>


import Card from "@/components/Card";
import axios from "axios";

export default {
  name: "Diary",
  components: {Card},
  data() {
    return {
      data: null
    }
  },
  created() {
    axios.get("/data/diary").then(
        res => {
          this.data = res.data.data.reverse()
        }
    )
  }
}
</script>

<style scoped>

</style>