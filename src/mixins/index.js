export default {
  methods: {
    showToast(title, text, variant){
      this.$bvToast.toast(text, {
        title,
        variant,
        solid: true,
        toaster: 'b-toaster-top-center'
      })
    },
    newId(){
      return Math.random().toString().substring(2) + new Date().getTime()
    },
    readImdbCSV: async function(fileData){
      const parsed = this.csvToArray(fileData)
      parsed.forEach(async (movie, index) => {
        if(index === 0){
          return false
        }
        const id = movie[1]
        const dateWatched = movie[16]
        const title = movie[5]
        const imdbLink = movie[6]
        if(!id) return false

        this.$store.commit('addMovie', {
          'id': id,
          'cost': 0,
          'store': '',
          'addDate': new Date(dateWatched).getTime(),
          'title': title,
          'watched': !!dateWatched,
          'imdbLink': imdbLink
        })
      })
    },
    csvToArray(text) {
        let p = '', row = [''], ret = [row], i = 0, r = 0, s = !0, l;
        for (l of text) {
            if ('"' === l) {
                if (s && l === p) row[i] += l;
                s = !s;
            } else if (',' === l && s) l = row[++i] = '';
            else if ('\n' === l && s) {
                if ('\r' === p) row[i] = row[i].slice(0, -1);
                row = ret[++r] = [l = '']; i = 0;
            } else row[i] += l;
            p = l;
        }
        return ret;
    },
  }
}