import {defineStore} from "pinia";
import {ref} from "vue";

export const usePadStore = defineStore('pads', () => {
    const assignedPads = ref([])

    return { assignedPads };
})