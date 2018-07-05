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


class AddScreen extends React.Component {
  state = {
    nbStep :1 ,
    data : {},
    step : [],
  };

  // Debut navigationOptions
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { state, setParams, navigate } = navigation;

    const { params } = navigation.state;
     let program = params.program
    //  console.log(program);

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
  // async componentWillMount() {
  //   console.log("componentWillMount");
  // }

  componentDidMount() {
    console.log("componentDidMount");
    this.props.navigation.setParams({
      AddaProgram: this.AddaProgram,
    });
    this.CreateTab()
    let program = this.props.navigation.state.params.program || []
    this.setState({program})
  }


  AddaProgram = () => {
    console.log(this.state.program);
  }
  stepUp = () => {
    this.setState({ nbStep : this.state.nbStep+1 })
    this.CreateTab()

  }

  CreateTab() {
      let step = this.state.step
      var stepEtape = {
        time: 0,
        title:""
          }

      step.push(stepEtape)
      this.setState({step})
  }

  Step(){
    // console.log(this.state);
    let step = this.state.step
    // console.log("test : ",test[0].time);
    return (
     <ScrollView  horizontal={true}>
       {this.state.step.map((item, index) => (
         <Card title={`Step ${index +1}`} key = {index}>
         <Text h4 style={styles.cardTitle}>Step {index +1}</Text>

              <View >
              <FormLabel>Name</FormLabel>
              <FormInput
              onChangeText={title => this.majStepTitle(title , step , index) }
              />
              <FormLabel>Time</FormLabel>
              <FormInput
              keyboardType = 'numeric'
              onChangeText={time => this.majStepTime(time , step , index) }
              />
              </View>
            </Card>
       ))}
     </ScrollView>
   );
  }

  majStepTitle = (title , step , index ) => {
    step[index].title = title
    this.setState({step})
  }

  majStepTime = (time , step , index ) => {
    time =  parseInt(time)
    step[index].time = time
    this.setState({step})
  }

  majStepName = (name ) => {
    data = this.state.data
    data.name = name
    this.setState({data})
  }

  finish = () => {
    step = this.state.step
    data = this.state.data
    program = this.state.program
    if (!(data.name == undefined) ) {
      data.step = step
      program = program.push(data)
      this.setState({data , program})
      console.log(data);
      const str = JSON.stringify(this.state.program);
      AsyncStorage.setItem("@program", str).then(() => {
        this.props.navigation.navigate("home" , {program : this.state.program});
      });
    }
    else {
      alert("Veuillez remplir tout les champs")
    }


    }


  render() {
    return (
      <View style={styles.container}>
      <Text h4 style={styles.title}>Ajout d'un Program</Text>
      <FormLabel>Nom du Program</FormLabel>
      <FormInput
      onChangeText={name => this.majStepName(name)}
      value={this.state.data.name}/>



        {this.Step()}
        <Button
        title="Ajouter une Etape"
        titleStyle={{ fontWeight: "700" }}
        buttonStyle={styles.buttonStyle}
        containerStyle={{ marginTop: 20 }}
        onPress={this.stepUp}
      />
      <Button
      title="Valider son Programme"
      titleStyle={{ fontWeight: "700" }}
      buttonStyle={styles.Confirm}
      containerStyle={{ marginTop: 20 }}
      onPress={this.finish}
    />

      </View>
    );
  }
}

export default AddScreen;
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
