import {
  Text,
  View,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Alert,
  Modal
  , ScrollView, Image
} from "react-native";
//import { Image } from "react-native-elements";
import React, { Component, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Play from "./PlayComponent";
import Dictionary from "./DictionaryComponent";
import { styles } from "../style/style";
//redux
//import { fetchWords } from "../redux/ActionCreators";
import {getScores, getWords} from '../redux/ActionCreators'
import {connect} from 'react-redux'
import Record from "./RecordComponent";
const mapDispatchToProps = (dispatch) => ({
  fetchWords: () => dispatch(getWords()),
  fetchScores: () => dispatch(getScores())
  //fetchWord: () => dispatch(getWords())
});
class MainComponent extends Component {
  render() {
    return (
      <NavigationContainer>
        <MainNavigatorScreen></MainNavigatorScreen>
      </NavigationContainer>
    );
  }
  componentDidMount() {
    //redux
    this.props.fetchWords();
    this.props.fetchWords();
    this.props.fetchScores();
  }
}

// function AppNavigatorScreen() {
//   const AppNavigator = createStackNavigator();
//   return (
//     <AppNavigator.Navigator initialRouteName="MainScreen">
//       <AppNavigator.Screen name="MainScreen" component={MainNavigatorScreen}></AppNavigator.Screen>
//        </AppNavigator.Navigator>
//   );
// }

function MainNavigatorScreen() {
  const MainNavigator = createStackNavigator();
 
  return (
    <MainNavigator.Navigator
      screenOptions={{ headerTitle: "", gestureEnabled: false, }}
      initialRouteName="Main"
    >
      <MainNavigator.Screen name="Main" component={Main}></MainNavigator.Screen>
      <MainNavigator.Screen name="Play" component={Play}></MainNavigator.Screen>
      <MainNavigator.Screen
        name="Dictionary"
        component={Dictionary}
      ></MainNavigator.Screen>
      <MainNavigator.Screen name="Record" component={Record}></MainNavigator.Screen>
    </MainNavigator.Navigator>
  );
}

function Main({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          width: "100%",
          flex: 1,
          
          //justifyContent: "center",
        }}
      >
        <Image
          source={require("../pics/banner.png")}
          style={styles.image}
        ></Image>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            padding: 10
          }}
        >
          <Button
            onPress={() => navigation.navigate("Play")}
            title="Tap to Play"
            style={styles.playButton}
          ></Button>
          <Button
            onPress={() => navigation.navigate("Dictionary")}
            title="Dictionary"
            style={styles.button}
          ></Button>
          <Button
            title="Tutorial"
            onPress={() => setModalVisible(true)}
            style={styles.button}
          ></Button>
          <Button 
            title="Record"
            onPress={()=> navigation.navigate("Record")}
            style={styles.button}
          ></Button>
          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  {/* <Text style={styles.modalText}>Hello World!</Text> */}
                  <View style={{height: 300, width: '100%'}}>
                  <ImageSlider></ImageSlider>
                  </View>
                   
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.text}>Got It !</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );

}

function Button(props) {
  const { onPress, title, style } = props;
  return (
    <Pressable style={style} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );

  
}



const images = [
  '../pics/banner.png',
  '../pics/banner.png',
  '../pics/banner.png',
];

const ImageSlider = () => {
  return (
    <ScrollView horizontal pagingEnabled>
            {images.map((imageUrl, index) => (
              <View key={index} style={stl.slide}>
                <Image source={require('../pics/banner.png')} style={stl.image} />
                
              </View>
            ))}
    </ScrollView>
  );
};
const stl = StyleSheet.create({
  slide: {
    height: '100%',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: '100%',
    resizeMode: "contain",
    
  },
});

export default connect(null, mapDispatchToProps)(MainComponent);
