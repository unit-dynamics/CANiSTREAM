<template>
  <div id="app">
    <search></search>
  </div>
</template>

<script>
import Search from './components/Search'

export default {
  components: {
    Search
  }
}
</script>

<style>
html {
  height: 100%;
  background-color: #5F5E5E;
}

body {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

#app {
  color: #2c3e50;
  width: 100%;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
