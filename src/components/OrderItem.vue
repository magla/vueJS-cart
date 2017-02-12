<template>
	<tr :class="!product.available ? 'empty' : null">
		<td><strong>{{star}} {{product.title}}</strong></td>
		<td v-if="product.available">
				<div class="placeholder" :name="'quantity' + product.id">{{product.quantity}}</div>				
		</td>
		<td v-else>
			<strong>{{product.quantity}}</strong>
		</td>
		<td v-on:click="removeItem(product.id)" class="killer">X</td>
	</tr>
</template>

<script>
	export default {
	  name: 'orderitem',
	  props: ['product', 'category'],
	  computed: {
	  	star () {
	  		return this.product.available ? '' : '*'
	  	}
	  },

	  methods: {
  		removeItem (id) {
	  		this.$store.dispatch('removeFromCart', id)
  		},

  		changeQuantity (id, quantity) {
  			if (quantity < 1) {
  				this.product.quantity = ''
  			}

	  		this.$store.dispatch('changeQuantity', {id: id, quantity: quantity})
  		},

  		outOfFocus (quantity, id) {
  			if (quantity === '') {
	  			this.$store.dispatch('removeFromCart', id)
	  		}
  		}
  	}
	}
</script>

