<template>
  <div class="play">
    <h1>This is the play page</h1>
    <p>For playing the instrument</p>
  </div>

  <div id="app">
    <app-button buttonText="Note 1" buttonColour="#ff5733"/> <br>
    <app-button buttonText="Note 2" buttonColour="Green"/> <br>
    <app-button buttonText="Note 3" buttonColour="Purple"/>
  </div>

</template>

<script>
  import AppButton from "../components/AppButton.vue"

    export default {
      name: "App",
      components: {
        AppButton 
       },
      methods: {
        sayhello(){
          alert('hello');
        },
      }
    }
</script>
