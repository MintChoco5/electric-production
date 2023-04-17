// 先把所有的工具函数导出的函数在这里导入
// 然后再统一导出
import { http } from './http'
import { algorithm } from './algorithm'
import { setToken,getToken,removeToken } from './token'
import { setUser,getUser,removeUser } from './userinfo'

export{
    http,
    algorithm,
    setToken,getToken,removeToken,
    setUser,getUser,removeUser
}
//import {http} from '@/utils'