module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/there-be-monsters/'
    : '/'
  ,
  "transpileDependencies": [
    "vuetify"
  ]
}