<template>
  <div id="app">
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Seguros Unidos</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>
