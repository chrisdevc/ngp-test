<template>
  <div id="app">
    <md-toolbar class="md-primary">
      <md-button class="md-raised md-accent" to="/">BPI</md-button>
    </md-toolbar>
    <md-content>
      <router-view />
    </md-content>
  </div>
</template>

<style lang="scss">
@import "~vue-material/dist/theme/engine";

@include md-register-theme(
  "default",
  (
    primary: md-get-palette-color(pink, A200),
    accent: md-get-palette-color(indigo, 200),
    theme: dark
  )
);

@import "~vue-material/dist/theme/all";
@import "~vue-material/dist/components/MdButton/theme";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
