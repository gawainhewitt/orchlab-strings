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
  // let pressTimes = 0;

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
      plucking: Boolean,
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
          // my current thinking is that the touch library may not be up to scratch and I may need to implement it manually or differently
          // the boolean is not making a different. Its still triggering on release as. 
          // although saying that I am not clear how to do touch manually either. 
          // very frustrating to say the least!!
          // could i just use a mouse function instead like on press?
          // but that means no multi touch
          // ok so a try on mouse doens't seem a lot better, neither with basic JS touch stuff. This is really fucking annoying


          // alert(this.plucking);
          if(!this.plucking){
            this.pluckNote(event.type, this.note);
            this.updateStrings(this.whichString, "plucking", true);
            // pressTimes += 1;
            // alert(pressTimes);
          }
        }
      },
      handleRelease(event) {
        // alert("release");
        this.updateStrings(this.whichString, "plucking", false);
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
