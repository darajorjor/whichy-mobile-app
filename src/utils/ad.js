import Tapsell, { ROTATION_LOCKED_PORTRAIT } from 'react-native-tapsell'

export function showAd(ad_id) {
  return Tapsell.showAd({
    ad_id,
    back_disabled: false,
    immersive_mode: true,
    rotation_mode: ROTATION_LOCKED_PORTRAIT,
    show_exit_dialog: true,
  })
}
