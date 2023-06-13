<template>
  <div class="play">
      <AppButton v-for="(string, i) in strings"
      :string="string"
      :key="i"
      :buttonText=strings[i].note
      :buttonColour=strings[i].color
      :pluckNote="pluckNote" 
      :bowNote="bowNote"
      :endBow="endBow"
      :note=strings[i].note
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
          strings: [{pluckKey: "Z", bowKey: "M", bowing: false, note: "A3", color: orange}, 
                    {pluckKey: "X", bowKey: ",", bowing: false, note: "B3", color: blueishGreen},
                    {pluckKey: "C", bowKey: ".", bowing: false, note: "C4", color: vermilion},
                    {pluckKey: "V", bowKey: "/", bowing: false, note: "D4", color: reddishPurple}
                  ]
        }
      },
      created() {
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
          for(let i = 0; i < this.strings.length; i++){
            if(this.strings[i].bowKey === qwertyInput){
              if (!this.strings[i].bowing){
                this.bowNote("keyboard", this.strings[i].note);
                this.strings[i].bowing = true;
              }
            }
          }
          
        },
        handleKeyUp(event) {
          const qwertyInput = event.key.toUpperCase();
            for(let i = 0; i < this.strings.length; i++){
              if(this.strings[i].pluckKey === qwertyInput){
                  this.pluckNote("keyboard", this.strings[i].note);
              }else if(this.strings[i].bowKey === qwertyInput){
                if (this.strings[i].bowing){
                  this.endBow("keyboard", this.strings[i].note);
                  this.strings[i].bowing = false;
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
