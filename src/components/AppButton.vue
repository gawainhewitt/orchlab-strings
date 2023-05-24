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

</style>
