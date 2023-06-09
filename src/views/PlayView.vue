<template>
  <div class="play">
      <AppButton v-for="(string, i) in strings"
      :string="string"
      :key="i"
      :buttonText=strings[i].note
      :buttonColour=strings[i].color
      :pluckNote="pluckNote" 
      :note=strings[i].note
    /> 
  </div>

</template>

<script>
  import AppButton from "../components/AppButton.vue"
  import { Sampler } from "tone";
  import C4 from "../assets/cello-short.flac";

  // const black = "rgb(0, 0, 0)"
  const orange = "rgb(230, 159, 0)"
  // const skyBlue = "rgb(86, 180, 233)"
  const blueishGreen = "rgb(0, 158, 115)"
  // const yellow = "rgb(240, 228, 66)"
  // const blue = "rgb(0, 114, 178)"
  const vermilion = "rgb(213, 94, 0)"
  const reddishPurple = "rgb(204, 121, 167)"

    export default {
      name: "App",
      components: {
        AppButton 
       },
      data() {
        return {
          strings: [{key: "Z", note: "A3", color: orange}, 
                    {key: "X", note: "B3", color: blueishGreen},
                    {key: "C", note: "C4", color: vermilion},
                    {key: "V", note: "D4", color: reddishPurple}
                  ],
          isLoaded: false
        }
      },
      created() {
        this.sampler = new Sampler(
          { C4 },
          {
            onload:() => {
              this.isLoaded = true;
            }
          }
        ).toDestination();
        window.addEventListener("keydown", this.handleQwerty);
      },
      unmounted() {
        window.removeEventListener("keydown", this.handleQwerty);
      },
      methods: {
        handleQwerty(event) {
          const qwertyInput = event.key.toUpperCase();
            for(let i = 0; i < this.strings.length; i++){
              if(this.strings[i].key === qwertyInput){
                this.pluckNote("keyboard", this.strings[i].note);
              }
            }
        },
        pluckNote(eventType, noteName){
          console.log(`note "${noteName}" triggered with ${eventType} event`);
          this.sampler.triggerAttack(noteName);
        }
      }
    }
</script>

<style>
  .play {
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
