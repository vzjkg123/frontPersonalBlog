<template>
  <div>
    <Warning @getStatus="handleStatus" :key="warnKey" v-if="isWarning" :id="ob.id" :opinion="ob.opinion"
             :title-or-email="ob.titleOrEmail"/>
    <Tip v-if="showTip" :type="type" :content="tip" :key="key"/>
    <div v-if="isManager">
      <div id="header_box">
        <input placeholder="在此输入日志" v-model="diary"/>
        <button @click="postDiary">发布日志</button>
      </div>
      <table class="Manage_table">
        <tr>
          <td colspan="8" class="title">用户信息</td>
          <td>
            <button @click="addUserRow">添加用户</button>
          </td>
        </tr>
        <tr>
          <th>唯一识别码</th>
          <th>昵称</th>
          <th>密码</th>
          <th>电子邮箱</th>
          <th>电话</th>
          <th>注册时间</th>
          <th>角色</th>
          <th colspan="2">操作</th>
        </tr>
        <tr class="data_row" v-for="user in users" :key="user.account">
          <td>{{ user.account }}</td>
          <td>{{ user.name }}</td>
          <td><input type="password" v-model="user.password"/></td>
          <td>{{ user.email }}</td>
          <td>{{ user.tel == null ? "空" : user.tel }}</td>
          <td>{{ user.time }}</td>
          <td>{{ user.role === "root" ? "root" : "普通用户" }}</td>
          <td class="operation">
            <button @click="updateUser(user.account)">修改</button>
          </td>
          <td class="operation">
            <button class="danger" @click="delUser(user.account,user.email)">删除</button>
          </td>
        </tr>
        <tr class="data_row" v-for="user in newUsers" :key="user.account">
          <td><i>自动生成</i></td>
          <td><input placeholder="用 户 名" v-model="user.name"/></td>
          <td><input type="password" placeholder="密 码" v-model="user.password"/>
          </td>
          <td><input type="text" placeholder="邮 箱" v-model="user.email"/></td>
          <td><i>暂不开放</i></td>
          <td><i>自动生成</i></td>
          <td>
            <select v-model="newUsers[0].role">
              <option value="" selected>普通用户</option>
              <option value="root">root</option>
            </select>
          </td>
          <td class="operation">
            <button @click="addUser()">保存</button>
          </td>
          <td class="operation">
            <button class="danger" @click="this.newUsers.pop()">取消</button>
          </td>
        </tr>

      </table>

      <table class="Manage_table">
        <tr>
          <td colspan="9" class="title">文章发布信息</td>
        </tr>
        <tr>
          <td>识别码</td>
          <td>有效链接</td>
          <td>标题</td>
          <td>摘要</td>
          <td>修改时间</td>
          <td>点赞数</td>
          <td>UUID</td>
          <td>发布用户</td>
          <td class="operation">操作</td>
        </tr>
        <tr class="data_row" v-for="(page) in pages" :key="page.id">
          <td>{{ page.id }}</td>
          <td class="link"><a :href="page.url">
            {{ page.url == null ? "空" : page.url.substring(page.url.length - 6, page.url.length) }}</a></td>
          <td>{{ page.title }}</td>
          <td>{{ page.digest.substring(0, 19) }}</td>
          <td>{{ page.change_time }}</td>
          <td>{{ page.traffic }}</td>
          <td>{{ page.uuid }}</td>
          <td>{{ page.poster }}</td>
          <td>
            <button class="danger" @click="delArticle(page.id,page.title)">删除</button>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>
      <div class="permission_tip">
        <h1><i>Permission denied!</i></h1>
        <button>
          <router-link to="/">回到主页</router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";
import Tip from "@/components/Tip";
import Warning from "@/ManageComponent/Warning";

