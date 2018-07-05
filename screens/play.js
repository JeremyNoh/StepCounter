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

import CountDown from 'react-native-countdown-component';
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
    nbStep : 0 ,
    isReady : false,
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
    this.firstStep(data)
  }

  firstStep(data) {
    console.log(data);
      valueStep = data.step[this.state.nbStep].time
      isReady = true
      nbStep = this.state.nbStep +1
      this.setState({valueStep , nbStep , isReady})

  }

  nextStep = () =>{
    this.setState({isReady: false})
      if (this.state.nbStep < this.state.data.step.length) {
        this.setState({isReady: true})
        valueStep = this.state.data.step[this.state.nbStep].time
        nbStep= this.state.nbStep + 1
        this.setState({valueStep , nbStep})
      }
      else {
        console.log("finish !!!");
        alert('finish')
      }
  }

  continueStep = () =>{
    Alert.alert(
      "Courage ",
      "Prochaine Etape : Repos",
      [
        {
          text: "OK",
          onPress: () => {
            this.nextStep();
          }
        }
      ],
      { cancelable: false }
    );

  }

  test(){

  }

  countDown(){
      console.log("count : " ,this.state.valueStep);
      return (
        <CountDown
          until={this.state.valueStep}
          digitBgColor='#5C63D8'
          onFinish={() => {this.continueStep()}}
          onPress={() => alert('hello')}
          size={30}
        />
      )

  }



  render() {
    return (
      <View style={styles.container}>
      { this.state.isReady && this.countDown()}

      </View>
    );
  }
}

export default PlayScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title : {
    textAlign: "center",
    color : '#5C63D8',
    textDecorationLine : "underline" ,
    paddingTop : 20,
    paddingBottom : 20 ,
  },

});
