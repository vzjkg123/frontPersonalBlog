<template>
  <div id="app">
    <div id="header">
      <div class="header_1" :class="{collapse:noOpacity}">
        <div id="container">
          <ul>
            <li>
              <router-link to="/">主页</router-link>
            </li>
            <li>
              <router-link to="/interview">学习</router-link>
            </li>

            <li>
              <router-link to="/diary">日志</router-link>
            </li>

            <li>
              <router-link to="/friendLinks">友情链接</router-link>
            </li>
            <li>
              <router-link to="/about">关于</router-link>
            </li>
          </ul>

          <ul id="right_box">
            <li>
              <div id="icon_box">
                <moon v-if="isDay==='mainDay'" @click="dayOrNight" class="icon"/>
                <Sunny v-else @click="dayOrNight" class="icon"/>
              </div>
            </li>
            <li @click="visible">
              我的
              <div id="drop_content">
                <div class="item">
                  <router-link to="/personal">个人信息</router-link>
                </div>
                <div class="item">
                  <router-link to="/manage">控制台</router-link>
                </div>
                <div class="item" @click="delCookie">退出</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="time">{{ weekday }} <span id="time">{{ time }}</span></div>
      </div>
    </div>

    <div id="empty">
      <type-writer :key="isShow" :message=text></type-writer>
    </div>

    <div :class="isDay">
      <router-view></router-view>
    </div>
    <return-top @click="moveToHead" id="top"/>
    <div id="footer">
      <bei-an></bei-an>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import BeiAn from "@/components/BeiAn";
import TypeWriter from "@/components/typeWriter";

import axios from "axios";
import ReturnTop from "@/components/returnTop";

export default {
  name: 'App',
  components: {ReturnTop, TypeWriter, BeiAn},
  data() {
    return {
      isShow: true,
      text: "花落知多少",
      noOpacity: false,
      isDay: "mainNight",
      vis: "hidden",
      time: "00:00:00",
      weekday: "hello",
      toTop: "hidden"

    }
  },
  methods: {
    moveToHead() {
`      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;`
    },
    delCookie() {
      Cookies.set("token", "")
      this.redirect()
    },
    repeat(s) {
      this.text = s
      this.isShow = this.isShow !== true
    },
    dayOrNight() {
      if (this.isDay === "mainDay") {
        this.isDay = "mainNight"
      } else {
        this.isDay = "mainDay"
      }
    },


    windowScroll() {
      let scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 15 && !this.noOpacity) {
        this.noOpacity = true
      } else if (scrollTop < 16 && this.noOpacity) {
        this.noOpacity = false
      }
      if (scrollTop > document.documentElement.clientHeight * 0.8) {
        this.toTop = "visible"
      } else this.toTop = "hidden"
    },
    redirect() {
      window.location.href = "/account"
    },
    visible() {
      if (this.vis === "hidden")
        this.vis = "visible"
      else this.vis = "hidden"
    },
    getDate() {
      let day = new Date().getDay()
      this.weekday = this.getWeekDay(day)
      setInterval(() => {
        let t = new Date();
        let h = t.getHours();
        let m = t.getMinutes();
        let s = t.getSeconds();
        this.time = `${h < 10 ? "0" + h : h}:${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`
      }, 1000)
    },
    getWeekDay(i) {
      let weekDay = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
      return weekDay[i];
    },
    getData() {

      let account = Cookies.get("email")
      let token = Cookies.get("token")
      if (token === "") this.redirect()
      if (account === "") this.redirect()

      let data = new FormData()
      data.append("account", account)
      data.append("token", token)
      axios.post("/user", data).then(
          res => {
            if (res.data.flag === false)
              this.redirect()
          }
      ).catch(e => {
        alert(e)
        console.log(e)
      })
    },
    forTest() {
      Cookies.set("email", "757876138@qq.com")
      Cookies.set("token", "6095f16c-11f8-4213-93ee-2679e4cd36e1")
    }

  },
  mounted() {
    window.addEventListener('scroll', this.windowScroll)
  },
  created() {
    //this.forTest()
    this.getDate()
    this.getData()
  },
  watch: {
    '$route': {
      handler(route) {
        let s = route.path;
        if (s === "/") {
          this.repeat("厚积而薄发")
        } else if (s === '/interview') {
          this.repeat("每天进步一点点")
        } else if (s === "/diary") {
          this.repeat("每天只能写一点点代码")
        } else if (s === "/friendLinks") {
          this.repeat("有用没用的")
        } else if (s === '/about') {
          this.repeat("随便看看")
        } else if (s === '/mdPoster') {
          this.repeat("我来说两句")
        } else if (s === '/manage') {
          this.repeat("管理中心")
        }
      }
    }
  }


}
</script>

