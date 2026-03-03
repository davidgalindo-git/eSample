import {defineStore} from "pinia";
import {ref} from "vue";
import {useFreesoundAuth} from "./api.js";

export const usePadStore = defineStore('pads', () => {
    const auth = useFreesoundAuth();

    const assignedPads = ref([])

    const totalPads = 9

    const getPadIndex = (visualPos) => {
        const row = Math.floor((visualPos - 1) / 3)
        const col = (visualPos - 1) % 3

        return (2 - row) * 3 + col
    }

    const getPadData = (logicIndex) => {
        return assignedPads.value.find(p => Number(p.index) === Number(logicIndex)) || null
    }

    const assignSampleToPad = (sample, index) => {
        assignedPads.value = assignedPads.value.filter(pad => pad.index !== index);
        assignedPads.value.push({
            index,
            sample,
            alias: alias || sample.name
        });
    }

    const loadDefaultKit = async () => {
        const defaultSamples = [
            {index: 3, id: 833677, alias:"Vocal Chop"},
            {index: 4, id: 183107, alias:"Rim"},
            {index: 5, id: 509984, alias:"Open Hat"},
            {index: 6, id: 704245, alias: "Kick"},
            {index: 7, id: 517297, alias: "Snare"},
            {index: 8, id: 363203, alias: "Hi-Hat"}
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
                    alias: item.alias,
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

    return { assignedPads, totalPads, getPadIndex, getPadData, assignSampleToPad, loadDefaultKit };
})