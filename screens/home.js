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
  Card,
  ListItem
 } from "react-native-elements";

import dataProgram from "../assets/data.json";

import {
  // Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage
} from "react-native-cards";


class HomeScreen extends React.Component {
  state = {
    program : [],
  };

  // Debut navigationOptions
  static navigationOptions = ({ navigation }) => {
    const { state, setParams, navigate } = navigation;
    const { params } = navigation.state;
    // console.log("test",params);


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
    try {
      const result = await AsyncStorage.getItem("@program");
      if (result) {
        program = JSON.parse(result);
        this.setState({ program });
      }
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.props.navigation.setParams({
      AddaProgram: this.AddaProgram,
    });
  }


  AddaProgram = () => {
    this.props.navigation.navigate("add" , {program : this.state.program});
  }

  doaProgram = (index) => {
    data = this.state.program[index]
    this.props.navigation.navigate("play" , {data});
  }

  DeleteaProgram = (index) => {
    program = this.state.program
    Alert.alert(
  "Suppimer ce Programme ",
  "Etes vous sur de vouloir le Supprimer",
  [
    { text: "Cancel", valuer: true },

    {
      text: "Supprimer",
      onPress: () => {
        program.splice(index,1);
        const str = JSON.stringify(this.state.program);
        AsyncStorage.setItem("@program", str).then(() => {
          this.setState({program})
        });
      }
    }
  ],
  { cancelable: false }
);
  }


  isReady() {
    if (this.state.program) {
      return (
        <ScrollView>

        {
          this.state.program.map((item, index) => {
            var desc = ""
            for (step of item.step) {
              desc +=  `${step.title}, `
            }
            desc = desc.substr(0,desc.length-2)


            return (
              <TouchableOpacity key = {index} onPress={() => this.doaProgram(index)}
              onLongPress= {() => this.DeleteaProgram(index)} >
              <Card title={item.name} key = {index}>
              <View >
                <Text>{desc}</Text>
              </View>
            </Card>
            </TouchableOpacity>
            );
          })
        }

        </ScrollView>
      );

    //       return (
    //   <ScrollView>
    //     {this.state.program.map((item, index) => (
    //       <Card key={index}>
    //         <CardTitle subtitle={item.name} />
    //         <CardContent text={item.name} />
    //         <CardAction separator={true} inColumn={false}>
    //           <CardButton
    //             onPress={() => {}}
    //             title="DO IT"
    //             color="#5C63D8"
    //           />
    //         </CardAction>
    //       </Card>
    //     ))}
    //   </ScrollView>
    // );
    }
  }


  render() {
    return (
      <View style={styles.container}>
      <Text> The Futur of My App</Text>
      <Text> Permettre la creation d'un programme de Sport avec un timer :D</Text>
      <Text> Tu comprendras bientôt :) reviens d'ici quelques jours </Text>
      <Text h4 style={styles.title}> Mes Programmes</Text>


      {this.isReady()}

      </View>
    );
  }
}

export default HomeScreen;
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


});
