import React, { Component } from "react";
import { KeyboardAvoidingView, Text, StyleSheet, TextInput, Button, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

class SecondPage extends Component {
  render() {
    return (
      <KeyboardAvoidingView style={styles.Main} behavior="padding" enabled>
        <Text style={styles.Logo}> MEGASAVE </Text>

        <View style={styles.View2}>
          <TextInput
            style={{ marginLeft: 10, width: wp("70%"), fontSize: 16 }}
            placeholder="Username"
          />
        </View>
        <View style={styles.View3}>
          <TextInput
            style={{ marginLeft: 10, width: wp("70%"), fontSize: 16 }}
            placeholder="Enter your password"
            secureTextEntry={true}
          />
        </View>
        <View style={styles.View4}>
          <Button
            title="Sign In"
            onPress={() => this.props.navigation.navigate("ThirdPage")}
            color="rgba(0, 177, 106, 1)"
          />
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
