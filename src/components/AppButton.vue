<template>
  <button class="dark baseButton">
    {{ buttonText }}
  </button>
</template>


<script>
  export default {
    props: {
      buttonText: {
        type: String,
        default: () => "Label",
      },
    }
  }
</script>

<style scoped>

  /* .baseButton {
    padding: 10px;
    border: none;
    radius: 
  }

  .light {
    background: white;
    color: black;
  }

  .dark {
    background: black;
    color: white;
  } */
</style>
