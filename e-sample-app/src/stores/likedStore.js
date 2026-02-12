import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useLiked = defineStore("liked", () => {
    const likedIds = ref(new Set(JSON.parse(localStorage.getItem("liked-samples") || "[]")));

    const toggleLike = (sampleId) => {
        // create temporary set to avoid direct modification to liked set
        const tempSet = new Set(likedIds.value);

        // toggle logic: delete if already exists in set, add if it doesn't
        if (likedIds.value.has(sampleId)) {
            tempSet.delete(sampleId)
        } else {
            tempSet.add(sampleId)
        }

        likedIds.value = tempSet // redefine liked set
    }

    const isLiked = (sampleId) => likedIds.value.has(sampleId)

    watch(likedIds, (currentSet) => {
        localStorage.setItem("liked-samples", JSON.stringify([...currentSet]))
    }, { deep: true })

    return {likedIds, toggleLike, isLiked}
})