<template>
	<div class="container">
		<img class="albun-png" src="../assets/img/album.png"></img>
		<ul>
			<li class="list-item" v-for="item of albumDetail" @click="open(item)" :key="item.id">
				<img class="album-img" v-lazy="item.thumbnailUrl" alt="item.id">
				<span class="album-detail-title">{{ item.title }}</span>
			</li>
		</ul>
		<mu-dialog :open="dialog" title="详情" @click="close">
			<img class="album-img-detail" v-lazy="itemDetail.url"></img>
			<span class="album-img-title">{{ itemDetail.title }}</span>
			<mu-flat-button slot="actions" primary @click="close" label="确定"/>
		</mu-dialog>
		<clip-loader class="spinner" :loading="showSpinner" :color="color" :size="size"></clip-loader>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
	  name: 'AlbumDetail',
	  data () {
	    return {
	    	color: '#00b4ff',
	    	size: '30px',
	    	dialog: false,
	    	albumId: this.$route.params.albumId,
	    	itemDetail: {}
	    }
	  },
	  computed: {
	  	...mapGetters({
	  		showSpinner: 'isSpinner',
	  		albumDetail: 'albums/albumDetail'
	  	})
	  },
	  methods: {
	  	close() {
	  		this.dialog = false
	  	},
	  	open(item) {
	  		this.itemDetail = item
	  		this.dialog = true
	  	}
	  },
	  created() {
	  	this.$store.dispatch('albums/getAlbumDetail', this.albumId)
	  },
	  destroyed() {
	  	this.$store.dispatch('albums/resetAlbumDetail')
      	this.$store.dispatch('resetSpinner')
	  }
	}
</script>

<style>
  .albun-png {
    width: 5em;
  }
  .album-img {
    width: 3em;
    height: 3em;
  }
  .album-detail-title {
    padding-left: 1em;
    height: 3em;
    line-height: 3em;
    vertical-align: top;
    width: 70%;
    text-align: left;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 500;
  }
  .album-img-detail {
    width: 100%;
    margin-bottom: 1em;
  }
  .album-img-title {
    text-align: center;
    font-weight: 600;
  }
</style>