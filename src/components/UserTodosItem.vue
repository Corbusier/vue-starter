<template>
	<li class="user-todo-list">
		<div class="user-todo-item">
			<div class="todo-title">
				<mu-checkbox v-model="checked" class="demo-checkbox"/>
				<span class="todo-title-content">
					{{ item.title }}
				</span>
			</div>
			<div class="todo-finish">
				<img :src="imgUrl">
			</div>
		</div>
	</li>
</template>

<script>
	export default {
	  name: 'UserTodosItem',
	  props: ['item'],
	  data () {
	    return {
	    	imgUrl: '',
	    	checked: false
	    }
	  },
	  created() {
	  	this.checked = this.item.completed
	  	this.imgUrl = this.item.completed ? '../static/user/true.png' : '../static/user/false.png'
	  },
	  watch: {
	    checked: function(val) {
	      this.imgUrl = val ? '../static/user/true.png' : '../static/user/false.png';
	    }
	  }
	}
</script>

<style>
  .user-todo-list {
    margin-bottom: 1em;
  }
  .user-todo-item {
    display: flex;
    justify-content: space-between;
  }
  .todo-title {
    margin-right: 1.5em;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    text-align: left;
    width: 90%;
  }
  .todo-title-content {
    vertical-align: top;
    line-height: 1.5em;
    height: 1.5em;
  }
  .todo-finish {
    
  }
  .todo-finish img {
    width: 1.5em;
    height: 1.5em;
  }
</style>
