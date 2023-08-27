<template>
  <div 
    class="note-buttons" 
    :style="myStyle" 
  >
    <span>{{ buttonText }}</span>
  </div>
</template>


<script>

  export default {
    props: {
      buttonText:  String,
      buttonColour: String,
      bowButton: Boolean
    },
    data() {
      return {
   
      }
    },
    methods: {
    },
    computed: {
      myStyle() {
        if(this.bowButton){
          return {
            backgroundColor: "green", 
          }
        } else {
          return {
            backgroundColor: "red", 
          }
        }
        
      }
    }
  }
</script>

<style scoped>
  .note-buttons {
    color: rgb(255, 255, 255);
    border-radius: 25px;
    font-size: 4em;
    height: 10%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    user-select: none;
  }
</style>
