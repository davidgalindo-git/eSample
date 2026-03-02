import {defineStore} from "pinia";
import {ref} from "vue";

export const usePadStore = defineStore('pads', () => {
    const assignedPads = ref([])

    const assignSampleToPad = (sample, index) => {
        assignedPads.value = assignedPads.value.filter(pad => pad.index !== index);
        assignedPads.value.push({index,sample});
    }
    return { assignedPads, assignSampleToPad };
})