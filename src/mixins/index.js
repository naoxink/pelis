export default {
  methods: {
    formatMovie(data){
      return {
        id: data.id || this.newId(),
        title: data.title || '',
        cost: data.cost || 0,
        store: data.store || '',
        imdbLink: data.imdbLink || '',
        addDate: data.addDate || new Date(),
        watched: data.watched || false
      }
    },
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
    round2decimals(number){
      return Math.round((number + Number.EPSILON) * 100) / 100
    },
    jsonToCsv(json){
      const items = json
      const replacer = (key, value) => value === null ? '' : value.toString() // specify how you want to handle null values here
      const header = Object.keys(items[0])
      const csv = [
        header.join(','), // header row first
        ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
      ].join('\r\n')
      console.log(csv)
      return csv
    }
  }
}
