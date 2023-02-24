<template>
  <b-alert variant="info" show>
    <strong>Resumen</strong>
    <hr>
    <div>Total de películas: <strong>{{ totalMovies }}</strong></div>
    <div v-if="giftMovies">Películas que me han regalado: <strong>{{ giftMovies }}</strong></div>
    <div v-if="unwatchedMovies">Películas por estrenar: <strong>{{ unwatchedMovies }}</strong></div>
    <div>Dinero total invertido: <strong>{{ totalSpent }} €</strong></div>
    <hr>
    <div v-for="(count, format) in byFormat" :key="format">Total en {{ formats[format] }}: <strong>{{ count }}</strong></div>
  </b-alert>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'Resume',
    computed: {
      ...mapState([ 'formats' ])
    },
    props: [
      'totalMovies',
      'giftMovies',
      'unwatchedMovies',
      'totalSpent',
      'byFormat'
    ]
  }
</script>