<template>
  <div class="play">
    <BowingButton
    v-touch:press="() => bowButton = !bowButton"
    :bowButton=bowButton
    buttonText="bowing"
    buttonColour="red"
    />
    <StringButton v-for="(string, i) in activeStrings"
    :string="string"
    :key="i"
    :buttonText=activeStrings[i].note
    :buttonColour=activeStrings[i].color
    :pluckNote="pluckNote" 
    :bowNote="bowNote"
    :endBow="endBow"
    :numberOfStrings=activeStrings.length
    :note=activeStrings[i].note
    :bowing=activeStrings[i].bowing
    :bowButton=bowButton
    :updateStrings="updateStrings"
    :whichString="i"
    /> 
  </div>

</template>

<script>
  import StringButton from "../components/StringButton.vue"
  import BowingButton from "../components/BowingButton.vue"

    export default {
      components: {
        StringButton,
        BowingButton 
       },
      props: {
        strings: Array,
        updateStrings: Function,
        pluckNote: Function,
        bowNote: Function,
        endBow: Function
             },
      data() {
        return {
          bowButton: false
        }
      },
      created() {
        window.addEventListener("keydown", this.handleKeyDown);
        window.addEventListener("keyup", this.handleKeyUp);
      },
      unmounted() {
        window.removeEventListener("keydown", this.handleKeyDown);
        window.removeEventListener("keyup", this.handleKeyUp);
      },
      computed: {
        activeStrings: function() {
          let stringState = [];
          for(let i = 0; i < this.strings.length; i++){
            if(this.strings[i].stringOn){
              stringState.push(this.strings[i]);
            }
          }
          return stringState;
        }
      },
      methods: {
        handleKeyDown(event) {
          const qwertyInput = event.key.toUpperCase();
          for(let i = 0; i < this.activeStrings.length; i++){
            if(this.activeStrings[i].pluckKey === qwertyInput){
              if(!this.activeStrings[i].plucking){
                  this.pluckNote("keyboard", this.activeStrings[i].note);
                  this.updateStrings(this.activeStrings[i].string, "plucking", true);
                  console.log(this.activeStrings[i].plucking);
              }
            }else if(this.activeStrings[i].bowKey === qwertyInput){
              if (!this.activeStrings[i].bowing){
                this.bowNote("keyboard", this.activeStrings[i].note);
                this.updateStrings(this.activeStrings[i].string, "bowing", true);
              }
            } 
          }
        },
        handleKeyUp(event) {
          console.log(`key released ${event.key}`)
          const qwertyInput = event.key.toUpperCase();
            for(let i = 0; i < this.activeStrings.length; i++){
              if(this.activeStrings[i].bowKey === qwertyInput){
                if (this.activeStrings[i].bowing){
                  this.endBow("keyboard", this.activeStrings[i].note);
                  this.updateStrings(this.activeStrings[i].string, "bowing", false);
                }
              }else if(this.activeStrings[i].pluckKey === qwertyInput){
                if (this.activeStrings[i].plucking){
                  this.updateStrings(this.activeStrings[i].string, "plucking", false);
                }
              }
            }
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
