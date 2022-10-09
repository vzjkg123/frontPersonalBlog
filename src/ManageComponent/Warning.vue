<template>
  <div v-if="show">
    <Tip v-if="showTip" :type="type" :content="tip" :key="key"/>
    <div id="wrapper">
    </div>
    <div id="info_box">
      <div class="info">
        <span>{{ msg }}</span>
        <div class="dataLine"><span class="label">{{ opinion }}:</span><span class="data">{{ titleOrEmail }}</span>
        </div>
        <div class="dataLine"><span class="label">Id:</span><span class="data">{{ id }}</span></div>
      </div>
      <div class="button_box">
        <button class="danger" @click="del">确认</button>
        <button @click="cancel">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import Tip from "@/components/Tip";
import Cookies from "js-cookie";
import axios from "axios";

export default {
  name: "Warning",
  components: {Tip},
  props: {
    msg: {String, default: "确定要删除这条数据吗？操作将不可撤销！"},
    opinion: {String, default: "email"},//邮箱或者标题，作为判断
    id: {String, default: "5", required: true},
    titleOrEmail: {String, default: "1962651587@qq.com"}
  },
  data() {
    return {
      show: true, type: "",
      tip: "", key: 0,
      showTip: false,
      root: ""
    }
  },
  methods: {
    del() {
      if (this.id === "") {
        this.show = false
        return
      }
      if (this.opinion === "Email") {
        this.delUser(this.id)
      } else if (this.opinion === "Title") {
        this.delArticle(this.id);
      } else {
        this.show = false
      }
    },
    sendMsg(obj) {
      this.$emit("getStatus", obj)
    },
    delArticle(id) {
      let data = new FormData()
      data.append("email", Cookies.get("email"))
      data.append("code", Cookies.get("token"))
      data.append("id", id)
      axios.post(this.root + "/administrator/article", data).then(res => {
        if (res.data.flag === true) {
          this.sendMsg({status: true, msg: "删除成功"})
        } else {
          this.sendMsg({status: false, msg: res.data.data})
        }
        this.show = false
      }).catch(e => {
        this.sendMsg({status: false, msg: "出错了，请到控制台查看详情"})
        console.log(e)
        this.show = false
      })

    },
    delUser(id) {
      let data = new FormData()
      data.append("email", Cookies.get("email"))
      data.append("code", Cookies.get("token"))
      data.append("id", id)
      axios.post(this.root + "/administrator/delUser", data).then(res => {
        if (res.data.flag === true) {
          this.sendMsg({status: true, msg: "删除成功"})
        } else {
          this.sendMsg({status: false, msg: res.data.data})
        }
        this.show = false
      }).catch(e => {
        this.sendMsg({status: false, msg: "出错了，请到控制台查看详情"})
        console.log(e)
        this.show = false
      })

    },


    cancel() {
      this.show = false;
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

<style scoped>
#wrapper {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: gray;
  opacity: 0.4;
  z-index: 20;
}

#info_box {
  z-index: 21;
  border-radius: 3px;
  width: 400px;
  height: 270px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;

  background: white;
  opacity: 1;
}

button {
  font-size: 12px;
  cursor: pointer;
  background: rgba(0, 122, 255, 0.9);
  width: 70px;
  height: 28px;
  color: white;
  border: none;
  border-radius: 3px;
  transition: 0.3s;
  margin: 3px 2px;
}

button:hover {
  background: rgba(0, 122, 255, 0.66);
}

.danger {
  background: #f56c6c;
}

.danger:hover {
  background: #f89898;
}

.info {
  color: black;
  height: 40%;
  margin-top: 40px;
  margin-bottom: 50px;
  text-align: center;
}

.info > span {
  font-weight: bold;
  font-style: italic;
  font-size: 20px;
  width: 100%;
  text-align: center;
  display: block;
  margin-bottom: 30px;
  color: red;
}

.button_box {
  display: flex;
  width: 60%;
  margin: 20px auto;
  justify-content: space-between;
}

.dataLine {
  margin: 10px auto;
  width: 300px;
  display: block;
  color: black;
}

.label {
  text-align: right;
  display: inline-block;
  width: 20%;
}

.data {
  display: inline-block;
  width: 80%;
}
</style>