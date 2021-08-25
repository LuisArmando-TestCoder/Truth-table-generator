<template>
  <main>
    <h1>Generador de tablas de verdad</h1>
    <h4>
      Esta herramienta fue creada por Luis Armando Murillo Baltodano
      para automatizar una tarea de un proyecto de matemáticas discretas
    </h4>
    <p>
        Puede escribir cualquier proposición como la siguiente
      <pre>{{defaultProposition}}</pre>
    </p>
    <truth-table-maker :defaultProposition="defaultProposition"/>
    <p>
      El código de este proyecto se puede encontrar en el siguiente repositorio
      <a href="https://github.com/LuisArmando-TestCoder/Truth-table-generator">
        LuisArmando-TestCoder/Truth-table-generator
      </a>
    </p>
    <address>
      Programado por Luis Armando Murillo Baltodano.
      <br/>
      <a href="https://testcoder.netlify.app/">
        Sitio web del autor
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
p, h4 {
  max-width: 360px;
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
