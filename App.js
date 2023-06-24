
import React, { Component, BackHandler } from "react";

import MainComponent from "./components/MainComponent";
import { ConfigureStore } from "./redux/ConfigureStore";
import { Provider } from "react-redux";

const store = ConfigureStore();
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainComponent />
      </Provider>
    );
  }
}

export default App;
