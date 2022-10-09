<template>
  <router-link :to="{path:'/essayPreview',query:{links:link,id:id}}">

    <div id="wrap">
      <a v-bind:href=link>
        <div id="card">
          <h2 id="title">{{ title }}</h2>
          <div id="digest">{{ digest }}</div>
        </div>
      </a>
    </div>
  </router-link>

</template>

<script>
export default {
  name: "PageCard",
  props: {
    id:Number,
    link: String,
    title: String,
    digest: String,
    time: String
  },
}
</script>

<style scoped>
#card {
  width: 80%;
  margin: auto;
}

a {
  text-decoration: none;
  color: #99CCFF;
}

a:hover {
  color: rgba(48, 169, 222, 1);

}

#title {
  display: block;
  margin-top: 0;
}

#wrap {
  width: 80%;
  height: 150px;
  margin-top: 30px;
  margin-left: 10%;
  margin-right: 10%;
  border-bottom: black solid 1px;

}
</style>