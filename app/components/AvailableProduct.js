import React from "react";
import {
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { COLORS } from "app/styles/Colors";
import { RUPEES_SIGN } from "app/config/ENV";
import Images from "app/config/Images";

var { height, width } = Dimensions.get("window");

const AvailableProduct = props => {
  const { productData, addProductToPurchaseList = () => {} } = props;

  function renderAvailableProduct() {
    const { productId, imageName, name, price, offerPrice } = productData;
    return (
      <View
        key={productId}
        style={{
          flex: 1,
          margin: 5,
          width: width / 3,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {renderProductImageAndAddButton(productId, imageName)}
        {renderProductName(name)}
        {renderPricingDetail(price, offerPrice)}
      </View>
    );
  }

  function renderProductImageAndAddButton(productId, imageName) {
    return (
      <ImageBackground
        source={Images[imageName]}
        style={{ width: "100%", height: height / 6 }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.APP_THEME_GREEN,
            marginLeft: width / 3 - 63,
            margin: 3,
            width: 60,
            height: 30,
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row"
          }}
          onPress={() => addProductToPurchaseList(productId)}
        >
          <Text
            style={{ fontSize: 20, fontWeight: "bold", color: COLORS.WHITE }}
          >
            +{" "}
          </Text>
          <Text
            style={{ fontSize: 13, fontWeight: "bold", color: COLORS.WHITE }}
          >
            Add{" "}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }

  function renderProductName(name) {
    return (
      <Text
        style={{
          alignSelf: "center",
          color: COLORS.TEXT_BLACK,
          fontSize: 13,
          fontWeight: "600",
          marginHorizontal: 3
        }}
      >
        {name}
      </Text>
    );
  }

  function renderPricingDetail(price, offerPrice) {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10
        }}
      >
        <Text style={{ color: COLORS.TEXT_GRAY, fontSize: 15 }}>
          {RUPEES_SIGN}
          {offerPrice}
        </Text>
        <Text
          style={{
            marginLeft: 7,
            fontSize: 12,
            textDecorationLine: "line-through"
          }}
        >
          {RUPEES_SIGN}
          {price}
        </Text>
      </View>
    );
  }

  return renderAvailableProduct();
};

export default AvailableProduct;
