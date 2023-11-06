<template>
  <nav>
    <router-link class="menu-link" to="/">about</router-link><span class="pipe"> | </span>
    <router-link class="menu-link" to="/play">play</router-link><span class="pipe"> |</span>
    <router-link class="menu-link" to="/settings">settings</router-link>
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
    :bowButtonColours="bowButtonColours"
    :keyIndex="keyIndex"
    />
</template>

<script>

  const orange = "rgb(230, 159, 0)"
  const skyBlue = "rgb(86, 180, 233)"
  const blueishGreen = "rgb(0, 158, 115)"
  // const yellow = "rgb(240, 228, 66)" // main background colour
  const blue = "rgb(0, 114, 178)"
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
  import { DuoSynth } from "tone";
  import { Chorus } from "tone";
  import { Reverb } from "tone";

export default {
  data() {
      return {
        strings: [{string: 0, stringOn: true, pluckKey: "Z", plucking: false, bowKey: "M", bowing: false, note: "C3", color: orange}, 
                  {string: 1, stringOn: true, pluckKey: "X", plucking: false, bowKey: ",", bowing: false, note: "E3", color: skyBlue},
                  {string: 2, stringOn: true, pluckKey: "C", plucking: false, bowKey: ".", bowing: false, note: "G3", color: vermilion},
                  {string: 3, stringOn: true, pluckKey: "V", plucking: false, bowKey: "/", bowing: false, note: "B3", color: blueishGreen}
                ],
        currentScale: {
          name: "major",
          notes: ["C", "D", "E", "F", "G", "A", "B"]
        },
        currentOctave: "3",
        currentKey: "C",
        currentInstrument: "Cello",
        instruments: ["DoubleBass", "Cello", "Viola", "Violin"],
        bowButtonColours: [blue, reddishPurple],
        scales: {
          major: [0,2,4,5,7,9,11],
          pentatonic: [0,2,4,7,9],
          minor: [0,2,3,5,7,8,10],
          majorBlues: [0,2,3,4,7,9],
          minorBlues: [0,3,5,6,7,10],
          chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        },
        allTheNotes: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
        keyIndex: 0
      }  
    },
  methods: {
    updateStrings(string, key, value) {
      this.strings[string][key] = value;
      // console.trace();
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
        this.keyChange();
      },
    updateKey(key) {
      this.currentKey = key;
      this.changeScale();
      this.keyChange();
    },
    keyChange(){
      let arpeggio = [0, 2, 4, 5];
      for(let i = 0; i < this.strings.length; i ++){
        let theNote;
        if (this.currentScale.name === "pentatonic") {
          theNote = this.currentScale.notes[i];
        } else {
          let scaleLength = this.currentScale.notes.length;
          theNote = this.currentScale.notes[arpeggio[i] % scaleLength];
        }
        this.updateStrings(i, "note", theNote+this.currentOctave)
      }
      this.updateVueComponent();
    },
    updateVueComponent() {
        this.keyIndex ++;
        // console.log(this.keyIndex);
    },
    changeInstrument(instrument) {
      console.log(`change instrument ${instrument}`);
    },
    setUpSamplers() {
          const envFreq = 4000;
          const cutoffFreq = 1;
          const ampEnv = {
            a : 1,
            d : 1,
            s : 0.6,
            r : 2
          }
          const filterEnv = {
            a : 1,
            d : 1,
            s : 0.6,
            r : 5
          }
          this.reverb = new Reverb(
            { "wet" : 0.7}
          ).toDestination();
          this.chorus = new Chorus(4, 1, 0.1).start().connect(this. reverb);
          this.pluckSampler = new Sampler(
            { B2: this.Sounds.get("celloB3"),
              B4: this.Sounds.get("celloB5"),
              
            }).toDestination();
          this.pluckSampler.attack = 0;
          this.pluckSampler.release = 1;
          this.pluckSampler.volume.value = -6;

          this.bowSampler = new PolySynth(
            { voice:  DuoSynth, // try duosynth to mix square and triangle - also look at looping on the sampler again
              maxPolyphony: 8,
              options: {    "vibratoAmount" : 0.2 ,
                            "vibratoRate" : 2 ,
                            "harmonicity" : 2.02 ,
                            "voice0" : {
                              "volume" : -22 ,
                              "portamento" : 0 ,
                              "oscillator" : {
                                "type" : "square"
                              },
                              "filter": {
                                "Q": 0,
                                "rolloff": -12,
                                "type": "lowpass",
                                "frequency": cutoffFreq
                              },
                              "filterEnvelope" : {
                                "attack" : filterEnv.a ,
                                "decay" : filterEnv.d ,
                                "sustain" : filterEnv.s ,
                                "release" : filterEnv.r,
                                "octaves" : -0.2,
                                "baseFrequency" : envFreq
                              }
                              ,
                              "envelope" : {
                                "attack" : ampEnv.a ,
                                "decay" : ampEnv.d ,
                                "sustain" : ampEnv.s ,
                                "release" : ampEnv.r
                              }
                            }
                            ,
                            "voice1" : {
                            "volume" : -28 ,
                            "portamento" : 0 ,
                            "oscillator" : {
                              "type" : "sawtooth"
                            },
                            "filter": {
                                "Q": 0,
                                "rolloff": -12,
                                "type": "lowpass",
                                "frequency": cutoffFreq
                              },
                            "filterEnvelope" : {
                              "attack" : filterEnv.a ,
                              "decay" : filterEnv.d ,
                              "sustain" : filterEnv.s ,
                              "release" : filterEnv.r,
                              "octaves" : -0.2,
                              "baseFrequency" : envFreq
                            }
                            ,
                            "envelope" : {
                              "attack" : ampEnv.a ,
                              "decay" : ampEnv.d,
                              "sustain" : ampEnv.s,
                              "release" : ampEnv.r                     }
                            } 
                          }
            }).connect(this.chorus);
          // this.bowSampler = new PolySynth(
          //   { voice:  MonoSynth, // try duosynth to mix square and triangle - also look at looping on the sampler again
          //     maxPolyphony: 8,
          //     options: {  "volume": -5, 
          //                 "envelope": {
          //                     "attack": 3,
          //                     "attackCurve": "linear",
          //                     "decay": 0,
          //                     "release": 2,
          //                     "releaseCurve": "linear",
          //                     "sustain": 0.4
          //                   },
          //                   "filter": {
          //                     "Q": 0,
          //                     "rolloff": -12,
          //                     "type": "lowpass",
          //                     "frequency": cutoffFreq
          //                   },
          //                   "oscillator": {
          //                     "type": "triangle"
          //                   },
          //                   "filterEnvelope" : {
          //                     "attack" : 2,
          //                     "decay" : 0.01,
          //                     "sustain" : 0.01,
          //                     "release" : 0.01,
          //                     "baseFrequency" : 800,
          //                     "octaves" : 0,
          //                     "exponent" : 2
          //                   } 
          //               }
          //   }).toDestination();
        },
        pluckNote(eventType, noteName){
          this.pluckSampler.triggerAttackRelease(noteName);
          console.log(`note "${noteName}" plucked with ${eventType} event`);
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
    // console.log(this.activeStrings);
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
  color: black;
}

nav {
  padding: 30px;
}

nav a.router-link-exact-active {
  color: rgb(0, 158, 115);
}

.menu-link {
  text-decoration: none; 
  color: inherit;
}

@media only screen and (max-width: 600px) {
  nav a {
  font-weight: bold;
  font-size: 1.5em;
  }

  .pipe {
    font-size: 1.5em;
    font-weight: bold;
    visibility: hidden;
  }
}

@media only screen and (min-width: 600px) {
  nav a {
  font-weight: bold;
  font-size: 2em;
  }

  .pipe {
    font-size: 2em;
    font-weight: bold;
    visibility: hidden;
  }
}
</style>
