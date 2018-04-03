import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Share,
  StyleSheet,
  AsyncStorage,
  Dimensions,
} from 'react-native'
import { orange } from 'src/theme'
import AppHeader from 'src/common/AppHeader'
import Card from 'src/common/Card'
// import BG from 'src/common/BG'
import Button from 'src/common/Button'
import { white, black, gradients } from 'src/theme'
import api from 'src/utils/ApiHOC'
import * as Animatable from 'react-native-animatable'
import storageConstants from 'src/constants/storage.constant'
import Jext from 'src/common/Jext'
import _ from 'lodash'
import { store } from 'src/redux/store'
import homeService from './Home.service'
import WatchVideoButton from './components/WatchVideoButton'
import CommentsButton from './components/CommentsButton'
import { setToStore } from 'src/redux/Main.reducer'

const { width } = Dimensions.get('window')

@api({
  url: 'users',
  method: 'POST',
  name: 'registerGuest'
})
@api({
  url: 'games/whatif/:questionId',
  method: 'POST',
  name: 'answer'
})
@api({
  url: 'games/whatif/:questionId/rate',
  method: 'POST',
  name: 'rate'
})
@api({
  url: 'games/whatif',
  method: 'GET',
  name: 'questions',
  options: {
    instantCall: false,
  },
})
@api({
  url: 'users/startup',
  method: 'GET',
  name: 'startup',
  options: {
    instantCall: false,
  },
})
export default class Home extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: _.get(navigation, 'state.params.headerHidden') ? null : (
      <AppHeader
        navigation={navigation}
        type="level"
        rate={_.get(navigation, 'state.params.activate')}
        onLike={_.get(navigation, 'state.params.onLike')}
        onDislike={_.get(navigation, 'state.params.onDislike')}
        level={{
          current: _.get(navigation, 'state.params.level'),
          currentQuestion: _.get(navigation, 'state.params.currentQuestion'),
          totalQuestions: _.get(navigation, 'state.params.totalQuestions')
        }}
      >
        {
          _.get(navigation, 'state.params.activate')
            ? <CommentsButton />
            : <WatchVideoButton />
        }
      </AppHeader>
    )
  })

  static contextTypes = {
    store: PropTypes.object,
  }

  state = {
    /**
     * when the user taps on each of the buttons
     * and sees how other people have answered to
     * the same question
     * */
    showingResult: false,
  }

  async componentDidMount() {
    const {
      data: {
        registerGuest,
        questions,
        questionsRefetch,
        startupRefetch,
      },
      navigation: {
        setParams
      },
    } = this.props

    const session = await AsyncStorage.getItem(storageConstants.SESSION)
    setParams({
      onLike: () => this.handleRate(true),
      onDislike: () => this.handleRate(false),
    })

    function getGame() {
      return questionsRefetch()
        .then(i => {
          setParams({
            level: i.level,
            currentQuestion: (i.levelQuestions - i.questions.length) + 1,
            totalQuestions: i.levelQuestions,
          })
        })
    }
    function getStartup() {
      return startupRefetch()
        .then(({ balance }) => store.dispatch(setToStore('balance', balance)))
    }

    if (await homeService.handleDeviceRegistration(registerGuest, setParams)) {
      await getGame()
      await getStartup()
      setParams({
        headerHidden: false,
      })
    }

    if (questions) {
      setParams({
        level: questions.level,
        currentQuestion: (questions.levelQuestions - questions.questions.length) + 1,
        totalQuestions: questions.levelQuestions,
      })
    }

    if (session) {
      getStartup()
    }

    if (questions && (questions.questions.length === 0)) {
      if (session) {
        await getGame()
      }
    }
  }

  nextCard = () => {
    const {
      data: {
        mutateStore,
        questionsRefetch,
      },
      navigation: {
        setParams
      },
    } = this.props
    const { store } = this.context
    const { questions } = store.getState().ApiHOC.root

    this.refs.whatifCard ? this.refs.whatifCard.bounceOutRight() : null
    setTimeout(() => {
      this.refs.butCard ? this.refs.butCard.bounceOutRight() : null
    }, 300)

    setTimeout(() => {
      const finalQuestions = questions.questions.slice(1, questions.questions.length)
      setParams({
        // level: i.level,
        currentQuestion: (questions.levelQuestions - finalQuestions.length) + 1,
        // totalQuestions: i.questions.length,
      })
      if (finalQuestions.length === 0) {
        questionsRefetch()
          .then(i => {
            setParams({
              level: i.level,
            })
          })
      }
      mutateStore('questions', { ...questions, questions: finalQuestions })

      this.refs.whatifCard ? this.refs.whatifCard.bounceInLeft() : null
      setTimeout(() => {
        this.refs.butCard ? this.refs.butCard.bounceInLeft() : null
      }, 300)
    }, 500)

    setParams({
      activate: false,
    })
    this.setState({
      showingResult: false,
    })
  }

  handleRate(like) {
    const { data: { rate, questions } } = this.props
    const nextQuestion = questions ? questions.questions[0] : null

    if (!nextQuestion) return null

    rate({
      params: {
        questionId: nextQuestion.id,
      },
      body: {
        like,
      },
    })
  }

  handleRespond = (accept, questionId) => () => {
    if (!questionId) return this.nextCard()
    const {
      data: {
        answer
      },
      navigation: {
        setParams
      },
    } = this.props

    answer({
      params: {
        questionId,
      },
      body: {
        accept,
      },
    })
      .then(() => {
        setParams({
          activate: true,
        })
        this.setState({
          showingResult: accept ? 'accept' : 'deny',
        })
      })
      .catch(e => {
        this.nextCard()
      })
  }

  calculateButtonWidth = () => {
    const { showingResult } = this.state

    return {
      deny: showingResult ? ((width / 2) - 64) : ((width / 2) - 25),
      accept: showingResult ? ((width / 2) + 32) : ((width / 2) - 10),
    }
  }

  handleShare = () => {
    const { data: { questions } } = this.props
    const nextQuestion = questions ? questions.questions[0] : null

    if (!nextQuestion) return null

    return Share.share({
      message: `تصور کن اگه ${nextQuestion.whatif} اما ${nextQuestion.but}`,
      url: `http://whichy.club`,
      title: `تصور کن اگه ${nextQuestion.whatif}`,
    })
  }

  renderResultsInButton(showingResult, question) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Jext f={18} c={white}>{ showingResult === 'accept' ? __t('home.accept') : __t('home.deny') }</Jext>
        <Jext f={12} c={white}>{question.stats[showingResult === 'accept' ? 'yes' : 'no']}٪ مردم مثل تو فکر میکنن</Jext>
      </View>
    )
  }

  render() {
    const { data: { questions, registerGuestLoading, questionsLoading } } = this.props
    const { showingResult } = this.state

    const nextQuestion = questions ? questions.questions[0] : null

    if (!questions || registerGuestLoading) {
      return (
        <View style={styles.wrapper} />
      )
    }

    return (
      <View style={styles.wrapper}>
        <Animatable.View
          ref='whatifCard'
          delay={300}
          duration={500}
          animation='bounceInLeft'
        >
          <Card
            backgroundColor={white}
            title={__t('imagine')}
            textColor={black}
            body={nextQuestion ? nextQuestion.whatif : __t('offline_message.whatif')}
          />
        </Animatable.View>
        <Animatable.View
          ref='butCard'
          delay={500}
          duration={500}
          animation='bounceInLeft'
        >
          <Card
            backgroundColor={black}
            title={__t('but')}
            textColor={white}
            body={nextQuestion ? nextQuestion.but : __t('offline_message.but')}
          />
        </Animatable.View>

        <View style={styles.footer}>
          <Animatable.View
            transition="width"
            easing="ease-in-out-cubic"
            duration={300}
            style={{
              width: this.calculateButtonWidth().deny
            }}
          >
            <Button
              title={showingResult ? __t('home.share') : __t('home.deny')}
              titleStyle={{
                color: showingResult ? black : white,
                fontSize: showingResult ? 14 : 24,
                fontWeight: showingResult ? 'bold' : undefined,
              }}
              onPress={showingResult ? this.handleShare : this.handleRespond(false, nextQuestion ? nextQuestion.id : null)}
              gradientColors={gradients[showingResult ? 'yellow' : 'red']}
              style={{
                flex: 1,
              }}
            />
          </Animatable.View>
          <Animatable.View
            transition="width"
            easing="ease-in-out-cubic"
            duration={300}
            style={{
              width: this.calculateButtonWidth().accept
            }}
          >
            <Button
              title={showingResult ? this.renderResultsInButton(showingResult, nextQuestion) : __t('home.accept')}
              onPress={showingResult ? this.nextCard : this.handleRespond(true, nextQuestion ? nextQuestion.id : null)}
              gradientColors={gradients.green}
              style={{
                flex: 1,
                marginLeft: 16,
              }}
            />
          </Animatable.View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: orange,
    padding: 16,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
  },
})
