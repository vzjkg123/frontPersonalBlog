<template>
  <div>
    <div id="header_box">
      <span>最新</span>
      <button @click="toPost">我要发文章</button>
    </div>
    <div v-for="essay in essays" :key="essay.id">
      <PageCard :id=essay.id :title="essay.title" :digest="essay.digest" :time="essay.changeTime"
                :link="essay.url"></PageCard>
    </div>
  </div>
</template>

<script>
import PageCard from "@/components/PageCard";
import axios from "axios";

export default {
  name: "Interview",
  components: {PageCard},

  data() {
    return {
      essays: [],
      root: ""
    }
  },
  methods: {
    toPost() {
      window.location.href = "/mdPoster"
    }
  },
  mounted() {
    axios.get(this.root+'/data').then(res => {
      this.essays = res.data.data
    })

  }
}
</script>

<style scoped>
page-card > a {
  color: white;
}

#header_box {
  width: 80%;
  margin: 10px auto;
  border-bottom: solid 1px;
}

#header_box > span {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  text-indent: 1rem;

}

#header_box > button {
  float: right;
  width: 90px;
  height: 28px;
  font-size: 12px;
  cursor: pointer;
  background: rgb(0, 122, 255);
  border-radius: 40px;
  color: white;
  border: none;
  transition: 0.3s;
}

#header_box > button:hover {
  background: rgba(0, 122, 255, 0.66);

}
</style>