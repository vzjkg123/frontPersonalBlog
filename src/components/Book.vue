<template>
  <div id="book_box">
    <a :href="bookLink" target="_blank">
      <div class="img_box">
        <img :src=imgLink alt="封面"/>
        <div id="name">{{ name }}</div>
      </div>
    </a>
  </div>

</template>

<script>
export default {
  name: "Book.vue",
  props: {
    bookLink: String,
    name: String,
    imgLink: String
  },
  data() {
    return {}
  },
  created() {
  }

}
</script>

<style scoped>
#book_box {
  width: 90%;
  margin: auto;
  height: 320px;
  background: #1f3144;
  box-shadow: #3d4858 3px 3px 3px;
  border: solid 1px black;
  border-radius: 3px;
  overflow: hidden;
}
*::-webkit-scrollbar { width: 0 !important }

#name {
  padding-top: 5px;
  overflow: hidden;

  height: 60px;
  width: 150px;
  margin: auto;
  text-align: center;
  color: whitesmoke;
}

.img_box {

}

img {
  padding-top: 20px;
  min-width: 174px;
  height: 230px;
  display: block;
  margin: auto;
  width: 80%;
}

a {
  text-decoration: none;
}

#name:hover {
  color: #99CCFF;
}
</style>