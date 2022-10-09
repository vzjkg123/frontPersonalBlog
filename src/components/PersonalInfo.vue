<template>
  <div>
    <table id="tab">
      <tr>
        <td colspan="2">
          站长信息
        </td>
        <td>Logo</td>
        <td class="icon_info">Logo故事</td>
      </tr>

      <tr>
        <td>Name</td>
        <td>Tiancai Liu</td>
        <td rowspan="4"><img src="@/assets/logo.png"/></td>
        <td rowspan="4" class="icon_info">

          这个图标来源于大一暑假学习android
          试开发软件时设计的一个图标
          一眼就能看出为名字的各字的拼音首字母组合而成。
          虽然看着简陋些但却对我有着不同寻常的意义......

        </td>
      </tr>
      <tr>
        <td>E-mail</td>
        <td>1962651587@qq.com</td>
      </tr>
      <tr>
        <td>Github Page</td>
        <td>https://666.ltcnb.top</td>
      </tr>
      <td>University</td>
      <td>ECUT</td>
    </table>

  </div>
</template>

<script>
export default {
  name: "PersonalInfo"
}
</script>

<style scoped>
.icon_info {
  width: 400px;
  padding: 20px;
}

#tab {

  height: 400px;
  width: 90%;
  margin: 20px 5%;
  border-collapse: collapse;
}

#tab td{
  border: #d0d0d0 solid!important;
  text-align: center;

}

td > img {
  width: 200px;
}
</style>