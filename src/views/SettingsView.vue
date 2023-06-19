<template>
  <div class="global-settings">
    <div></div>
    <div class="spacer"></div>
    <DropDown 
      :options=octaves
      :default=currentOctave
      @input="changeOctave($event, 'octave')"
    />
    <div class="spacer"></div>
    <DropDown 
      :options=Object.keys(scales)
      :default=currentScale.name
      @input="changeScale"
    />
    <div class="spacer"></div>
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
      :octave=currentOctave
      :scale=currentScale.notes
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
      updateStrings: Function,
      currentScale: Object,
      changeScale: Function,
      scales: Object,
      allTheNotes: Array,
      currentOctave: String,
      updateOctave: Function
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
        this.updateOctave(value);
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

  .spacer {
    width: 5%;
  }
</style>