<template>
  <Tip v-if="showTip" :type="type" :content="tip" :key="key"/>
  <div id="preview">
    <Markdown id="md_box" :source="text"/>
    <div id="bottom_box">
      <div id="wrapper">
        <div @click="handleStar" class="icon_box">
          <star :color="starColor" class="icon"/>
          <span>{{ star ? "已收藏" : "收藏" }}</span>
        </div>
        <div @click="handleCopy" class="icon_box">
          <share class="icon"/>
          <span>分享</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import Markdown from 'vue3-markdown-it';
import Cookies from "js-cookie";
import axios from "axios";
import {Share, Star} from "@element-plus/icons-vue";
import Tip from "@/components/Tip";

export default {
  name: "EssayPreview",
  components: {Tip, Share, Star, Markdown},
  data() {
    return {
      id: Number,
      text: "",
      link: "",
      star: false,
      starColor: "inherit",
      key: 1,
      tip: "",
      showTip: false,
      type: ""
    }
  }, methods: {
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
    handleStar() {
      let email = Cookies.get("email")
      let token = Cookies.get("token")
      if (email === "" || token === "") {
        this.failed("校验失败")
        return;
      }
      let data = new FormData();
      data.append("email", email);
      data.append("code", token);
      data.append("page", this.id.toString())
      if (!this.star) {
        axios.post("/user/star", data).then(res => {
          if (res.data.flag === true) {
            this.star = true
            this.success("收藏成功")
          } else this.failed("收藏失败")
        }).catch(e => {
          console.log(e)
        })
      } else {
        axios.post("/user/instar", data).then(res => {
          if (res.data.flag === true) {
            this.star = false
            this.success("取消收藏成功")
          } else {
            this.failed("取消收藏失败")
          }
        }).catch(e => console.log(e))
      }

    },
    handleCopy() {
      let url = window.location.href
      if (window.navigator.clipboard === undefined) {
        this.type = "error"
        this.tip = "复制链接失败"
        this.showTip = true
        this.key++
      } else {
        window.navigator.clipboard.writeText(url).then(() => {
          this.success("链接复制成功")
        }).catch((e) => {
          this.failed("链接复制失败")
          console.log(e)
        })
      }
    }
  },
  created() {
    this.link = this.$route.query.links
    this.id = this.$route.query.id
    axios.get(this.link).then(
        res => {
          this.text = res.data.toString()
        }
    )

    let email = Cookies.get("email")
    let token = Cookies.get("token")
    if (email === "" || token === "") {
      this.failed("校验失败")
      return;
    }
    let data = new FormData();
    data.append("email", email);
    data.append("code", token);
    data.append("page", this.id.toString())
    axios.post("/user/starStatus", data).then(res => {
      console.log(res)
      if (res.data.flag === true) {
        this.star = true;

      }
    }).catch(e => console.log(e))
    setInterval(() => {
      this.starColor = this.star === true ? "orange" : "inherit"
    }, 100)
  }
}
</script>

<style scoped>
#preview {

}

#md_box {
  width: 90%;
  margin: 20px auto;
}

#bottom_box {
  min-height: 60px;
  width: 100%;
  border-top: solid black 1px;
  margin-bottom: 20px;
}

.icon_box {
  display: inline-block;
  font-size: 14px;
  margin-right: 20px;
  cursor: pointer;
}

.icon_box > span {
  float: right;
  height: 20px;
  width: 50px;
  padding-left: 3px;
  line-height: 20px;
}

.icon {
  width: 20px;
}


#wrapper {
  width: 80%;
  height: 20px;
  margin: 10px auto;
}
</style>