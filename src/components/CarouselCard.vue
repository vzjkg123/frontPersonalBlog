<template>
  <div class="wrapper">
    <div class="card">
      <a href="https://www.123pan.com/s/VjRRVv-871ph" target="_blank">
        <img alt="jvm" class="bookImg" src="@/assets/books/jvm.png">
        <div class="info">
          <div class="desc">
            作为一位Java程序员，你是否也曾经想深入理解Java虚拟机，但是却被它的复杂和深奥拒之门外？没关系，本书极尽化繁为简之妙，能带领你在轻松中领略Java虚拟机的奥秘。是唯一一本同时从核心理论和实际运用这两个角度去探讨Java虚拟机的著作，不仅理论分析得透彻，而且书中包含的典型案例和最佳实践也极具现实指导意义。
          </div>
        </div>
      </a>
    </div>
    <div class="card">
      <a href="https://www.123pan.com/s/VjRRVv-K71ph" target="_blank">
        <img alt="operationsys" class="bookImg" src="@/assets/books/operationsys.png">
        <div class="info">
          <div class="desc">
            本书从程序员的视角详细阐述计算机系统的本质概念，并展示这些概念如何实实在在地影响应用程序的正确性、性能和实用性。全书共12章，主要内容包括信息的表示和处理、程序的机器级表示、处理器体系结构、优化程序性能、存储器层次结构、链接、异常控制流、虚拟存储器、系统级I/O、网络编程、并发编程等。
          </div>
        </div>
      </a>
    </div>
    <div class="card">
      <a href="https://www.123pan.com/s/VjRRVv-r71ph" target="_blank">
        <img alt="jvm" class="bookImg" src="@/assets/books/suanfatujie.png">
        <div class="info">
          <div class="desc">
            本书旨在帮助程序员在日常项目中更好地发挥算法的能量。包括：二分查找、大O表示法、两种基本的数据结构以及递归等。
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "CarouselCard",
  props: {
    width: {
      String,
      default: "500px"
    },
    height: {
      String,
      default: "280px"
    }
  }
}
</script>

<style scoped>
.card {
  width: v-bind(width);
  height: 240px;
  border-radius: 5px;
  display: inline-block;
}

.bookImg {
  margin-top: 5%;
  margin-left: 20px;
  border: 0;
  padding: 0;
  width: 30%;
  height: 80%;
}

.info {
  display: inline-block;
  height: 100%;
  width: 60%;
  float: right;
}

.desc {
  height: 100%;
  width: 100%;
  padding-top: 30px;
  text-indent: 2rem;
}

.wrapper {
  width: 1500px;
  height: 260px;
  background: rgba(15, 12, 13, 0.3);

}

a {
  text-decoration: none;
  color: white;
}
</style>