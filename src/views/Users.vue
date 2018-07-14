<template>
	<div class="container">
		<user-item v-for="item of usersList" :item="item" :key="item.id"></user-item>
		<clip-loader class="spinner" :loading="showSpinner" :color="color" :size="size"></clip-loader>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import userItem from '../components/UserItem'
	export default {
	  name: 'Users',
	  data() {
	    return {
	    	color: '#00b4ff',
        	size: '30px'
	    }
	  },
	  components: {
	  	userItem
	  },
	  computed: {
	  	...mapGetters({
	  		usersList: 'users/allUsers',
	  		showSpinner: 'isSpinner'
	  	})
	  },
	  created() {
	  	this.$store.dispatch('users/getUsers')
	  }
	}
</script>
