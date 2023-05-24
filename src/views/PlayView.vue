<template>
  <div class="play">
    <h1>This is the play page</h1>
    <p>For playing the instrument</p>
  </div>

  <div id="app">
    <AppButton buttonText="Note 1" buttonColour="#ff5733" :testFunction="consoleLog" :note="note1Name"/> <br>
    <AppButton buttonText="Note 2" buttonColour="Green" :testFunction="consoleLog" :note="note2Name"/> <br>
    <AppButton buttonText="Note 3" buttonColour="Purple" :testFunction="consoleLog" :note="note3name"/> <br>
    <AppButton buttonText="Note 4" buttonColour="Blue" :testFunction="consoleLog" :note="note4name"/>
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
        consoleLog(message){
          console.log(message);
        },
      }
    }
</script>
