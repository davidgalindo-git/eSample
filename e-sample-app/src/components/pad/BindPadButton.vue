<script setup>
import {ref} from "vue";

const emit = defineEmits(['toggle-pad-pop-up'])

const isPadPopUp = ref(false)

const togglePadPopUp = () => {
  isPadPopUp.value = !isPadPopUp.value

  emit("toggle-pad-pop-up", isPadPopUp.value)
}

</script>

<template>
  <button
      class="bind-pad-button"
      @click.stop="togglePadPopUp"
      :class="{ 'is-active': isPadPopUp }"
  >
    {{ isPadPopUp ? 'x' : '+'}}
  </button>
</template>

<style scoped>
button {

}

</style>