export default {
  name: "UserCard",
  components: {Warning, Tip},
  data() {
    return {
      ob: {id: "", titleOrEmail: "", opinion: ""/*email或者title*/},
      diary: "",
      newUsers: [],
      users: [], pages: [],
      newUser: {account: "", name: "", password: "", email: "", tel: "", time: "", role: ""},
      isManager: false,
      largeTip: "",
      type: "",
      tip: "",
      key: 0, warnKey: 0,
      showTip: false,
      isWarning: false,
      root: "",
    }
  },
  methods: {

    addUser() {
      let data = new FormData()
      data.append("email", Cookies.get("email"))
      data.append("code", Cookies.get("token"))
      let user = this.newUsers[0]
      if (user.name < 1 || name.length > 10) {
        this.failed("昵称长度介于1-10之间")
        return;
      }
      if (user.password.length < 6 || user.password.length > 16) {
        this.failed("密码长度介于6-16位之间")
        return
      }
      const Reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/g;
      if (!Reg.test(user.email)) {
        this.failed("请填写正确的邮箱");
        return
      }
      data.append("userName", user.name)
      data.append("userPassword", user.password)
      data.append("userEmail", user.email)
      data.append("userRole", user.role)
      axios.post(this.root + "/administrator/addUser", data).then(res => {
        if (res.data.flag === true) {
          this.success("添加成功,已重新拉取数据")
          this.getData()
          this.newUsers.pop()
        } else {
          this.failed("添加失败:" + res.data.data)
        }
      }).catch(e => {
        this.failed("出错了，请到控制台查看信息")
        console.log(e)
      })
    },

    addUserRow() {
      if (this.newUsers.length > 0) {
        this.success("一次只能添加一条数据")
        return
      }
      this.newUsers.push(this.newUser)
    },
    newWarn() {
      this.isWarning = true;
      this.warnKey++;
    },
    postDiary() {
      let data = new FormData()
      data.append("email", Cookies.get("email"))
      data.append("code", Cookies.get("token"))
      data.append("des", this.diary)
      axios.post("/administrator/addDiary", data).then(res => {
        if (res.data.flag === true)
          this.success("日志发布成功")
        else {
          console.log(res.data.data)
        }
      }).catch(e => {
        this.failed("未知错误")
        console.log(e)
      })
    },
    updateUser(account) {

      let data = new FormData()
      data.append("email", Cookies.get("email"))
      data.append("code", Cookies.get("token"))
      for (let i = 0; i < this.users.length; i++)
        if (this.users[i].account === account) {
          data.append("id", this.users[i].account);
          data.append("password", this.users[i].password)
          break;
        }
      if (data.get("password").length < 6) {
        this.failed("密码过短")
      }
      axios.post("/administrator/updateUser", data).then(res => {
        if (res.data.flag === true) {
          this.success("信息更新成功！")
        } else {
          console.log(res.data.data == null ? "暂无错误信息" : res.data.data)
          this.failed("更新失败，请到控制台查看详情")
        }
      }).catch(e => {
        this.failed("出错了，请到控制台查看详情")
        console.log(e)
      })

    },
    delArticle(id, title) {
      this.ob.id = id;
      this.ob.opinion = "Title"
      this.ob.titleOrEmail = title
      this.newWarn()
    },
    handleStatus(obj) {
      if (obj.status) {
        this.success("删除成功，已重新拉取数据")
        this.getData()
      } else {
        this.failed("删除失败:" + obj.msg)
      }
    },
    delUser(id, email) {
      this.ob.id = id;
      this.ob.opinion = "Email"
      this.ob.titleOrEmail = email
      this.newWarn()
    },
    getData() {
      let email = Cookies.get("email")
      let code = Cookies.get("token")
      let data = new FormData();
      data.append("email", email)
      data.append("code", code)
      axios.post(this.root + "/administrator", data).then(
          res => {
            if (res.data.flag === true) {
              this.isManager = true
              this.users = res.data.data.users;
              this.pages = res.data.data.interviews;
            } else {
              console.log(res.data.data)
              this.failed("数据拉取失败")
            }
          }
      )
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
  },
  created() {
    this.getData()
  }
}
</script>

<style scoped>
.danger {
  background: #f56c6c;
}

.danger:hover {
  background: #f89898;
}

select {
  background: none;
  color: inherit;
  border: none;
}

select:focus {
  outline: none;
}

#header_box {
  width: 90%;
  margin: 10px auto;
  border-bottom: solid 1px;
  height: 40px;
}

#header_box > button {
  width: 100px;
  float: right;
}

input {

  margin-top: 10px;
  height: 20px;
  font-size: 18px;
  width: calc(100% - 120px);
  border: 0;
  color: inherit;
  padding: 0;
  background: none;
  text-indent: 1rem;
}

input:focus {
  border: none;
  box-shadow: none;
  outline: none;
}


.permission_tip {
  text-align: center;
  margin-top: 20%;
}

.link {
  width: 20px;
}

.title {
  height: 30px;
  font-weight: bold;
  font-style: italic;
}

.Manage_table {
  border-collapse: collapse;
  border: solid 1px;
  width: 90%;
  margin: 50px auto;
}

.Manage_table:last-child {
  margin-top: 80px;
}

.Manage_table>tr > td {
  height: 40px;
  border: solid 1px;
  text-align: center;
  max-width: 100px;
  overflow: hidden;
}


td > input {
  background: none;
  color: inherit;
  text-align: center;
  width: 100%;
  margin: 0;
  border: none;
  padding: 0;
}

.data_row:nth-child(2n) {
  background: rgba(255, 255, 255, 0.3);
}

td > input:focus {
  outline: none;
  border: none;
  padding: 0;
}

.Manage_table > tr > th {
  background: rgba(15, 12, 13, 0.16);
  height: 35px;
  text-align: center;
  border: solid 1px;
}


.operation {
  width: 60px;
  border-right: none !important;
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

a {
  color: inherit;
  text-decoration: none;
}

td > a:hover {
  text-decoration: underline;
}
</style>