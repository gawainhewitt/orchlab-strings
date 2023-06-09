<template>
  <div 
    class="note-buttons" 
    :style="myStyle" 
    @mouseup.prevent="pluckNote('mouseup', note)"
  >
    <span>{{ buttonText }}</span>
  </div>
</template>


<script>
  export default {
    props: {
      buttonText: {
        type: String,
        default: () => "Label",
      },
      buttonColour: String,
      pluckNote: Function,
      note: String
    },
    data() {
          return {
            myStyle:{
            backgroundColor: this.buttonColour
            }
          }
      }
  }
</script>

<style scoped>
  .note-buttons {
    color: rgb(255, 255, 255);
    border-radius: 25px;
    height: 20%;
    font-size: 4em;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
</style>
