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
  }
}