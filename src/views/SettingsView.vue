<template>
  <div class="global-settings">
    <div></div>
    <DropDown 
      :options=octaves
      :default='3'
      @input=octave
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
        octaves: ['1', '2', '3', '4', '5', '6', '7'],
        
      }
    },
    computed: {
      octave(value) {
        
        console.log(value)
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