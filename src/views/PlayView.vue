<template>
  <div class="play">
      <AppButton v-for="(string, i) in activeStrings"
      :string="string"
      :key="i"
      :buttonText=activeStrings[i].note
      :buttonColour=activeStrings[i].color
      :pluckNote="pluckNote" 
      :bowNote="bowNote"
      :endBow="endBow"
      :note=activeStrings[i].note
    /> 
  </div>

</template>

<script>
  import AppButton from "../components/AppButton.vue"
  import { Sampler, ToneAudioBuffers, PolySynth } from "tone";
  // import A3 from "../assets/42239__timkahn__c_s-cello-a3.flac";
  import pluckB3 from "../assets/42242__timkahn__c_s-cello-b3.flac";
  import { AMSynth } from "tone";
  // import C4 from "../assets/42247__timkahn__c_s-cello-c4.flac";
  // import D4 from "../assets/42251__timkahn__c_s-cello-d4.flac";
  

    export default {
      components: {
        AppButton 
       },
      props: {
        strings: Array,
        updateStrings: Function
             },
      data() {
        return {
          
        }
      },
      created() {
        console.log(this.activeStrings);
        this.Sounds = new ToneAudioBuffers({
          urls: {
            plucked: pluckB3
          },
          onload: () => this.setUpSamplers()
        }); 
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
        setUpSamplers() {
          this.pluckSampler = new Sampler(
          {B2: this.Sounds.get("plucked")}).toDestination();
          this.pluckSampler.attack = 0;
          this.pluckSampler.release = 1;

          this.bowSampler = new PolySynth(
            { voice:  AMSynth,
              maxPolyphony: 4,
              options: {  "volume": -10, 
                          "detune": 0,
                          "portamento": 0,
                          "envelope": {
                            "attack": 0.7,
                            "attackCurve": "linear",
                            "decay": 0,
                            "decayCurve": "exponential",
                            "sustain": 0.3,
                            "release": 1,
                            "releaseCurve": "linear"
                          },
                        }
            }).toDestination();
        },
        handleKeyDown(event) {
          const qwertyInput = event.key.toUpperCase();
          for(let i = 0; i < this.activeStrings.length; i++){
            if(this.activeStrings[i].bowKey === qwertyInput){
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
              if(this.activeStrings[i].pluckKey === qwertyInput){
                  this.pluckNote("keyboard", this.activeStrings[i].note);
              }else if(this.activeStrings[i].bowKey === qwertyInput){
                if (this.activeStrings[i].bowing){
                  this.endBow("keyboard", this.activeStrings[i].note);
                  this.updateStrings(this.activeStrings[i].string, "bowing", false);
                }
            }
            }
        },
        pluckNote(eventType, noteName){
          console.log(`note "${noteName}" plucked with ${eventType} event`);
          this.pluckSampler.triggerAttack(noteName);
        },
        bowNote(eventType, noteName){
          console.log(`note "${noteName}" bowed with ${eventType} event`);
          this.bowSampler.triggerAttack(noteName);
        },
        endBow(eventType, noteName){
          console.log(`bow end ${eventType} ${noteName}`);
          this.bowSampler.triggerRelease(noteName)
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
