<template>
  <div class="play">
    <h1>This is the play page</h1>
    <p>For playing the instrument</p>
    <button @click="testing('bananaman')">Play</button>
  </div>
</template>

<script>

export default {
  methods: {
    testing(message) {
      console.log(message);
    }
  }
}
</script>

