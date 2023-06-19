<template>
  <div class="global-settings">
    <div></div>
    <div class="spacer"></div>
    <DropDown 
      :options=allTheNotes
      :default=currentKey
      @input=updateKey
    />
    <div class="spacer"></div> 
    <DropDown 
      :options=octaves
      :default=currentOctave
      @input=updateOctave
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
      updateOctave: Function,
      currentKey: String,
      updateKey: Function
    },
    data() {
      return {
        octaves: ['1', '2', '3', '4', '5', '6', '7']
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