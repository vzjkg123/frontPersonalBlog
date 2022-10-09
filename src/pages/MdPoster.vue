<template>
  <div id="MdPoster">
    <Tip v-if="showTip" :type="type" :content="tip" :key="key"/>

    <div id="header_box">
      <input placeholder="在此处键入标题" v-model="title">
      <button type="submit" :disabled="wait" @click="post">发布</button>
    </div>
    <textarea placeholder="在此输入正文，支持Markdown" class="edit" spellcheck="false" v-model="text"/>

    <div id="preview_wrapper">
      <Markdown class="preview" :source="text"/>
    </div>
  </div>
</template>

<script>
import Markdown from 'vue3-markdown-it'
import Tip from "@/components/Tip";
import Cookies from "js-cookie";
import axios from "axios";
import 'highlight.js/styles/monokai.css';

export default {
  name: "MdPoster",
  components: {
    Tip,
    Markdown
  },
  data() {
    return {
      wait: false,
      title: "",
      text: "",
      type: "",
      tip: "",
      key: 0,
      showTip: false,
      root: ""
    }
  },
  methods: {
    check() {
      if (this.title.length < 5) {
        this.failed("标题必须大于5个字符")
        return false;
      }
      if (this.text.length < 20) {
        this.failed("正文内容少于20个字符")
        return false;
      }
      return true
    },
    post() {
      if (!this.check()) return;
      let email = Cookies.get("email");
      let token = Cookies.get("token");
      if (email === "" || token === "") {
        this.failed("身份验证失败")
        return
      }
      let data = new FormData();
      data.append("email", email)
      data.append("code", token)
      data.append("title", this.title)
      data.append("text", this.text)
      axios.post(this.root + "/article", data).then(res => {
        if (res.data.flag === true) {
          this.success("发布成功")
        } else {
          this.failed(res.data.data)
        }
      }).catch(e => {
        console.log(e)
      })

    },
    failed(s) {
      this.tip = s
      this.type = "error"
      this.showTip = true
      this.key++;
    },
    success(s) {
      this.tip = s
      this.type = "success"
      this.showTip = true
      this.key++;
    },

  }
}
</script>

<style>
.preview > table {
  border-collapse: collapse
}

.preview th, .preview > table td {
  border: solid 1px;
  padding: 3px;
}
.preview a{
  color: #99CCFF;
}

#header_box {
  height: 40px;
  border-bottom: solid 1px;
  margin-bottom: 10px;
}

#header_box > input {
  margin-top: 10px;
  height: 20px;
  font-size: 18px;
  width: 90%;
  border: 0;
  color: inherit;
  padding: 0;
  background: none;
  text-indent: 1rem;
}

#header_box > input:focus {
  border: none;
  box-shadow: none;
  outline: none;
}

#header_box > button {
  width: 74px;
  height: 28px;
  font-size: 12px;
  cursor: pointer;
  background: rgb(0, 122, 255);
  border-radius: 3px;
  color: white;
  border: none;
  transition: 0.3s;
}

#header_box > button:hover {
  background: rgba(0, 122, 255, 0.66);
}

.edit {
  display: inline-block;
  width: 48%;
  min-height: 600px;
}

.preview {
  width: 96%;
  height: 100%;
  margin: 0 auto;
}

#preview_wrapper {
  display: inline-block;
  width: 50%;
  border: solid 1px;
  min-height: 600px;
  float: right;

}

#MdPoster {
  margin-top: 10px;
  border-top: solid 1px;
}
</style>