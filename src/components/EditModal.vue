<template>
  <b-modal id="edit-movie" title="Editar película" @ok="$emit('confirmEditMovie')" @hidden="$emit('resetEditMovie')">
    <b-row>
      <b-col cols="12">id: <code>{{ movie.id }}</code></b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col cols="12">
        <b-input-group size="md" prepend="Título">
          <b-form-input id="new-movie-title" v-model="movie.title" @keyup.enter="$emit('confirmEditMovie')"></b-form-input>
        </b-input-group>
      </b-col>
      <b-col cols="12" sm="6" class="mt-2">
        <b-input-group size="md" prepend="Precio" append="€">
          <b-form-input v-model="movie.cost" @keyup.enter="$emit('confirmEditMovie')"></b-form-input>
        </b-input-group>
      </b-col>
      <b-col cols="12" sm="6" class="mt-2">
        <b-input-group prepend="Tienda">
          <b-form-select v-model="movie.store">
            <b-form-select-option value=""></b-form-select-option>
            <b-form-select-option v-for="(label, key) in stores" :key="key" :value="key">{{ label }}</b-form-select-option>
          </b-form-select>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col>
        <b-input-group prepend="Estrenada">
          <b-form-select v-model="movie.watched">
            <b-form-select-option value="0">No</b-form-select-option>
            <b-form-select-option value="1">Sí</b-form-select-option>
          </b-form-select>
        </b-input-group>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'DetailModal',
    props: [ 'movie' ],
    computed: {
      ...mapState([ 'stores' ])
    }
  }
</script>