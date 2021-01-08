<template>
  <div>
    <label-header :label-title="msg"></label-header>
    <input type="text" v-model="msg" /><br/>
    <span>{{msg | upper}}</span><br/>
    <button @click="handle">测试</button>
    <hello-world></hello-world>
    <hello-world></hello-world>
    <hello-world></hello-world>
    <hello-world></hello-world>
  </div>
</template>
<script>
import LabelHeader from '../components/LabelHeader'
export default {
  name: 'test',
  data () {
    return {
      msg: '星空'
    }
  },
  filters: {
    // 自定义过滤器
    upper: function (val) {
      return val.charAt(0).toUpperCase() + val.slice(1)
    }
  },
  components: {
    LabelHeader
  },
  methods: {
    handle () {
      console.info(111)
    }
  }
}
</script>

<style scoped>

</style>
