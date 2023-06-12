import { Text, View, StyleSheet, Pressable, SafeAreaView, Alert } from "react-native";
import React, { Component, BackHandler  } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Play from "./components/PlayComponent";
import Dictionary from "./components/DictionaryComponent";

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <MainNavigatorScreen></MainNavigatorScreen>
      </NavigationContainer>
    );
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
      screenOptions={{ headerTitle: '', gestureEnabled: false}}
      initialRouteName="Main"
    >
      <MainNavigator.Screen name="Main" component={Main}></MainNavigator.Screen>
      <MainNavigator.Screen name="Play" component={Play}></MainNavigator.Screen>
      <MainNavigator.Screen name="Dictionary" component={Dictionary}></MainNavigator.Screen>
    </MainNavigator.Navigator>
  );
}

function Main({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Button
        onPress={() => navigation.navigate("Play")}
        title="Tap to Play"
      ></Button>
      <Button
        onPress={() => navigation.navigate("Dictionary")}
        title="Dictionary"
      ></Button>
      <Button
        onPress={{}}
        title="Quit"
      ></Button>
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

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    marginBottom: 10,
    width: 200
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
});

export default App;
