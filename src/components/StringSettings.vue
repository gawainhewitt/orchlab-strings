<template>
  

  <div 
    class="string-settings" 
    :style="myStyle" 
  >
      <span>
        <SlideToggle class="slide" :value=checked @input=valueLog />
        <label for="check">{{ onOrOff }}</label> 
      </span>
  </div>
</template>


<script>

  import SlideToggle from '@/components/SlideToggle.vue';

  export default {
    components: {
      SlideToggle
    },
    props: {
      buttonColour: String,
      active: Boolean,
      number: Number,
      updateStrings: Function
    },
    data() {
      return {
        myStyle:{
        backgroundColor: this.buttonColour,
        },
        onOrOff: "on"
      }
    },
    methods: {
      valueLog(value) {
        this.updateStrings(this.number, "stringOn", value)
        this.onOrOff = value ? "on" : "off"
      }
    },
    computed: {
      checked() {
          return this.active;
        }
      }
  }
</script>

<style scoped>
  .string-settings {
    color: rgb(255, 255, 255);
    border-radius: 25px;
    height: 20%;
    font-size: 1em;
    display: flex;
    justify-content: center;
    flex-direction: column;
    user-select: none;
  }

</style>
