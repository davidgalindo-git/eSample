import {ref} from "vue";

// freesound API vars
const freesoundURL = `https://freesound.org/apiv2/search/`
const FREESOUND_API_KEY = import.meta.env.VITE_FREESOUND_API_KEY

// API request function management
export const useSampleAPI = () => {
    // flags and containers init
    const samples = ref([])
    const loading = ref(false)

    // sample research with input
    const searchSamples = async (query) => {

        const API_KEY = FREESOUND_API_KEY   // API secret token
        const url = `${freesoundURL}?query=${query}&token=${API_KEY}&fields=id,name,tags,previews,username,license`   // URL to fetch, include necessary fields

        loading.value = true         // update loading state
        try{
            const res = await fetch(url)    // asynchronous fetch to API
            const data = await res.json()   // store result
            samples.value = data.results         // update samples data
        } catch(error) {
            console.error("Search failed: ", error)
        } finally {
            loading.value = false        // update loading state
        }
    }

    return { samples, loading, searchSamples }
}

