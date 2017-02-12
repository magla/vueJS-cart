<template>
	<fieldset v-if="product">
		<div class="prodImgWrap"><img :src="imgSrc" :alt="product.title"></div>
		<div class="fieldGroup centeredBox-v">
			<legend class="title3Fix">{{product.title}}</legend>
			<div class="fieldSet">
				<label :for="'quantity' + product.id">Quantity:</label>
				<input v-on:blur="outOfFocus(product.quantity, product.id)" v-model="product.quantity" v-on:input="changeQuantity(product.id, $event.target.value)" class="placeholder" type="number" :name="'quantity' + product.id" placeholder="0">
			</div>
		</div>
	</fieldset>
</template>

<script>
	export default {
	  name: 'product',
	  props: ['product'],

	  computed: {
	  	imgSrc: function () {
	  		return '/static/images/' + this.product.image
	  	}
	  },

	  methods: {
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