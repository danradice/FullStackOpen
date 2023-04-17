require('dotenv').config()

const PORT=3003
const MONGODB_URI='mongodb+srv://mosslake:royUhP2zTaRW6LEm@cluster0.gvyroag.mongodb.net/blogListApp?retryWrites=true&w=majority'

module.exports = {
  MONGODB_URI,
  PORT
}