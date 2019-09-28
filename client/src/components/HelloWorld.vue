<template>
  <mgl-map
    id="map"
    :accessToken="accessToken"
    :mapStyle.sync="mapStyle"

    :attributionControl="false"
    :center="coordinates"
    >

    <MglAttributionControl />
    <MglNavigationControl position="top-right" />
    <MglGeolocateControl position="top-right" />
      <MglMarker :coordinates="coordinates">
        <MglPopup>
          <v-card>
            Hello, I'm popup!
          </v-card>
        </MglPopup>
      </MglMarker>
  </mgl-map>
</template>

<script>
import Mapbox from "mapbox-gl";
import {
  MglMap,
  MglAttributionControl,
  MglNavigationControl,
  MglGeolocateControl,
  MglPopup,
  MglMarker
  } from "vue-mapbox";

export default {
  components: {
    MglMap,
    MglNavigationControl,
    MglGeolocateControl,
    MglAttributionControl,
    MglPopup,
    MglMarker
  },
  data() {
    return {
      accessToken: 'pk.eyJ1IjoibWFyaWFqY2IiLCJhIjoiY2sxMnBmNDY5MDE1NDNibW90eXZyZTM4NyJ9.S80tecKtEt1gmWsGylPC1A',
      mapStyle: 'mapbox://styles/mapbox/light-v10',
      coordinates: [ -105.270546, 40.014984 ],
      zoom: 11,
    };
  },
  created() {
    this.mapbox = Mapbox;
  },
  methods: {
    // getCoordinates() {
    //   const lat = `${API_URL}/api/latitude/`
    //   const long = `${API_URL}/api/longitude/`
    //   return axios.get(lat, long).then(response => response.data)
    // }
  }
};
</script>

<style media="screen">
body {
margin: 0;
padding: 0;
}

#map {
position: absolute;
top: 0;
bottom: 0;
width: 100%;
}
</style>
