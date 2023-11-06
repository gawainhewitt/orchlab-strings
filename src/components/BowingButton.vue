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
        return {
            backgroundColor: this.buttonColour, 
          }
      }     
    }
  }
</script>

<style scoped>
  .note-buttons {
    color: rgb(255, 255, 255);
    border-radius: 25px;
    height: 10%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    user-select: none;
  }

  @media only screen and (max-width: 600px) {
    .note-buttons {
      font-size: 2.5em;
    }
  }

  @media only screen and (min-width: 600px) {
    .note-buttons {
      font-size: 4em;
    }
  }
</style>
