import React, { PureComponent } from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native'
import { orange, black, white, lightGreen } from 'src/theme'
import Card from 'src/common/Card'
import Jext from 'src/common/Jext'
import dismissable from 'src/common/dismissable'
import Button from 'src/common/Button'
import CoinIcon from 'src/common/icons/coin-1.png'
import AppHeader from 'src/common/AppHeader'
import api from 'src/utils/ApiHOC'
import { setToStore } from 'src/redux/Main.reducer'
import { connect } from 'react-redux'
import config from 'src/config'
import HelpIcon from './assets/help_filled.png'

const { height } = Dimensions.get('window')

@connect(
  state => ({
    balance: state.Main.balance,
  }),
  { setToStore },
)
@api({
  url: 'games/whatif',
  method: 'POST',
  name: 'send'
})
@dismissable
export default class NewWhich extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <AppHeader
        navigation={navigation}
        totalCoins={1200}
      />
    )
  })

  state = {
    butFocused: false,
  }

  renderTextField(props) {
    return (
      <TextInput
        placeholder={__t('new_which.placeholder')}
        multiline
        numberOfLines={3}
        maxLength={100}
        {...props}
        style={[styles.textInput, props.style]}
      />
    )
  }

  renderBut() {
    const card = (
      <Card
        backgroundColor={black}
        title={__t('but')}
        textColor={white}
        body={this.renderTextField({
          ref: 'butField',
          placeholderTextColor: white,
          style: {
            color: white,
          },
          onFocus: () => this.setState({ butFocused: true }),
          onBlur: () => this.setState({ butFocused: false }),
        })}
        style={styles.card}
      />
    )

    if (this.state.butFocused) {
      return (
        <KeyboardAvoidingView
          behavior='position'
          keyboardVerticalOffset={60}
          style={{ position: 'absolute', top: 64, left: 16, right: 16, elevation: 99999, zIndex: 9999999 }}
        >
          {card}
        </KeyboardAvoidingView>
      )
    }

    return card
  }

  onSubmit = () => {
    const { navigation, data: { send }, setToStore } = this.props
    const { butField, whatifField } = this.refs

    if (!butField._lastNativeText || !whatifField._lastNativeText) {
      return null
    }

    // send
    send({
      body: {
        whatif: butField._lastNativeText,
        but: whatifField._lastNativeText,
      },
    })
      .then(({ balance }) => {
        setToStore('balance', balance)
        butField.clear()
        whatifField.clear()
        navigation.pop()
        toast(__t('new_which.submit_success'))
      })
  }

  render() {
    const { balance } = this.props

    return (
      <View style={styles.wrapper}>
        <TouchableOpacity
          onPress={() => toast(__t('coming_soon'))}
          style={styles.hint}
        >
          <Image
            source={HelpIcon}
            style={{
              width: 24,
              height: 24,
              position: 'absolute',
              left: 8,
              top: 8
            }}
          />
          <Jext f={20} style={{ fontWeight: 'bold', top: -5 }}>{__t('new_which.write_which_hint')}</Jext>
        </TouchableOpacity>
        <Card
          backgroundColor={white}
          title={__t('imagine')}
          textColor={black}
          body={this.renderTextField({
            ref: 'whatifField',
            placeholderTextColor: black,
            style: {
              color: black,
            },
          })}
          style={[styles.card, { zIndex: -1, elevation: 0 }]}
        />
        {this.renderBut()}

        <Button
          title={<View style={{ flexDirection: 'row', alignItems: 'center', bottom: 5 }}>
            <Image
              source={CoinIcon}
              style={{
                top: 5,
                marginRight: 5,
                width: 30,
                height: 30,
              }}
            />
            <Jext c={white} style={{ top: 5, marginRight: 5 }}>{config.values.newWhichPrice} {__t('coin')}</Jext>
            <Jext f={24} c={white}>{__t('new_which.submit')}</Jext>
          </View>}
          disabled={balance < config.values.newWhichPrice}
          onPress={this.onSubmit}
          gradientColors={[lightGreen, lightGreen]}
          style={styles.button}
        />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 16,
    paddingTop: 0,
    backgroundColor: orange,
  },
  textInput: {
    alignSelf: 'stretch',
    top: 16,
    height: 80,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'IRANYekanFaNum'
  },
  hint: {
    bottom: -10,
    alignSelf: 'stretch',
    marginHorizontal: 16,
    height: 65,
    backgroundColor: '#f5f5f5',
    borderTopLeftRadius: 18.5,
    borderTopRightRadius: 18.5,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  card: {
    height: height * 0.23,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowColor: 'rgb(66,66,66)',
    shadowOffset: {
      height: 5,
      width: 0
    },
    elevation: 2,
  },
  button: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    height: height * 0.09,
  },
})
