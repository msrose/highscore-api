module.exports = {
  development: {
    port: 1337,
    mongoUrl: 'mongodb://localhost:27017/highscoreapi'
  },
  staging: {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL
  }
};
