import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
} from "react-native";
import { Card, ListItem } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
//import { words } from "../data/words";
import { styles } from "../style/style";
import { baseUrl } from "../shared/baseUrl";

//redux
import { connect } from "react-redux";
const mapStateToProps = (state) => {
  return {
    words: state.words,
  };
};

class Words extends Component {
  render() {
    //console.log('--------------' + this.props.words.words[0].word)

    if (this.props.isLoading) {
      return <Text>isLoading</Text>;
    } else if (this.props.errMess) {
      return <Text>{this.props.errMess}</Text>;
    } else {
      return (
        <Card>
          <Card.Title>List Of Words</Card.Title>
          <Card.Divider />

          {/* <FlatList
            
            data={this.props.words}
            renderItem={({ item, index }) => this.renderWordList(item, index)}
            keyExtractor={(item) => item.id.toString()}
          /> */}
          <ScrollView style={{height: 600, }}>
          {this.props.words.map((item, index)=>this.renderWordList(item, index))}
          </ScrollView>
        </Card>
      );
    }
  }
  renderWordList(item, index) {
    return (
    <View key={index}>
      <ListItem >
        <ListItem.Content>
          <ListItem.Title>
            {item.word} <ListItem.Subtitle>{item.type}</ListItem.Subtitle>
          </ListItem.Title>
          <ListItem.Subtitle>{item.meaning}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </View>
      
    );
  }
}

class Dictionary extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    //console.log("--------------" + this.props.words.words[0].word);
    return (
      <Words
        words={this.props.words.words}
        isLoading={this.props.words.isLoading}
        errMess={this.props.words.errMess}
      ></Words>
    );
  }
}
export default connect(mapStateToProps)(Dictionary);
