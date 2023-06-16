<template>
  <div 
    class="note-buttons" 
    :style="myStyle" 
    v-touch:press="handlePress"
    v-touch:release="handleRelease"
    v-touch:drag="onDrag"
  >
    <span>{{ buttonText }}</span>
  </div>
</template>


<script>

  const bowingSensitivity = 60;

  export default {
    props: {
      buttonText:  String,
      buttonColour: String,
      pluckNote: Function,
      bowNote: Function,
      endBow: Function,
      note: String,
      numberOfStrings: Number
    },
    data() {
      return {
        bowing: 0,
        pluck: true,
        bowSound: false
      }
    },
    methods: {
      handlePress(event) {
        console.log(this.numberOfStrings)
        if(event.type === "mousedown"){
          this.bowing = event.x;
        console.log(`press ${event.x}`);
        }else{
          this.bowing = event.changedTouches[0].clientX
          console.log(`press ${event.changedTouches[0].clientX}`);
        }
      },
      handleRelease(event) {
        if (this.pluck) {
          this.pluckNote(event.type, this.note);
        }else {
          this.endBow(event.type, this.note);
        }
        this.pluck = true;
        this.bowSound = false;
      },
      onDrag(event){
        let eventX
        if(event.type === "mousemove"){
          eventX = event.x;
        }else{
          eventX = event.changedTouches[0].clientX;
        }
          
        if((this.bowing - eventX > bowingSensitivity) || (this.bowing - eventX < bowingSensitivity)){
          if(this.bowSound === false){
            this.pluck = false;
            this.bowNote('touch',this.note)
            this.bowSound = true;
          }
        }
      }
    },
    computed: {
      myStyle() {
        const totalHeight = 85
        return {
          backgroundColor: this.buttonColour, 
          height: `${totalHeight / this.numberOfStrings}%`
        }
      }
    }
  }
</script>

<style scoped>
  .note-buttons {
    color: rgb(255, 255, 255);
    border-radius: 25px;
    font-size: 4em;
    display: flex;
    justify-content: center;
    flex-direction: column;
    user-select: none;
  }
</style>
