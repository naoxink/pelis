<template>
  <nav class="navbar navbar-dark bg-dark mb-3">
    <b-container>
      <a class="navbar-brand" href="#"><b-icon-film class="yellowgreen"></b-icon-film> <span class="d-none d-sm-inline-block">COLECCIÓN DE PELIS</span></a>
      <b-button class="d-inline-block d-sm-none" variant="success" v-b-modal.add-movie-modal><b-icon-plus></b-icon-plus></b-button>
      <b-button v-b-modal.options-modal><b-icon-gear-fill></b-icon-gear-fill> <span class="d-none d-sm-inline-block">Opciones</span></b-button>
    </b-container>
  </nav>
</template>

<script>
  export default {
    name: 'Nav'
  }
</script>