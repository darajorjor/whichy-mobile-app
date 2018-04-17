import CafeBazaar from 'react-native-cafe-bazaar'

export default {
  async purchase(id) {
    await CafeBazaar.close()
    CafeBazaar.open()
      .then(async () => {
        await CafeBazaar.purchase(id, 'DEVELOPER_PAYLOAD', 0)
        return CafeBazaar.close()
      })
      .catch(err => console.log('CafeBazaar err:', err))
  },
}