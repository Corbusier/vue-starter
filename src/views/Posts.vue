<template>
	<div class="container">
		<Item v-for="item of postsList" :key="item.id" :item="item"></Item>
		<clip-loader class="spinner" :loading="showSpinner" :color= "color" :size="size"></clip-loader>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Item from '../components/PostsItem'

	export default {
		name: 'Posts',
		data () {
			return {
				color: '#00b4ff',
				size: '30px'
			}
		},
		components: {
			Item
		},
		computed: {
			...mapGetters({
				postsList: 'posts/allPosts',
				showSpinner: 'isSpinner'
			})
		},
		created() {
			this.$store.dispatch('posts/getPosts')
		},
		destroyed() {
			this.$store.dispatch('resetSpinner')
		}
	}
</script>

<style lang="css" scoped>
</style>