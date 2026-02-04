<script setup>
import {ref} from 'vue'

const keyword = ref(null)
</script>

<template>
  <p>Research samples</p>
  <input v-model="keyword" placeholder="Insert keyword" @keyup.enter="submitKeyword"/>
</template>

<style scoped>

</style>