import { defineStore } from "pinia";

//doc: https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
export const usePlayer = defineStore("player", {
    state: () => ({
        playing: false,
        audio: null,
        currentTime: 0,
        duration: 0,
        currentSample: null,
    }),

    getters: {
      isPlaying: (state) => (sampleId) => {
          return state.playing && state.currentSample?.id === sampleId
      }
    },

    actions: {
        play(sample){
            if (sample) {
                // check preview availability
                if (!sample.previews || !sample.previews['preview-hq-mp3']) {
                    console.error('No preview available for sample.')
                }

                this.initAudio()

                // resume sample if sample to be played is the same
                if (this.currentSample?.id === sample.id && this.audio.paused) {
                    this.audio.play()
                    this.playing = true
                    return
                }

                this.currentSample = sample
                this.audio.src = sample.previews['preview-hq-mp3'] // bind audio src to preview field and load
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
                this.audio.currentTime = 0; // reset time elapsed to 0
                this.playing = false;
                this.currentSample = null; // reset current sample
            }
        },

        stopAll(){
            this.stop()
            this.activeAudios.forEach(audio => {
                audio.stop();
                audio.src = ""
                audio.remove()
            });
            this.activeAudios = [];
            this.playing = false;
            console.log("All instances stopped")
        },

        addAudio(audio){
            this.activeAudios.push(audio);
            audio.onended = () => {
                this.activeAudios = this.activeAudios.filter(a => a !== audio)
            }
        },

        // toggle play/pause function
        togglePlay(sample){
            if (this.isPlaying(sample.id)) {
                this.pause()
            } else {
                this.play(sample);
            }
        },

        initAudio() {
            // avoid audio superposition by only creating instance if it doesn't already exist
            if (this.audio) return

            // create API HTML5 Audio instance
            // "Audio" is an object that contains functions like: .play(), .pause() or .src()
            this.audio = new Audio();

            // when sample is loaded, runs only once
            this.audio.onloadedmetadata = () => {
                this.duration = this.audio.duration || 0;
            }

            // runs constantly to update elapsed time value
            this.audio.ontimeupdate = () => {
                this.currentTime = this.audio.currentTime;
            }

            // runs when audio is finished playing
            this.audio.onended = () => {
                this.playing = false;
            }

            // error catch
            this.audio.onerror = (e) => {
                console.error("Erreur de lecture audio:", e)
                this.playing = false;
            }
        }
    }
})