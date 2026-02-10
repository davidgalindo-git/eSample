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

                if (!sample.previews || !sample.previews['preview-hq-mp3']) {
                    console.error('No preview available for sample.')
                }
                this.audio.src = sample.previews['preview-hq-mp3']
                this.audio.load()

                this.audio.play();
                this.playing = true;
            }
        },

        pause(){
          if (this.audio) {
              this.audio.pause();
              this.playing = false;
          }
        },

        stop(){
            if (this.audio) {
                this.audio.pause();
                this.audio.currentTime = 0;
                this.playing = false;
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

            this.audio.onerror = (e) => {
                console.error("Erreur de lecture audio:", e)
                this.playing = false;
            }
        }
    }
})