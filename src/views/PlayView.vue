<template>
  <div class="play">
      <AppButton v-for="(string, i) in strings"
      :string="string"
      :key="i"
      :buttonText=strings[i].name
      :buttonColour=strings[i].color
      :testFunction="playNote" 
      :note=strings[i].note
    /> 
  </div>

</template>

<script>
  import AppButton from "../components/AppButton.vue"

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
          strings: [{name: "note1", note: "a", color: orange}, 
                    {name: "note2", note: "b", color: blueishGreen},
                    {name: "note3", note: "c", color: vermilion},
                    {name: "note4", note: "d", color: reddishPurple}
                  ]
        }
      },
      methods: {
        playNote(noteName, eventType){
          console.log(`note "${noteName}" triggered with ${eventType} event`);
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
