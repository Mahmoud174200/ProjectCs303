import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Pressable,Alert } from 'react-native';
import img from '../assets/images/th_1.jpeg';

const Cart = () => {
    const [cartData, setCartData] = useState([
        { id: 1, image: img, price: 1000, name: "Product1", quantity: 0 },
        { id: 2, image: img, price: 1500, name: "Product2", quantity: 0 },
        { id: 3, image: img, price: 1600, name: "Product3", quantity: 0 },
        { id: 4, image: img, price: 1700, name: "Product4", quantity: 0 },
        { id: 5, image: img, price: 1800, name: "Product5", quantity: 0 }
    ]);

    const renderItem = ({ item }) => {
        const handleIncrement = () => {
            const updatedCart = cartData.map(prod => {
                if (prod.id === item.id) {
                    return { ...prod, quantity: prod.quantity +1};
                }
                return prod;
            });
            setCartData(updatedCart);
        };

        const handleDecrement = () => {
            if (item.quantity > 0) {
                const updatedCart = cartData.map(prod => {
                    if (prod.id === item.id) {
                        return { ...prod, quantity: prod.quantity -1 };
                    }
                    return prod;
                });
                setCartData(updatedCart);
            }
        };

        return (
            <View style={styles.item}>
                <Pressable >
                <Image source={item.image} style={styles.image} />
                </Pressable>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>{item.price}</Text>
                <View style={styles.counter}>
                    <Pressable onPress={handleDecrement} style={styles.counterButton}>
                        <Text>-</Text>
                    </Pressable>
                    <Text>{item.quantity}</Text>
                    <Pressable onPress={handleIncrement} style={styles.counterButton}>
                        <Text>+</Text>
                    </Pressable>
                </View>
            </View>
        );
    };

    
    const totalPrice = cartData.reduce((total, item) => total + (item.price * item.quantity), 0);

    const handlePayNow = () => {
        
        console.log("Payment processed!");
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.logo} source={require('../assets/images/th.jpeg')} />
                <Text style={styles.title}>My Cart</Text>
            </View>
            <View style={styles.content}>
                <FlatList
                    data={cartData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
            <View style={styles.totalPriceContainer}>
                <Text style={styles.totalPriceText}>Total Price: ${totalPrice}</Text>
                <Pressable onPress={handlePayNow} style={styles.payNowButton}>
                    <Text style={styles.payNowButtonText}>Pay Now</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: '#3d0f91',
        width: '80%',
        marginHorizontal: '5%',
        marginTop: 20
    },
    header: {
        flexDirection: "row",
        alignItems: 'center',
    },
    logo: {
        width: 35,
        height: 35,
    },
    title: {
        marginLeft: 10,
        fontSize: 25
    },
    content: {
        flex: 1,
        marginTop: 20
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius:10
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 20,
        color: '#888',
        margin:10,
    },
    counter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    counterButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        borderRadius: 52,
        marginHorizontal: 15,
    },
    totalPriceContainer: {
        alignItems: 'center',
        marginTop: 20,
        flexDirection:"row",
        
        
    },
    totalPriceText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    payNowButton: {
        marginTop: 10,
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 10,
        margin:5,
        marginLeft:65
    },
    payNowButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom:3,
        height:25,
       
        
    },
});

export default Cart;
