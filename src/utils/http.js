import axios from "axios";
var qs = require('qs');
// import { pasToSm4,deCodeSm4 } from './permissions'
// axios.defaults.withCredentials = true
const encryptUrlList = [
  "/plan/electricplan/pageTodo",
  "/plan/electricplan/delayPage",
  "/resource/electricroute/page",
  "/resource/electricline/page",
  "/resource/electrictower/getTowerByLineId",   
  "/plan/electricplan/listAll",
  "/result/electricResult/save",
  "/sys/login"
]

window.SERVICE_CONTEXT_PATH = 'http://139.159.198.238:8356'
//token拦截
//测试dev_zkyt分支
window.axiosCancel = []  // 全局定义一个存放取消请求的标识
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.interceptors.request.use(function (config) { // 每次请求时会从localStorage中获取token
//   let token = sessionStorage.getItem("token")
//   let menuList = sessionStorage.getItem('menuList') && JSON.parse(sessionStorage.getItem('menuList')) != null ?JSON.parse(sessionStorage.getItem('menuList'))
//   : {}
//   if(!menuList.list){
//     menuList = {}
//   }
//   if(!menuList.name && window.location.href.indexOf('/login') == -1 && window.location.href.indexOf('/changePassword') == -1) {
//     location.href = '/'
//   }

//   //删除pending中的请求 // 重复配置cancelToken会使其中一个不生效
//   config.cancelToken = new axios.CancelToken(cancel=>{
//     window.axiosCancel.push({
//       cancel
//     })
//   })

//   if (token){
//     token =  token.replace(/'|"/g, '') // 把token加入到默认请求参数中
//     if(config.baseURL == 'https://open.ys7.com/api/lapp/' || config.baseURL == 'https://iot.cn-shanghai.aliyuncs.com'){
//       delete config.headers['token']
//     }else{
//       config.headers['token'] = token
//     }
//   }
//   return config
// }, function (error) {
//   if (axios.isCancel(error)) {
//     console.log('repeated request: ' + error.message)
//     return
//   }
//   return Promise.reject(error)
// })

//响应拦截器
axios.interceptors.response.use(
  response => {
    // console.log('response: ', response);
    // if(encryptUrlList.includes(response.config.url) && response.data.code == 0){
    //   response.data.result = JSON.parse(deCodeSm4(response.data.result))
    //   console.log(response.config.url,'------- ', response);
    // }
    //当返回信息为未登录或者登录失效的时候重定向为登录页面
    if(response.data.code == 500){
      // message.error(response.data.msg,3)
      console.log(response.data.msg)
    }
    if (response.data.code == 401  || response.data.message == 'token失效，请重新登录' ) {
        location.href = '/'
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("navList");
        sessionStorage.removeItem("userName");
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("headerTitle");
        sessionStorage.removeItem('townId')
        sessionStorage.removeItem('isCity')
        sessionStorage.removeItem('fullState')
        sessionStorage.removeItem("menuList")
        sessionStorage.removeItem("permissions")
        sessionStorage.removeItem("IsCityAndNoTown");
        sessionStorage.removeItem("wsPath");
    }
    return response;
  },
  error => {
    if (axios.isCancel(error)) {
      console.log('repeated request: ' + error.message)
      return
    }
    return Promise.reject(error)
  }
)
//权限判断
export function isAuth (key) {
  return (JSON.parse(sessionStorage.getItem('permissions') || '[]').indexOf(key) !== -1 && !this.$store.state.isCityAndNoTown) || false
}

axios.defaults.baseURL = window.SERVICE_CONTEXT_PATH;
/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
  axios.defaults.baseURL = window.SERVICE_CONTEXT_PATH;
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(response => {
        //  防止取消请求之后的报错
        if(!response){
          return
        }
        if (response.data) {
          resolve(response.data);
        } else {
          console.log("get 请求数据返回 - ", response);
          reject(new Error("数据解析失败"));
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}
export function del(url, params = {}) {
  axios.defaults.baseURL = window.SERVICE_CONTEXT_PATH;
  return new Promise((resolve, reject) => {
    axios
      .delete(url, {
        params: params
      })
      .then(response => {        
        //  防止取消请求之后的报错
        if(!response){
          return
        }
        if (response.data) {
          resolve(response.data);
        } else {
          console.log("del 请求数据返回 - ", response);
          reject(new Error("数据解析失败"));
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  axios.defaults.baseURL = window.SERVICE_CONTEXT_PATH;new Promise((resolve, reject) => {
    axios.post(url, data).then(
      response => {
        //  防止取消请求之后的报错
        if(!response){
          return
        }
        if (response.data) {
          resolve(response.data);
        } else {
          console.log("post 请求数据返回 - ", response);
          reject(new Error("数据解析失败"));
        }
      },
      err => {
        reject(err);
      }
    );
  });
}

// 指挥车接口
export function carControlGet(params = {}) {
  axios.defaults.baseURL = 'https://c34c203918.eicp.vip/api/equip/operate'
  // axios.defaults.baseURL = 'http://192.168.1.210:8080/api/equip/operate'
  return new Promise((resolve, reject) => {
    axios
      .get(axios.defaults.baseURL, params)
      .then(response => {
        //  防止取消请求之后的报错
        if(!response){
          return
        }
        if (response.data) {
          resolve(response.data);
        } else {
          console.log("get 请求数据返回 - ", response);
          reject(new Error("数据解析失败"));
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}

// 清障仪相机接口
export function clearCameraPost(url, data = {}, header) {
  axios.defaults.baseURL = 'https://open.ys7.com/api/lapp/';
  return new Promise((resolve, reject) => {
    let str = url + '?'
    for(let key in data){
      str += key + "=" + data[key] + '&'
    }
    axios.post(str, data, header).then(
      response => {
        //  防止取消请求之后的报错
        if(!response){
          return
        }
        if (response.data) {
          resolve(response.data);
        } else {
          console.log("post 请求数据返回 - ", response);
          reject(new Error("数据解析失败"));
        }
      },
      err => {
        reject(err);
      }
    );
  });
}

// 清障仪相机接口
export function laserPost(url, Signature) {
  axios.defaults.baseURL = 'https://iot.cn-shanghai.aliyuncs.com';
  return new Promise((resolve, reject) => {
    let str = url 
    str += '&Signature=' + Signature
    axios.post(str).then(
      response => {
        //  防止取消请求之后的报错
        if(!response){
          return
        }
        if (response.data) {
          resolve(response.data);
        } else {
          console.log("post 请求数据返回 - ", response);
          reject(new Error("数据解析失败"));
        }
      },
      err => {
        reject(err);
      }
    );
  });
}
let timeout = null
export function debounce(fn, wait) {
 if(timeout !== null) clearTimeout(timeout)
 timeout = setTimeout(fn, wait)
}

export default {get, post}

