import { defineStore } from "pinia";
import {computed, ref, watch} from "vue";

export const useLiked = defineStore("liked", () => {
    const storage = JSON.parse(localStorage.getItem("liked-samples") || "[]")
    const likedIds = ref(new Set(storage));

    const toggleLike = (sampleId) => {
        // create temporary set to avoid direct modification to liked set
        const tempSet = new Set(likedIds.value);

        // toggle logic: delete if already exists in set, add if it doesn't
        if (tempSet.has(sampleId)) {
            tempSet.delete(sampleId)
        } else {
            tempSet.add(sampleId)
        }

        likedIds.value = tempSet // redefine liked set
    }

    const isLiked = (sampleId) => likedIds.value.has(sampleId)

    const likedList = computed(() => Array.from(likedIds.value))

    watch(likedIds, (currentSet) => {
        localStorage.setItem("liked-samples", JSON.stringify([...currentSet]))
    }, { deep: true })

    return {likedIds, likedList, toggleLike, isLiked}
})