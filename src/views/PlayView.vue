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
  import { Sampler, Player, ToneAudioBuffers} from "tone";
  // import A3 from "../assets/42239__timkahn__c_s-cello-a3.flac";
  import pluckB3 from "../assets/42242__timkahn__c_s-cello-b3.flac";
  import bowB3 from "../assets/358231__mtg__cello-b3.flac";
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
          strings: [{key: "Z", note: "A3", color: orange}, 
                    {key: "X", note: "B3", color: blueishGreen},
                    {key: "C", note: "C4", color: vermilion},
                    {key: "V", note: "D4", color: reddishPurple}
                  ],
          isLoaded: false
        }
      },
      created() {
        this.Sounds = new ToneAudioBuffers({
          urls: {
            bowed: bowB3,
            plucked: pluckB3
          },
          onload: () => this.setUpSamplers()
        }); 
        console.log(this.Sounds.get("plucked"));
        window.addEventListener("keydown", this.handleQwerty);
      },
      unmounted() {
        window.removeEventListener("keydown", this.handleQwerty);
      },
      methods: {
        setUpSamplers() {
          this.pluckSampler = new Sampler(
          {B3: this.Sounds.get("plucked")}).toDestination();
          this.pluckSampler.attack = 0;
          this.pluckSampler.release = 1;

          this.bowSampler = new Player(
            this.Sounds.get("bowed")).toDestination();
        },
        handleQwerty(event) {
          const qwertyInput = event.key.toUpperCase();
            for(let i = 0; i < this.strings.length; i++){
              if(this.strings[i].key === qwertyInput){
                this.pluckNote("keyboard", this.strings[i].note);
              }
            }
        },
        pluckNote(eventType, noteName){
          console.log(`note "${noteName}" plucked with ${eventType} event`);
          this.pluckSampler.triggerAttack(noteName);
        },
        bowNote(eventType, noteName){
          this.bowSampler.loop = true;
          this.bowSampler.loopStart = 0.5;
          this.bowSampler.loopEnd = 0.999;
          console.log(`note "${noteName}" bowed with ${eventType} event`);
          
          this.bowSampler.start();
          this.bowSampler.playbackRate = 2;
        },
        endBow(eventType, noteName){
          console.log(this.Sounds.get("bowed").duration);
          this.bowSampler.loopEnd = this.Sounds.get("bowed").duration;
          this.bowSampler.loop = false;
          console.log(`bow end ${eventType} ${noteName}`);
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
