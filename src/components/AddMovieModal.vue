<template>
  <b-modal title="Añadir película" id="add-movie-modal">
    <b-input-group size="md" prepend="Título">
      <b-form-input id="new-movie-title-modal" v-model="movie.title" @keyup.enter="addMovie"></b-form-input>
    </b-input-group>
    <b-input-group size="md" prepend="Precio" append="€" class="mt-2">
      <b-form-input v-model="movie.cost" @keyup.enter="addMovie"></b-form-input>
    </b-input-group>
    <b-input-group prepend="Tienda" class="mt-2">
      <b-form-select v-model="movie.store">
        <b-form-select-option value=""></b-form-select-option>
        <b-form-select-option v-for="(label, key) in stores" :key="key" :value="key">{{ label }}</b-form-select-option>
      </b-form-select>
    </b-input-group>
    <b-input-group prepend="Formato" class="mt-2">
      <b-form-select v-model="movie.format">
        <b-form-select-option value=""></b-form-select-option>
        <b-form-select-option v-for="(label, key) in formats" :key="key" :value="key">{{ label }}</b-form-select-option>
      </b-form-select>
    </b-input-group>
    <b-input-group size="md" prepend="IMDb link" class="mt-2">
      <b-form-input v-model="movie.imdbLink" @keyup.enter="addMovie"></b-form-input>
    </b-input-group>
    <b-row>
      <b-col sm="12" md="6" offset-md="3" class="text-center mt-3">
        <b-button @click="addMovie" block variant="success">Añadir a la colección</b-button>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
  import { mapState } from 'vuex'
  import mixins from '@/mixins'
  export default {
    name: 'AddMovieModal',
    mixins: [ mixins ],
    computed: {
      ...mapState([ 'stores', 'formats' ])
    },
    data: function(){
      return {
        movie: {
          title: '',
          cost: 0,
          store: '',
          imdbLink: '',
          format: ''
        }
      }
    },
    methods: {
      async addMovie(){
        const _ = this
        if(!this.movie.title) return false
        await this.$store.dispatch('addMoviesBatch', [
          {
            title: _.movie.title,
            cost: _.movie.cost,
            store: _.movie.store,
            imdbLink: _.movie.imdbLink,
            format: _.movie.format || 'br'
          }
        ]);
        document.querySelector('#new-movie-title-modal').focus()
        this.showToast('Añadida', `Se ha añadido "${this.movie.title}" a la colección con un coste de ${this.movie.cost}€`, 'success')
        this.movie.title = ''
        this.movie.cost = 0
        this.movie.store = ''
        this.movie.imdbLink = ''
        this.movie.format = ''
      },
    }
  }
</script>
