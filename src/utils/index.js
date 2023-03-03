// 先把所有的工具函数导出的函数在这里导入
// 然后再统一导出
import { http } from './http'
import { algorithm } from './algorithm'
import { setToken,getToken,removeToken } from './token'

export{
    http,
    algorithm,
    setToken,getToken,removeToken,
}
//import {http} from '@/utils'