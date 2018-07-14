import * as types from '../mutation-types'
import * as jsonServices from '../../services/jsonholder'

// initial state
const state = {
	albumsList: [],
	albumDetail: []
}

// getters
const getters = {
	allAlbums: state => state.albumsList,
	albumDetail: state => state.albumDetail
}

// actions
const actions = {
	/* 获取相册内容 */
	getAlbums({ commit,dispatch }) {
		jsonServices.getAlbums().then(res => {
			const albumsList = res.data.data
			const showSpinner = false
			dispatch('doSpinner', showSpinner, {root: true})
			commit(types.SAVE_ALBULMS_LIST, { albumsList })
		})
	},
	/* 获取相册分页内容 */
	getAlbumDetail({ commit,dispatch }, albumId) {
		jsonServices.getAlbumDetail(albumId).then(res => {
			const albumDetail = res.data.data
			const showSpinner = false
			dispatch('doSpinner', showSpinner, { root: true })
			commit(types.SAVE_ALBUMDETAIL, { albumDetail })
		})
	},
	resetAlbumDetail({ commit }) {
		commit(types.RESET_ALBUMDETAIL)
	}
}

const mutations = {
	[types.SAVE_ALBULMS_LIST](state, { albumsList }) {
		state.albumsList = albumsList 
	},
	[types.SAVE_ALBUMDETAIL](state, { albumDetail }) {
		state.albumDetail = albumDetail 
	},
	[types.RESET_ALBUMDETAIL](state) {
		state.albumDetail = []
	} 
}

export default {
	state,
	actions,
	getters,
	mutations,
	namespaced: true
}
