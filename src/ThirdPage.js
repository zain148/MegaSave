import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import Images from "../assets/Files";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

class ThirdPage extends Component {
  render() {
    return (
      <View style={styles.Main}>
        {/*Header Block */}
        <View style={styles.Header}>
          <Image
            source={Images.Header}
            style={{ width: wp("100%"), height: hp("15%"), resizeMode: "contain" }}
          />
        </View>
        {/*AddProduct Block*/}
        <View
          style={styles.View2}
          onTouchStart={() => this.props.navigation.navigate("FourthPage")}
        >
          <Image
            source={Images.AddProduct}
            style={{ width: wp("100%"), height: hp("15%"), resizeMode: "contain" }}
          />
        </View>
        <View style={styles.View3}></View>
        <View style={styles.View4}>
          <Image
            source={Images.AddDiscount}
            style={{ width: wp("100%"), height: hp("25%"), resizeMode: "stretch" }}
          />
        </View>
        <View
          style={styles.View5}
          onTouchStart={() => this.props.navigation.navigate("SecondPage")}
        >
          <Image
            source={Images.charge}
            style={{ width: wp("90%"), height: hp("15%"), resizeMode: "contain" }}
          />
        </View>
      </View>
    );
  }
}

export default ThirdPage;

const styles = StyleSheet.create({
  Main: {
    flex: 11,
    backgroundColor: "rgba(238, 238, 238, 1)"
  },
  Header: {
    flex: 1
  },
  View2: {
    flex: 1
  },

  View3: {
    flex: 2,
    marginTop: 20,
    backgroundColor: "white"
  },
  View4: { marginTop: 5, flex: 2, backgroundColor: "pink" },
  View5: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  }
});
