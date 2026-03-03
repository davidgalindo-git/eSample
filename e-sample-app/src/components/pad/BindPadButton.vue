<script setup>
import {ref} from "vue";
import BindPadPopUp from "./BindPadPopUp.vue";

const props = defineProps({
  sample: {
    type: Object,
    default: null
  },
  index: {
    type: Number,
    required: true
  },
  alias : {
    type: String,
    required: false
  }
})

const isPadPopUp = ref(false)

const togglePadPopUp = () => {
  isPadPopUp.value = !isPadPopUp.value
}

</script>

<template>
  <BindPadPopUp
      v-if="isPadPopUp"
      class="pad-pop-up"
  />
  <button
      class="bind-pad-button"
      @click.stop="togglePadPopUp"
  >
  </button>
</template>

<style scoped>
button {

}

</style>