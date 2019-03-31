import React from "react";
import {
  Alert,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  AsyncStorage
} from "react-native";
import { Icon, Button, Text, Card, ListItem } from "react-native-elements";

import dataProgram from "../assets/data.json";

class HomeScreen extends React.Component {
  state = {
    program: undefined
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

  componentDidMount() {
    this.props.navigation.setParams({
      AddaProgram: this.AddaProgram
    });

    this._subscribe = this.props.navigation.addListener("didFocus", () => {
      this.recupData();
    });
  }

  async recupData() {
    try {
      const result = await AsyncStorage.getItem("@program");

      if (result) {
        program = JSON.parse(result);
        this.setState({ program });
      } else {
        program = null;
        this.setState({ program });
      }
    } catch (e) {
      console.log(e);
    }
  }

  AddaProgram = () => {
    this.props.navigation.navigate("add", { program: this.state.program });
  };

  doaProgram = index => {
    data = this.state.program[index];
    this.props.navigation.navigate("play", { data });
  };

  DeleteaProgram = index => {
    program = this.state.program;
    Alert.alert(
      "Suppimer ce Programme ",
      "Etes vous sur de vouloir le Supprimer",
      [
        { text: "Annuler", valuer: true },

        {
          text: "Supprimer",
          onPress: () => {
            program.splice(index, 1);
            const str = JSON.stringify(this.state.program);
            AsyncStorage.setItem("@program", str).then(() => {
              this.setState({ program });
            });
          }
        }
      ],
      { cancelable: false }
    );
  };

  secondsToMinutes(time) {
    if (time > 60) {
      return (
        Math.floor(time / 60) + "min " + Math.floor(time % 60) + " secondes"
      );
    }
    return time + " secondes";
  }

  waitItem() {
    return <Text style={styles.TextCenter}> Loading...</Text>;
  }

  isReady() {
    if (this.state.program && this.state.program.length > 0) {
      return (
        <ScrollView>
          {this.state.program.map((item, index) => {
            var desc = "";
            var time = 0;
            for (step of item.step) {
              desc += `${step.title}, `;
              time += step.time;
              if (step.repos) {
                time += step.repos;
              }
            }
            desc = desc.substr(0, desc.length - 2);
            // test repos = 18
            return (
              <TouchableOpacity
                key={index}
                onPress={() => this.doaProgram(index)}
                onLongPress={() => this.DeleteaProgram(index)}
              >
                <Card title={item.name} key={index}>
                  <View>
                    <Text>{desc}</Text>
                    <Text>temps estimé : {this.secondsToMinutes(time)} </Text>
                  </View>
                </Card>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      );
    } else {
      return (
        <Button
          title="Ajouter un Programme"
          titleStyle={{ fontWeight: "700" }}
          buttonStyle={styles.Confirm}
          containerStyle={{ marginTop: 20 }}
          onPress={this.AddaProgram}
        />
      );
    }
  }

  render() {
    let { program } = this.state;
    return (
      <View style={styles.container}>
        <Text h4 style={styles.title}>
          Mes Programmes
        </Text>
        {program === undefined && this.waitItem()}
        {program !== undefined && this.isReady()}
      </View>
    );
  }
}

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
    // alignItems: "center"
  },
  title: {
    textAlign: "center",
    color: "#5C63D8",
    textDecorationLine: "underline",
    paddingTop: 20,
    paddingBottom: 20
  },
  Confirm: {
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: "#5C63D8",
    marginVertical: 10,
    opacity: 1
  },
  TextCenter: {
    alignItems: "center",
    textAlign: "center"
  }
});
