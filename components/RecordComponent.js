import { Text, View, FlatList, ScrollView } from 'react-native'
import React, { Component } from 'react'
import { Card, ListItem } from "react-native-elements";

//redux
import { connect } from "react-redux";
import { styles } from '../style/style';
import { SafeAreaView } from 'react-native';
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
          <SafeAreaView style={{height: '100%', backgroundColor: 'white'}}>
            <View style={{width: '100%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 30}}>Records</Text>
            </View>
             {/* <FlatList
              data={this.props.scores}
              renderItem={({ item, index }) => this.renderScoreList(item, index)}
              keyExtractor={(item) => item.id.toString()}
            /> */}
            <ScrollView style={{ padding: 10}}>
              {this.props.scores.map((item, index)=>this.renderScoreList(item, index))}
            </ScrollView>
          </SafeAreaView>
  
           
          
        );
      }
    }
    renderScoreList(item, index) {
      return (
        <View key={index} style={styles.shadowBox}>
          <ListItem style={{height: 100}} >
          <ListItem.Content>
            <ListItem.Title style={{fontSize: 18}}>
              Name: {item.user} 
            </ListItem.Title>
            <Text style={{fontSize: 16}}> Score: <ListItem.Subtitle style={{fontWeight: 'bold', color: 'purple', fontSize: 16, fontStyle: 'italic'}}>{item.scores}</ListItem.Subtitle></Text>
            <ListItem.Subtitle style={{fontSize: 16}}> Date: {item.date}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        </View>
        
      
        //  <View key={index} style={{borderRadius: 10, backgroundColor: '#fafafa', padding: 5, margin: 5,shadowColor: '#000',shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.1, shadowRadius: 4, elevation: 4,}}>
        //   <Text style={{fontSize: 16}}>Name: {item.user}</Text>
        //   <Text style={{fontSize: 16}}>Score: {item.scores}</Text>
        //   <Text style={{fontSize: 16}}>Date: {item.date}</Text>
        // </View>
      
       
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