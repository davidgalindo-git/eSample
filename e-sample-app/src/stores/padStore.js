import {defineStore} from "pinia";
import {ref} from "vue";
import {useFreesoundAuth} from "./api.js";

export const usePadStore = defineStore('pads', () => {
    const assignedPads = ref([])

    const assignSampleToPad = (sample, index) => {
        assignedPads.value = assignedPads.value.filter(pad => pad.index !== index);
        assignedPads.value.push({index,sample});
    }

    const loadDefaultKit = async () => {
        const defaultSamples = [
            {index: 0, id: 704245, name: "Kick"},
            {index: 1, id: 517297, name: "Snare"},
            {index: 2, id: 363203, name: "Hi-Hat"}
        ];

        try {
            const promises = defaultSamples.map(async (item) => {
                const url = `${useFreesoundAuth.freesoundURL}/sounds/${item.id}/?token=${useFreesoundAuth.client_secret}&fields=id,name,previews`
                const res = await fetch(url);
                const data = await res.json()
                return {
                    index: item.index,
                    sample: data
                }
            })

            assignedPads.value = await Promise.all(promises);
            console.log("Default kit loaded with previews", assignedPads.value);

        } catch (error) {
            console.log("Failed to load default kit", error);
        }
    };

    return { assignedPads, assignSampleToPad, loadDefaultKit };
})