<template>
  <nav>
    <router-link to="/">About</router-link> |
    <router-link to="/play">Play</router-link> |
    <router-link to="/settings">Settings</router-link>
  </nav>
  <router-view 
    :strings="strings" 
    :update-strings="updateStrings"
    :currentScale=currentScale
    :changeScale=changeScale
    :scales=scales
    :allTheNotes=allTheNotes
    :currentOctave=currentOctave
    :updateOctave=updateOctave
    :currentKey=currentKey
    :updateKey=updateKey
    :currentInstrument=currentInstrument
    :instruments=instruments
    :changeInstrument=changeInstrument
    :pluckNote=pluckNote
    :bowNote=bowNote
    :endBow=endBow
    />
</template>

<script>

  // const black = "rgb(0, 0, 0)"
  const orange = "rgb(230, 159, 0)"
  // const skyBlue = "rgb(86, 180, 233)"
  const blueishGreen = "rgb(0, 158, 115)"
  // const yellow = "rgb(240, 228, 66)"
  // const blue = "rgb(0, 114, 178)"
  const vermilion = "rgb(213, 94, 0)"
  const reddishPurple = "rgb(204, 121, 167)"

  document.addEventListener("gesturestart", function (e) {
    e.preventDefault();
    document.body.style.zoom = 0.99;
  });

  document.addEventListener("gesturechange", function (e) {
    e.preventDefault();
    document.body.style.zoom = 0.99;
  });
  document.addEventListener("gestureend", function (e) {
      e.preventDefault();
      document.body.style.zoom = 1;
  });

  import { Sampler, ToneAudioBuffers, PolySynth } from "tone";
  import celloB3 from "./assets/42242__timkahn__c_s-cello-b3.flac";
  import celloB5 from "./assets/42244__timkahn__c_s-cello-b5.flac";
  import { MonoSynth } from "tone";

export default {
  data() {
      return {
        strings: [{string: 0, stringOn: true, pluckKey: "Z", bowKey: "M", bowing: false, note: "C3", color: orange}, 
                  {string: 1, stringOn: true, pluckKey: "X", bowKey: ",", bowing: false, note: "E3", color: blueishGreen},
                  {string: 2, stringOn: true, pluckKey: "C", bowKey: ".", bowing: false, note: "G3", color: vermilion},
                  {string: 3, stringOn: true, pluckKey: "V", bowKey: "/", bowing: false, note: "B3", color: reddishPurple}
                ],
        currentScale: {
          name: "major",
          notes: ["C", "D", "E", "F", "G", "A", "B"]
        },
        currentOctave: "3",
        currentKey: "C",
        currentInstrument: "Cello",
        instruments: ["DoubleBass", "Cello", "Viola", "Violin"],
        scales: {
          major: [0,2,4,5,7,9,11],
          pentatonic: [0,2,4,7,9],
          minor: [0,2,3,5,7,8,10],
          majorBlues: [0,2,3,4,7,9],
          minorBlues: [0,3,5,6,7,10],
          chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        },
        allTheNotes: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
      }  
    },
  methods: {
    updateStrings(string, key, value) {
      this.strings[string][key] = value;
      // console.log(this.strings)
    },
    updateOctave(octave){
      for(let i = 0; i < this.strings.length; i++){
            const note = this.strings[i].note;
            const replaced = note.slice(0, -1) + octave;
            this.updateStrings(i, "note", replaced);
          }
      this.currentOctave = octave;
    },
    changeScale(value = this.currentScale.name) {
        let newScale = [];
        const keyIndex = this.allTheNotes.indexOf(this.currentKey);
        for(let i = 0; i < this.scales[value].length; i ++){
          const noteIndex = this.scales[value][i];
          newScale[i] = this.allTheNotes[(keyIndex + noteIndex) % this.allTheNotes.length];
        }
        this.currentScale.name = value;
        this.currentScale.notes = newScale;
      },
    updateKey(key) {
      this.currentKey = key;
      this.changeScale();
    },
    changeInstrument(instrument) {
      console.log(`change instrument ${instrument}`);
    },
    setUpSamplers() {
          this.pluckSampler = new Sampler(
          {B2: this.Sounds.get("celloB3"),
          B4: this.Sounds.get("celloB5")
          }).toDestination();
          this.pluckSampler.attack = 0;
          this.pluckSampler.release = 1;

          this.bowSampler = new PolySynth(
            { voice:  MonoSynth,
              maxPolyphony: 4,
              options: {  "volume": -5, 
                          "envelope": {
                              "attack": 0.7,
                              "attackCurve": "linear",
                              "decay": 0,
                              "release": 0.8,
                              "releaseCurve": "exponential",
                              "sustain": 0.4
                            },
                            "filter": {
                              "Q": 0,
                              "detune": 0,
                              "frequency": 10000,
                              "gain": 0,
                              "rolloff": -12,
                              "type": "bandpass"
                            },
                            "oscillator": {
                              "type": "triangle"
                            }
                        }
            }).toDestination();
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
  }, 
  created() {
    console.log(this.activeStrings);
        this.Sounds = new ToneAudioBuffers({
          urls: {
            celloB3: celloB3,
            celloB5: celloB5
          },
          onload: () => this.setUpSamplers()
        }); 
  }
}
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
  overscroll-behavior: none;
  overscroll-behavior-x: none;
  background-color: rgb(240, 228, 66);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.btn {
  padding: 30px;
  flex: 1 0 auto; 
  color: #4248b9;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
