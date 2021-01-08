<template>
  <div class="custom_label_tit">
    <i class="el-icon-collection-tag custom_label_icon"></i>
    <span>{{labelTitle}}</span>
  </div>
</template>

<script>
export default {
  name: 'LabelHeader',
  props: {
    labelTitle: {
      type: String,
      default: '请设置标签头'
    }
  }
}
</script>

<style lang="stylus" scoped>
.custom_label_tit
  display flex
  justify-content flex-start
  align-items center
  background url('../assets/pageSing.png') no-repeat
  background-size auto 100%
  height 1rem
  margin-bottom 0.4rem
.custom_label_tit span
  color #fff
  font-size 0.35rem
.custom_label_icon
  color #fff
  margin-left 0.4rem
  margin-right 0.1rem
</style>
