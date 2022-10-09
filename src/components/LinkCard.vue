<template>
  <div id="linkCard">
    <div><img v-if="showIcon" src="" alt="icon"></div>
    <div id="linkBox">
      <a v-bind:href=link target="_blank">{{ title }}</a>
      <div id="desc">{{ description }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LinkCard",
  props: {
    title:String,
    link: String,
    description: String,
    showIcon: {
      type: Boolean,
      default: false
    }
  },
  created() {
  }
}
</script>

<style scoped>
#linkCard {

  width: 80%;
  position: relative;
  top: 10px;
  margin-bottom: 10px;
  margin-left: 10%;
  margin-right: 10%;
  height: 100px;
  border: solid 3px;
  border-radius: 5px;
  box-shadow: gray 4px 6px 4px;
}

#linkBox {
  width: 80%;
  height: 100%;
  margin: auto;
  text-align: center;

}
#desc{
  margin-top: 10px;
}
a {
  color: #99CCFF;
  font-style: italic;
  display: block;
}
</style>