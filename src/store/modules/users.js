import * as types from '../mutation-types'
import * as jsonServices from '../../services/jsonholder'

// initial state
const state = {
	userList: [],
	userDetail: {},
	userTodos: [],
	userPosts: [],
	userAblums: []
}	

// getters
const getters = {
	allUsers: state => state.userList,
	userDetail: state => state.userDetail,
	userTodos: state => state.userTodos,
	userPosts: state => state.userPosts,
	userAblums: state => state.userAblums
}

// actions
const actions = {
	/* 获取用户中心内容 */
	getUsers({ commit, dispatch }) {
		jsonServices.getUsers().then(res => {
			const userList = res.data.data
			const showSpinner = false
			dispatch('doSpinner', showSpinner, { root: true })
			commit(types.SAVE_USERS_LIST, { userList })
		})
	},
	/* 获取用户更多信息 */
	getUserDetail({ commit, dispatch }, userId) {
		jsonServices.getUserDetail(userId).then(res => {
			const userDetail = res.data.data
			const showSpinner = false
			dispatch('doSpinner', showSpinner, { root: true })
			commit(types.SAVE_USERS_DETAIL, {userDetail})
		})
	},
	/* 获取用户任务 */
	getUserTodoList({ commit, dispatch }, userId) {
		jsonServices.getUserTodoList(userId).then(res => {
			const userTodos = res.data.data
			commit(types.SAVE_USERS_TODOS, { userTodos })
		})
	},
	/* 获取用户动态 */
	getUserPostsList({ commit,dispatch }, userId) {
		jsonServices.getUserPostList(userId).then((res) => {
	      const userPosts = res.data.data
	      commit(types.SAVE_USERS_POSTS, { userPosts })
	    })
	},
	/* 获取用户相册 */
	getUserAlbumsList({ commit,dispatch }, userId) {
		jsonServices.getUserAlbumsList(userId).then((res) => {
	      const userAblums = res.data.data
	      commit(types.SAVE_USERS_ABLUMS, { userAblums })
	    })
	}
}

// mutations
const mutations = {
	/* 获取用户中心内容 */
	[types.SAVE_USERS_LIST](state, { userList }) {
		state.userList = userList
	},
	/* 获取用户更多信息 */
	[types.SAVE_USERS_DETAIL](state, { userDetail }) {
		state.userDetail = userDetail
	},
	/* 获取用户任务 */
	[types.SAVE_USERS_TODOS](state, { userTodos }) {
		state.userTodos = userTodos
	},
	/* 获取用户动态 */
	[types.SAVE_USERS_POSTS](state, { userPosts }) {
		state.userPosts = userPosts
	},
	/* 获取用户相册 */
	[types.SAVE_USERS_ABLUMS](state, { userAblums }) {
		state.userAblums = userAblums
	},
	/* 退出时重置 */
	[types.RESET_USER_DETAIL](state) {
		state.userList = []
		state.userDetail = {}
	}
}

export default {
	state,
	getters,
	actions,
	mutations,
	namespaced: true
}