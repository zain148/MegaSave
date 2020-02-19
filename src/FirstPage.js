import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Timing from "../assets/Files";
class FirstPage extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate("SecondPage");
    }, 3000);
  }
  render() {
    return (
      <View style={styles.Main}>
        <Text style={styles.Logo}> MEGASAVE </Text>
        <Image
          source={Timing.Timing}
          style={{ width: 50, height: 50, resizeMode: "contain", marginTop: 20 }}
        />
      </View>
    );
  }
}

export default FirstPage;

const styles = StyleSheet.create({
  Main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 177, 106, 1)"
  },
  Logo: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold"
  }
});
