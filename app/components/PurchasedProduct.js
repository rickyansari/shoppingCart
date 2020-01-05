import React from "react";
import { Dimensions, View, Image, Text, TouchableOpacity } from "react-native";

import { COLORS } from "app/styles/Colors";
import { RUPEES_SIGN } from "app/config/ENV";
import Images from "app/config/Images";

var { height, width } = Dimensions.get("window");

const PurchasedProduct = props => {
  const {
    productData,
    onPressPlusIcon = () => {},
    onPressMinusIcon = () => {}
  } = props;

  function renderPurchasedProduct() {
    const {
      productId,
      imageName,
      name,
      price,
      offerPrice,
      purchasedQuantity
    } = productData;
    return (
      <View
        style={{
          margin: 5,
          height: 40,
          width: width - 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {renderProductImage(imageName)}
        {renderProductName(name)}
        {renderProductQuantityController(purchasedQuantity, productId)}
        {renderProductPriceData(price, offerPrice)}
      </View>
    );
  }

  function renderProductImage(imageName) {
    return (
      <Image source={Images[imageName]} style={{ height: "100%", width: 40 }} />
    );
  }

  function renderProductName(name) {
    return (
      <Text
        style={{
          flex: 3,
          color: COLORS.TEXT_GRAY,
          fontSize: 15,
          fontWeight: "400",
          marginLeft: 3
        }}
      >
        {name}
      </Text>
    );
  }

  function renderProductQuantityController(purchasedQuantity, productId) {
    return (
      <View
        style={{
          height: "90%",
          flex: 1.5,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderWidth: 1,
          borderColor: COLORS.LIGHT_GRAY
        }}
      >
        <TouchableOpacity onPress={() => onPressMinusIcon(productId)}>
          <Text
            style={{
              fontSize: 30,
              color: COLORS.TEXT_GRAY,
              fontWeight: "bold"
            }}
          >
            {" "}
            -{" "}
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            color: COLORS.APP_THEME_GREEN,
            fontWeight: "bold"
          }}
        >
          {purchasedQuantity}
        </Text>
        <TouchableOpacity onPress={() => onPressPlusIcon(productId)}>
          <Text
            style={{
              fontSize: 25,
              color: COLORS.APP_THEME_GREEN,
              fontWeight: "bold"
            }}
          >
            {" "}
            +{" "}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderProductPriceData(price, offerPrice) {
    return (
      <View
        style={{
          height: "100%",
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text
          style={{
            fontSize: 12,
            textDecorationLine: "line-through"
          }}
        >
          {RUPEES_SIGN}
          {price}
        </Text>
        <Text
          style={{
            color: COLORS.TEXT_GRAY,
            alignSelf: "center",
            fontSize: 15,
            fontWeight: "bold"
          }}
        >
          {RUPEES_SIGN}
          {offerPrice}
        </Text>
      </View>
    );
  }

  return renderPurchasedProduct();
};

export default PurchasedProduct;
