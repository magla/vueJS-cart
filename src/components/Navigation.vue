<template>
    <ul class="primaryNav">
      <li><router-link :to="menu[0]" exact>Home<span class="veil"></span></router-link></li>
      <li><router-link :to="menu[1]">Category #1<span class="veil"></span></router-link></li>
      <li><router-link :to="menu[2]">Category #2<span class="veil"></span></router-link></li>
      <li><router-link :to="menu[3]">Order<span class="veil"></span></router-link></li>    
    </ul>
</template>
<script>
export default {
  name: 'navigation',
  computed: {
    menu () {
      return ['/', '/category-1', '/category-2', '/order']
    }
  }
}
</script>