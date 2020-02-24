import React, { Component, useState } from "react";
import { View, Image, StyleSheet, Text, Button, Alert } from "react-native";
import Images from "../assets/Files";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { TextInput } from "react-native-gesture-handler";

import base64 from "base-64";

const ProductCart = ({ Product_id, ProductName, ProductSerialNumber, Quantity }) => {
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
        <Text>P_ID : {Product_id}</Text>
        <Text>P_Name :{ProductName}</Text>

        <View style={{ margin: 3 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold", borderWidth: 1, borderColor: "black" }}>
            QUANTITY : {Quantity}
          </Text>
        </View>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center", marginTop: 5 }}>
        <Text
          style={{ textAlign: "center", fontWeight: "bold", borderWidth: 1, borderColor: "black" }}
        >
          Serial No:{ProductSerialNumber}
        </Text>
      </View>
    </View>
  );
};

class ThirdPage extends Component {
  state = {
    change: false,
    value: "1"
  };
  render() {
    const { state } = this.props.navigation;
    const userName = state.params.userName;
    const userPassword = state.params.userPassword;
    const product_id = state.params.id;
    const product_name = state.params.name;
    const sellingPrice = state.params.sellingPrice;
    const serialNumber = state.params.serialNumber;
    const object = {
      product_Id: product_id,
      product_Name: product_name,
      selling_Price: sellingPrice,
      serial_Number: serialNumber,
      Quantity: serialNumber ? 1 : 0
    };
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
          onTouchStart={() => {
            this.setState({ change: true });
            this.props.navigation.navigate("FourthPage", {
              userName: userName,
              userPassword: userPassword
            });
          }}
        >
          <Image
            source={Images.AddProduct}
            style={{ width: wp("100%"), height: hp("15%"), resizeMode: "contain" }}
          />
        </View>
        {/* Add Products from AllProducts Page*/}
        <View style={styles.View3}>
          {this.state.change ? (
            <ProductCart
              Product_id={object.product_Id}
              ProductName={object.product_Name}
              ProductSellingPrice={object.selling_Price}
              ProductSerialNumber={object.serial_Number}
              Quantity={object.Quantity}
            />
          ) : null}
          {this.state.change === true && object.Quantity === 0 ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 177, 106, 0.4)"
              }}
            >
              <TextInput
                style={{
                  marginLeft: 15,
                  width: wp("30%"),
                  height: hp("5%"),
                  fontSize: 16,
                  color: "black",
                  backgroundColor: "white",
                  textAlign: "center"
                }}
                placeholder="Enter Quantity"
                value={this.state.value}
                onChangeText={value => {
                  this.setState({ value });
                }}
              />
            </View>
          ) : null}
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Button
              title="calculate Total"
              onPress={() => {
                const value = object.selling_Price * this.state.value * 0.07;
                Alert.alert(
                  "Total Price",
                  "Your Final Price After adding 7% tax  value " +
                    0.07 +
                    "and Quantity " +
                    this.state.value +
                    "selling Price " +
                    object.selling_Price +
                    "FinalValue:= " +
                    Math.round(value) +
                    "&"
                );
              }}
            />
          </View>
        </View>

        <View style={styles.View4}>
          <Image
            source={Images.AddDiscount}
            style={{ width: wp("100%"), height: hp("25%"), resizeMode: "stretch" }}
          />
        </View>
        <View
          style={styles.View5}
          onTouchEnd={() => {
            setTimeout(() => {
              this.setState({ change: false });
            }, 3000);
            /* const Name = userName;
              const Password = userPassword;
              const token = Name + ":" + Password;
              const DataToken = base64.encode(token);

              const header = new Headers();
              //Please keep in mind we have to provide some space in Basic like "Basic "
              header.set("Authorization", "Basic " + DataToken);
              const session_url = "http://ssmt.vivostore.com.sg/api/cashsale";
              fetch(session_url, {
                method: "POST",
                body: JSON.stringify({
                  product_Id: object.product_Id.toString(),
                  quantity: this.state.value,
                  SellingPrice: object.selling_Price.toString()
                }),
                headers: {
                  DataToken,
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                credentials: "same-origin"
                //headers: header
              })
                .then(response => response.json())
                .then(responseOk => {
                  console.log(responseOk);
                })
                .catch(error => console.log("I'm error" + error.message));
            }, 3000);
            */
            (this.state.change === true && object.Quantity === 0) ||
            (this.state.change === true && object.Quantity === 1)
              ? alert("Your Data is being uploading.. Thanks!")
              : null;
          }}
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
