<template>
  <div id="app">
    <Nav></Nav>

    <b-container>
      <b-row>
        <b-col sm="12" lg="4">
          <!-- Izquierda -->

          <Resume
            :totalSpent="round2decimals(totalSpent)"
            :totalMovies="totalMovies()"
            :giftMovies="giftMovies()"
            :unwatchedMovies="unwatchedMovies()"
            :byFormat="countByFormat()"
          ></Resume>

          <div class="mb-3">
            <b-button variant="success" block v-b-modal.add-movie-modal>
              <b-icon-plus></b-icon-plus> Añadir película</b-button>
          </div>

          <SuggestedMovie v-on:showDetail="showMovieModal"></SuggestedMovie>

        </b-col>
        <!-- Izquierda -->

        <b-col sm="12" lg="8">
          <!-- Derecha -->

          <b-pagination
            v-if="filteredResults.count"
            class="mb-3"
            v-on:change="changePage"
            v-model="page"
            :total-rows="filteredResults.count"
            :per-page="qtyPerPage"
            :limit="10"
            align="fill"
          ></b-pagination>

          <b-list-group>
            <b-list-group-item
              variant="dark"
              class="d-flex justify-content-between align-items-center">
              <h4 class="mb-0 d-inline-block">Mi colección</h4>
              <b-button
                size="sm"
                @click="showFilters = !showFilters"
                :variant="showFilters ? 'light' : ''"
              >
                <b-icon-filter></b-icon-filter>
              </b-button>
            </b-list-group-item>
            <!-- Filtros -->
            <b-list-group-item v-if="showFilters" variant="light">
              <b-row>
                <b-col cols="12" md="6">
                  <b-input-group size="md" prepend="Título">
                    <b-form-input v-model="filters.title"></b-form-input>
                  </b-input-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-input-group prepend="Tienda">
                    <b-form-select v-model="filters.store">
                      <b-form-select-option value=""></b-form-select-option>
                      <b-form-select-option v-for="(label, key) in stores" :key="key" :value="key">{{ label }}</b-form-select-option>
                    </b-form-select>
                  </b-input-group>
                </b-col>
              </b-row>
              <b-row class="mt-2">
                <b-col cols="12" md="5">
                  <b-input-group prepend="Precio">
                    <b-form-select v-model="filters.cost">
                      <b-form-select-option value=""></b-form-select-option>
                      <b-form-select-option value="0">Gratis</b-form-select-option>
                      <b-form-select-option value="<5">&lt; 5€</b-form-select-option>
                      <b-form-select-option value="<10">&lt; 10€</b-form-select-option>
                      <b-form-select-option value="10&50">&gt; 10€ &amp;&amp; &lt; 50€</b-form-select-option>
                      <b-form-select-option value=">50">&gt; 50€</b-form-select-option>
                    </b-form-select>
                  </b-input-group>
                </b-col>
                <b-col cols="12" md="5" class="mt-2 mt-sm-0">
                  <b-input-group prepend="Estrenada">
                    <b-form-select v-model="filters.watched">
                      <b-form-select-option :value="null">Todas</b-form-select-option>
                      <b-form-select-option :value="false">Sin estrenar</b-form-select-option>
                      <b-form-select-option :value="true">Estrenadas</b-form-select-option>
                    </b-form-select>
                  </b-input-group>
                </b-col>
              </b-row>
              <b-row class="mt-2 text-center">
                <b-col>
                  <b-input-group prepend="Resultados por página">
                    <b-form-select v-model="qtyPerPage">
                      <b-form-select-option :value="15">15</b-form-select-option>
                      <b-form-select-option :value="50">50</b-form-select-option>
                      <b-form-select-option :value="100">100</b-form-select-option>
                    </b-form-select>
                  </b-input-group>
                </b-col>
                <b-col>
                  <b-input-group prepend="Ordenar">
                    <b-form-select v-model="filters.sort.field">
                      <b-form-select-option value="title">Título</b-form-select-option>
                      <b-form-select-option value="cost">Coste</b-form-select-option>
                      <b-form-select-option value="addDate">Fecha añadida</b-form-select-option>
                    </b-form-select>
                    <b-form-select v-model="filters.sort.order">
                      <b-form-select-option :value="-1">Asc</b-form-select-option>
                      <b-form-select-option :value="1">Desc</b-form-select-option>
                    </b-form-select>
                  </b-input-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col>Resultados:
                  <strong>{{ filteredResults.count }}</strong>
                </b-col>
              </b-row>
            </b-list-group-item>

            <!-- Listado -->
            <b-list-group-item v-if="!totalMovies()" variant="secondary">Aún no has añadido nada a tu colección :(</b-list-group-item>
            <b-list-group-item
              variant="warning"
              v-if="hasAnyFilter && !filteredResults.count && totalMovies()">
              No hay resultados con estos filtros
            </b-list-group-item>
            <b-list-group-item
              v-for="(movie, key) in filteredResults.items"
              :key="key">
              <b-row>
                <b-col md="12">
                  <div class="text-truncate text-left font-weight-bold">
                    <a
                      href="#"
                      v-b-modal.detail-movie-modal
                      @click.prevent="showMovie(movie)"
                      >{{ movie.title }}
                    </a>
                  </div>
                </b-col>
                <b-col md="12" class="text-right">
                  <b-row class="mt-3 mt-sm-0">
                    <b-col cols="6" sm="8">
                      <div class="mt-1 text-left">
                        <b-badge
                          v-if="movie.format"
                          variant="info"
                          class="mr-2 pl-2 pr-2"
                        >{{ formats[movie.format] }}</b-badge>
                        <b-badge
                          v-if="!+movie.watched"
                          variant="warning"
                          class="mr-2 pl-2 pr-2 text-uppercase"
                          >Sin estrenar</b-badge
                        >
                        <b-badge
                          variant="success"
                          class="mr-2 pl-2 pr-2"
                          :title="`Coste: ${movie.cost}€`"
                          >{{ movie.cost }}€</b-badge
                        >
                      </div>
                    </b-col>
                    <b-col cols="6" sm="4">
                      <b-button
                        class="mr-1"
                        variant="info"
                        size="sm"
                        v-b-modal.edit-movie
                        @click="editMovie(movie.id)"
                        ><b-icon-pencil></b-icon-pencil>
                        <span class="d-none d-sm-inline-block"
                          >Editar</span
                        ></b-button
                      >
                      <b-button
                        @click="removeMovie(movie.id)"
                        size="sm"
                        variant="danger"
                        ><b-icon-trash></b-icon-trash>
                        <span class="d-none d-sm-inline-block"
                          >Eliminar</span
                        ></b-button
                      >
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-list-group-item>
          </b-list-group>

          <b-pagination
            v-if="filteredResults.count"
            class="mt-3"
            v-on:change="changePage"
            v-model="page"
            :total-rows="filteredResults.count"
            :per-page="qtyPerPage"
            :limit="10"
            align="fill"
          ></b-pagination>
        </b-col>
        <!-- Derecha -->
      </b-row>
    </b-container>

    <!-- Modal añadir película (móvil) -->
    <AddMovieModal></AddMovieModal>

    <!-- Modal de opciones -->
    <OptionsModal></OptionsModal>

    <!-- Modal de edición -->
    <EditModal
      :movie="editMovieData"
      v-on:confirmEditMovie="confirmEditMovie"
      v-on:resetEditMovie="resetEditMovie"
    ></EditModal>

    <!-- Modal de detalle -->
    <DetailModal
      v-on:removeMovie="removeMovie($event)"
      v-on:editMovie="editMovie($event)"
      :movie="detailMovie"
    ></DetailModal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap-vue/dist/bootstrap-vue-icons.min.css";
import mixins from "@/mixins";
import SuggestedMovie from "@/components/SuggestedMovie.vue";
import DetailModal from "@/components/DetailModal.vue";
import EditModal from "@/components/EditModal.vue";
import OptionsModal from "@/components/OptionsModal.vue";
import AddMovieModal from "@/components/AddMovieModal.vue";
import Resume from "@/components/Resume.vue";
import Nav from "@/components/Nav.vue";

export default {
  name: "App",
  components: {
    SuggestedMovie,
    DetailModal,
    EditModal,
    OptionsModal,
    AddMovieModal,
    Resume,
    Nav,
  },
  mixins: [mixins],
  computed: {
    ...mapState([
      "movieCollection",
      "totalSpent",
      "suggestedToday",
      "stores",
      "exportCode",
      "importCode",
      "showImportTextarea",
      "formats"
    ]),
    hasAnyFilter() {
      return this.filters.title.length || this.filters.cost.length;
    },
  },
  watch: {
    movieCollection() {
      this.filterCollection();
    },
    hasAnyFilter() {
      this.filterCollection();
    },
    "filters.watched": function () {
      this.filterCollection();
    },
    qtyPerPage() {
      this.page = 1;
      this.filterCollection();
    },
    "filters.sort.field": function () {
      this.filterCollection();
    },
    "filters.sort.order": function () {
      this.filterCollection();
    },
  },
  data: function () {
    return {
      page: 1,
      qtyPerPage: 15,
      addMovieData: {
        title: "",
        cost: 0,
        store: "",
        imdbLink: "",
      },
      editMovieData: {
        id: "",
        title: "",
        cost: "",
        watched: 0,
        store: "",
        imdbLink: "",
        addDate: null,
        format: ''
      },
      showFilters: false,
      filters: {
        title: "",
        cost: "",
        watched: null,
        sort: {
          field: "addDate",
          order: 1,
        },
        store: '',
        format: ''
      },
      detailMovie: null,
      filteredResults: {
        items: {},
        count: 0,
      },
    };
  },
  methods: {
    changePage(page) {
      this.page = page;
      this.filterCollection();
    },
    showMovie(movie) {
      // this.$store.dispatch({ type: "getMovie", id }).then((movie) => {
        this.detailMovie = {
          ID: movie.id,
          Título: movie.title,
          Coste: movie.cost + " €",
          Tienda: this.stores[movie.store],
          Estrenada: +movie.watched ? "Sí" : "No",
          'Fecha de inclusión': this.formatDate(movie.addDate),
          'Enlace IMDb': movie.imdbLink
        };
      // });
    },
    totalMovies() {
      return this.movieCollection.length;
    },
    giftMovies() {
      let total = 0;
      for (let id in this.movieCollection) {
        if (+this.movieCollection[id].cost === 0) {
          total++;
        }
      }
      return total;
    },
    unwatchedMovies() {
      return Object.values(this.movieCollection).reduce((acc, movie) => {
        if (!+movie.watched) {
          acc++;
        }
        return acc;
      }, 0);
    },
    countByFormat() {
      const totals = {}
      for(let id in this.movieCollection){
        const movie = this.movieCollection[id]
        if(!totals[movie.format]){
          totals[movie.format] = 1
        }else{
          totals[movie.format]++
        }
      }
      return totals
    },
    formatDate(date) {
      return new Date(date).toLocaleString().split(", ").shift();
    },
    sortItems(items) {
      const value = this.filters.sort.order;
      return items.sort((a, b) => {
        if (a[this.filters.sort.field] > b[this.filters.sort.field]) {
          return value;
        } else if (a[this.filters.sort.field] < b[this.filters.sort.field]) {
          return value * -1;
        } else {
          return 0;
        }
      });
    },
    filterCollection() {
      if (!this.movieCollection || !this.movieCollection.length) {
        return false;
      }
      let items = this.movieCollection.slice().filter(this.filterItem);
      if (this.filters.sort.field) {
        items = this.sortItems(items);
      }
      items = items.reverse();
      const count = items.length;
      items = items.splice(this.qtyPerPage * (this.page - 1), this.qtyPerPage);
      this.filteredResults = {
        items: items,
        count: count,
      };
    },
    filterItem(item) {
      let isOk = true;
      if (this.filters.title) {
        if (
          !item.title.toLowerCase().includes(this.filters.title.toLowerCase())
        ) {
          isOk = false;
        }
      }
      if (this.filters.cost) {
        if (!this.evalCostFilter(item)) {
          isOk = false;
        }
      }
      if (this.filters.watched !== null) {
        if (+this.filters.watched !== +(item.watched || 0)) {
          isOk = false;
        }
      }
      if(this.filters.store){
        if(item.store !== this.filters.store){
          isOk = false;
        }
      }
      return isOk;
    },
    evalCostFilter(item) {
      if (this.filters.cost.includes("&")) {
        // Rango
        const range = this.filters.cost.split("&");
        return +item.cost > +range[0] && +item.cost < +range[1];
      } else if (this.filters.cost.includes("<")) {
        // Menor que
        return +item.cost < +this.filters.cost.replace("<", "");
      } else if (this.filters.cost.includes(">")) {
        // Mayor que
        return +item.cost > +this.filters.cost.replace(">", "");
      } else {
        // Número concreto
        return +item.cost === +this.filters.cost;
      }
    },
    newId() {
      return Math.random().toString().substring(2) + new Date().getTime();
    },
    addMovie() {
      const _ = this;
      if (!this.addMovieData.title) return false;
      this.$store.commit("addMovie", {
        id: _.newId(),
        title: _.addMovieData.title,
        cost: _.addMovieData.cost,
        store: _.addMovieData.store,
        imdbLink: _.addMovieData.imdbLink,
      });
      document.querySelector("#new-movie-title").focus();
      this.showToast(
        "Añadida",
        `Se ha añadido "${this.addMovieData.title}" a la colección con un coste de ${this.addMovieData.cost}€`,
        "success"
      );
      this.addMovieData.title = "";
      this.addMovieData.cost = 0;
      this.addMovieData.store = "";
      this.addMovieData.imdbLink = "";
    },
    clearCollection() {
      if (
        confirm("Vas a ELIMINAR POR COMPLETO la colección ¿estás seguro/a?")
      ) {
        this.$store.commit("clearCollection");
        this.showToast(
          "Colección eliminada",
          "Se ha eliminado la colección al completo",
          "success"
        );
      }
    },
    removeMovie(id) {
      this.$store.dispatch({ type: "getMovie", id }).then((res) => {
        const title = res.title;
        if (confirm(`¿Eliminar de la colección "${title}"?`)) {
          this.$store.commit("removeMovie", id);
          this.showToast("Eliminado", `Has eliminado "${title}"`, "success");
        }
      });
    },
    exportCollection() {
      const str = JSON.stringify({
        movieCollection: this.movieCollection,
        totalSpent: this.totalSpent,
      });
      this.exportCode = btoa(str);
    },
    clearExportCode() {
      this.exportCode = "";
    },
    importCollection() {
      const str = atob(this.importCode);
      try {
        const data = JSON.parse(str);
        data.movieCollection = data.movieCollection.map((movie) => {
          if (!movie.id) {
            movie.id = this.newId();
          }
          if (typeof movie.watched === "undefined") {
            movie.watched = 1;
          } else {
            movie.watched = !!+movie.watched;
          }
          if (!movie.addDate) {
            movie.addDate = Date.now();
          } else {
            movie.addDate = +movie.addDate;
          }
          return movie;
        });
        this.$store.commit("importCollection", data);
        this.showToast("Importado", "Colección importada con éxito", "success");
      } catch (e) {
        console.error(e);
      }
    },
    editMovie(id) {
      this.$store.dispatch({ type: "getMovie", id }).then((movie) => {
        this.editMovieData.id = movie.id;
        this.editMovieData.title = movie.title;
        this.editMovieData.cost = +movie.cost;
        this.editMovieData.watched = +movie.watched;
        this.editMovieData.store = movie.store;
        this.editMovieData.imdbLink = movie.imdbLink;
        this.editMovieData.addDate = new Date(movie.addDate);
        this.editMovieData.format = movie.format
      });
    },
    confirmEditMovie() {
      this.$store.commit("editMovie", {
        id: this.editMovieData.id,
        title: this.editMovieData.title,
        cost: +this.editMovieData.cost,
        watched: +this.editMovieData.watched === 1,
        store: this.editMovieData.store,
        imdbLink: this.editMovieData.imdbLink,
        addDate: new Date(this.editMovieData.addDate),
        format: this.editMovieData.format
      });
      this.showToast(
        "Editado",
        `Se ha editado correctamente "${this.editMovieData.title}"`,
        "success"
      );
    },
    resetEditMovie() {
      this.editMovieData.id = "";
      this.editMovieData.title = "";
      this.editMovieData.cost = "";
      this.editMovieData.store = "";
      this.editMovieData.format = "";
    },
    showToast(title, text, variant) {
      this.$bvToast.toast(text, {
        title,
        variant,
        solid: true,
        toaster: "b-toaster-top-center",
      });
    },
    showMovieModal(id) {
      this.showMovie(id);
      this.$bvModal.show("detail-movie-modal");
    },
  },
  mounted() {
    this.filterCollection();
  },
};
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
