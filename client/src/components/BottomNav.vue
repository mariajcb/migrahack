<template lang="html">
  <v-bottom-navigation
      fixed
      v-model="bottomNav"
      height="80"
      :value="activeBtn"
      color="#3373C1"
    >
    <v-btn
      height="80"
      value="recent"
      class="mt-n2">
      <span>Call</span>
      <v-icon>mdi-history</v-icon>
    </v-btn>

    <v-btn
      height="80"
      value="report"
      class="mt-n2">
      <span>Report</span>
      <v-icon>mdi-history</v-icon>
    </v-btn>

    <v-btn
      height="80"
      value="nearby"
      class="mt-n2">
      <span>Help</span>
      <v-icon>mdi-map-marker</v-icon>
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
/* button {
  padding-top: 0.75rem!important;
} */
</style>
