<template>
  <div id="app">

    <nav class="navbar navbar-dark bg-dark mb-3">
      <b-container>
        <a class="navbar-brand" href="#"><b-icon-film class="yellowgreen"></b-icon-film> <span class="d-none d-sm-inline-block">COLECCIÓN DE PELIS</span></a>
        <b-button class="d-inline-block d-sm-none" variant="success" v-b-modal.add-movie-modal><b-icon-plus></b-icon-plus></b-button>
        <b-button v-b-modal.options-modal><b-icon-gear-fill></b-icon-gear-fill> <span class="d-none d-sm-inline-block">Opciones</span></b-button>
      </b-container>
    </nav>

    <b-container>
      <b-row>
        <b-col sm="12" lg="4"> <!-- Izquierda -->
          <b-alert variant="info" show>
            <strong>Resumen</strong>
            <hr>
            <div>Total de películas: <strong>{{ totalMovies() }}</strong></div>
            <div v-if="giftMovies()">Películas que me han regalado: <strong>{{ giftMovies() }}</strong></div>
            <div v-if="unwatchedMovies()">Películas por estrenar: <strong>{{ unwatchedMovies() }}</strong></div>
            <div>Dinero total invertido: <strong>{{ totalSpent }} €</strong></div>
          </b-alert>
          <b-alert variant="light" show class="d-none d-sm-block">
            <strong>Añadir película</strong>
            <hr>
            <b-input-group size="md" prepend="Título">
              <b-form-input id="new-movie-title" v-model="addMovieData.title" @keyup.enter="addMovie"></b-form-input>
            </b-input-group>
            <b-input-group size="md" prepend="Precio" append="€" class="mt-2">
              <b-form-input v-model="addMovieData.cost" @keyup.enter="addMovie"></b-form-input>
            </b-input-group>
            <b-input-group prepend="Tienda" class="mt-2">
              <b-form-select v-model="addMovieData.store">
                <b-form-select-option value=""></b-form-select-option>
                <b-form-select-option v-for="(label, key) in stores" :key="key" :value="key">{{ label }}</b-form-select-option>
              </b-form-select>
            </b-input-group>
            <b-button @click="addMovie" class="mt-2" block size="md" variant="success">Añadir a la colección</b-button>
          </b-alert>
        </b-col> <!-- Izquierda -->

        <b-col sm="12" lg="8"> <!-- Derecha -->
          <b-list-group>
            <b-list-group-item variant="dark" class="d-flex justify-content-between align-items-center">
              <h4 class="mb-0 d-inline-block">Mi colección</h4>
              <b-button size="sm" @click="showFilters = !showFilters" :variant="showFilters ? 'light' : ''">
                <b-icon-filter></b-icon-filter>
              </b-button>
            </b-list-group-item>
            <!-- Filtros -->
            <b-list-group-item v-if="showFilters" variant="light">
              <b-row>
                <b-col cols="12">
                  <b-input-group size="md" prepend="Título">
                    <b-form-input v-model="filters.title"></b-form-input>
                  </b-input-group>
                </b-col>
              </b-row>
              <b-row class="mt-2">
                <b-col cols="12" md="5">
                  <b-input-group prepend="Precio">
                    <b-form-select v-model="filters.cost">
                      <b-form-select-option value=""></b-form-select-option>
                      <b-form-select-option value="0">Gratis</b-form-select-option>
                      <b-form-select-option value="<5">< 5€</b-form-select-option>
                      <b-form-select-option value="<10">< 10€</b-form-select-option>
                      <b-form-select-option value="10&50">> 10€ && < 50€</b-form-select-option>
                      <b-form-select-option value=">50">> 50€</b-form-select-option>
                    </b-form-select>
                  </b-input-group>
                </b-col>
                <b-col cols="12" md="5" class="mt-2 mt-sm-0">
                  <b-input-group prepend="Estrenada">
                    <b-form-select v-model="filters.watched">
                      <b-form-select-option value="">Todas</b-form-select-option>
                      <b-form-select-option value="no">Sin estrenar</b-form-select-option>
                      <b-form-select-option value="si">Estrenadas</b-form-select-option>
                    </b-form-select>
                  </b-input-group>
                </b-col>
              </b-row>
              <b-row class="mt-2 text-center">
                <b-col>Resultados: <strong>{{ filteredResultsCount() }}</strong></b-col>
              </b-row>
            </b-list-group-item>

            <!-- Listado -->
            <b-list-group-item v-if="!totalMovies()" variant="secondary">Aún no has añadido nada a tu colección :(</b-list-group-item>
            <b-list-group-item variant="warning" v-if="hasAnyFilter && !filteredResultsCount() && totalMovies()">No hay resultados con estos filtros</b-list-group-item>
            <b-list-group-item v-for="(movie, key) in filterCollection()" :key="key">
              <b-row>
                <b-col md="12">
                  <div class="text-truncate text-left font-weight-bold">
                    <a href="#" v-b-modal.detail-movie-modal @click.prevent="showMovie(movie.id)">{{ movie.title }}</a>
                  </div>
                </b-col>
                <b-col md="12" class="text-right">
                  <b-row class="mt-3 mt-sm-0">
                    <b-col cols="6" sm="8">
                      <div class="mt-1 text-left">
                        <b-badge v-if="!+movie.watched" variant="warning" class="mr-2 pl-2 pr-2 text-uppercase">Sin estrenar</b-badge>
                        <b-badge variant="success" class="mr-2 pl-2 pr-2" :title="`Coste: ${movie.cost}€`">{{ movie.cost }}€</b-badge>
                        <b-badge variant="secondary" class="mr-2 pl-2 pr-2" :title="`Añadida: ${formatDate(movie.addDate)}`">{{ formatDate(movie.addDate) }}</b-badge>
                      </div>
                    </b-col>
                    <b-col cols="6" sm="4">
                      <b-button class="mr-1" variant="info" size="sm" v-b-modal.edit-movie @click="editMovie(movie.id)"><b-icon-pencil></b-icon-pencil> <span class="d-none d-sm-inline-block">Editar</span></b-button>
                      <b-button @click="removeMovie(movie.id)" size="sm" variant="danger"><b-icon-trash></b-icon-trash> <span class="d-none d-sm-inline-block">Eliminar</span></b-button>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-list-group-item>

          </b-list-group>
        </b-col> <!-- Derecha -->
      </b-row>
    </b-container>

    <!-- Modal añadir película (móvil) -->
    <b-modal title="Añadir película" id="add-movie-modal">
      <b-input-group size="md" prepend="Título">
        <b-form-input id="new-movie-title-modal" v-model="addMovieData.title" @keyup.enter="addMovie"></b-form-input>
      </b-input-group>
      <b-input-group size="md" prepend="Precio" append="€" class="mt-2">
        <b-form-input v-model="addMovieData.cost" @keyup.enter="addMovie"></b-form-input>
      </b-input-group>
      <b-input-group prepend="Tienda" class="mt-2">
        <b-form-select v-model="addMovieData.store">
          <b-form-select-option value=""></b-form-select-option>
          <b-form-select-option v-for="(label, key) in stores" :key="key" :value="key">{{ label }}</b-form-select-option>
        </b-form-select>
      </b-input-group>
      <b-row>
        <b-col sm="12" md="6" offset-md="3" class="text-center mt-3">
          <b-button @click="addMovie" block variant="success">Añadir a la colección</b-button>
        </b-col>
      </b-row>
    </b-modal>

    <!-- Modal de opciones -->
    <b-modal id="options-modal" title="Opciones" ok-only>
      <!-- Exportar colección -->
      <b-row class="mb-3">
          <b-col>
            <b-alert variant="info" show>
              <b-button block variant="info" v-if="!exportCode" @click="exportCollection">Exportar colección</b-button>
              <b-textarea rows="6" v-if="exportCode" :value="exportCode"></b-textarea>
              <b-button block v-if="exportCode" @click="clearExportCode">Cerrar</b-button>
            </b-alert>
          </b-col>
      </b-row>
      <!-- Importar colección -->
      <b-row class="mb-3">
          <b-col>
            <b-alert variant="warning" show>
              <b-button block variant="warning" @click="showImportTextarea = true" v-if="!showImportTextarea">Importar colección</b-button>
              <b-textarea rows="6" v-if="showImportTextarea" v-model="importCode"></b-textarea>
              <b-button variant="success" class="mr-2" v-if="importCode.length" @click="importCollection">Importar colección</b-button>
              <b-button v-if="showImportTextarea" @click="importCode = '';showImportTextarea = false">Cancelar</b-button>
              <div class="text-center mt-2" v-if="importCode.length"><small><strong>¡Esto sobrescribirá la colección actual! ¡No se puede deshacer!</strong></small></div>
            </b-alert>
          </b-col>
      </b-row>
      <!-- Eliminar colección -->
      <b-row>
        <b-col>
          <b-alert variant="danger" show>
            <h5><b-icon-exclamation-triangle></b-icon-exclamation-triangle> Zona peligrosa</h5>
            <hr>
            <b-button variant="danger" block @click="clearCollection">Eliminar la colección al completo</b-button>
          </b-alert>
        </b-col>
      </b-row>
    </b-modal>

    <!-- Modal de edición -->
    <b-modal id="edit-movie" title="Editar película" @ok="confirmEditMovie" @hidden="resetEditMovie">
      <b-row>
        <b-col cols="12">id: <code>{{ editMovieData.id }}</code></b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col cols="12">
          <b-input-group size="md" prepend="Título">
            <b-form-input id="new-movie-title" v-model="editMovieData.title" @keyup.enter="confirmEditMovie"></b-form-input>
          </b-input-group>
        </b-col>
        <b-col cols="12" sm="6" class="mt-2">
          <b-input-group size="md" prepend="Precio" append="€">
            <b-form-input v-model="editMovieData.cost" @keyup.enter="confirmEditMovie"></b-form-input>
          </b-input-group>
        </b-col>
        <b-col cols="12" sm="6" class="mt-2">
          <b-input-group prepend="Tienda">
            <b-form-select v-model="editMovieData.store">
              <b-form-select-option value=""></b-form-select-option>
              <b-form-select-option v-for="(label, key) in stores" :key="key" :value="key">{{ label }}</b-form-select-option>
            </b-form-select>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col>
          <b-input-group prepend="Estrenada">
            <b-form-select v-model="editMovieData.watched">
              <b-form-select-option value="0">No</b-form-select-option>
              <b-form-select-option value="1">Sí</b-form-select-option>
            </b-form-select>
          </b-input-group>
        </b-col>
      </b-row>
    </b-modal>

    <!-- Modal de detalle -->
    <b-modal size="lg" id="detail-movie-modal" :title="`Detalle: ${detailMovie['Título']}`" ok-only>
      <b-container id="detail-content">
        <b-row v-for="(value, key) in detailMovie" :key="key">
          <b-col cols="4" class="text-right">
            <strong>{{ key }}</strong>
          </b-col>
          <b-col cols="8">
            <code v-if="key === 'ID'" class="text-truncate d-block">{{ value }}</code>
            <span v-else>{{ value }}</span>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'

export default {
  name: 'App',
  computed: {
    ...mapState([ 'movieCollection', 'totalSpent' ]),
    hasAnyFilter(){
      return this.filters.title.length || this.filters.cost.length || this.filters.watched.length
    }
  },
  data: function(){
    return {
      stores: {
        'amazon': 'Amazon',
        'elcorteingles': 'El corte Inglés',
        'fnac': 'Fnac',
        'cex': 'Cex'
      },
      addMovieData: {
        title: '',
        cost: 0,
        store: ''
      },
      editMovieData: {
        id: '',
        title: '',
        cost: '',
        watched: 0,
        store: ''
      },
      exportCode: '',
      importCode: '',
      showImportTextarea: false,
      showFilters: false,
      filters: {
        title: '',
        cost: '',
        watched: ''
      },
      detailMovie: {}
    }
  },
  methods: {
    showMovie(id){
      this.detailMovie = {
        'ID': this.movieCollection[id].id,
        'Título': this.movieCollection[id].title,
        'Coste': this.movieCollection[id].cost + ' €',
        'Tienda': this.stores[this.movieCollection[id].store],
        'Estrenada': +this.movieCollection[id].watched ? 'Sí' : 'No',
        'Fecha de inclusión': this.formatDate(this.movieCollection[id].addDate)
      }
    },
    filteredResultsCount(){
      return Object.keys(this.filterCollection()).length
    },
    totalMovies(){
      return Object.keys(this.movieCollection).length
    },
    giftMovies(){
      let total = 0
      for(let id in this.movieCollection){
        if(+this.movieCollection[id].cost === 0){
          total++
        }
      }
      return total
    },
    unwatchedMovies(){
      return Object.values(this.movieCollection).reduce((acc, movie) => {
        if(!+movie.watched){
          acc++
        }
        return acc
      }, 0)
    },
    formatDate(date){
      return new Date(date).toLocaleString().split(' ').shift()
    },
    filterCollection(){
      return Object.values(this.movieCollection).reverse().reduce((acc, item) => {
        if(this.filterItem(item)){
          acc[item.id] = item
        }
        return acc
      }, {})
    },
    filterItem(item){
      let isOk = true
      if(this.filters.title){
        if(!item.title.toLowerCase().includes(this.filters.title.toLowerCase())){
          isOk = false
        }
      }
      if(this.filters.cost){
        if(!this.evalCostFilter(item)){
          isOk = false
        }
      }
      if(this.filters.watched){
        if(this.filters.watched === 'si' && !+item.watched){
          isOk = false
        }else if(this.filters.watched === 'no' && +item.watched){
          isOk = false
        }
      }
      return isOk
    },
    evalCostFilter(item){
      if(this.filters.cost.includes('&')){ // Rango
        const range = this.filters.cost.split('&')
        return +item.cost > +range[0] && +item.cost < +range[1]
      }else if(this.filters.cost.includes('<')){ // Menor que
        return +item.cost < +this.filters.cost.replace('<', '')
      }else if(this.filters.cost.includes('>')){ // Mayor que
        return +item.cost > +this.filters.cost.replace('>', '')
      }else{ // Número concreto
        return +item.cost === +this.filters.cost
      }
    },
    newId(){
      return Math.random().toString().substring(2) + new Date().getTime()
    },
    addMovie(){
      const _ = this
      if(!this.addMovieData.title) return false
      this.$store.commit('addMovie', {
        id: _.newId(),
        title: _.addMovieData.title,
        cost: _.addMovieData.cost,
        store: _.addMovieData.store
      })
      if(document.querySelector('#new-movie-title-modal')){
        document.querySelector('#new-movie-title-modal').focus()
      }else{
        document.querySelector('#new-movie-title').focus()
      }
      this.showToast('Añadida', `Se ha añadido "${this.addMovieData.title}" a la colección con un coste de ${this.addMovieData.cost}€`, 'success')
      this.addMovieData.title = ''
      this.addMovieData.cost = 0
      this.addMovieData.store = ''
    },
    clearCollection(){
      if(confirm('Vas a ELIMINAR POR COMPLETO la colección ¿estás seguro/a?')){
        this.$store.commit('clearCollection')
        this.showToast('Colección eliminada', 'Se ha eliminado la colección al completo', 'success')
      }
    },
    removeMovie(id){
      const title = this.movieCollection[id].title
      if(confirm(`¿Eliminar de la colección "${title}"?`)){
        this.$store.commit('removeMovie', id)
        this.showToast('Eliminado', `Has eliminado "${title}"`, 'success')
      }
    },
    exportCollection(){
      const str = JSON.stringify({
        movieCollection: this.movieCollection,
        totalSpent: this.totalSpent
      })
      this.exportCode = btoa(str)
    },
    clearExportCode(){
      this.exportCode = ''
    },
    importCollection(){
      const str = atob(this.importCode)
      try{
        const data = JSON.parse(str)
        // Compatibilidad con el formato anterior
        if(Array.isArray(data.movieCollection)){
          data.movieCollection = data.movieCollection.reduce((acc, movie) => {
            if(!movie.id){
              movie.id = this.newId()
            }
            movie.watched = 1
            movie.addDate = Date.now()
            acc[movie.id] = movie
            return acc
          }, {})
        }
        this.$store.commit('importCollection', data)
        this.showToast('Importado', 'Colección importada con éxito', 'success')
      }catch(e){
        console.error(e)
      }
    },
    editMovie(id){
      this.editMovieData.id = this.movieCollection[id].id
      this.editMovieData.title = this.movieCollection[id].title
      this.editMovieData.cost = +this.movieCollection[id].cost
      this.editMovieData.watched = +this.movieCollection[id].watched
      this.editMovieData.store = this.movieCollection[id].store
    },
    confirmEditMovie(){
      this.$store.commit('editMovie', {
        id: this.editMovieData.id,
        title: this.editMovieData.title,
        cost: +this.editMovieData.cost,
        watched: +this.editMovieData.watched,
        store: this.editMovieData.store
      })
      this.showToast('Editado', `Se ha editado correctamente "${this.editMovieData.title}"`, 'success')
    },
    resetEditMovie(){
      this.editMovieData.id = ''
      this.editMovieData.title = ''
      this.editMovieData.cost = ''
      this.editMovieData.store = ''
    },
    showToast(title, text, variant){
      this.$bvToast.toast(text, {
        title,
        variant,
        solid: true,
        toaster: 'b-toaster-top-center'
      })
    }
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #369;
  padding-bottom: 40px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.yellowgreen {
  color: yellowgreen;
}
#detail-content .row:nth-child(even) {
  background-color: #f4f4f4;
}
</style>
