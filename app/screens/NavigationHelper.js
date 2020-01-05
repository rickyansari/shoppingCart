import { createStackNavigator, createAppContainer } from "react-navigation";

import Cart from "app/screens/Cart";
import OrderSummary from "app/screens/OrderSummary";

const AppNavigator = createStackNavigator(
  {
    OrderSummary,
    Cart
  },
  {
    headerMode: "none"
  }
);

export default createAppContainer(AppNavigator);
