import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'expo-router';

const Home = () => {
  const [adIndex, setAdIndex] = useState(1);
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuPress = () => {
    setShowMenu(!showMenu);
  };

  const ads = [
    require("../assets/images/ad1.jpg"),
    require("../assets/images/ad2.jpg"),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAdIndex(prevIndex => (prevIndex + 1) % ads.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handlePrevAd = () => {
    setAdIndex(prevIndex => (prevIndex - 1 + ads.length) % ads.length);
  };

  const handleNextAd = () => {
    setAdIndex(prevIndex => (prevIndex + 1) % ads.length);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.container1}>
          <Link to="/screens/Cart">
            <Image
              style={{ width: 25, height: 25, marginRight: 20 }}
              source={require("../assets/images/shopping-cart.png")}
            />
          </Link>
          <View style={styles.container2}>
            <Image
              style={{ width: 25, height: 25 }}
              source={require("../assets/images/search.png")}
            />
          </View>
        </View>
        {showMenu && (
          <View style={styles.sideMenu}>
            <Image
              style={{ width: 50, height: 50, marginBottom: 10 ,borderRadius:100}}
              source={require("../assets/images/user.jpg")}
            />
            <Text>User Name</Text>
            <TouchableOpacity onPress={() => console.log("My Account Pressed")}>
              <Text style={styles.sideMenuItem}>My Account</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={{ width: "100%", height: 200, alignItems: "center" }}>
        <View style={{ width: "100%", height: 200, marginRight: 20 }}>
          <Image
            style={{ width: "100%", height: 200, marginRight: 20 }}
            source={ads[adIndex]}
          />
          <TouchableOpacity onPress={handlePrevAd} style={styles.arrowButton}>
            <Text>{"<"}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNextAd} style={[styles.arrowButton, { right: 0 }]}>
            <Text>{">"}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View style={{ marginTop: 40, padding: 15 }}>
          <Text style={{ fontSize: 25, fontWeight: 600, color: "#264143" }}>
            Product
          </Text>
        </View>
        <View style={{ width: "100%", flexDirection: "row", justifyContent: "center", flexWrap: "wrap" }}>
          {/* Product Cards */}
        </View>
      </View>      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 55,
    backgroundColor: "#F6F6F6",
    padding: 15,
  },
  container2: {
    flexDirection: "row",
  },
  arrowButton: {
    position: "absolute",
    top: "50%",
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    padding: 10,
    borderRadius: 5,
  },
  sideMenu: {
    height:150,
    alignItems:"center",
    top: 10, 
    right: 0,
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },
  sideMenuItem: {
    paddingVertical: 5,
  },
});

export default Home;
