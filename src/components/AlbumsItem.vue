<template>
	<li class="list-item clearfix" @click="showAlbumDetail(item.id)">
		<span class="list-id">{{ item.id }}</span>
		<span class="list-title">{{ item.title }}</span>
	</li>
</template>

<script>
	export default {
	  name: 'AlbumsItem',
	  props: ['item'],
	  data () {
	    return {

	    }
	  },
	  methods: {
	  	showAlbumDetail(id) {
	  		this.$router.push({
	  			name: 'album-detail',
	  			params: {
	  				albumId: id
	  			}
	  		})
	  	}
	  }
	}
</script>
