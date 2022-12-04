/*
 * @Author: kkt 
 * @Date: 2022-08-04 10:28:56
 * @LastEditors: kkt 670335957@qq.com
 * @LastEditTime: 2022-08-05 15:24:03
 * @FilePath: \cenkuntao\代码\ResponsiveLayout\study\study\utils\request.js
 * @Description: 已封装的请求参数
 */
import axios from 'axios';

/**
 * @description: 使用axios发送的get请求
 * @param {String} url 请求路径 必选
 * @param {Object} data 在路径中携带的参数 可选
 * @param {Object} headers 请求头 可选
 * @return {Promise} 
 */
export const axiosGet = (url,data) => {
  return new Promise((resolve,reject)=>{
    axios({
      method:'GET',
      url:url,
      params:data,
    })
    .then(
      response=>{   
        resolve(response)
      },
      error=>{
        reject(error)
      }
    )
  })
};

/**
 * @description: 使用axios发送的post请求 请求体为JSON
 * @param {String} url 请求路径 必选
 * @param {Object} data 请求体 必选
 * @param {Object} headers 请求头 可选
 * @return {Promise} 
 */
export const axiosJSONPost = (url,data) => {
  return new Promise((resolve,reject)=>{
    axios({
      method:'POST',
      url,
      data:JSON.stringify(data),
    })
    .then(
      response=>resolve(response),
      error=>reject(error)
    )
  })
};

/**
 * @description: 使用axios发送的post请求 请求体为formData表单
 * @param {String} url 请求路径 必选
 * @param {formData} formData 请求体 必选 
 * @param {Object} headers 请求头 可选
 * @return {Promise} 
 */
 export const axiosFormDataPost = (url,formData) => {
  return new Promise((resolve,reject)=>{
    axios({
      method:'POST',
      url:url,
      data:formData,
    })
    .then(
      response=>resolve(response),
      error=>reject(error)
    )
  })
};

/**
 * @description: 使用axios发送的put请求 请求体为JSON
 * @param {String} url 请求路径 必选
 * @param {Object} data 请求体 必选
 * @param {Object} headers 请求头 可选
 * @return {Promise} 
 */
 export const axiosPut = (url,data) => {
  return new Promise((resolve,reject)=>{
    axios({
      method:'PUT',
      url:url,
      data:JSON.stringify(data),
    })
    .then(
      response=>resolve(response),
      error=>reject(error)
    )
  })
};

/**
 * @description: 使用axios发送的DELETE请求
 * @param {String} url 请求路径 必选
 * @param {Object} data 在路径中携带的参数 可选
 * @param {Object} headers 请求头 可选
 * @return {Promise} 
 */
 export const axiosPathDelete = (url,data) => {
  return new Promise((resolve,reject)=>{
    axios({
      method:'DELETE',
      url:url,
      params:data,
    })
    .then(
      response=>resolve(response),
      error=>reject(error)
    )
  })
};

/**
 * @description: 使用axios发送的delete请求 请求体为JSON
 * @param {String} url 请求路径 必选
 * @param {Object} data 请求体 必选
 * @param {Object} headers 请求头 可选
 * @return {Promise} 
 */
 export const axiosBodyDelete = (url,data,code) => {
  return new Promise((resolve,reject)=>{
    axios({
      method:'DELETE',
      url:url,
      data:JSON.stringify(data),
    })
    .then(
      response=>{
        if(code===response.data.code&&response.data.data){
          resolve(response.data.data)//使用返回的data
        }
      },
      error=>reject(error)
    )
  })
};