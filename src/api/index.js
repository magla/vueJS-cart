
import Vue from 'vue'

// Axios
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

export default {
  getProducts (callback) {
    Vue.axios.get('http://localhost:3000/products').then((response) => {
      callback(response.data)
    })
  },

  getOrder (callback) {
    Vue.axios.get('http://localhost:3000/order').then((response) => {
      var send = response.data
      callback(send)
    })
  },

  sendOrder (products, cb, errorCb) {
    Vue.axios.get('http://localhost:3000/send-order', products)
      .then(function (response) {
        if (response.data.response === 'success') {
          cb()
        } else {
          errorCb()
        }
      })
      .catch(function (error) {
        if (error) errorCb()
      })
  }
}
