import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TextInput,
  Modal,
  Alert,
  Pressable,
  Button,
  KeyboardAvoidingView
} from "react-native";
import React, { Component } from "react";
import { Icon } from "react-native-elements";
import { HeaderBackButton } from "react-navigation";
//redux
import { connect } from "react-redux";
import { styles } from "../style/style";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { postScore } from "../redux/ActionCreators";
const mapStateToProps = (state) => {
  return {
    words: state.words,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postScore: (user, scores) => dispatch(postScore(user, scores)),
});

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldRender: false,
    };
  }

  render() {
    return (
      <SafeAreaView key={this.state.key} style={styles.container}>
        {/* <PlayNavigator.Screen name="Main" component={MainComponent}></PlayNavigator.Screen> */}
        <Word
          words={this.props.words.words}
          isLoading={this.props.isLoading}
          error={this.props.error}
          shouldRender={this.state.shouldRender}
          handleRender={this.handleRender}
          goBack={this.goBack}
          postScore={this.props.postScore}
        ></Word>
      </SafeAreaView>
    );
  }

  handleRender = () => {
    this.setState({ shouldRender: true });
  };

  goBack = () => {
    this.props.navigation.goBack();
  };
}

class Word extends Component {
  handleRender = () => {
    this.props.handleRender();
  };
  goBack = () => {
    this.props.goBack();
  };
  render() {
    // // console.log(
    // //   "------------------" + this.props.words[0].word + this.props.words.length
    // // );
    // const wordObject = this.getRandomWord(this.props.words);
    // //console.log(wordObject);
    // const arrChar = this.splitWordToArray(wordObject.word);
    // //console.log(arrChar);
    // const shuffeArr = this.shuffleArrChar(arrChar);
    // //console.log(shuffeArr);
    if (this.props.isLoading) {
      return <Text>isLoading</Text>;
    } else if (this.props.errMess) {
      return <Text>{this.props.errMess}</Text>;
    } else {
      // console.log(
    //   "------------------" + this.props.words[0].word + this.props.words.length
    // );
    const wordObject = this.getRandomWord(this.props.words);
    //console.log(wordObject);
    const arrChar = this.splitWordToArray(wordObject.word);
    //console.log(arrChar);
    const shuffeArr = this.shuffleArrChar(arrChar);
    //console.log(shuffeArr);
    return (
      <View style={styles.centeredView}>
        <FlatList
          style={{ flex: 1, flexWrap: "wrap", height: "30%", padding: 10 }}
          data={shuffeArr}
          scrollEnabled={false}
          numColumns={6}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />

        <Answer
          word={wordObject}
          handleRender={this.handleRender}
          goBack={this.goBack}
          postScore={this.props.postScore}
        ></Answer>
      </View>
    );
    }
  }
  
