<template>
  <div id="container">
    <div id="info_box">
      <div class="title_1">
        <div class="title_1_sub">个人信息</div>
      </div>
      <div class="info">
        <div v-for="o in dataList" :key="o.index" class="data_line">
          <div class="line_head">{{ o.name + ":" }}</div>
          <input v-model="o.data" :disabled="!o.able">
        </div>
      </div>
      <div id="head_icon">
        <avatar/>
      </div>
    </div>
    <button @click="saveInfo">保存信息</button>
    <div>
      <div class="title_1">
        <div class="title_1_sub">收藏夹</div>
      </div>
      <div id="starList">
        <div class="link_card" v-for="o in stars" :key="o.id">
          <router-link :to="{path:'/essayPreview',query:{links:o.url,id:o.id}}">{{ o.title }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import axios from "axios";
import Cookies from "js-cookie";

export default {
  name: "Personal",
  components: {},
  data() {
    return {
      stars: [],
      dataList: [
        {name: "昵称", data: "vzjkg", able: true},
        {name: "账号", data: "", able: false},
        {name: "邮箱", data: "", able: false},
        {name: "手机号", data: "暂不支持", able: false},
        {name: "注册时间", data: "", able: false}
      ]
    }
  },
  methods: {
    saveInfo() {
      let name = this.dataList[0].data;
      if (name.length < 1) {
        alert("昵称至少包含一个字符")
        return
      }
      if (name.length > 10) {
        alert("昵称最长只能有10个字符")
        return;
      }
      let data = new FormData();
      let token = Cookies.get("token");
      let email = Cookies.get("email");
      data.append("email", email);
      data.append("code", token);
      data.append("name", name)
      axios.post("https://www.ltcnb.top/user/name", data).then(res => {
        if (res.data.flag === true) {
          alert("保存成功")
        } else {
          alert(res.data.data)
        }
      })
    },
    redirect() {
      window.location.href = "https://www.ltcnb.top/account"
    }
  },
  created() {
    //验证登陆状态
    let token = Cookies.get("token")
    let account = Cookies.get("email")
    let data = new FormData()
    if (account === "" || token === "") {
      this.redirect()
    }

    data.append("account", account)
    data.append("code", token)

    axios.post("/user/get", data).then(
        res => {
          if (res.data.flag === false)
            this.redirect()
          else {
            this.dataList[0].data = res.data.data.name;
            this.dataList[1].data = res.data.data.account;
            this.dataList[2].data = res.data.data.email;
            this.dataList[4].data = res.data.data.time;
            data.append("email", data.get("account"))
            data.delete("account")
            axios.post("/user/starList", data).then(res => {
              if (res.data.flag === true) {
                this.stars = res.data.data;
              }
            })
          }
        }
    ).catch(e => {
      alert(e)
    })
  }

}
</script>

<style scoped>
#container {
  width: 50%;
  margin: auto;
}

#info_box {
  margin-top: 20px;
}

.title_1 {
  border-bottom: solid 2px;
}

.title_1_sub {
  width: 80px;
  border: solid 1px;
  border-radius: 1px;
  text-align: center;
}

.data_line {
  height: 30px;
  width: 70%;
  line-height: 30px;
  border-bottom: solid 1px;
}

.info {
  margin-top: 20px;
  display: inline-block;
  width: 80%;
}

.line_head {
  width: 20%;
  min-width: 80px;
  display: inline-block;
  text-align: right;
}


input {
  width: 70%;
  display: inline-block;
  background: none;
  border: none;
  color: inherit;
  text-indent: 20px;
  font-size: 16px;
}

input:focus {
  outline: none;
}

#head_icon {
  display: inline-block;
  width: 20%;
  position: relative;
  top: 1rem;
  right: 2rem;

}

button {
  display: inline-block;
  width: 30%;
  margin-left: 35%;
  margin-top: 30px;
  margin-bottom: 50px;
  cursor: pointer;
}

.link_card {
  height: 30px;
  text-indent: 1rem;
  border-bottom: solid 1px;
}


.link_card > a {
  text-decoration: none;
  cursor: pointer;
  color: rgba(48, 169, 222, 1);
}
#starList{
  margin-top: 10px;
}
</style>