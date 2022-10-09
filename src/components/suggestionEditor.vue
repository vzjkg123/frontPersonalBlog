<template>
  <div id="suggest_box">
    <span>欢迎留下您的宝贵意见或建议</span>
    <textarea id="suggest" v-model="text"></textarea>
    <button class="put" @click="submit">提交</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "suggestionEditor",
  data() {
    return {
      text: "",
      nums: 0
    }
  },
  methods: {
    submit() {
      console.log(this.text.length)
      if (this.nums > 5) {
        alert("少侠手下留情！小破站承受不住！")
      } else if (this.text.length < 11) {
        alert("字数太少，请不要为服务器测压哦")
      } else {
        axios.post("http://www.ltcnb.top/data/suggestion", {"suggestion": this.text}).then(
            res => {
              this.nums++;
              this.message = res.data.data.msg;
              alert(this.message)
            }
        )
      }
    },


  }
}
</script>

<style scoped>
#suggest_box {
  width: 90%;
  margin: 20px auto;
}

#suggest {
  background: rgba(128, 128, 128, 0.9);
  margin-top: 20px;
  padding: 0;
  width: 100%;
  height: 200px;
  color: #FFFFFF;
  font-size: 18px;
}

.put {
  display: block;
  border-radius: 5px;
  width: 80px;
  height: 30px;
  margin: 0 auto;
  background: rgba(31, 49, 68, 0.8);
  color: #d0d0d0;
  cursor: pointer;
}

.put:hover {
  opacity: 0.8;
}
</style>