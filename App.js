import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "react-navigation";
console.disableYellowBox = true;
import HomeScreen from "./screens/home";
import AddScreen from "./screens/add";
import PlayScreen from "./screens/play";

const RootStack = createStackNavigator({
  home: {
    screen: HomeScreen
  },
  add: {
    screen: AddScreen
  },
  play: {
    screen: PlayScreen
  }
});

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
