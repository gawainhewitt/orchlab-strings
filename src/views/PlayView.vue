<template>
  <div class="play">
    <h1>This is the play page</h1>
    <p>For playing the instrument</p>
    <PlayButton buttonName="banana" :testFunction="testFunction"/>
    <PlayButton buttonName="strawberry" :testFunction="testFunction"/>
  </div>
</template>

<script>
import PlayButton from '@/components/PlayButton.vue';

export default {
  components: {
    PlayButton
  },
  methods: {
    testFunction() {
      console.log('hairy things')
    }
  }
}
</script>

