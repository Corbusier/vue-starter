<template>
	<div class="container">
		<albums-item v-for="item of albums" :key="item.id" :item="item"></albums-item>
		<clip-loader class="spinner" :loading="showSpinner" :size="size" :color="color"></clip-loader>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import AlbumsItem from '../components/AlbumsItem'
	export default {
	  name: 'Albums',
	  data () {
	    return {
	    	color: '#00b4ff',
	    	size: '30px'
	    }
	  },
	  components: {
	  	AlbumsItem
	  },
	  computed: {
	  	...mapGetters({
	  		showSpinner: 'isSpinner',
	  		albums: 'albums/allAlbums'
	  	})
	  },
	  created() {
	  	this.$store.dispatch('albums/getAlbums')
	  },
	  destroyed() {
	  	this.$store.dispatch('resetSpinner')
	  }
	}
</script>
