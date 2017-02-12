<template>
	<transition name="view" mode="out-in" appear>
		<div class="orderPage">
	  	<div class="pageContainer">
					<div class="halfSectionAsim-2 container1">
						<h1 class="halfBox title1Fix"><span>Welcome</span></h1>
						<p class="halfBox">Start your shopping experience.</p>
					</div>
					<section class="container1">
						<div class="singleLink">
		      		<router-link :to="routeLink">{{ $route.meta.nextName }}</router-link>
						</div>
					</section>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
	  name: 'Home',
	  computed: {
		  routeLink () {
		  	return this.$route.meta.nextUrl
		  }
	  }
	}
</script>