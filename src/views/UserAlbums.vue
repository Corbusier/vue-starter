<template>
	<ul>
		<li class="user-ablums" v-for="item of UserAlbums" :key="item.id" @click="showAlbumDetail(item.id)">
			<span class="user-ablums-id">{{ item.id }}</span>
			<span class="list-title">{{ item.title }}</span>
		</li>
	</ul>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
	  name: 'UserAlbums',
	  data () {
	    return {
	    	userId: this.$route.params.userId
	    }
	  },
	  computed: {
	  	...mapGetters({
	  		UserAlbums: 'users/userAblums'
	  	})
	  },
	  created() {
	  	this.$store.dispatch('users/getUserAlbumsList', this.userId)
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

<style>
  .user-ablums {
    margin-bottom: 1em;
    padding: 1em;
    border: 1px solid #ffc9c9;
    border-radius: 4px;
    background: #f6f6f6;
  }
  .user-ablums-id {
    float: left; 
    width: 1.8em;
    height: 1.8em;
    background: #f99185;
    line-height: 1.8em;
    border-radius: 25px 25px;
    color: #fff;
  }
</style>
