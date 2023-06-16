<template>
  <div 
    class="settings-outer" 
    :style="myStyle" 
  >
      <div :style="myStyle" class="settings-inner">
        <div> </div>
        <div>
          <SlideToggle class="slide" :value=checked @input=stringState />
          <label for="check">{{ onOrOff }}</label> 
        </div>
        <div>
          <DropDown 
            :options=currentScale
            :default=currentNote
            @input="changeNote"
          />
        </div>
        <div></div>
    </div>
  </div>
</template>

<script>

  import SlideToggle from '@/components/SlideToggle.vue';
  import DropDown from '@/components/DropDown.vue'

  export default {
    components: {
      SlideToggle,
      DropDown
    },
    props: {
      buttonColour: String,
      active: Boolean,
      number: Number,
      updateStrings: Function,
      note: String,
      octave: String
    },
    data() {
      return {
        onOrOff: "on",
        currentScale: ["C", "D", "E", "F", "G", "A", "B"],
        currentNote: [...this.note][0]
      }
    },
    methods: {
      stringState(value) {
        this.updateStrings(this.number, "stringOn", value)
        this.onOrOff = value ? "on" : "off"
      },
      changeNote(note) {
        this.updateStrings(this.number, "note", note + this.octave)
      }
    },
    computed: {
      myStyle() {
        let dynamicOpacity = this.active ? 1 : 0.6;
        return { 
          backgroundColor: this.buttonColour,
          opacity: dynamicOpacity
        }
      },
      checked() {
        return this.active;
      }
    }
  }
</script>

<style scoped>
  .settings-outer {
    color: rgb(255, 255, 255);
    border-radius: 25px;
    height: 20%;
    font-size: 1em;
    display: flex;
    justify-content: center;
    flex-direction: column;
    user-select: none;
  }

  .settings-inner {
    margin: auto;
    width: 90%;
    display: flex;
    justify-content: center;
    flex-direction: row;
    justify-content: space-between;
  }

</style>
