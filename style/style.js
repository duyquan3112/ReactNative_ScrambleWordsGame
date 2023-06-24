import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    marginBottom: 10,
    width: 200,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    alignItems: "center",
    justifyContent: "center",
  },
  centeredView: {
    width: '100%',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  viewFlexRow: {
    paddingTop: '10%',
    height: '5%',
    
  },
  viewCharacter: {
    justifyContent: "center",
    backgroundColor: "#e8cffc",
    alignItems: "center",
    borderRadius: 10,
    margin: 5,
    width: 50,
    height: 50,
    shadowOffset: {width: 2, height: 4},
    shadowColor: '#575757',
    shadowOpacity: 0.2,
    
  },
  viewTextInput: {
    flex: 2,
    flexDirection: "row",
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: '5%',
   
  },
   textInput: {
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    borderColor: '#c342ff',
    borderBottomWidth: 1,
    width: '70%',
    margin: 10
  
  },
  wordText: {
    color: '#520099',
    fontWeight: "bold",
    fontSize: 20
  }
});