  getRandomWord(list) {
    return (word = list[Math.floor(Math.random() * list.length)]);
  }
  splitWordToArray(word) {
    return (arrChar = word.split(""));
  }
  shuffleArrChar(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
  renderItem = ({ item }) => (
    <View style={styles.viewCharacter}>
      <Text style={styles.wordText}>{item}</Text>
    </View>
  );
}

class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      modalVisible: false,
      result: false,
      duration: 15,
      key: 0,
      scores: 0,
      postScoreModal: false,
      user: ""
    };
  }

  postScore = () => {
    this.props.postScore(this.state.user, this.state.scores);
  };
    
  

  goBack = () => {
    this.props.goBack();
  };
  handleRender = () => {
    this.props.handleRender();
  };
  render() {
    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ width: "100%", height: '30%', flex: 1 }}>
        <View
          style={{
            justifyContent: "center",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Text style={styles.wordText}>Your scores: {this.state.scores}</Text>
        </View>
        <View  style={styles.viewTextInput}>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <CountdownCircleTimer
              key={this.state.key}
              isPlaying
              duration={this.state.duration}
              colors={[
                "#f79cf4",
                "#e861c9",
                "#d93d8b",
                "#c70a13",
                "#9c1436",
                "#6e0107",
              ]}
              colorsTime={[10, 8, 6, 4, 2, 0]}
              size={40}
              trailStrokeWidth={4}
              strokeWidth={4}
              isSmoothColorTransition
              onComplete={() => {
                if (this.compareWord(this.state.text, this.props.word.word)) {
                  console.log("-------" + this.state.scores);
                  console.log("------------" + this.props.word.score);
                  this.setState(
                    {
                      result: true,
                      modalVisible: false,
                      scores: this.state.scores + this.props.word.score,

                      text: "",
                    },
                    this.handleDuration
                  );
                } else this.setState({ result: false, modalVisible: this.state.postScoreModal == true ? false : true });
              }}
            >
              {({ remainingTime }) => <Text>{remainingTime}</Text>}
            </CountdownCircleTimer>
          </View>

          <TextInput
            style={styles.textInput}
            placeholder="Let correct it !!!"
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
          />
          <View style={{ padding: 10 }}>
            <Icon
              size={30}
              color={"#c342ff"}
              name="send"
              onPress={() => {
                if (this.state.text.localeCompare("") != 0) {
                  if (this.compareWord(this.state.text, this.props.word.word)) {
                    console.log("-------" + this.state.scores);
                    console.log("------------" + this.props.word.score);
                    this.setState(
                      {
                        result: true,
                        modalVisible: false,
                        scores: this.state.scores + this.props.word.score,

                        text: "",
                      },
                      this.handleDuration
                    );
                  } else this.setState({ result: false, modalVisible: this.state.postScoreModal == true ? false : true });
                } else {
                }
              }}
            ></Icon>
          </View>
          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                this.setState({ modalVisible: false });
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>
                    {this.state.result != true ? "Wronggg !!!" : ""}
                  </Text>
                  <Text>Your Scores: {this.state.scores}</Text>
                  <Text>Correct Word: {this.props.word.word}</Text>
                  <Text>Do you want to save your score ?</Text>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() =>
                      this.setState({
                        postScoreModal: true,
                        modalVisible: false,
                      })
                    }
                  >
                    <Text style={styles.text}>Save</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      this.setState({ modalVisible: false, text: "" });
                      this.goBack();
                    }}
                  >
                    <Text style={styles.text}>Back To Lobby</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            <Modal
              transparent={true}
              animationType="slide"
              visible={this.state.postScoreModal}
              onRequestClose={() => {
                this.setState({ postScoreModal: false });
                this.goBack();
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                
                  <TextInput 
                    placeholderTextColor={'grey'}
                    style={styles.submitInput}
                    placeholder="Your Name"
                    onChangeText={(text) => this.setState({ user: text})}
                    value={this.state.user}
                  />
                
                 
                    <Pressable
                     style={[styles.button, styles.buttonClose]}
                      
                      
                      onPress={() => this.handleSubmit()}
                    >
                      <Text style={styles.text}>Submit</Text>
                    </Pressable>
                    <View style={{ width: 10 }} />
                    <Pressable
                     style={[styles.button, styles.buttonClose]}
                      
                      onPress={() => this.onPressCancel()}
                    >
                      <Text style={styles.text}>Cancel</Text>
                    </Pressable>
                  
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
  compareWord(ans, res) {
    ans = ans.toString().toLowerCase();
    res = res.toString().toLowerCase();

    ans = ans.trim();
    res = res.trim();
    var compare = ans.localeCompare(res);
    if (compare == 0) return true;
    return false;
  }
  handleDuration() {
    if (this.state.duration > 5) {
      this.setState(
        { duration: --this.state.duration, key: ++this.state.key },
        this.handleRender
      );
    } else {
      this.setState({ duration: 5, key: ++this.state.key }, this.handleRender);
    }
  }
  handleSubmit () {
    console.log(this.state.scores);
    console.log(this.state.user);

    // alert(this.props.dishId + ':' + this.state.rating + ':' + this.state.author + ':' + this.state.comment);
    this.postScore();
    this.onPressCancel();
  }
  onPressCancel = () => {
    this.setState({ postScoreModal: false, modalVisible: false });
    this.goBack();
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Play);
