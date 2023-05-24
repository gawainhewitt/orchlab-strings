<template>
  <div class="play">
    <h1>This is the play page</h1>
    <p>For playing the instrument</p>
  </div>

  <div id="app">
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

    export default {
      name: "App",
      components: {
        AppButton 
       },
      data() {
        return {
          strings: [{name: "note1", note: "a", color: "red"}, 
                    {name: "note2", note: "b", color: "blue"},
                    {name: "note3", note: "c", color: "green"},
                    {name: "note4", note: "d", color: "purple"}
                  ],
        }
      },
      methods: {
        playNote(noteName, eventType){
          console.log(`note "${noteName}" triggered with ${eventType} event`);
        },
      }
    }
</script>
