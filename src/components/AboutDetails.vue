<template>
  <div class="aboutdetails">
    <h1>{{ msg }}</h1>
    <h2>
      To play:<br>
    touch or click screen to pluck,<br>
    swipe to bow<br>
    keys Z X C V and M , . /<br>
    <br><br>
    On Apple devices turn off silent mode.<br>
    </h2>
      
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
h1 {
  font-size: 4em;
}
h2 {
  font-size: 2em;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
