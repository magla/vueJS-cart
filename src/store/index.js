import Vue from 'vue'
import Vuex from 'vuex'

// Lodash
import _ from 'lodash'

Vue.use(Vuex)

import shop from '../api/index'
import * as types from './mutation-types'

// initial state
const state = {
  products: [],
  order: [],
  activeOrder: [],
  valid: true,
  checkoutStatus: null
}

// getters
const getters = {
  allProducts: state => {
    var order = []
    var empty = true

    state.activeOrder.map(function (item) {
      var category = item.category

      if (typeof order[category] === 'undefined') {
        order[category] = []

        if (typeof item.quantity !== 'undefined' && item.quantity !== null) {
          order[category].push(item)
        }
      } else {
        if (typeof item.quantity !== 'undefined' && item.quantity !== null) {
          order[category].push(item)
        }
      }
    })

    for (var i = order.length - 1; i >= 0; i--) {
      if (order[i] && order[i].length) {
        empty = false
      }
    }

    return empty ? [] : order
  },

  'category-1': state => {
    return state.activeOrder.filter(product => product.category === 0 && product.available)
  },

  'category-2': state => {
    return state.activeOrder.filter(product => product.category === 1 && product.available)
  },

  checkoutStatus: state => state.checkoutStatus,

  order: state => state.order,

  valid: state => state.valid
}

// actions
const actions = {
  initApp ({ commit }) {
    shop.getProducts(products => {
      commit(types.RECEIVE_PRODUCTS, { products })

      shop.getOrder(activeOrder => {
	      commit(types.RECEIVE_ORDER, { activeOrder })
	    })
    })
  },

  checkout ({ commit, state }) {
    const savedCartItems = [...state.order]
    var order = state.order
    shop.sendOrder(
      order,
      () => { commit(types.CHECKOUT_SUCCESS); commit(types.RECEIVE_ORDER, {'activeOrder': []}) },
      () => commit(types.CHECKOUT_FAILURE, { savedCartItems })
    )
    commit(types.CHECKOUT_REQUEST)
  },

  changeQuantity ({ commit }, {id, quantity}) {
    commit(types.CHANGE_QUANTITY, {id, quantity})
	},

  removeFromCart ({ commit }, id) {
    commit(types.REMOVE_FROM_CART, id)
	}
}

// mutations
const mutations = {
  [types.RECEIVE_PRODUCTS] (state, { products }) {
    state.products = products
  },

	[types.RECEIVE_ORDER] (state, order) {
    state.lastCheckout = null
    const items = order.activeOrder

    state.order = items

    if (!state.order.length) {
    	state.activeOrder = JSON.parse(JSON.stringify(state.products))
    } else {
    	// Combine the product list and the order on id
      state.activeOrder = _.map(state.products, function (product) {
	  		return Object.assign({}, product, items.find(x => Object.keys({id: product.id}).every(key => x[key] === {id: product.id}[key])))
	  	})
    }
  },

  [types.CHANGE_QUANTITY] (state, {id, quantity}) {
    state.lastCheckout = null
    state.checkoutStatus = null
    state.valid = true
    const activeRecord = state.activeOrder.find(p => p.id === id)
    const orderRecord = state.order.length ? state.order.find(p => p.id === id) : null

    if (!activeRecord) {
      state.activeOrder.push({
        id: id,
        quantity: quantity
      })
    } else {
      var newObject = Object.assign({}, {quantity: parseInt(quantity)}, state.activeOrder[state.activeOrder.indexOf(activeRecord)])
      Vue.set(state.activeOrder, state.activeOrder.indexOf(activeRecord), newObject)
    }

    if (!orderRecord) {
      state.order.push({
        id: id,
        quantity: quantity
      })
    } else {
      state.order[state.order.indexOf(orderRecord)].quantity = parseInt(quantity)
    }
  },

  [types.REMOVE_FROM_CART] (state, id) {
    state.valid = true
    state.lastCheckout = null
    Vue.set(state.activeOrder.find(p => p.id === id), 'quantity', null)

    const orderRecord = state.order.find(p => p.id === id)
    state.order.splice(state.order.indexOf(orderRecord), 1)
  },

  [types.CHECKOUT_REQUEST] (state) {
    state.order = []
    state.checkoutStatus = null
  },

  [types.CHECKOUT_SUCCESS] (state) {
    state.checkoutStatus = 'successful'
  },

  [types.CHECKOUT_FAILURE] (state, { savedCartItems }) {
    // rollback to the order saved before sending the request
    state.order = savedCartItems
    state.checkoutStatus = 'failed'
  }
}

export default new Vuex.Store({
	state,
  actions,
  getters,
  mutations
})
