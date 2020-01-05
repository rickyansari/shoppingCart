import React from "react";
import { Dimensions, View, Image, Text } from "react-native";

import { COLORS } from "app/styles/Colors";
import { RUPEES_SIGN } from "app/config/ENV";
import Images from "app/config/Images";

var { height, width } = Dimensions.get("window");

const CartItem = props => {
  const { itemData } = props;

  function renderCartItem() {
    const { imageName, name, offerPrice, price, purchasedQuantity } = itemData;
    return (
      <View
        style={{
          padding: 5,
          height: 61,
          backgroundColor: COLORS.WHITE,
          width: width
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row"
          }}
        >
          {renderItemImage(imageName)}
          {renderItemNameAndPrice(name, price, offerPrice)}
          {renderItemQuantityAndOfferPrice(offerPrice, purchasedQuantity)}
        </View>
        {renderSeparator()}
      </View>
    );
  }

  function renderItemImage(imageName) {
    return (
      <Image source={Images[imageName]} style={{ height: 45, width: 40 }} />
    );
  }

  function renderItemNameAndPrice(name, price, offerPrice) {
    return (
      <View style={{ flex: 1, marginHorizontal: 5 }}>
        <Text
          style={{
            color: COLORS.TEXT_GRAY,
            fontSize: 15,
            fontWeight: "500"
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            color: COLORS.TEXT_GRAY,
            fontSize: 15,
            fontWeight: "400"
          }}
        >
          {RUPEES_SIGN}
          {offerPrice}
          {"   "}
          <Text
            style={{
              fontSize: 12,
              textDecorationLine: "line-through"
            }}
          >
            {RUPEES_SIGN}
            {price}
          </Text>
        </Text>
      </View>
    );
  }

  function renderItemQuantityAndOfferPrice(offerPrice, purchasedQuantity) {
    return (
      <View
        style={{
          width: 50,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View
          style={{
            borderRadius: 30,
            width: 20,
            height: 20,
            backgroundColor: "green",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              color: COLORS.WHITE,
              alignSelf: "center",
              fontSize: 12,
              fontWeight: "500"
            }}
          >
            {purchasedQuantity}
          </Text>
        </View>

        <Text
          style={{
            color: COLORS.TEXT_GRAY,
            alignSelf: "center",
            fontSize: 15,
            fontWeight: "bold"
          }}
        >
          {RUPEES_SIGN}
          {offerPrice * purchasedQuantity}
        </Text>
      </View>
    );
  }

  function renderSeparator() {
    return (
      <View
        style={{
          width: width - 10,
          opacity: 0.2,
          height: 0.3,
          backgroundColor: COLORS.TEXT_GRAY
        }}
      />
    );
  }
  return renderCartItem();
};

export default CartItem;
