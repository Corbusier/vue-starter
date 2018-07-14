import request from '../utils/request'

/* 获取主页面展示内容 */
export async function getPostsList() {
  return await request('/replace/posts')
}

/* 获取分页内容 */
export async function getPostDetail(id) {
  return await request(`/replace/posts/${id}`)
}

/* 获取分页评论 */
export async function getPostComment(id) {
  return await request(`/replace/posts/${id}/comments`)
}

/* 上传修改分页的标题 */
export async function updatePostDetail(values) {
  return await request(`/replace/posts/${values.id}`, {
    method: 'PUT',
    data: values,
  })
}

/* 获取相册内容 */
export async function getAlbums() {
  return await request('/replace/albums')
}

/* 获取相册分页内容 */
export async function getAlbumDetail(id) {
  return await request(`/replace/albums/${id}/photos`)
}

/* 获取用户中心内容 */
export async function getUsers() {
  return await request('/replace/users')
}

/* 查看用户更多信息 */
export async function getUserDetail(userId) {
  return await request(`/replace/users/${userId}`)
}

/* 获取用户中心用户任务 */
export async function getUserTodoList(userId) {
  return await request(`/replace/users/${userId}/todos`)
}

/* 获取用户中心用户动态 */
export async function getUserPostList(userId) {
  return await request(`/replace/users/${userId}/posts`)
}

/* 获取用户中心用户相册 */
export async function getUserAlbumsList(userId) {
  return await request(`/replace/users/${userId}/albums`)
}