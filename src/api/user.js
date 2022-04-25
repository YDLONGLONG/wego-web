//用户相关
import ajax from './ajax'
//发送邮件
export const sendEmail = email => ajax('/user/emailCode', { email }, 'post')
//  注册
export const reg = data => ajax('/user/register', data, 'post')
//  登录
export const login = data => ajax('/user/login', data, 'post')
//  验证码登录
export const codelogin = data => ajax('/user/codeLogin', data, 'post')
//  判断是否登录
export const isLogin = () => ajax('/user/isLogin')
//  退出登录
export const logout = () => ajax('/user/logout')
//  获取用户头像
export const getUserAvatar = userid => ajax('/user/getUserAvatar', { userid })
//获取用户基本信息
export const getUserById = _id => ajax('/user/id', { _id })
// 修改用户信息
// 获取用户邮箱
export const getEmail = _id => ajax('/user/email', { _id })
//修改密码
export const updatePass = data => ajax('/user/forgetPassword', data, 'post')
