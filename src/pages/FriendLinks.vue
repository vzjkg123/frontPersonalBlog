<template>
  <div>
    <div @click="showF">
      <div class="friends">
        <h3>
          友情链接>>
        </h3>
      </div>
    </div>
    <div class="friends_box" v-show="showFriends">
      <link-card link="https://666.ltcnb.top" title="Home of Tiancai" description="第一次接触web页面留下"></link-card>
      <link-card link="https://blog.kiroe.cn/" title="Kiro的藏经阁" description="室友1的博客"></link-card>
      <link-card link="http://ronki.moe" title="登山笔记" description="室友2的博客"></link-card>
    </div>

    <br>
    <div @click="showTool">
      <div class="friends"><h3>小工具>></h3></div>
    </div>

    <div class="friends_box" v-show="showTools">
      <link-card link="http://tool.c7sky.com/webcolor/" title="配色表" description="网页设计常用色彩搭配表（hex格式）"/>
    </div>
  </div>
</template>

<script>
import LinkCard from "@/components/LinkCard";

export default {
  name: "FriendLinks",
  components: {LinkCard},

  data() {
    return {
      showFriends: false,
      showTools: false
    }
  },
  methods: {
    showF() {
      this.showFriends = this.showFriends !== true;
    },
    showTool() {
      this.showTools = this.showTools !== true;
    }
  }

}
</script>

<style scoped>
h3 {
  text-align: center;
}

h3:hover {
  color: whitesmoke;
}

.friends {
  margin-top: 30px;
  cursor: pointer;
  width: 80%;
  margin-left: 10%;
  display: block;
  top: 70px;
  border: #66CCCC 1px solid;
  border-radius: 5px;

}

.friends :nth-child(2) {
  margin-bottom: 10%;

}


.friends_box {
  display: block;
  margin-bottom: 10%;
}

</style>