import React from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  WebView,
  TextInput,
  AsyncStorage
} from "react-native";
import {
  Icon,
  Button,
  Text,
  // Card,
  ListItem,
  FormLabel, FormInput, FormValidationMessage

 } from "react-native-elements";

import dataProgram from "../assets/data.json";

import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage
} from "react-native-cards";


class PlayScreen extends React.Component {
  state = {
    nbStep :1 ,
    data : {},
  };

  // Debut navigationOptions
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { state, setParams, navigate } = navigation;

    const { params } = navigation.state;
     let data = params.data
    //  console.log(program);

    return {
      headerTitle: "stepCount",
      headerStyle: {
        backgroundColor: "#5C63D8"
      },
      headerTitleStyle: {
        color: "#fff"
      },
    };
  };
  // Fin navigationOptions

  // Ex AsyncStorage
  // async componentWillMount() {
  //   console.log("componentWillMount");
  // }

  componentDidMount() {
    console.log("componentDidMount");
    let data = this.props.navigation.state.params.data || {}
    this.setState({data})
  }



  Step(){
    return (
      <Text h4 style={styles.title}> {this.state.data.name}</Text>
   );
  }


  render() {
    return (
      <View style={styles.container}>
      {this.Step()}
      </View>
    );
  }
}

export default PlayScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center"
  },
  title : {
    textAlign: "center",
    color : '#5C63D8',
    textDecorationLine : "underline" ,
    paddingTop : 20,
    paddingBottom : 20 ,
  },
  cardTitle : {
    textAlign: "center",
    color : '#5C63D8',
    paddingTop : 20,
    paddingLeft : 50,
    paddingBottom : 20 ,
  },
  Confirm: {
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: "#5C63D8",
    marginVertical: 10,
    opacity: 1
  },

});
