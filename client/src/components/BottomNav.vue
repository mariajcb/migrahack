<template lang="html">
  <v-bottom-navigation
      fixed
      v-model="bottomNav"
      height="80"
      color="#3373C1"
    >
    <v-btn
      height="80"
      value="recent"
      class="pb-4"
      href="tel:+1-844-363-1423">
      <span>Call</span>
      <v-icon>mdi-phone</v-icon>
    </v-btn>

    <v-btn
      height="80"
      value="nearby"
      class="pb-4"
      href="https://www.aclu.org/know-your-rights/immigrants-rights/"
      target="_blank"
      >
      <span>Help</span>
      <v-icon>mdi-bookmark-plus-outline</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  data: () => ({
    bottomNav: 'report',
  })
}
</script>

<style lang="css" scoped>
</style>
