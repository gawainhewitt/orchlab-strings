<template>
  <div class="about">
    <img alt="Vue logo" src="../assets/orchlab-logo.png" class="orchlablogo" />
    <AboutDetails msg="Strings"/>
    <div class="bottom-logos">
      <img alt="Vue logo" src="../assets/LPO_logo.png" style="width: 20%" />
      <img alt="Vue logo" src="../assets/DMLogo.png" style="width: 20%" />
    </div>

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

<style scoped>
.bottom-logos {
  display: flex;
  justify-content: center;
  flex-direction: row;
  justify-content: space-around;
}

.about {
  height: 60%;
}

@media only screen and (max-width: 600px) {
  .orchlablogo {
    width: 70%
  }
}

@media only screen and (min-width: 600px) {
  .orchlablogo {
    width: 40%
  }
}

</style>
