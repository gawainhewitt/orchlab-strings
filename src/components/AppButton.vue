<template>
  <div class="note-buttons" :style="myStyle">
    {{ buttonText }}
  </div>
</template>


<script>
  export default {
    props: {
      buttonText: {
        type: String,
        default: () => "Label",
      },
      buttonColour: String
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
  }

</style>
