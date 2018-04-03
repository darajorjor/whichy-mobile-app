/**
 * prepend slash and api base url to given url/path
 */
import axios from 'axios'
import {
  AsyncStorage,
} from 'react-native'
import storageConstants from 'src/constants/storage.constant'
import config from '../config'
import getStorageItem from './getStorageItem'

const methods = ['get', 'post', 'put', 'del']

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? `/${path}` : path
  const apiUrl = config.api

  return (apiUrl + adjustedPath)
}

/**
 * create fetch instance based on method
 */
function fetchCreator(method) {
  return async (url, { data, getCancelSource, ...options } = {}) => {
    const fetchOptions = options

    fetchOptions.headers = fetchOptions.headers || {}
    fetchOptions.headers.Accept = 'application/json'
    fetchOptions.headers['session'] = await AsyncStorage.getItem(storageConstants.SESSION)
    fetchOptions.headers['token'] = await AsyncStorage.getItem(storageConstants.DEVICE_TOKEN)

    if (getCancelSource) {
      const { CancelToken } = axios
      const source = CancelToken.source()
      getCancelSource(source)

      fetchOptions.cancelToken = source.token
    }

    if (data) {
      fetchOptions.data = JSON.stringify(data)
      fetchOptions.headers['Content-Type'] = 'application/json'
    }

    fetchOptions.method = method
    fetchOptions.url = formatUrl(url)

    console.log('REQUEST =======>>>>>>')
    console.log(formatUrl(url), fetchOptions)
    return axios(fetchOptions)
      .then((response) => {
        console.log(`${formatUrl(url)} RESPONSE =========>>>`, response.data)
        return response.data
      })
      .catch(e => {
        console.log(`${formatUrl(url)} RESPONSE ERROR =========>>>`, e)
        if (e.response && e.response.status === 401) {
          AsyncStorage.removeItem(storageConstants.SESSION)
        }

        if (e.response && e.response.data && e.response.data.message) {
          toast({
            title: e.response.data.message,
            status: 'error',
          })
        } else {
          toast({
            title: e.response ? e.response.statusText : 'Something went wrong',
            status: 'error',
          })
        }

        throw e
      })
  }
}

export default class ApiCaller {
  constructor() {
    methods.forEach((method) => {
      this[method] = fetchCreator(method)
    })
  }

  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * 'ApiClient is not defined' from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */
  // eslint-disable-next-line class-methods-use-this
  empty() {
    //
  }
}
