import Tapsell, { ROTATION_LOCKED_PORTRAIT } from 'react-native-tapsell'
import config from 'src/config'

export function showAd(ad_id) {
  Tapsell.showAd({
    ad_id,
    back_disabled: false,
    immersive_mode: true,
    rotation_mode: ROTATION_LOCKED_PORTRAIT,
    show_exit_dialog: true,
  })
}
