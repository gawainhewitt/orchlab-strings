<template>
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

  export default {
    components: {
      StringSettings
    }, 
    props: {
      strings: Array,
      updateStrings: Function
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
</style>