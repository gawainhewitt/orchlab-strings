<template>
  <div class="play">
    <h1>This is the play page</h1>
    <p>For playing the instrument</p>
  </div>

  <div id="app">
    <AppButton 
      buttonText="Note 1" 
      buttonColour="#ff5733" 
      :testFunction="playNote" 
      :note="note1Name"
    /> 
    <br>
    <AppButton 
      buttonText="Note 2" 
      buttonColour="Green" 
      :testFunction="playNote" 
      :note="note2Name"
    /> 
    <br>
    <AppButton 
      buttonText="Note 3" 
      buttonColour="Purple" 
      :testFunction="playNote" 
      :note="note3name"
    /> 
    <br>
    <AppButton 
      buttonText="Note 4" 
      buttonColour="Blue" 
      :testFunction="playNote" 
      :note="note4name"
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
          note1Name: "a",
          note2Name: "b",
          note3name: "c",
          note4name: "d"
        }
      },
      methods: {
        playNote(noteName, eventType){
          console.log(`note "${noteName}" triggered with ${eventType} event`);
        },
      }
    }
</script>
