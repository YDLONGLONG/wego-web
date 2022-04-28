import ajax from './ajax'

// 发表动态
export const sendTrend= data => ajax('/trend/sendTrend', data, 'post')
// 删除
export const deleteTrend = data => ajax('/trend/deleteTrend', data, 'post')
// 获取全部动态
export const getTrendPage = (nowpage)=> ajax('/trend/getAllTrend', {nowpage})
// 获取单个动态详情
export const getTrendInfo = trendid => ajax('/trend/getTrendInfo', {trendid})
//赞
export const zan = data => ajax('/trend/zan', data, 'post')
// 发表评论
export const sendComment = data => ajax('/trend/sendComment', data, 'post')
// 获取评论
export const getComment = trendid => ajax('/trend/getComment', { trendid })
// 获取回复
export const getReply = commentid => ajax('/trend/getReply', { commentid })
// 回复评论
export const replyComment = data => ajax('/trend/replycomment', data, 'post')
// 删除评论
export const deleteComment = commentid => ajax('/trend/deleteComment', {commentid}, 'post')
//查询动态
export const searchTrend = keyWord => ajax('/video/searchtrend', {keyWord})
