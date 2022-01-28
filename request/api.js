import request from './request'

export const NavApi = () => request.get('/resource/nav')

export const BannerApi = () => request.get('/resource/banner')

export const LoginApi = (params) => request.post('/user/login',params)