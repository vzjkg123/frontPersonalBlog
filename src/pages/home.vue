<template>
  <div id="home">
    <Carousel/>
    <div id="title">
      <h1>推荐图书下载</h1>
      <span id="tip"><i>整理自网络，仅供学习使用</i></span>
    </div>
    <div class="books" v-for="o in books" :key="o.id">
      <book :imgLink="o.img" :name="o.name" :bookLink="o.link"/>
    </div>

  </div>
</template>

<script>


import Book from "@/components/Book";
import axios from "axios";
import Carousel from "@/components/Carousel";

export default {
  name: 'home',
  components: { Carousel, Book},
  data() {
    return {
      books: null
    }
  },
  created() {
    axios.get("https://www.ltcnb.top/data/books").then(
        res => {
          this.books = res.data.data
        }
    )
  }

}
</script>

<style>
#home {
  width: 90%;
  margin: auto;

}

#title {
  width: 100%;
  padding-top: 30px;
  text-align: center;
  margin: auto;
}

.books {
  display: inline-block;
  width: 20%;
  min-width: 200px;
  margin-top: 30px;
  margin-bottom: 10px;
}

#tip {
  display: inline-block;
  font-size: 10px;
  color: #66CCCC;
  height: 30px;
  margin-bottom: 20px;

}
</style>
