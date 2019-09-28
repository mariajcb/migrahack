<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>BOOP</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <HelloWorld/>
      <BottomNav />
    </v-layout>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import BottomNav from './components/BottomNav';

export default {
  name: 'App',
  components: {
    HelloWorld,
    BottomNav
  }
};
</script>
