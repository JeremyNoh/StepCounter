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
  ListItem,
  FormLabel, FormInput, FormValidationMessage

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


class AddScreen extends React.Component {
  state = {
    nbStep :1 ,
    data : {},
    step : [],
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
  // async componentWillMount() {
  //   console.log("componentWillMount");
  // }

  componentDidMount() {
    console.log("componentDidMount");
    this.props.navigation.setParams({
      AddaProgram: this.AddaProgram
    });
    this.CreateTab()
    
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
     <ScrollView>
       {this.state.step.map((item, index) => (
         <Card title={`Step ${index +1}`} key = {index}>
              <View >
              <FormLabel>Name</FormLabel>
              <FormInput
              onChangeText={title => this.majStepTitle(title , step , index) }
              />
              <FormLabel>Time</FormLabel>
              <FormInput
              keyboardType = 'numeric'
              onChange={time => this.majStepTime(time , step , index) }
              value={0}/>
              </View>
            </Card>
       ))}
     </ScrollView>
   );
  }

  majStepTitle = (title , step , index ) => {
    step[index].title = title
    this.setState({step})
    console.log(this.state);

  }

  majStepTime = (time , step , index ) => {
    step[index].time = time
    this.setState({step})
    console.log(this.state);

  }

  majStepName = (name ) => {
    data = this.state.data
    data.name = name
    this.setState({data})
    console.log(this.state);
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
        <Text >Ajout d'un Program</Text>

        <Button
        title="Ajouter une Etape"
        titleStyle={{ fontWeight: "700" }}
        buttonStyle={styles.buttonStyle}
        containerStyle={{ marginTop: 20 }}
        onPress={this.stepUp}
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


});
