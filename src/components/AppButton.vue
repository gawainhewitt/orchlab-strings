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
  export default {
    props: {
      buttonText:  String,
      buttonColour: String,
      pluckNote: Function,
      bowNote: Function,
      note: String
    },
    data() {
      return {
        myStyle:{
        backgroundColor: this.buttonColour
        },
        bowing: 0,
        pluck: true,
        bowSound: false
      }
    },
    methods: {
      handlePress(event) {
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
          
        if((this.bowing - eventX > 10) || (this.bowing - eventX < 10)){
          if(this.bowSound === false){
            this.pluck = false;
            this.bowNote('touch',this.note)
            this.bowSound = true;
          }
        }
      }
    }
  }
</script>

<style scoped>
  .note-buttons {
    color: rgb(255, 255, 255);
    border-radius: 25px;
    height: 20%;
    font-size: 4em;
    display: flex;
    justify-content: center;
    flex-direction: column;
    user-select: none;
  }
</style>
