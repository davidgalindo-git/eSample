import {ref} from "vue";

// freesound API vars
const freesoundURL = `https://freesound.org/apiv2/`
const FREESOUND_API_KEY = import.meta.env.VITE_FREESOUND_CLIENT_SECRET

// flags and containers init
const samples = ref([])
const likedSamples = ref([])
const loading = ref(false)

// API request function management
export const useSampleAPI = () => {
    // sample research with input
    const searchSamples = async (query) => {
        // build URL : freesound URL + search + query + token + return fields
        const url = `${freesoundURL}search/?query=${query}&token=${FREESOUND_API_KEY}&fields=id,name,tags,previews,username,license`

        loading.value = true         // update loading state
        try{
            const res = await fetch(url)    // asynchronous fetch to API
            const data = await res.json()   // store result
            samples.value = data.results         // update samples data
            console.log("Samples loaded:", samples.value);
        } catch(error) {
            console.error("Search failed: ", error)
        } finally {
            loading.value = false        // update loading state
        }
    }

    const searchLikedSamples = async (likedList) => {
        loading.value = true
        try{
            const fetchPromises = likedList.map(async (id)=> {
                // URL with search query containing sample ID
                const url = `${freesoundURL}search/?query=${id}&token=${FREESOUND_API_KEY}&fields=id,name,tags,previews,username,license`
                const res = await fetch(url)
                const data = await res.json()

                // return only first result or null if no sample is found
                return data.results && data.results.length > 0 ? data.results[0] : null
            })

            // wait for all fetch promises to be finished
            const results = await Promise.all(fetchPromises)

            // assign data to container and filter null values
            likedSamples.value= results.filter(sample => sample !== null)

            console.log("Liked samples loaded:", likedSamples.value);
        } catch(error) {
            console.error("Liked samples search failed: ", error)
        } finally {
            loading.value = false        // update loading state
        }
    }

    const downloadSample = async (sampleId) => {
        loading.value = true
        try {
            // URL with download query containing sample ID
            const url = `${freesoundURL}sounds/${sampleId}/download/`
            const fsToken = localStorage.getItem("fs_token")

            if (!fsToken) {
                console.error("Could not find freesound token, get a token by clicking on ''")
            }

            // fetch download url with user's auth token as header
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${fsToken}`
                }
            })
            const data = await res.json()
            
            console.log("Sample downloaded:", data)
        } catch (error) {
            console.error("Download failed: ", error)
        } finally {
            loading.value = false        // update loading state
        }
    }

    return { samples, likedSamples, loading, searchSamples, searchLikedSamples, downloadSample }
}

