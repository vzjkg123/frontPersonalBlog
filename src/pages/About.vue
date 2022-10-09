<template>
  <div id="about">
    <PersonalInfo/>

    <div id="box_suggestions">
      <div id="wrap">
        一个准备学后端的同志写的前端网站,还在学习中，后面看看能不能再丰富一些功能
      </div>
      <suggestion-editor/>
    </div>
  </div>
</template>

<script>

import SuggestionEditor from "@/components/suggestionEditor";
import PersonalInfo from "@/components/PersonalInfo";

export default {
  name: 'About',
  components: {
    PersonalInfo,
    SuggestionEditor
  }
}
</script>

<style>
#box_suggestions {

  width: 90%;
  min-height: 35vh;
  margin: 40px auto;
  border-radius: 5px;
  border: solid 1px;
  box-shadow: #66CCCC 1px 2px 1px;
  text-align: center;
  font-size: 20px;
}

h1 {
  margin-top: 0;
}
</style>
