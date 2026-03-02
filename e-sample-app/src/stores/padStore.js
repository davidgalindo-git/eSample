import {defineStore} from "pinia";
import {ref} from "vue";
import {useFreesoundAuth} from "./api.js";

export const usePadStore = defineStore('pads', () => {
    const auth = useFreesoundAuth();

    const assignedPads = ref([])

    const assignSampleToPad = (sample, index) => {
        assignedPads.value = assignedPads.value.filter(pad => pad.index !== index);
        assignedPads.value.push({index,sample});
    }

    const loadDefaultKit = async () => {
        const defaultSamples = [
            {index: 6, id: 704245, name: "Kick"},
            {index: 7, id: 517297, name: "Snare"},
            {index: 8, id: 363203, name: "Hi-Hat"}
        ];

        try {
            const promises = defaultSamples.map(async (item) => {
                if (item.index === null || item.index === undefined) return null

                const url = `${auth.freesoundURL}sounds/${item.id}/?token=${auth.client_secret}&fields=id,name,previews`
                const res = await fetch(url);
                const data = await res.json()

                if (!res.ok) return null;

                return {
                    index: item.index,
                    sample: data
                }
            })

            const results = await Promise.all(promises);
            assignedPads.value = results.filter(r => r !== null);
            console.log("Default kit loaded with previews", assignedPads.value);

        } catch (error) {
            console.log("Failed to load default kit", error);
        }
    };

    return { assignedPads, assignSampleToPad, loadDefaultKit };
})