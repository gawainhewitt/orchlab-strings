<template>
    <div 
      class="string-settings" 
      :style="myStyle" 
    >
        <span>
            <input type="checkbox" v-model="checked" checked-name="check" />
            <label for="check">{{ checked }}</label> 
        </span>
    </div>
  </template>
  
  
  <script>
  
    export default {
      props: {
        buttonColour: String,
        active: Boolean,
        number: Number,
        updateStrings: Function
      },
      data() {
        return {
          myStyle:{
          backgroundColor: this.buttonColour,
          },
          
        }
      },
      computed: {
        checked: {
          get: function() {
            return this.active;
          },
          set: function() {
            this.updateStrings(this.number, "stringOn", !this.checked)
          }
        }
        
      }
    }
  </script>
  
  <style scoped>
    .string-settings {
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
  