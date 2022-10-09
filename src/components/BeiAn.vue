<template>

  <div id="beian">
    <div id="copyright">Copyright © 2022 <img src="@/assets/logo.png"></div>
    <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=36010602000149">
      <img src="@/assets/gongan.png">
      <p>赣公网安备 36010602000149号</p></a></div>
</template>

<script>
export default {
  name: "BeiAn"
}
</script>

<style scoped>
#copyright {
  display: inline-block;
  margin-right: 30px;
  color: inherit;
}

#copyright > img {
  display: inline-block;
  width: 20px;
}

#beian {
  width: 100%;
  height: 30px;
  text-align: center;
  margin: 0 auto;
  padding-top: 40px;

}

a {
  display: inline-block;
  text-decoration: none;
  color: inherit;
  height: 20px;
  line-height: 20px;
}

p {
  display: inline;
  height: 20px;
  line-height: 20px;
  margin: 0 0 0 5px;
}

img {
  padding-left: 4px;
  float: right;
}
</style>