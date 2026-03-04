import {ref, computed} from "vue";
import {useFreesoundAuth} from "./api.js";

// local flags and containers init
const freesoundAuth = useFreesoundAuth();
const freesoundURL = freesoundAuth.freesoundURL;
const FREESOUND_API_KEY = freesoundAuth.client_secret;

const samples = ref([])
const totalCount = ref(0)
const currentPage = ref(1)
const samplesPerPage = 15
const currentQuery = ref("")
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
            console.log("Samples loaded:", samples.value); // DEBUG
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

            console.log("Liked samples loaded:", likedSamples.value); // DEBUG
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

            // raise error if token hasn't been claimed
            if (!fsToken) {
                console.error("Could not find freesound token, get a token by clicking on 'Get a Freesound Token'")
                return
            }

            // fetch download url with user's auth token as header
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${fsToken}`
                }
            })

            if (res.status === 401) {
                throw new Error("Token expiré ou invalide (401)");
            }

            // convert audio data to blob: Binary Large Object
            const blob = await res.blob()

            // create temporary url to stock large audio file
            const blobUrl = window.URL.createObjectURL(blob);

            // create invisible temporary link that references to audio url
            const link = document.createElement('a');
            link.href = blobUrl;

            // download attribute forces download request instead of web navigation
            link.download = `freesound-${sampleId}.wav`; // set audio file name

            // inject link inside web page
            document.body.appendChild(link);
            // click download link
            link.click()

            // clean browser memory
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);

            console.log("Sample downloaded")
        } catch (error) {
            console.error("Download failed: ", error)
        } finally {
            loading.value = false        // update loading state
        }
    }

    const getPreviewUrl = async (sampleId) => {
        const url = `${freesoundURL}sounds/${sampleId}/?token=${FREESOUND_API_KEY}&fields=previews`

        try {
            const res = await fetch(url)
            const data = await res.json()
            return data.previews['preview-lq-mp3']
        } catch(error) {
            console.error("Sample fetch preview error: ", error)
        }
    }
    return { samples, likedSamples, loading, searchSamples, searchLikedSamples, downloadSample, getPreviewUrl }
}

