<script setup>
import {onMounted} from "vue";

import {useFreesoundAuth} from "../../stores/api.js";

const freesoundAuth = useFreesoundAuth()

onMounted(async () => {
  await freesoundAuth.getToken()
})
</script>

<template>
<div class="auth-container">
  <div class="logged-out-zone"
       v-if="!freesoundAuth.token.value"
  >
    <span class="logged-out-dot"></span>
    <button
        @click="freesoundAuth.login()"
        title="Connect to Freesound's authentication to download samples"
    >
      Connect to Freesound
    </button>
  </div>
  <div v-else class="logged-in-zone">
    <span class="logged-in-dot"></span>
    <button @click="freesoundAuth.logout()" class="btn-logout">Logout</button>
  </div>
</div>
</template>

<style scoped>

</style>