<script setup>
import {onMounted} from "vue";

import {useFreesoundAuth} from "../../stores/api.js";

const freesoundAuth = useFreesoundAuth()

onMounted(async () => {
  await freesoundAuth.getToken()
})
</script>

<template>
<div v-if="!freesoundAuth.token">
  <button
    @click="freesoundAuth.login()"
  >
    Get a Freesound token
  </button>
</div>
</template>

<style scoped>

</style>