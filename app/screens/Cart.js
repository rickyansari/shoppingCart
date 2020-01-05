import React, { Component } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { COLORS } from "app/styles/Colors";
import { RUPEES_SIGN } from "app/config/ENV";
import CartItem from "app/components/CartItem";
import Images from "app/config/Images";

var { height, width } = Dimensions.get("window");

export default class Cart extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      cartItems: navigation.getParam("purchasedProducts", {}),
      totalAmount: navigation.getParam("totalAmount", 0),
      totalDiscount: navigation.getParam("totalDiscount", 0),
      amountToPay: navigation.getParam("amountToPay", 0)
    };
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
        {this.renderHeader()}
        {this.renderSeparator()}
        {this.renderCartItems()}
        {this.renderBillDetail()}
        {this.renderPayButton()}
      </View>
    );
  }

  renderHeader() {
    const textStyle = {
      fontSize: 15,
      color: COLORS.TEXT_GRAY,
      fontWeight: "400"
    };
    return (
      <View
        style={{
          flexDirection: "row",
          padding: 5,
          alignItems: "center",
          backgroundColor: COLORS.WHITE
        }}
      >
        <TouchableOpacity
          style={{ paddingHorizontal: 10, paddingVertical: 5 }}
          onPress={() => this.props.navigation.goBack()}
        >
          <Image
            source={Images.back}
            style={{ height: 15, width: 15, paddingHorizontal: 10 }}
          />
        </TouchableOpacity>
        <Text style={{ ...textStyle }}> Cart </Text>
      </View>
    );
  }

  renderSeparator() {
    return (
      <View
        style={{
          width: width - 10,
          marginHorizontal: 5,
          opacity: 0.2,
          height: 0.3,
          backgroundColor: COLORS.TEXT_GRAY
        }}
      />
    );
  }

  renderCartItems() {
    const { cartItems = {} } = this.state;
    return (
      <ScrollView style={{ marginBottom: 180 }}>
        {Object.values(cartItems).map(product => {
          return <CartItem key={product.productId} itemData={product} />;
        })}
      </ScrollView>
    );
  }

  renderBillDetail() {
    const { totalAmount = 0, totalDiscount = 0, amountToPay = 0 } = this.state;
    return (
      <View
        style={{
          width: "100%",
          backgroundColor: COLORS.TEXT_GRAY,
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          bottom: 50,
          paddingVertical: 5,
          left: 0
        }}
      >
        {this.renderFieldNameAndData({
          name: "Amount",
          data: totalAmount,
          textStyle: { color: COLORS.WHITE }
        })}
        {this.renderFieldNameAndData({ name: "Discount", data: totalDiscount })}
        {this.renderFieldNameAndData({
          name: "Delivery Fee",
          data: "Always Free",
          isCurrency: false
        })}
        <View style={{ backgroundColor: COLORS.WHITE, height: 0.2, width }} />
        {this.renderFieldNameAndData({
          name: "Amount to Pay",
          data: amountToPay,
          textStyle: { color: COLORS.WHITE, fontWeight: "bold" }
        })}
      </View>
    );
  }

  renderFieldNameAndData({
    name,
    data,
    textStyle = {},
    isCurrency = true
  } = {}) {
    const color = COLORS.APP_THEME_GREEN;
    const fontSize = 15;
    return (
      <View style={{ margin: 5, width: width - 10, flexDirection: "row" }}>
        <Text style={{ flex: 1, color, fontSize, ...textStyle }}>{name}</Text>
        <Text style={{ color, fontSize, ...textStyle }}>
          {isCurrency ? RUPEES_SIGN : null}
          {data}
        </Text>
      </View>
    );
  }

  renderPayButton() {
    const { amountToPay = 0 } = this.state;
    return (
      <View
        style={{
          width: "100%",
          height: 50,
          backgroundColor: COLORS.GREEN,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          position: "absolute",
          bottom: 0,
          left: 0
        }}
      >
        <TouchableOpacity
          style={{
            width: "50%",
            height: "100%",
            backgroundColor: COLORS.WHITE,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={{ color: COLORS.TEXT_GRAY, fontSize: 15 }}>
            TOTAL: {RUPEES_SIGN}
            {amountToPay}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "50%",
            height: "100%",
            backgroundColor: COLORS.GREEN,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={{ color: COLORS.WHITE, fontSize: 15 }}>
            PROCEED TO PAY
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
