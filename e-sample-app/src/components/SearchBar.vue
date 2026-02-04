<script setup>
import {ref} from 'vue'
import { useSampleAPI } from '../stores/sampleStore.js'

const sampleStore = useSampleAPI()

const keyword = ref(null)

function submitKeyword(keyword) {
  sampleStore.searchSamples(keyword)
}
</script>

<template>
  <p>Research samples</p>
  <input v-model="keyword" placeholder="Insert keyword" @keyup.enter="submitKeyword(keyword)"/>
  <p>{{ keyword }}</p>
  <p>{{sampleStore.samples}}</p>
</template>

<style scoped>

</style>