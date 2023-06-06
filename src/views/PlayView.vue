<template>
  <div class="play">
      <AppButton v-for="(string, i) in strings"
      :string="string"
      :key="i"
      :buttonText=strings[i].note
      :buttonColour=strings[i].color
      :testFunction="playNote" 
      :note=strings[i].note
    /> 
  </div>

</template>

<script>
  import AppButton from "../components/AppButton.vue"
  import { Sampler } from "tone";
  import C4 from "../assets/Harp-C4.mp3";

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
          strings: [{name: "note1", note: "A3", color: orange}, 
                    {name: "note2", note: "B3", color: blueishGreen},
                    {name: "note3", note: "C4", color: vermilion},
                    {name: "note4", note: "D4", color: reddishPurple}
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
      },
      methods: {
        playNote(noteName, eventType){
          console.log(`note "${noteName}" triggered with ${eventType} event`);
          this.sampler.triggerAttack(noteName)
        },
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
