import React from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  WebView,
  TextInput,
  AsyncStorage
} from "react-native";
import { Icon, Button, ButtonGroup } from "react-native-elements";


class HomeScreen extends React.Component {
  state = {

  };

  // Debut navigationOptions
  static navigationOptions = ({ navigation }) => {
    const { state, setParams, navigate } = navigation;
    return {
      headerTitle: "stepCount",
      headerStyle: {
        backgroundColor: "#5C63D8"
      },
      headerTitleStyle: {
        color: "#fff"
      },

      headerRight: (
        <View style={{ flexDirection: "row", marginRight: 20 }}>
          <Icon
            name="pencil-square-o"
            type="font-awesome"
            onPress={() => state.params.AddaProgram()}
          />
        </View>
      )
    };
  };
  // Fin navigationOptions

  // Ex AsyncStorage
  async componentWillMount() {
    console.log("componentWillMount");
    // try {
    //   const result = await AsyncStorage.getItem("@User");
    //   if (result) {
    //     user = JSON.parse(result);
    //     console.log(user);
    //     this.setState({ id: user.id, token: user.token });
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
  }

  componentDidMount() {
    this.props.navigation.setParams({
      AddaProgram: this.AddaProgram
    });

  }

  AddaProgram = () => {
    console.log("AddaProgram");
  }



  render() {
    return (
      <View style={styles.container}>
          <Text> Welcome To My New App</Text>
          <Text> The Futur of My App</Text>
          <Text> Permettre la creation d'un programme de Sport avec un timer :D</Text>
          <Text> Tu comprendras bientôt :) reviens d'ici quelques jours </Text>



      </View>
    );
  }
}

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
});
