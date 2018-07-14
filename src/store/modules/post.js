import * as types from '../mutation-types'
import * as jsonServices from '../../services/jsonholder'

// initial state
const state = {
  postsList: [],
  postDetail: {},
  formData: {
    title: '',
    body: '',
    id: 1,
    userId: 1
  },
}

// getters
const getters = {
  allPosts: state => state.postsList,
  postDetail: state => state.postDetail
}

// actions
const actions = {
  /* 获取主页面展示内容 */
  getPosts({ commit, dispatch }) {
    jsonServices.getPostsList().then(res => {
      const postsList = res.data.data
      const showSpinner = false
      dispatch('doSpinner', showSpinner, { root: true })
      commit(types.SAVE_POSTS_LIST, { postsList })
    })
  },
  /* 获取分页内容 */
  getPostDetail({ commit, dispatch }, postId) {
    jsonServices.getPostDetail(postId).then(res => {
      const showSpinner = false
      let postDetail = res.data.data
      let comments = []

      /* 获取分页评论 */
      jsonServices.getPostComment(postId).then(res => {
        comments = res.data.data
        postDetail.comments = comments
        dispatch('doSpinner', showSpinner, {root: true})
        commit(types.SAVE_POSTDETAIL, { postDetail })
      })
    })
  },
  resetDetail({ commit }) {
    commit(types.RESET_POSTDETAIL)
  }
}

// mutations
const mutations = {
  /* 获取主页面展示内容 */
  [types.SAVE_POSTS_LIST](state, { postsList }) {
    state.postsList = postsList
  },
  /* 获取分页评论 */
  [types.SAVE_POSTDETAIL](state, { postDetail }) { 
    state.postDetail = { ...state.postDetail, ...postDetail }
    state.formData = {
      title: postDetail.title,
      body: postDetail.body,
      id: postDetail.id,
      userId: postDetail.userId
    }
  },
  /* 退出页面时重置数据 */
  [types.RESET_POSTDETAIL]() {
    state.postDetail = {}
  },
  /* 修改分页内容的标题 */
  UPDATE_TITLE(state, title) {
    state.formData.title = title
  },
  /* 修改分页内容的内容 */
  UPDATE_BODY(state, body) {
    state.formData.body = body
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
