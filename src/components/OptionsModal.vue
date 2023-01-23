<template>
  <b-modal id="options-modal" title="Opciones" ok-only>
    <!-- Exportar colección -->
    <b-row class="mb-3">
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
    <b-row class="mb-3">
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
          <b-button
            variant="success"
            class="mr-2"
            v-if="importCode.length"
            @click="importCollection"
            >Importar colección</b-button
          >
          <b-button
            v-if="showImportTextarea"
            @click="
              importCode = '';
              showImportTextarea = false;
            "
            >Cancelar</b-button
          >
          <div class="text-center mt-2" v-if="importCode.length">
            <small
              ><strong
                >¡Esto sobrescribirá la colección actual! ¡No se puede
                deshacer!</strong
              ></small
            >
          </div>
          <hr />
          <strong>Importar desde archivo</strong>
          <input class="mt-2" type="file" @change="importCollectionFile" />
          <hr />
          <strong>Importar CSV de IMDB</strong>
          <input class="mt-2" type="file" @change="readFile" />
        </b-alert>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <b-alert variant="light" show>
          <b-button variant="primary" @click="recalcTotalSpent"
            >Recalcular coste total</b-button
          >
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
      link.download = "pelis_export.data";
      link.href = `data:application/json;charset=utf-8;base64,${this.exportCode}`;
      link.click();
    },
    importCollectionFile(event) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          console.log(data);
          this.$store.commit("importCollection", data);
        } catch (e) {
          this.showToast(
            "Error",
            "Ha ocurrido un error al importar los datos",
            "error"
          );
        }
        this.showToast("Importado", "Colección importada con éxito", "success");
      };
      reader.readAsText(event.target.files[0]);
    },
    readFile: async function (event) {
      const file = event.target.files[0];
      const fr = new FileReader();
      fr.onload = () => {
        this.readImdbCSV(fr.result);
      };
      fr.readAsText(file);
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
  },
};
</script>
