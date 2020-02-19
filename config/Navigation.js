import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import FirstScreen from "../src/FirstPage";
import SecondScreen from "../src/SecondPage";
import ThirdScreen from "../src/ThirdPage";
import FourthScreen from "../src/FourthPage";

const Navigation = createStackNavigator(
  {
    FirstPage: {
      screen: FirstScreen,
      navigationOptions: {
        header: null
      }
    },
    SecondPage: {
      screen: SecondScreen,
      navigationOptions: {
        header: null
      }
    },
    ThirdPage: {
      screen: ThirdScreen,
      navigationOptions: {
        header: null
      }
    },
    FourthPage: {
      screen: FourthScreen,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "FirstPage",
    headermode: "none",
    mode: "card"
  }
);

const Navigate = createAppContainer(Navigation);
export default Navigate;