<style scoped>

#top {
  position: fixed;
  bottom: 10%;
  right: 4%;
  border: solid 1px gray;
  border-radius: 5px;
  background: #1f3144;
  visibility: v-bind(toTop);
  cursor: pointer;
}

#top:hover {
  border: solid 1px;
  box-shadow: #d0d0d0;
  color: white;
}

#time {
  display: inline-block;
  width: 80px;
}

.time {
  position: fixed;
  right: 2%;
  top: 0;
}

#drop_content {
  position: absolute;
  visibility: v-bind(vis);
  top: 45px;

}

.item {
  text-align: left;
  border-top: solid black 1px;
  width: 70px;
  height: 35px;
  font-size: 14px;
  line-height: 35px;
  padding-left: 10px;
  background: rgba(30, 42, 56, 0.5);
}

.item > a {
  text-decoration: none;
  color: white;

}

.item:hover {
  color: #66CCCC;
}

.icon {
  height: 30px;
  width: 30px;
  margin: 0;
  position: relative;
  top: 8px
}

#icon_box {
  display: inline-block;
  width: 30px;
  left: 100px;
}

#right_box {
  color: #FFFFFF;
  display: inline-block;
  text-align: right;
  width: 40%;
}

#container {
  width: 80%;
  margin: auto;
}


#app {
  color: #d0d0d0;
  /*background: #3d4858;*/
  background: #181c27;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

.header_1 {
  position: fixed;
  height: 60px;
  width: 100%;
  z-index: 10;
  line-height: 60px;
  box-shadow: rgba(0, 0, 0, 0.16) 0 2px 5px 0;
  transition: line-height 0.5s, background-color 0.5s;
}


.collapse {
  position: fixed;
  width: 100%;
  height: 50px;
  background: #1f3144;
  z-index: 10;
  box-shadow: rgba(0, 0, 0, 0.16) 0 2px 5px 0;
  line-height: 50px;
  transition: line-height 0.5s, background-color 0.5s;

}

ul:last-child {
  align-content: end;
  cursor: pointer;
}

#empty {
  height: 100%;
  min-height: 98vh;
  display: block;
}

ul {
  display: inline-block;
  width: 60%;
  text-align: left;
  padding: 0;
  margin: 0;
}

li {
  display: inline-flex;
  line-height: 24px;
  margin: 0 20px;
}

li > a {
  color: #FFFFFF;
  font-size: 18px;
  text-decoration: none;
}

a:hover {
  color: #66CCCC;
}


.mainDay {

  min-height: 80vh;
  width: 80%;
  margin: auto;
  color: black;
  background-color: #fff;
  border-radius: 10px;
  border: solid gray 1px;
  box-shadow: black 4px 6px 4px;
}


.mainNight {

  min-height: 80vh;
  width: 80%;
  margin: auto;
  background-color: rgb(37, 45, 56);
  border-radius: 10px;
  border: solid gray 1px;
  box-shadow: black 4px 6px 4px;
}

#footer {
  top: 20px;
  width: 80%;
  margin-top: 30px;
  margin-left: 10%;
  margin-right: 10%;
}


</style>
