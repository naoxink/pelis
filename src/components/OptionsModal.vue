<template>
  <b-modal id="options-modal" title="Opciones" ok-only>
    <!-- Exportar colección -->
    <b-row class="mb-1">
      <b-col>
        <b-alert variant="info" show>
          <h4>Exportación</h4>
          <b-button
            block
            variant="info"
            v-if="!exportCode"
            @click="exportCollection"
            >Exportar colección</b-button
          >
          <b-textarea
            rows="6"
            v-if="exportCode"
            :value="exportCode"
          ></b-textarea>
          <b-button
            block
            variant="success"
            class="mt-1 mb-1"
            v-if="exportCode"
            @click="downloadExportFile"
            >Descargar archivo</b-button
          >
          <b-button block v-if="exportCode" @click="clearExportCode"
            >Cerrar</b-button
          >
        </b-alert>
      </b-col>
    </b-row>
    <!-- Importar colección -->
    <b-row class="mb-1">
      <b-col>
        <b-alert variant="warning" show>
          <h4>Importación</h4>
          <b-button
            block
            variant="warning"
            @click="showImportTextarea = true"
            v-if="!showImportTextarea"
            >Importar colección</b-button
          >
          <b-textarea
            rows="6"
            v-if="showImportTextarea"
            v-model="importCode"
          ></b-textarea>
          <template v-if="showImportTextarea">
            <b-button
              block
              variant="success"
              class="mt-1 mb-1"
              :disabled="!importCode.length"
              @click="importCollection"
              >Importar colección</b-button
            >
            <hr>
            <div class="mt-1 mb-1">
              <strong>Importar desde archivo</strong>
              <input class="mt-2" type="file" @change="importCollectionFile" />
            </div>
            <div class="mt-1 mb-1">
              <strong>Importar CSV de IMDB</strong>
              <input class="mt-2" type="file" @change="readFile" />
            </div>
            <b-button
              block
              class="mt-2"
              @click="
                importCode = '';
                showImportTextarea = false;
              "
              >Cerrar</b-button>
          </template>
          <div class="text-center mt-2" v-if="importCode.length">
            <small
              ><strong
                >¡Esto sobrescribirá la colección actual! ¡No se puede
                deshacer!</strong
              ></small
            >
          </div>
          <!-- <strong>Importar desde archivo JSON</strong>
          <input class="mt-2" type="file" @change="importJSONFile" /> -->
        </b-alert>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <b-alert variant="secondary" show>
          <b-row>
            <b-col class="my-auto">Recalcular coste total de la colección</b-col>
            <b-col cols="4">
              <b-button block variant="primary" @click="recalcTotalSpent"
                >Recalcular</b-button>
            </b-col>
          </b-row>
        </b-alert>
      </b-col>
    </b-row>

    <!-- Eliminar colección -->
    <b-row>
      <b-col>
        <b-alert variant="danger" show>
          <h5>
            <b-icon-exclamation-triangle></b-icon-exclamation-triangle> Zona
            peligrosa
          </h5>
          <hr />
          <b-button variant="danger" block @click="clearCollection"
            >Eliminar la colección al completo</b-button
          >
        </b-alert>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
import { mapState } from "vuex";
import mixins from "@/mixins";
export default {
  name: "OptionsModal",
  mixins: [mixins],
  computed: {
    ...mapState(["movieCollection", "totalSpent"]),
  },
  data: function () {
    return {
      showImportTextarea: false,
      importCode: "",
      exportCode: "",
      importListUrl: "",
    };
  },
  methods: {
    recalcTotalSpent() {
      this.$store.commit("forceRecalcTotalSpent");
      this.showToast(
        "Correcto",
        "Se ha recalculado el gasto total con éxito",
        "success"
      );
    },
    downloadExportFile() {
      if (!this.exportCode) return false;
      const link = document.createElement("a");
      const today = new Date()
      const dateStr = [
        today.getFullYear(),
        today.getMonth() + 1,
        today.getDate()
      ].join('-')
      link.download = `pelis_export_${dateStr}.csv`;
      link.href = `data:text/csv;charset=utf-8,${this.jsonToCsv(this.movieCollection.map(this.formatMovie))}`;
      link.click();
    },
    importCollectionFile(event) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = this.csvToArray(e.target.result)
        // Eliminar la cabecera
        data.shift()
        const collection = data.filter(m => m.length > 5).map(m => {
          const isTime = !m[5].includes('T')
          return {
            id: m[0] || this.newId(),
            title: m[1] || '',
            cost: m[2] || 0,
            store: m[3] || '',
            imdbLink: m[4] || '',
            addDate: new Date(isTime ? +m[5] : m[5]) || new Date(),
            watched: m[6] === 'true',
            format: m[7] || 'br'
          }
        })
        this.$store.commit('importCollection', collection)
        this.showToast("Importado", "Colección importada con éxito", "success");
      };
      reader.readAsText(event.target.files[0]);
    },
    importJSONFile(event){
      const file = event.target.files[0]
      const fr = new FileReader()
      fr.onload = () => {
        const col = JSON.parse(fr.result)
        this.$store.commit('importCollection', col.movieCollection.map(m => {
          if(m.title.includes('�')){
            m.title = m.title.replace('�', '')
          }
          return m
        }))
      };
      fr.readAsText(file, 'UTF-8')
    },
    readFile: async function (event) {
      const file = event.target.files[0];
      const fr = new FileReader();
      fr.onload = () => {
        this.readImdbCSV(fr.result);
      };
      fr.readAsText(file, 'UTF-8');
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
    exportCollection() {
      const str = JSON.stringify({
        movieCollection: this.movieCollection.map(this.formatMovie),
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
            movie.addDate = new Date(movie.addDate)
          }
          return movie;
        });
        this.$store.commit("importCollection", data.movieCollection);
        this.showToast("Importado", "Colección importada con éxito", "success");
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
