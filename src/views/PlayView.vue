<template>
  <div class="play">
      <AppButton v-for="(string, i) in strings"
      :string="string"
      :key="i"
      :buttonText=strings[i].note
      :buttonColour=strings[i].color
      :pluckNote="pluckNote" 
      :note=strings[i].note
      @keyup="onKeyUp"
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
          strings: [{note: "A3", color: orange}, 
                    {note: "B3", color: blueishGreen},
                    {note: "C4", color: vermilion},
                    {note: "D4", color: reddishPurple}
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
        window.addEventListener("keydown", this.pluckNote);
      },
      methods: {
        pluckNote(eventType, noteName='C4'){
          if(eventType === "mouseup"){
            console.log(`note "${noteName}" triggered with ${eventType} event`);
            this.sampler.triggerAttack(noteName)
          }else{
            const key = eventType.key;
            const keys = ["z", "x", "c", "v"];
            for(let i = 0; i < keys.length; i++){
              if(keys[i] === key){
                console.log(key)
                this.sampler.triggerAttack(this.strings[i].note); // not reliable as strings is an object
              }
            }
          }
        },
        onKeyUp(evt){
          console.log(evt);
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
