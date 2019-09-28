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

    <MglGeojsonLayer
    :sourceId="geoJsonSource.id"
    :source="geoJsonSource"
    layerId="myLayer"
    :layer="geoJsonlayer"
    />
  </mgl-map>

</template>

<script>
import Mapbox from "mapbox-gl";
import { api } from '../api'
import {
  MglMap,
  MglAttributionControl,
  MglNavigationControl,
  MglGeolocateControl,
  MglPopup,
  MglMarker,
  MglGeojsonLayer
  } from "vue-mapbox";

export default {
  components: {
    MglMap,
    MglNavigationControl,
    MglGeolocateControl,
    MglAttributionControl,
    MglPopup,
    MglMarker,
    MglGeojsonLayer
  },
  data() {
    return {
      accessToken: 'pk.eyJ1IjoibWFyaWFqY2IiLCJhIjoiY2sxMnBmNDY5MDE1NDNibW90eXZyZTM4NyJ9.S80tecKtEt1gmWsGylPC1A',
      mapStyle: 'mapbox://styles/mapbox/streets-v11',
      coordinates: [-111.549668, 39.014],
      zoom: 11,
      geoJsonSource: {
        "id": "historical-places",
        "type": "circle",
        "source": {
          "type": "vector",
          "url": "mapbox://mariajcb.d5hchqqa"
        }
      },
      geoJsonLayer: {
        'layerId': 'HPC_landmarks-1xzf0j'
      },
      raids: null
    };
  },
  created() {
    this.mapbox = Mapbox;
  },
  async mounted() {
    console.log('got to mounted')
    const raids = await api.fetchReports()
    console.log('raids', raids)
    this.raids = raids
  },
  methods: {

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
