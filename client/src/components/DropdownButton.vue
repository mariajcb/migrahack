<template lang="html">
  <v-container id="dropdown-example">

        <v-overflow-btn
          class="my-2"
          background-color="white"
          :items="dropdown_time"
          label="Time Range"
          target="#dropdown-example"
        ></v-overflow-btn>

  </v-container>
</template>

<script>
export default {
  data: () => ({
    dropdown_time: ['Past Week', 'Past Month', 'Last Year'],
  })
 }
</script>

<style lang="css" scoped>
.container {
  width: 60%!important;
}
</style>
