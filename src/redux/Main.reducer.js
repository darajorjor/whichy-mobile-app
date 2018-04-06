// @flow
import ApiCaller from 'src/utils/ApiCaller'
import Tapsell from 'react-native-tapsell'
import _ from 'lodash'
import config from 'src/config'

const api = new ApiCaller()

const LOAD = 'jaraqe/app/LOAD'
const SET_PROFILE = 'jaraqe/app/SET_PROFILE'
const SET_SESSION = 'jaraqe/app/SET_SESSION'
const SET_PROFILE_FIELD = 'jaraqe/app/SET_PROFILE_FIELD'
const VIDEO_AD_RECEIVED = 'jaraqe/app/VIDEO_AD_RECEIVED'
const VIDEO_AD_EXPIRE = 'jaraqe/app/VIDEO_AD_EXPIRE'
const SET_TO_STORE = 'jaraqe/app/SET_TO_STORE'

const initialState = {
  loading: false,
  profile: null,
  session: null,
  videoAdId: null,
  balance: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: action.data === 100 ? false : action.data,
      }
    case SET_PROFILE:
      return {
        ...state,
        profile: action.data,
      }
    case SET_PROFILE_FIELD:
      _.set(state.profile, action.data.field, action.data.data)

      return {
        ...state,
        profile: { ...state.profile },
      }
    case SET_SESSION:
      return {
        ...state,
        session: action.data,
      }
    case VIDEO_AD_RECEIVED:
      return {
        ...state,
        videoAdId: action.data,
      }
    case VIDEO_AD_EXPIRE:
      return {
        ...state,
        videoAdId: null,
      }
    case SET_TO_STORE:
      return {
        ...state,
        [action.data.key]: action.data.data,
      }
    default:
      return state
  }
}

export function load(data) {
  return {
    type: LOAD,
    data,
  }
}

export function setToStore(key, data) {
  return {
    type: SET_TO_STORE,
    data: {
      key,
      data,
    },
  }
}

let listenerSet = false

export function initVideoAd() {
  return (dispatch, getState, api) => {
    function requestAd() {
      return Tapsell.requestAd(config.adZones.video, true,
        (zoneId, adId) => {
          dispatch({
            type: VIDEO_AD_RECEIVED,
            data: adId,
          })
        },
        zoneId => {
          // onNoAdAvailable
          console.info('no ad avaiable')
        },
        zoneId => {
          // onNoNetwork
          console.info('no network')
        },
        (zoneId, error) => {
          // onError
          console.info('error: ' + error)
        },
        (zoneId, adId) => {
          // onExpiring
          dispatch({
            type: VIDEO_AD_EXPIRE,
          })
        })
    }

    if (!listenerSet) {
      Tapsell.setRewardListener((zoneId, adId, completed, rewarded) => {
        if (rewarded && completed) {
          api.post('games/watch-ad', { data: { adId } })
            .then(({ data: { balance } }) => {
              dispatch(setToStore('balance', balance))
            })
        }

        return requestAd()
      })

      listenerSet = true
    }

    return requestAd()
  }
}
