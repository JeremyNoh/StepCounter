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


class HomeScreen extends React.Component {
  state = {
    program : [],
  };

  // Debut navigationOptions
  static navigationOptions = ({ navigation }) => {
    const { state, setParams, navigate } = navigation;
    const { params } = navigation.state;


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
    { text: "Annuler", valuer: true },

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
            var time = 0
            for (step of item.step) {
              desc +=  `${step.title}, `
              time += step.time
              if (step.repos) {
                time+= step.repos
              }
            }
            desc = desc.substr(0,desc.length-2)
            // test repos = 18
            return (
              <TouchableOpacity key = {index} onPress={() => this.doaProgram(index)}
              onLongPress= {() => this.DeleteaProgram(index)} >
              <Card title={item.name} key = {index}>
              <View >
                <Text>{desc}</Text>
                <Text>temps estimé : {time} secondes</Text>

              </View>
            </Card>
            </TouchableOpacity>
            );
          })
        }

        </ScrollView>
      );
          // test
    //       return (
    //   <ScrollView>
    //     {this.state.program.map((item, index) => (
    //
    //       //       var desc = ""
    //       //       for (step of item.step) {
    //       //         desc +=  `${step.title}, `
    //       //       }
    //       //       desc = desc.substr(0,desc.length-2)
    //
    //       <Card key={index}>
    //         <CardTitle subtitle={item.name} />
    //         <CardContent text={item.name} />
    //         <CardAction separator={true} inColumn={false}>
    //           <CardButton
    //             onPress={() => {}}
    //             title="DO IT"
    //             color="#5C63D8"
    //           />
    //           <CardButton
    //             onPress={() => {}}
    //             title="Supprimer"
    //             color="#5C63D8"
    //           />
    //         </CardAction>
    //       </Card>
    //     ))}
    //   </ScrollView>
    // );
    // finTest
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
