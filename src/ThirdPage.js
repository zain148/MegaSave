import React, { Component, useState } from "react";
import { View, Image, StyleSheet, FlatList, Text } from "react-native";
import Images from "../assets/Files";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

const ProductCart = ({ id, ProductName, ProductPrice }) => {
  const [change, setChange] = useState(false);
  return (
    <View
      style={{
        marginLeft: 10,
        width: wp("95%"),
        height: hp("10%"),
        borderWidth: 2,
        borderColor: "green",
        marginBottom: 10,
        backgroundColor: change ? "rgba(0, 177, 106, 0.8)" : "white"
      }}
      onTouchEnd={() => {
        setChange(!change);
      }}
    >
      <View
        style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "stretch" }}
      >
        <Text>P_ID : {id}</Text>
        <Text>P_Name :{ProductName}</Text>

        <View style={{ margin: 3 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold", borderWidth: 1, borderColor: "black" }}>
            QUANTITY :{5}
          </Text>
        </View>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center", marginTop: 5 }}>
        <Text
          style={{ textAlign: "center", fontWeight: "bold", borderWidth: 1, borderColor: "black" }}
        >
          Serial No:{12 + "-" + 12 + "-" + 12 + "-" + 12}
        </Text>
      </View>
    </View>
  );
};
class ThirdPage extends Component {
  constructor(props) {
    super(props);
    //getParams from LoginScreen
    const { state } = this.props.navigation;

    this.state = {
      userName: state.params.userName,
      userPassword: state.params.userPassword,
      Data: [
        { id: 1, ProductName: "Alpha", Price: 200 },
        { id: 2, ProductName: "beta", Price: 200 },
        { id: 3, ProductName: "Gamma", Price: 200 },
        { id: 4, ProductName: "tera", Price: 200 },
        { id: 5, ProductName: "GomolOKo", Price: 200 },
        { id: 6, ProductName: "Pappi", Price: 200 }
      ]
    };
  }

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
          onTouchStart={() =>
            this.props.navigation.navigate("FourthPage", {
              userName: this.state.userName,
              userPassword: this.state.userPassword
            })
          }
        >
          <Image
            source={Images.AddProduct}
            style={{ width: wp("100%"), height: hp("15%"), resizeMode: "contain" }}
          />
        </View>
        {/* Add Products from AllProducts Page*/}
        <View style={styles.View3}>
          <FlatList
            data={this.state.Data}
            renderItem={({ item }) => (
              <ProductCart id={item.id} ProductName={item.ProductName} ProductPrice={item.Price} />
            )}
            keyExtractor={item => item.id.toString()}
          />
        </View>

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
