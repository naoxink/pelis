<template>
	<b-card class="mb-3" v-if="movie.id">
   <b-card-text>
    <strong class="mr-1">Película sugerida hoy:</strong>
    <a class="font-weight-bold" href="#" @click.prevent="$emit('showDetail', movie.id)">{{ movie.title }}</a>
    <b-badge class="ml-1" v-if="!+movie.watched" variant="warning">SIN ESTRENAR</b-badge>
   </b-card-text>
  </b-card>
</template>

<script>
	import { mapState } from 'vuex'
	import 'bootstrap/dist/css/bootstrap.css'
	import 'bootstrap-vue/dist/bootstrap-vue.css'
	import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'

	export default {
		name: 'SuggestedMovie',
    computed: {
      ...mapState([ 'movieCollection', 'suggestedToday' ])
    },
    watch: {
      suggestedToday(){
        this.$store.dispatch({ type: 'getMovie', id: this.suggestedToday.id }).then(movie => this.movie = movie)
      }
    },
    data: function(){
      return {
        movie: {}
      }
    },
    mounted(){
      
    }
	}
</script>

<style scoped>
	
</style>