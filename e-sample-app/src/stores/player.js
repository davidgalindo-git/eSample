import { defineStore } from "pinia";

//doc: https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
export const usePlayer = defineStore("player", {
    state: () => ({
        playing: false,
        audio: null,
        currentTime: 0,
        duration: 0,
    }),

    actions: {
        play(sample){
            if (sample) {
                this.initAudio()

                this.audio.src = sample.previews['preview-hq-mp3']
                this.audio.load()

                this.audio.play();
                this.playing = true;
            }
        },

        initAudio() {
            if (this.audio) return

            this.audio = new Audio();

            this.audio.onloadedmetadata = () => {
                this.duration = this.audio.duration || 0;
            }

            this.audio.ontimeupdate = () => {
                this.currentTime = this.audio.currentTime;
            }

            this.audio.onended = () => {
                this.playing = false;
            }

            this.audio.onerror = () => {
                console.error("Erreur de lecture audio:", e)
                this.playing = false;
            }
        }
    }
})