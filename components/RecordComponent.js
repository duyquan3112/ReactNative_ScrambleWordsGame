import { Text, View, FlatList } from 'react-native'
import React, { Component } from 'react'
import { Card, ListItem } from "react-native-elements";

//redux
import { connect } from "react-redux";
import { styles } from '../style/style';
const mapStateToProps = (state) => {
  return {
    scores: state.scoresrp,
  };
};
class Scores extends Component {
    render() {
      
  
      if (this.props.isLoading) {
        return <Text>isLoading</Text>;
      } else if (this.props.errMess) {
        return <Text>{this.props.errMess}</Text>;
      } else {
        return (
          <Card>
            <Card.Title>List Of Records</Card.Title>
            <Card.Divider />
  
            <FlatList
              data={this.props.scores}
              renderItem={({ item, index }) => this.renderScoreList(item, index)}
              keyExtractor={(item) => item.id.toString()}
            />
          </Card>
        );
      }
    }
    renderScoreList(item, index) {
      return (
        <ListItem key={index}>
          <ListItem.Content>
            <ListItem.Title style={{fontSize: 16}}>
              Name: {item.user} 
            </ListItem.Title>
            <Text style={{fontSize: 16}}> Score: <ListItem.Subtitle style={{fontWeight: 'bold', color: 'purple', fontSize: 16, fontStyle: 'italic'}}>{item.scores}</ListItem.Subtitle></Text>
            <ListItem.Subtitle style={{fontSize: 16}}> Date: {item.date}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      );
    }
  }

class Record extends Component {
    constructor(props) {
        super(props);
      }
      render() {
        //console.log("--------------" + this.props.words.words[0].word);
        return (
          <Scores
            scores={this.props.scores.scoresrp}
            isLoading={this.props.scores.isLoading}
            errMess={this.props.scores.errMess}
          ></Scores>
        );
      }
}

export default connect(mapStateToProps)(Record);