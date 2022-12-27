<template>
  <b-modal
    v-if="movie"
    size="lg"
    id="detail-movie-modal"
    :title="`Detalle: ${movie['Título']}`"
    ok-only
  >
    <b-container id="detail-content">
      <template v-for="(value, key) in movie">
        <b-row :key="key" v-if="key !== 'Enlace IMDb'">
          <b-col cols="4" class="text-right">
            <strong>{{ key }}</strong>
          </b-col>
          <b-col cols="8">
            <code v-if="key === 'ID'" class="text-truncate d-block">{{
              value
            }}</code>
            <span v-else>{{ value }}</span>
          </b-col>
        </b-row>
      </template>
      <b-row v-if="suggestedToday && suggestedToday.id === movie.ID">
        <b-col cols="4"></b-col>
        <b-col class="text-left">
          <b-badge variant="info">SUGERIDA HOY</b-badge>
        </b-col>
      </b-row>
      <b-row v-if="imdbLink(movie)">
        <b-col cols="4" class="text-right">
          <strong>Enlace IMDb</strong>
        </b-col>
        <b-col cols="8">
          <a target="_blank" :href="imdbLink(movie)">{{ movie["Título"] }}</a>
        </b-col>
      </b-row>
      <hr />
      <b-row>
        <b-col cols="4" class="text-right"> Opciones </b-col>
        <b-col>
          <b-button
            class="mr-1"
            variant="info"
            size="sm"
            v-b-modal.edit-movie
            @click="$emit('editMovie', movie.ID)"
            ><b-icon-pencil></b-icon-pencil>
            <span class="d-none d-sm-inline-block">Editar</span></b-button
          >
          <b-button
            @click="$emit('removeMovie', movie.ID)"
            size="sm"
            variant="danger"
            ><b-icon-trash></b-icon-trash>
            <span class="d-none d-sm-inline-block">Eliminar</span></b-button
          >
        </b-col>
      </b-row>
    </b-container>
  </b-modal>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "DetailModal",
  props: ["movie"],
  computed: {
    ...mapState(["suggestedToday"]),
  },
  methods: {
    imdbLink: (movie) => {
      if (movie.ID.toString().indexOf("tt") === 0)
        return `https://imdb.com/title/${movie.ID}`;
      if (movie["Enlace IMDb"]) return movie["Enlace IMDb"];
      return "";
    },
  },
};
</script>