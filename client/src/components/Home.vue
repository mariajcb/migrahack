<template>
  <div>
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
          {{ getCoordinates() }}
        </MglMarker>
    </mgl-map>
    <DropdownButton />
    <ReportButton />
    <BottomNav />
  </div>
</template>

<script>
import Mapbox from "mapbox-gl";
import BottomNav from './BottomNav'
import ReportButton from './ReportButton'
import moment from "moment"
import { api } from '../api'
import DropdownButton from '../components/DropdownButton';

import {
  MglMap,
  MglAttributionControl,
  MglNavigationControl,
  MglGeolocateControl,
  MglPopup,
  MglMarker,
  } from "vue-mapbox";

export default {
  name: 'home',
  components: {
    MglMap,
    MglNavigationControl,
    MglGeolocateControl,
    MglAttributionControl,
    MglPopup,
    MglMarker,
    BottomNav,
    ReportButton,
    DropdownButton
  },
  data() {
    return {
      accessToken: 'pk.eyJ1IjoibWFyaWFqY2IiLCJhIjoiY2sxMnBmNDY5MDE1NDNibW90eXZyZTM4NyJ9.S80tecKtEt1gmWsGylPC1A',
      mapStyle: 'mapbox://styles/mapbox/light-v10',
      raids: null,
      coordinates: [],
      zoom: 3,
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
    createdAt() {
      return moment(this.raids[0].createdAt).format('MMMM Do YYYY, h:mm a')
    },
    updatedAt() {
      return moment(this.raids[0].updatedAt).format('MMMM Do YYYY, h:mm a')
    },
    getCoordinates () {
      return this.coordinates =
          [ this.raids[0].longitude,
          this.raids[0].latitude ]
    }
  },
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
