<template>
	<div class="container">
		<div class="list-item">
			<span class="list-id-detail">{{ postDetail.id }}</span>
			<span class="list-title-detail">{{ postDetail.title }}</span>
			<p class="post-body-detail">{{ postDetail.body }}</p>
			<button class="edit-btn" @click="open">编辑</button>
			<!-- 编辑弹窗 -->
			<mu-dialog :open="dialog" title="编辑">
				<mu-text-field v-model="title" label="标题" hintText="请输入标题" fullWidth/>
				<mu-text-field v-model="body" label="正文" hintText="请输入正文" fullWidth/>
				<mu-flat-button slot="actions" primary @click="close" label="取消"/>
				<mu-flat-button slot="actions" primary @click="updateDetail" label="修改"/>
			</mu-dialog>
		</div>
		<div class="comment-box clearfix">
			<span class="comment-title">评论</span>
			<ul class="comment-list clear">
				<comment-item v-for="item of postDetail.comments" :key="item.id" :item="item">
				</comment-item>
			</ul>
		</div>
		<clip-loader class="spinner" :loading="showSpinner" :color="color" :size="size"></clip-loader>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import * as jsonServices from '../services/jsonholder' 
	import commentItem from '../components/CommentItem'
	
	export default {
	  name: 'PostDetail',
	  data () {
	    return {
	    	dialog: false,
	    	color: '#00b4ff',
	    	size: '30px',
	    	postId: this.$route.params.postId
	    }
	  },
	  components: {
	  	commentItem
	  },
	  computed: {
	  	...mapGetters({
	  		postDetail: 'posts/postDetail',
	  		showSpinner: 'isSpinner'
	  	}),
	  	title: {
	  		get(){
	  			return this.$store.state.posts.formData.title
	  		},
	  		set(newVal) {
	  			this.$store.commit('posts/UPDATE_TITLE', newVal)
	  		}
	  	},
	  	body: {
	  		get() {
	  			return this.$store.state.posts.formData.body
	  		},
	  		set(newVal) {
	  			this.$store.commit('posts/UPDATE_BODY', newVal)
	  		}
	  	}
	  },
	  created() {
	  	this.$store.dispatch('posts/getPostDetail', this.postId)
	  },
	  destroyed() {
        this.$store.dispatch('resetSpinner')
        this.$store.dispatch('posts/resetDetail')
      },
	  methods: {
	  	open() {
	  		this.dialog = true
	  	},
	  	close() {
	  		this.dialog = false
	  	},
	  	updateDetail() {
	        const formData = this.$store.state.posts.formData
	        jsonServices.updatePostDetail(formData).then(res => {
	          const returnDetail = res.data.data
	          this.$store.commit('posts/SAVE_POSTDETAIL', { postDetail: returnDetail })
	        })
	        this.close()
	    }
	  }
	}
</script>
<style>
  .list-id-detail {
    display: inline-block;
    width: 1.8em;
    height: 1.8em;
    margin-bottom: .3em;
    line-height: 1.8em;
    background: #00b4ff;
    border-radius: 25px 25px;
    color: #fff;
  }
  .list-title-detail {
    display: block;
    padding-left: .6em;
    font-size: 1.2em;
    font-weight: 500;
    text-align: left;
  }
  .post-body-detail {
    margin-top: .8em;
    text-align: left;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
  }
  .comment-title {
    float: left;
    padding-left: 2em;
    font-weight: 600;
    background-size: 1.6em 1.5em;
    background-repeat: no-repeat;
    vertical-align: middle; 
    background-image: url('../assets/img/comment_pressed.png')
  }
  .comment-list {
    margin-top: 3em;
  }
</style>