import React, { Component, useState } from "react";
import { withNavigation } from "react-navigation";
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  ActivityIndicator,
  Text,
  Button
} from "react-native";
import Images from "../assets/Files";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import base64 from "base-64";

const Products = ({ id, name, serialNo, Navigation, userName, userPassword, sellingPrice }) => {
  const Nav = Navigation;
  const [selection, setSelection] = useState(false);
  const [update, setUpdate] = useState(false);
  const [input, setInput] = useState("");
  const [data, setData] = useState("");
  const [status, setStatus] = useState(false);
  const [finalStatus, getFinalStatus] = useState("");
  const serialNoThis = serialNo === null ? "Null" : "true";
  return (
    <View
      style={{
        marginLeft: 10,
        width: wp("95%"),
        height: hp("15%"),
        borderWidth: 1,
        borderColor: "green",
        marginBottom: 10,
        backgroundColor: selection ? "rgba(0, 177, 106, 1)" : "white"
      }}
      onTouchEnd={() => {
        setSelection(!selection);
        if (serialNoThis === "true") {
          setUpdate(true);
        } else if (serialNoThis === "Null") {
          alert("You select an item which does not have any Serial Number Attached");
          Nav.navigate("ThirdPage", {
            id: id,
            name: name,
            sellingPrice: sellingPrice,
            serialNumber: finalStatus
          });
        }
      }}
    >
      <View
        style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "stretch" }}
      >
        <Text>ID: {id}</Text>
        <Text>P_Name:{name}</Text>
        <Text>P_serialNo:{serialNoThis}</Text>
      </View>

      {//here verification code begins
      update ? (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TextInput
            style={{
              marginTop: 5,
              marginLeft: 50,
              width: wp("70%"),
              height: hp("5%"),
              fontSize: 16,
              backgroundColor: "rgba(238,238,238,0.5)"
            }}
            placeholder="Please type Correct Serial number "
            onChangeText={input => setInput(input)}
            value={input}
          />
          <Button
            title="Search"
            onPress={() => {
              alert(
                "your serial number" + input + " is being Matching kindly hold for two seconds"
              );
              const token = userName + ":" + userPassword;
              const DataToken = base64.encode(token);
              const header = new Headers();
              //Please keep in mind we have to provide some space in Basic like "Basic "
              header.set("Authorization", "Basic " + DataToken);
              const session_url = "http://ssmt.vivostore.com.sg/api/serialnumber";
              fetch(session_url, {
                method: "GET",
                headers: header
              })
                .then(response => response.json())
                .then(responseJSON => {
                  setData(responseJSON);
                  setStatus(true);
                })
                .catch(error => console.log(error.message));
            }}
          />
        </View>
      ) : null}

      {status ? (
        <FlatList
          data={data}
          renderItem={({ item }) => {
            if (item.product_id === id && item.serialNumber === input) {
              getFinalStatus(item.serialNumber);
              alert("Serial Number Matched");
              setTimeout(() => {
                Nav.navigate("ThirdPage", {
                  id: id,
                  name: name,
                  sellingPrice: sellingPrice,
                  serialNumber: finalStatus
                });
              }, 1000);
            }
          }}
          keyExtractor={item => item.id.toString()}
        />
      ) : null}
    </View>
  );
};

class FourthPage extends Component {
  constructor(props) {
    super(props);
    const { state } = this.props.navigation;
    this.state = {
      indicator: false,
      userName: state.params.userName,
      userPassword: state.params.userPassword,
      Data: ""
    };
  }
  //Autenticate Credientials and get JSON Data Back
  AuthenticateStock = () => {
    this.setState({ indicator: true });
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
      .then(response => response.json())
      .then(responseJSON => {
        this.setState({
          indicator: false,
          Data: responseJSON
        });
      })
      .catch(error => console.log(error.message));
  };

  componentDidMount() {
    this.AuthenticateStock();
  }
  render() {
    return (
      <View style={styles.Main}>
        {/*Header Block */}
        <View style={styles.Header}>
          <Image
            source={Images.AllProduct}
            style={{ width: wp("100%"), height: hp("15%"), resizeMode: "contain", marginTop: 0 }}
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
        <ActivityIndicator size="large" color="green" animating={this.state.indicator} />
        {this.state.indicator ? (
          <Text style={{ textAlign: "center", color: "rgba(0, 177, 106, 1)", fontSize: 20 }}>
            Loading...!
          </Text>
        ) : null}

        {//here i'm saying when we get data from the Api then this will called FlatList
        this.state.Data != null ? (
          <View>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.state.Data}
              renderItem={({ item }) => (
                <Products
                  id={item.id}
                  name={item.productName}
                  serialNo={item.serialNumber}
                  userName={this.state.userName}
                  userPassword={this.state.userPassword}
                  Navigation={this.props.navigation}
                  sellingPrice={item.sellingPrice}
                />
              )}
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator={false}
            />
          </View>
        ) : null}
      </View>
    );
  }
}

export default withNavigation(FourthPage);

const styles = StyleSheet.create({
  Main: {
    flex: 1,
    marginTop: 23
  },
  Header: {
    height: hp("10%"),
    marginTop: 0,
    justifyContent: "flex-start"
  },
  Search: {
    height: hp("15%"),
    backgroundColor: "rgba(238, 238, 238, 1)",
    justifyContent: "center",
    alignItems: "center"
  }
});
