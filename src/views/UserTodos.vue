<template>
	<ul>
		<user-todos-item v-for="item of userTodos" :key="item.id" :item="item"></user-todos-item>
	</ul>
</template>	

<script>
	import { mapGetters } from 'vuex'
	import UserTodosItem from '../components/UserTodosItem'
	export default {
	  name: 'UserTodos',
	  data () {
	    return {
	    	userId: this.$route.params.userId
	    }
	  },
	  components: {
	  	UserTodosItem
	  },
	  computed: {
	  	...mapGetters({
	  		userTodos: 'users/userTodos'
	  	})
	  },
	  created() {
	  	this.$store.dispatch('users/getUserTodoList', this.userId)
	  }
	}
</script>
