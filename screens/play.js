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
  AsyncStorage,
  Vibration
} from "react-native";

import {
  Icon,
  Button,
  Text,
  ListItem,
  FormLabel,
  FormInput,
  FormValidationMessage
} from "react-native-elements";

import CountDown from "react-native-countdown-component";
import dataProgram from "../assets/data.json";
// import Sound from 'react-native-sound';

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
    nbStep: 0,
    isReady: false
  };

  // Debut navigationOptions
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { state, setParams, navigate } = navigation;

    const { params } = navigation.state;
    let data = params.data;

    return {
      headerTitle: "stepCount",
      headerStyle: {
        backgroundColor: "#5C63D8"
      },
      headerTitleStyle: {
        color: "#fff"
      }
    };
  };
  // Fin navigationOptions

  componentDidMount() {
    let data = this.props.navigation.state.params.data || {};
    this.transformDatatoArray(data);
  }

  transformDatatoArray(data) {
    var programe = [];
    for (stepObj of data.step) {
      var step = {};
      step = {
        title: stepObj.title,
        time: stepObj.time
      };
      programe.push(step);
      if (stepObj.repos) {
        step = {
          title: "Repos",
          time: stepObj.repos
        };
        programe.push(step);
      }
    }
    this.setState({ data: programe });
    this.firstStep(programe);
  }

  firstStep(data) {
    valueStep = data[this.state.nbStep].time;
    isReady = true;
    nbStep = this.state.nbStep + 1;
    this.setState({ valueStep, nbStep, isReady });
  }

  nextStep = () => {
    this.setState({ isReady: false });
    valueStep = this.state.data[this.state.nbStep].time;
    nbStep = this.state.nbStep + 1;
    this.setState({ valueStep, nbStep, isReady: true });
  };

  getSound() {
    Vibration.vibrate(2000);
  }

  continueStep = () => {
    this.getSound();
    if (this.state.nbStep < this.state.data.length) {
      this.textAFaire();
      Alert.alert(
        "Courage ",
        `Prochaine Etape : ${this.state.data[this.state.nbStep].title}`,
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
    } else {
      alert("finish");
    }
  };

  textAFaire() {
    return <Text h1>{this.state.data[this.state.nbStep - 1].title}</Text>;
  }

  countDown() {
    if (this.state.data[this.state.nbStep - 1].title == "Repos") {
      return (
        <CountDown
          until={this.state.valueStep}
          digitBgColor="#771565"
          onFinish={() => {
            this.continueStep();
          }}
          onPress={() => alert("hello")}
          size={30}
        />
      );
    } else {
      return (
        <CountDown
          until={this.state.valueStep}
          digitBgColor="#5C63D8"
          onFinish={() => {
            this.continueStep();
          }}
          onPress={() => alert("hello")}
          size={30}
        />
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.isReady && this.textAFaire()}
        {this.state.isReady && this.countDown()}
      </View>
    );
  }
}

export default PlayScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    textAlign: "center",
    color: "#5C63D8",
    textDecorationLine: "underline",
    paddingTop: 20,
    paddingBottom: 20
  }
});
