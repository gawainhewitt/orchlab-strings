<template>
  <nav>
    <router-link to="/">About</router-link> |
    <router-link to="/play">Play</router-link> |
    <router-link to="/settings">Settings</router-link>
  </nav>
  <router-view/>
</template>

<script>

  document.addEventListener("gesturestart", function (e) {
    e.preventDefault();
    document.body.style.zoom = 0.99;
  });

  document.addEventListener("gesturechange", function (e) {
    e.preventDefault();
    document.body.style.zoom = 0.99;
  });
  document.addEventListener("gestureend", function (e) {
      e.preventDefault();
      document.body.style.zoom = 1;
  });
// import AppButton from "./components/AppButton.vue"

export default {
  // name: "App",
  // components: {
  //   AppButton 
  // }
}
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
  overscroll-behavior: none;
  overscroll-behavior-x: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.btn {
  padding: 30px;
  flex: 1 0 auto; 
  color: #4248b9;
}

/* .block {
  flex: 1 0 auto;
} */

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

</style>
