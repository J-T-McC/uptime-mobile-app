/**
 * Toast a message based on the different variations of laravel responses
 * @param result
 * @returns {string | number}
 */
export default function toastMessage (result) {

  //error
  if (result?.response?.data?.errors) {
    //toast any validation errors received
    const errors = result.response.data.errors
    const invalidFields = Object.keys(errors)
    const toastBody = invalidFields.reduce((prev, curr) => {
      return `${prev}` + (prev ? '\r\n' : '') + errors[curr].join(' - ')
    }, '')
    return toast.show(toastBody, { type: 'error' })
  }

  if (result?.response?.statusText) {
    return toast.show(result.response.statusText, { type: 'error' })
  }

  //info
  if (result?.response?.data?.message) {
    return toast.show(result.response.data.message, { type: 'info' })
  }

  if (result?.data?.message) {
    return toast.show(result.data.message, { type: 'info' })
  }
  //
  // if (result?.message) {
  //   toast.show(result.message, { type: 'info' })
  // }
}

