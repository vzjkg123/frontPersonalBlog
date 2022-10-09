<template>
  <div id="carousel">
    <div class="wrapper">
<!--      <div class="images" @mouseover="stopPlay" @mouseout="startPlay" >-->
      <!--      </div>-->
      <carousel-card class="images" @mouseover="stopPlay" @mouseout="startPlay"/>

      <div class="images_min">
        <img alt="1" @click="position(1)" class="img_min" src="@/assets/books/jvm.png"/>
        <img alt="2" @click="position(2)" class="img_min" src="@/assets/books/operationsys.png"/>
        <img alt="3" @click="position(3)" class="img_min" src="@/assets/books/suanfatujie.png"/>
      </div>
    </div>
  </div>
</template>

<script>


import CarouselCard from "@/components/CarouselCard";

export default {
  name: "Carousel",
  components: {CarouselCard},
  data() {
    return {
      right: "0px",
      numOfImages: 3,
      index: 1,
      direction: 1,
      func_walk: null,
    }
  },

  methods: {
    walk() {
      this.func_walk = setInterval(() => {
        if (this.index === this.numOfImages - 1 || this.index === 0)
          this.direction *= -1
        this.right = this.index * 500 + "px"
        this.index += this.direction
      }, 4000)
    },
    stopPlay() {
      clearInterval(this.func_walk)
    },
    startPlay() {
      this.walk()
    },
    position(num) {
      this.right = (num - 1) * 500 + "px"
    }


  },
  created() {
    this.walk()
  }

}
</script>

<style scoped>
.wrapper {
  margin: 10px auto;
  width: 500px;
  overflow: hidden;
  border-radius: 5px;

}

.images {
  height: 260px;
  width: 1500px;
  position: relative;
  transition: 1.5s;
  right: v-bind(right);
}



.images_min {
  position: relative;
  bottom: 60px;
  left: 300px;
}

.img_min {
  cursor: pointer;
  border-radius: 5px;
  opacity: 0.9;
  width: 40px;
  height: 40px;
  margin-right: 10px;
  display: inline-block;
  border: 1px solid;

}

</style>