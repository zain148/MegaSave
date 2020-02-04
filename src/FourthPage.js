import React, { Component } from "react";
import { View, Image, StyleSheet, TextInput } from "react-native";
import Images from "../assets/Files";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

class FourthPage extends Component {
  render() {
    return (
      <View style={styles.Main}>
        {/*Header Block */}
        <View style={styles.Header}>
          <Image
            source={Images.AllProduct}
            style={{ width: wp("100%"), height: hp("15%"), resizeMode: "contain" }}
          />
        </View>
        {/*Search Block*/}
        <View style={styles.Search}>
          <TextInput
            style={{
              marginLeft: 15,
              width: wp("70%"),
              height: hp("6%"),
              fontSize: 16,
              backgroundColor: "white"
            }}
            placeholder="Search"
          />
        </View>

        {/*AddProduct Block*/}
        <View style={styles.View2} onTouchStart={() => alert("Add")}>
          <Image
            source={Images.ProductOne}
            style={{ width: wp("100%"), height: hp("27%"), resizeMode: "stretch" }}
          />
        </View>
        <View style={styles.View4}>
          <Image
            source={Images.ProductTwo}
            style={{ width: wp("100%"), height: hp("45%"), resizeMode: "stretch" }}
          />
        </View>
      </View>
    );
  }
}

export default FourthPage;

const styles = StyleSheet.create({
  Main: {
    flex: 1,
    backgroundColor: "rgba(238, 238, 238, 1)"
  },
  Header: {
    flex: 1
  },
  Search: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  View2: {
    flex: 2
  },
  View4: { marginTop: 5, flex: 4 }
});
