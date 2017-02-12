<template>
	<transition name="view" mode="out-in" appear>
		<div class="orderPage" v-if="page">
	  	<div class="pageContainer">
					<div class="halfSectionAsim-2 container1">
						<h1 class="halfBox title1Fix"><span v-text="page.title"></span></h1>
						<p class="halfBox" v-text="page.shortDesc"></p>
					</div>
					<section class="container1">
						<form class="orderForm" data-vv-scope="category">
							<div v-show="!products.length">No available products for sale in this category.</div>
							<div class="fieldset-wrapper" v-for="product in products">
									<product :key="product.id" :product="product"></product>
							</div>
						</form>
						<div class="singleLink">
		      		<router-link :to="routeLink">{{ $route.meta.nextName }}<span class="icon-circle-arrow"></span></router-link>
						</div>
					</section>
			</div>
		</div>
	</transition>
</template>

<script>
	import Vue from 'vue'
	import Product from '../components/Product'

	// Axios
	import axios from 'axios'
	import VueAxios from 'vue-axios'

	Vue.use(VueAxios, axios)

	export default {
	  name: 'Category',
	  computed: {
	  	products () {
		    return this.$store.getters[this.$route.name]
		  },

		  routeLink () {
		  	return this.$route.meta.nextUrl
		  }
	  },

	  components: {
	  	'product': Product
	  },

	  data: function () {
	    return {
	    	page: null,
	    	isClicked: false
	  	}
	  },

	  mounted: function () {
	  	this.fetchPageData()
	  },

	 watch: {
  	$route () {
      this.fetchPageData()
     }
   },

	  methods: {
	    fetchPageData: function () {
	      Vue.axios.get('http://localhost:3000/' + this.$route.name).then((response) => {
	        var page = response.data
	        this.$set(this, 'page', page)
	      })
	    }
	  }
	}
</script>