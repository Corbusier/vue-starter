<template>
	<ul>
		<li class="user-posts" v-for="item of userPosts" :key="item.id" @click="showPostDetail(item.id)">
			<span class="user-posts-id">{{ item.id }}</span>
			<span class="list-title">{{ item.title }}</span>
			<p class="post-body">{{ item.body }}</p>
		</li>
	</ul>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
	  name: 'UserPosts',
	  data () {
	    return {
	    	userId: this.$route.params.userId
	    }
	  },
	  computed: {
	  	...mapGetters({
	  		userPosts: 'users/userPosts'
	  	})
	  },
	  created() {
	  	this.$store.dispatch('users/getUserPostsList', this.userId)
	  },
	  methods: {
	  	showPostDetail(id) {
	  		this.$router.push({
	          name: 'post-detail',
	          params: {
	            postId: id
	          }
	        })
	  	}
	  }
	}
</script>

<style>
  .user-posts {
    margin-bottom: 1em;
    padding: 1em;
    border: 1px solid #ffc9c9;
    border-radius: 4px;
    background: #f6f6f6;
  }
  .user-posts-id {
    float: left; 
    width: 1.8em;
    height: 1.8em;
    background: #f99185;
    line-height: 1.8em;
    border-radius: 25px 25px;
    color: #fff;
  }
</style>