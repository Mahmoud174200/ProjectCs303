import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, FlatList, Modal } from 'react-native';
import { createProduct, updateProduct, deleteProduct, getAllProducts, getProductById } from '../firebase/products';

const ProductsScreen = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productUrl, setProductUrl] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const fetchedProducts = await getAllProducts();
    setProducts(fetchedProducts);
  };

  const handleAddProduct = async () => {
    if (!productName || !productPrice) {
      alert("Please enter product name and price.");
      return;
    }

    const price = parseInt(productPrice);

    try {
      await createProduct({ name: productName, price, productUrl });

      fetchProducts();

      setProductName('');
      setProductPrice('');
      setProductUrl('');

    } catch (error) {
      console.error("Error creating product:", error);
      alert("An error occurred while creating the product.");
    }
  };

  const handleDeleteProduct = async (productId) => {
    await deleteProduct(productId);

    fetchProducts();
  };

  const handleEditProduct = async () => {
    await updateProduct(selectedProduct.id, {
      name: productName,
      price: parseFloat(productPrice), 
    });
    
    fetchProducts();

    setEditModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Product Name"
          value={productName}
          onChangeText={text => setProductName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Product Price"
          keyboardType="numeric"
          value={productPrice}
          onChangeText={text => setProductPrice(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Product Url"
          keyboardType="numeric"
          value={productUrl}
          onChangeText={text => setProductUrl(text)}
        />
        <Pressable style={styles.button} onPress={handleAddProduct}>
          <Text style={styles.buttonText}>Add Product</Text>
        </Pressable>
      </View>
      <View style={styles.flatListContainer}>
        <FlatList
          data={products}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <Text>{item.name}</Text>
              <Text>{item.price}</Text>
              <Pressable onPress={() => { setSelectedProduct(item); setEditModalVisible(true); }}>
                <Text style={styles.editButton}>Edit</Text>
              </Pressable>
              <Pressable onPress={() => deleteProduct(item.id)
            
            }>
                <Text style={styles.deleteButton}>Delete</Text>
              </Pressable>
            </View>
          )}
        />
      </View>
      <Modal
        visible={editModalVisible}
        transparent={true}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Product Name"
              value={productName}
              onChangeText={text => setProductName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Product Price"
              keyboardType="numeric"
              value={productPrice}
              onChangeText={text => setProductPrice(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Product Url"
              keyboardType="numeric"
              value={productUrl}
              onChangeText={text => setProductUrl(text)}
            />
            <Pressable style={styles.button} onPress={handleEditProduct}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#264143',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    width: '60%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  flatListContainer: {
    flex: 1,
    width: '80%',
    marginTop: 20,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  editButton: {
    color: 'blue',
  },
  deleteButton: {
    color: 'red',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
});

export default ProductsScreen;
