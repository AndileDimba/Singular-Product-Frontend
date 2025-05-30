<template>
  <div id="app">
    <header>
      <h1>Product Management System</h1>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
}

#app {
  min-height: 100vh;
}

header {
  background-color: #343a40;
  color: white;
  padding: 1rem;
  text-align: center;
}

main {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h1, h2, h3 {
  margin-bottom: 1rem;
}
</style>
