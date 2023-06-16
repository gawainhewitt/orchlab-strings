<template>
  <div class="global-settings">
    <div></div>
    <DropDown 
      :options=octaves
      :default="octave"
      @input="changeOctave($event, 'octave')"
    />
    <div>
    </div>
  </div>
  <br>
  <div class="settings">
    <StringSettings v-for="(string, i) in strings" 
      :key="i"
      :buttonColour=strings[i].color
      :active="strings[i].stringOn"
      :number="strings[i].string"
      :note="strings[i].note"
      :updateStrings="updateStrings"
      :octave="octave"
      ></StringSettings>
  </div>
      
</template>

<script>
  import StringSettings from '@/components/StringSettings.vue';
  import DropDown from '@/components/DropDown.vue';

  export default {
    components: {
      StringSettings,
      DropDown,
    }, 
    props: {
      strings: Array,
      updateStrings: Function
    },
    data() {
      return {
        octaves: ['1', '2', '3', '4', '5', '6', '7']
      }
    },
    methods: {
      changeOctave(value) {
        for(let i = 0; i < this.strings.length; i++){
            const whichNote = [...this.strings[i].note]
            const note = whichNote[0];
            const octave = value;
            this.updateStrings(i, "note", `${note}${octave}`);
          }
      }
      
    },
    computed: {
      octave() {
          let whichOctave = [...this.strings[0].note]
          return whichOctave[1];
        }
    }

  }
</script>

<style>
  .settings {
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .global-settings {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>