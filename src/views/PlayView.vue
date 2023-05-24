

<template>
  <div class="play">
    <h1>This is the play page</h1>
    <p>For playing the instrument</p>
    <PlayButton buttonName="banana" :testFunction="testFunction"/>
    <PlayButton buttonName="strawberry" :testFunction="testFunction"/>
  </div>

  <div id="app">
    <app-button buttonText="Note 1"/> <br>
    <app-button buttonText="Note 2"/> <br>
    <app-button buttonText="Note 3"/>
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
          }
      },
      methods: {
        sayhello(){
          alert('hello');
        },
      }
    }
</script>

