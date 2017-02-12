<template>
	<div v-if="category && category.length">
		<h2>{{categoryName}}</h2>
		<table >
			<tbody>
				<tr>
					<th>Product name</th>
					<th>Quantity</th>
				</tr>
				<item v-for="(product, index) in category" :key="product.id" v-if="typeof product.quantity !== 'undefined'" :category="categoryName" :product="product"></item>
			</tbody>
		</table>
	</div>
</template>

<script>
	import OrderItem from './OrderItem'
	export default {
	  name: 'OrderTable',
	  props: ['category', 'categoryName'],
	  components: {
	  	'item': OrderItem
	  }
	}
</script>