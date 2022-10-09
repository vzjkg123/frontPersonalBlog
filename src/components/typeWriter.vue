<template>
  <div id="wrap">
    <h1>{{ text }}<span :class="{noVis:isVis}">_</span></h1>
    <arrow-down-bold class="Vis" :class="{disVis:arrowVis}"/>
  </div>
</template>

<script>
export default {
  name: "typeWriter",
  props: {
    message: String,
  },
  data() {
    return {
      text: "",
      isVis: true,
      arrowVis: true
    }
  },
  methods: {
    addText() {
      let i = 0;
      let timer = setInterval(() => {
        this.text += this.message[i++]
        if (i >= this.message.length)
          clearInterval(timer)
      }, 200)
    },

    changeText() {
      setInterval(() => {
        this.isVis = this.isVis !== true
      }, 500)
    },
    changeArrow(){
      setInterval(() => {
        this.arrowVis = this.arrowVis !== true
      }, 700)
    }
  },
  mounted() {
    this.changeText()
    this.changeArrow()
    this.addText()
  }
  ,
  created() {

  }

}
</script>

<style scoped>
#wrap {
  text-align: center;
  letter-spacing: 3px;
  padding-top: 300px;
}

.Vis {
  position: relative;
  top: 30vh;
  width: 30px;
  opacity: 0.5;
  transition: 0.7s;
}

.disVis {
  position: relative;
  top: 35vh;
  padding-top: 30px;
  width: 30px;
  color: white;
  opacity: 1;
  transition: 0.7s;
}

.noVis {
  opacity: 0;
  transition: 0.5s;
}


</style>