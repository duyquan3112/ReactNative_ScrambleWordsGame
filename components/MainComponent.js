import {
  Text,
  View,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Alert,
  Modal,
} from "react-native";
import { Image } from "react-native-elements";
import React, { Component, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Play from "./PlayComponent";
import Dictionary from "./DictionaryComponent";
import { styles } from "../style/style";
//redux
//import { fetchWords } from "../redux/ActionCreators";
import {getWords} from '../redux/ActionCreators'
import {connect} from 'react-redux'
const mapDispatchToProps = (dispatch) => ({
  fetchWords: () => dispatch(getWords()),
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
          }}
        >
          <Button
            onPress={() => navigation.navigate("Play")}
            title="Tap to Play"
          ></Button>
          <Button
            onPress={() => navigation.navigate("Dictionary")}
            title="Dictionary"
          ></Button>
          <Button
            title="Tutorial"
            onPress={() => setModalVisible(true)}
          ></Button>
          <Button title="Quit"></Button>
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
                  <Text style={styles.modalText}>Hello World!</Text>
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
  const { onPress, title } = props;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );

  
}

export default connect(null, mapDispatchToProps)(MainComponent);