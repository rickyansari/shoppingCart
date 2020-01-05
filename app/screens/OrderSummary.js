import React, { Component } from "react";
import {
  Image,
  Dimensions,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";

import { ADDRESS, RUPEES_SIGN } from "app/config/ENV";
import { COLORS } from "app/styles/Colors";
import AvailableProduct from "app/components/AvailableProduct";
import Images from "app/config/Images";
import products from "app/static/Products";
import PurchasedProduct from "app/components/PurchasedProduct";

var { height, width } = Dimensions.get("window");

export default class OrderSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products,
      purchasedProductsId: [],
      availableProductsId: Object.keys(products) || [],
      address: ADDRESS
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderHeader()}
        {this.renderSeparator()}
        <ScrollView
          style={{
            width: width,
            backgroundColor: COLORS.WHITE,
            marginBottom: 50
          }}
        >
          {this.renderPurchasedProducts()}
          {this.renderAvailableProducts()}
          {this.renderBillingDetail()}
          {this.renderDeliveryAddress()}
        </ScrollView>
        {this.renderConfirmOrderButton()}
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
      <View style={{ flexDirection: "row", margin: 5, alignItems: "center" }}>
        <Image
          source={Images.back}
          style={{ height: 15, width: 15, paddingHorizontal: 10 }}
        />
        <Text style={{ ...textStyle }}> Order Summary </Text>
      </View>
    );
  }

  renderSeparator() {
    return (
      <View
        style={{
          width: width - 10,
          margin: 5,
          opacity: 0.2,
          height: 0.3,
          backgroundColor: COLORS.TEXT_GRAY
        }}
      />
    );
  }

  removeItemFromList({ list = [], item = "" } = {}) {
    var index = list.indexOf(item);
    if (index > -1) {
      list.splice(index, 1);
    }
  }

  removeProductFromPurchasedProducts(productId) {
    const clonedState = JSON.parse(JSON.stringify(this.state));
    const { availableProductsId, purchasedProductsId, products } = clonedState;
    if (purchasedProductsId.includes(productId)) {
      availableProductsId.push(productId);
      products[productId].purchasedQuantity -= 1;
      this.removeItemFromList({
        list: purchasedProductsId,
        item: productId
      });
      this.setState({
        purchasedProductsId,
        availableProductsId,
        products
      });
    }
  }

  onPressPlusIcon = productId => {
    const { products } = this.state;
    products[productId].purchasedQuantity += 1;
    this.setState({ products: { ...products } });
  };

  onPressMinusIcon = productId => {
    const { products } = this.state;
    if (products[productId].purchasedQuantity === 1) {
      this.removeProductFromPurchasedProducts(productId);
    } else {
      products[productId].purchasedQuantity -= 1;
      this.setState({ products: { ...products } });
    }
  };

  renderPurchasedProducts() {
    const { products = {}, purchasedProductsId = [] } = this.state;
    if (!purchasedProductsId.length) return null;
    return purchasedProductsId.map(productId => {
      return (
        <PurchasedProduct
          key={productId}
          productData={products[productId]}
          onPressPlusIcon={this.onPressPlusIcon}
          onPressMinusIcon={this.onPressMinusIcon}
        />
      );
    });
  }

  addProductToPurchaseList = productId => {
    const clonedState = JSON.parse(JSON.stringify(this.state));
    const { availableProductsId, purchasedProductsId, products } = clonedState;
    if (availableProductsId.includes(productId)) {
      purchasedProductsId.push(productId);
      this.removeItemFromList({
        list: availableProductsId,
        item: productId
      });
      products[productId].purchasedQuantity += 1;
      this.setState({
        purchasedProductsId,
        availableProductsId,
        products
      });
    }
  };

  renderAvailableProducts() {
    const { products = {}, availableProductsId = [] } = this.state;
    if (!availableProductsId.length) {
      return this.renderNoMoreProductsAvailable();
    }
    return (
      <View
        style={{
          margin: 5,
          backgroundColor: COLORS.LIGHT_GRAY,
          width: width - 10
        }}
      >
        <Text style={{ marginVertical: 10, marginLeft: 10, fontSize: 15 }}>
          You may also add:
        </Text>
        <ScrollView horizontal={true} style={{ marginHorizontal: 5 }}>
          {availableProductsId.map(productId => (
            <AvailableProduct
              key={productId}
              productData={products[productId]}
              addProductToPurchaseList={this.addProductToPurchaseList}
            />
          ))}
        </ScrollView>
      </View>
    );
  }

  renderNoMoreProductsAvailable() {
    return null;
  }

  getBillingDetail() {
    const { products = {}, purchasedProductsId = [] } = this.state;
    let [totalAmount, totalDiscount, amountToPay] = [0, 0, 0];
    purchasedProductsId.map(productId => {
      const {
        price = 0,
        discount = 0,
        offerPrice = 0,
        purchasedQuantity = 1
      } = products[productId];
      totalAmount += price * purchasedQuantity;
      totalDiscount += discount * purchasedQuantity;
      amountToPay += offerPrice * purchasedQuantity;
    });
    return { totalAmount, totalDiscount, amountToPay };
  }

  renderBillingDetail() {
    const {
      totalAmount = 0,
      totalDiscount = 0,
      amountToPay = 0
    } = this.getBillingDetail();
    return (
      <View>
        {this.renderFieldNameAndData({
          name: "Amount",
          data: totalAmount,
          textStyle: { color: COLORS.TEXT_GRAY }
        })}
        {this.renderFieldNameAndData({ name: "Discount", data: totalDiscount })}
        {this.renderFieldNameAndData({
          name: "Delivery Fee",
          data: "Always Free",
          isCurrency: false
        })}
        {this.renderSeparator()}
        {this.renderFieldNameAndData({
          name: "Amount to Pay",
          data: amountToPay,
          textStyle: { color: COLORS.TEXT_BLACK, fontWeight: "bold" }
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
    const color = COLORS.GREEN;
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

  renderDeliveryAddress() {
    const { address, editable = false } = this.state;
    return (
      <View style={{ margin: 5 }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ flex: 1, fontSize: 15, fontWeight: "300" }}>
            Delivery address
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.setState({ editable: !editable });
            }}
          >
            <Text style={{ fontSize: 12 }}>
              {editable ? "Save Address" : "Change Address"}
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={{
            marginVertical: 5,
            fontSize: 15,
            height: 80,
            backgroundColor: COLORS.LIGHT_GRAY
          }}
          onChangeText={address => this.setState({ address })}
          value={address}
          multiline={true}
          editable={editable}
          maxLength={100}
          borderBottomColor={COLORS.TEXT_BLACK}
        />
      </View>
    );
  }

  renderConfirmOrderButton() {
    const { products = {}, purchasedProductsId = [] } = this.state;
    const {
      totalAmount = 0,
      totalDiscount = 0,
      amountToPay = 0
    } = this.getBillingDetail();
    return (
      <TouchableOpacity
        style={{
          width: "100%",
          height: 50,
          backgroundColor: COLORS.GREEN,
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          bottom: 0,
          left: 0
        }}
        onPress={() => {
          const purchasedProducts = {};
          purchasedProductsId.forEach(productId => {
            purchasedProducts[productId] = products[productId];
          });
          this.props.navigation.push("Cart", {
            purchasedProducts,
            totalAmount,
            totalDiscount,
            amountToPay
          });
        }}
      >
        <Text style={{ color: COLORS.WHITE, fontSize: 15 }}>Confirm Order</Text>
      </TouchableOpacity>
    );
  }
}
