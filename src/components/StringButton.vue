<template>
  <div 
    class="note-buttons" 
    :style="myStyle" 
    v-touch:press="handlePress"
    v-touch:release="handleRelease"
    v-touch:drag="handleDrag"
    v-on:mouseleave="handleLeave"
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
      numberOfStrings: Number,
      bowing: Boolean,
      bowButton: Boolean,
      updateStrings: Function,
      whichString: Number
    },
    data() {
      return {
        bowingPosition: 0
      }
    },
    methods: {
      handlePress(event) {
        console.log(this.numberOfStrings)
        if(this.bowButton){
          if(event.type === "mousedown"){
          this.bowingPosition = event.x;
          console.log(`press ${event.x}`);
          }else{
            this.bowingPosition = event.changedTouches[0].clientX
            console.log(`press ${event.changedTouches[0].clientX}`);
          }
        }else{
          this.pluckNote(event.type, this.note);
        }
      },
      handleRelease(event) {
        if (this.bowButton) {
          this.endBow(event.type, this.note);
          this.updateStrings(this.whichString, "bowing", false);
        }
      },
      handleLeave(event) {
        if (this.bowButton) {
          this.endBow(event.type, this.note);
          this.updateStrings(this.whichString, "bowing", false);
        }
      },
      handleDrag(event){
        if(this.bowButton){
          let eventX
          if(event.type === "mousemove"){
            eventX = event.x;
          }else{
            eventX = event.changedTouches[0].clientX;
          }
          if((this.bowingPosition - eventX > bowingSensitivity) || (this.bowingPosition - eventX < bowingSensitivity)){
            if(!this.bowing){
              this.bowNote('touch',this.note);
              this.updateStrings(this.whichString, "bowing", true);
            }
          }
        }
      }
    },
    computed: {
      myStyle() {
        const totalHeight = 70
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
