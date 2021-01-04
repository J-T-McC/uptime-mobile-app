import ApiService from '~/services/ApiService.js'

//increment & decrement request counter on axios requests and response

//todo move to axios hook
// add default error handling
// add redirect login if response returns as unauthenticated
// const currentRequests = ref(0)
// ApiService.interceptors.request.use((request) =>  {
//   currentRequests.value++
//   return request
// })
//
// axios.interceptors.response.use((request) => {
//   currentRequests.value--
//   return request
// }, (error) => {
//   currentRequests.value--
//   return Promise.reject(error);
// })

export default function useResource (resource = '') {

  const buildRoute = (...args) => {
    return resource + '/' + args.join('/')
  }

  const index = async (params = {}) => {
    return ApiService.get(buildRoute(), {
      params
    })
  }

  const show = async (id, params = {}) => {
    return ApiService.get(buildRoute(id), {
      params
    })
  }

  const store = async (data = {}) => {
    return ApiService.post(buildRoute(), data)
  }

  const update = async (id, data = {}) => {
    return ApiService.put(buildRoute(id), data)
  }

  const destroy = async (id) => {
    return ApiService.delete(buildRoute(id))
  }

  return {
    index,
    show,
    store,
    update,
    destroy,
    // currentRequests
  }

}