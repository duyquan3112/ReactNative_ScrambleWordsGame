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
import { Card, ListItem, SearchBar  } from "react-native-elements";
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
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.words,
      
    };

    this.arrayholder = this.props.words;
  }

  render() {
    //console.log('--------------' + this.props.words.words[0].word)
    
    if (this.props.isLoading) {
      return <Text>isLoading</Text>;
    } else if (this.props.errMess) {
      return <Text>{this.props.errMess}</Text>;
    } else {
      return (
      <View>
        <View style={{ paddingTop: 5, paddingHorizontal: 15}}>
          <this.renderHeader></this.renderHeader>
        </View>
        <Card>
          <Card.Title>List Of Words</Card.Title>
          <Card.Divider />

          {/* <FlatList
            
            data={this.props.words}
            renderItem={({ item, index }) => this.renderWordList(item, index)}
            keyExtractor={(item) => item.id.toString()}
          /> */}
          <ScrollView style={{height: 550, }}>
          {this.state.data.map((item, index)=>this.renderWordList(item, index))}
          </ScrollView>
        </Card>
      </View>
        
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
  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.word.toUpperCase()} `;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };
  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        inputContainerStyle={{backgroundColor:'white'}}
        containerStyle={{backgroundColor:'white', borderRadius: 10}}
        disabledInputStyle
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };
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
