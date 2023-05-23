<template>
  <div class="aboutdetails">
    <h1>{{ msg }}</h1>
    <p>
      Information text
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Essential Links</h3>
    <ul>
      <p>Create link that leads to the organisation?</p>
      <!-- <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li> -->
    </ul>
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
