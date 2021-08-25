<template>
  <main>
    <p>
      You can type any proposition like the following
      <pre>{{defaultProposition}}</pre>
    </p>
    <truth-table-maker :defaultProposition="defaultProposition"/>
    <address>
      Coded by Luis Armando Murillo Baltodano.
      <br/>
      <a href="https://testcoder.netlify.app/">
        Author's website
      </a>
      <br/>
      Alajuela, Grecia
      <br/>
      Costa Rica
    </address>
  </main>
</template>

<script>
import TruthTableMaker from './components/TruthTableMaker/index.vue'

const defaultProposition = '(((E o F) > I) y (L o M)) > N'

export default {
  name: 'App',
  components: {
    TruthTableMaker
  },
  data() {
    return {
      defaultProposition,
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
:root {
  --spacing: 25px;
  --shadow: #eee;
}
body {
  background: #f8f8f8;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
main {
  max-width: 1200px;
  margin: auto;
  padding: var(--spacing);
}

address, a, p {
  display: block;
  padding: var(--spacing) 0;
}
</style>
