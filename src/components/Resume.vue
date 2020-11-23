<template>
  <b-alert variant="info" show>
    <strong>Resumen</strong>
    <hr>
    <div>Total de películas: <strong>{{ totalMovies }}</strong></div>
    <div v-if="giftMovies">Películas que me han regalado: <strong>{{ giftMovies }}</strong></div>
    <div v-if="unwatchedMovies">Películas por estrenar: <strong>{{ unwatchedMovies }}</strong></div>
    <div>Dinero total invertido: <strong>{{ totalSpent }} €</strong></div>
  </b-alert>
</template>

<script>
  export default {
    name: 'Resume',
    props: [
      'totalMovies',
      'giftMovies',
      'unwatchedMovies',
      'totalSpent'
    ]
  }
</script>