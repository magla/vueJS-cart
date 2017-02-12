<template>
	<transition name="view" mode="out-in" appear>
		<div class="orderPage cartPage">
	  	<div class="pageContainer">
				<div v-show="order.length" class="container4">
					<h1 class="title1Fix orderTitle">
						<span>Order</span>
					</h1>
					<div class="fromHistoryMsg">
						<p>Items marked with * are not available for purchase</p>
					</div>
					<form class="cartForm" v-on:submit.prevent>
						<div class="fieldset-wrapper" v-for="(category, index) in order">
							<ordertable @valid="validForm($event)" :key="index" :categoryName="categoryName(index)" :category="category"></ordertable>
						</div>
						<div class="buttonWrapper">
							<button :disabled="!valid" :class="{ 'highlighted3' : true, 'error' : !valid}" @click="submit()">Send the order
							</button>
							<div v-show="checkoutStatus === 'failed'">
								Something went wrong.
							</div>
						</div>
					</form>
				</div>

				<div v-show="!order.length && !checkoutStatus" class="active emptyCartSection overMsg">
					<div class="halfSectionAsim-2 container1">
						<h2 class="halfBox title1Fix">Cart empty</h2>
						<p class="halfBox">Your cart is currently empty.
						</p>
						<div class="singleLink">
							<router-link to="/category-1">Start<span class="icon-circle-arrow"></span></router-link>
						</div>
					</div>
				</div>

				<div v-show="checkoutStatus === 'successful'" class="active sentSection overMsg">
					<div class="halfSectionAsim-2 container1">
						<h2 class="halfBox title1Fix">Order successfully sent!</h2>
					</div>
					<div class="container1">
						<div class="singleLink">
							<router-link to="/">Go back</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import OrderTable from '../components/OrderTable'

	export default {
	  name: 'order',
	  computed: {
	  	order () {
		    return this.$store.getters['allProducts']
		  },

      checkoutStatus () {
      	return this.$store.getters['checkoutStatus']
      },

      valid () {
      	return this.$store.getters['valid']
      }
	  },

	  components: {
	  	'ordertable': OrderTable
	  },

	  methods: {
	  	categoryName (catNum) {
	  		switch (catNum) {
	  			case 0: return 'Category #1'
	  			case 1: return 'Category #2'
	  			default: return 'Unknown'
	  		}
	  	},

      submit () {
      	if (this.valid) {
      		this.$store.dispatch('checkout')
      	}
      }
	  }
	}
</script>