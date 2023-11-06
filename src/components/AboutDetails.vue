<template>
  <div class="aboutdetails">
    <h1>{{ msg }}</h1>
    <h3>
      
    Touch or click screen to pluck,<br><br>
    Swipe to bow<br><br>
    Keys Z X C V and M , . /
    <br><br>
    On Apple devices turn off silent mode.<br><br><br>
    </h3>
      
  </div>
</template>

<script>
export default {
  name: 'AboutDetails',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

@media only screen and (max-width: 600px) {
  h1 {
  font-size: 4em;
  margin: 10px;
  }
  h2 {
    font-size: 2em;
  }
  h3 {
    margin: 40px 0 0;
  }
}

@media only screen and (min-width: 600px) {
  h1 {
  font-size: 6em;
  margin: 10px;
  }
  h2 {
    font-size: 2em;
  }
  h3 {
    margin: auto;
  }
}


</style>
