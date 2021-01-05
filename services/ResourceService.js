import ApiService from '~/services/ApiService'

export default function ResourceService (resource = '') {

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
  }

}