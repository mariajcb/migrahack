<template lang="html">
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-btn
        color="#3373C1"
        dark
        class="bottom-button"
        @click.stop="dialog = true"
      >
        <span>Report Sighting</span>
      </v-btn>

      <v-dialog
        v-model="dialog"
        max-width="290"
      >
        <v-card>
          <v-form>
            <v-text-field
              label="Time"
              :append-icon="mdi-time"
            ></v-text-field>
            <v-text-field
              label="Location"
            ></v-text-field>
            <v-text-field
              label="Comment"
            ></v-text-field>

          </v-form>
        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn
                  color="green darken-1"
                  text
                  @click="dialog = false"
                >
                  Submit
                </v-btn>

                <v-btn
                  color="green darken-1"
                  text
                  @click="dialog = false"
                >
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
    }
  },
}
</script>

<style media="screen" scoped>
.bottom-button {
  margin-top: 20rem;
}
</style>
