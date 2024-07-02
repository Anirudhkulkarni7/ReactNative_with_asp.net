// import React, { useState } from 'react';
// import { View, Button, Image, StyleSheet, Alert } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import axios from 'axios';

// export default function App() {
//   const [image, setImage] = useState(null);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   const uploadImage = async () => {
//     if (!image) return;

//     let formData = new FormData();
//     formData.append('file', {
//       uri: image,
//       name: 'photo.jpg',
//       type: 'image/jpeg'
//     });

//     try {
//       const response = await axios.post('http://192.168.29.234:5000/api/ImgDemoControler', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log('Upload success', response.data);
//       Alert.alert('Upload success', 'Image uploaded successfully');
//     } catch (error) {
//       console.error('Upload failed', error);
//       Alert.alert('Upload failed', error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Pick an image from gallery" onPress={pickImage} />
//       {image && (
//         <>
//           <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
//           <Button title="Post Image" onPress={uploadImage} />
//         </>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',  
//     alignItems: 'center',
//   },
// });






//*****************************************88 */
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_URL = 'http://192.168.65.103:5277/api/ReactNativeDemo'; // Replace with your backend IP and endpoint. chirag laptop address. it is working everytime. but have to test it in same network.
    // const API_URL = 'http://192.168.29.234:5277/api/Demo'; // spoorthi ip address.

    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>  
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.body}>
          <Text style={styles.sectionTitle}>Data from Backend:</Text>
          <Text>{JSON.stringify(data)}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    backgroundColor: 'white',
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
});

export default App;




