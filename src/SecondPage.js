import React, { Component } from "react";
import {
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  Alert,
  TextInput,
  Button,
  View,
  ActivityIndicator
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import base64 from "base-64";
class SecondPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      userPassword: "",
      Indicator: false
    };
  }
  Authenticate = () => {
    //here when this function trigged then open Indicator
    this.setState({
      Indicator: true
    });

    /* if (!global.btoa) {
      global.btoa = encode;
    }
    if (!global.atob) {
      global.atob = decode;
    }
    */

    const userName = this.state.userName;
    const userPassword = this.state.userPassword;
    const token = userName + ":" + userPassword;
    const DataToken = base64.encode(token);

    const header = new Headers();
    //Please keep in mind we have to provide some space in Basic like "Basic "
    header.set("Authorization", "Basic " + DataToken);
    const session_url = "http://ssmt.vivostore.com.sg/api/stocks";
    fetch(session_url, {
      method: "GET",
      headers: header
    })
      .then(response => response.ok)
      .then(respnseOk => {
        //if response.ok is true then triggered below functionality
        if (respnseOk) {
          this.setState({
            Indicator: false
          });
          Alert.alert("Successfully LoggedIn", "Welcome to MegaSave");
          setTimeout(() => {
            this.props.navigation.navigate("ThirdPage", {
              userName: this.state.userName,
              userPassword: this.state.userPassword
            });
          }, 1500);
        } else {
          this.setState({
            Indicator: false
          });
          Alert.alert("LoggedIn Failed", "Please Enter Your Correct Credientials");
        }
      })
      .catch(error => console.log("I'm error" + error.message));
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.Main} behavior="padding" enabled>
        <Text style={styles.Logo}> MEGASAVE </Text>

        <View style={styles.View2}>
          <TextInput
            style={{ marginLeft: 10, width: wp("70%"), fontSize: 16 }}
            placeholder="Username"
            onChangeText={userName => this.setState({ userName })}
          />
        </View>
        <View style={styles.View3}>
          <TextInput
            style={{ marginLeft: 10, width: wp("70%"), fontSize: 16 }}
            placeholder="Enter your password"
            onChangeText={userPassword => this.setState({ userPassword })}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.View4}>
          <Button title="Sign In" onPress={this.Authenticate} color="rgba(0, 177, 106, 1)" />
        </View>
        <View>
          <ActivityIndicator size="large" color="white" animating={this.state.Indicator} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default SecondPage;

const styles = StyleSheet.create({
  Main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#52b3d9"
  },
  Logo: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold"
  },
  View2: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    width: wp("80%"),
    height: hp("7%"),
    backgroundColor: "#f2f1ef"
  },
  View3: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    width: wp("80%"),
    height: hp("7%"),
    backgroundColor: "#f2f1ef"
  },
  View4: {
    marginTop: 30,
    width: wp("80%"),
    height: hp("7%")
  }
});
