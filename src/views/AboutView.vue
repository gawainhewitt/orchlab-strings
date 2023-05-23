<template>
  <div class="about">
    <img alt="Vue logo" src="../assets/orchlab-logo.png">
    <AboutDetails msg="Welcome to Orchlab Strings"/>
  </div>
</template>

<script>
// @ is an alias to /src
import AboutDetails from '@/components/AboutDetails.vue'

export default {
  name: 'AboutView',
  components: {
    AboutDetails
  }
}
</script>
