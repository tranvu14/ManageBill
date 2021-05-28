
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Platform,
  Button,
  Image,
  ScrollView,
  Picker
} from 'react-native';
import { COLORS, SIZES } from '../constants'
// import { useTheme } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
//import { GoogleAPI } from '../constants/GGKeys';
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/Ionicons';


const AddPhotoScreen = ({ navigation }) => {

  const [image, setImage] = useState();
  const [responseGoogle, setResponseGoogle] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState("java");

  // const takePhotoFromCamera = () => {
  //   ImagePicker.openCamera({
  //     compressImageMaxWidth: 300,
  //     compressImageMaxHeight: 300,
  //     cropping: true,
  //     compressImageQuality: 0.7
  //   }).then(image => {
  //     // console.log(image);
  //     setImage(image.path);
  //     // console.log(bs.current);
  //   });
  // }

  // const choosePhotoFromLibrary = () => {
  //   ImagePicker.openPicker({
  //     width: 300,
  //     height: 300,
  //     cropping: true,
  //     compressImageQuality: 0.7
  //   }).then(image => {
  //     //console.log(image);
  //     setImage(image.path);
  //     // bs.current.snapTo(1);
  //   });
  // }
  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const takeImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      base64: true
    });
    if (!result.cancelled) {
      setImage(result.uri?.split(",")[1]);
    }
  };

  const callGoogleVIsionApi = async (base64) => {
    let googleVisionRes = await fetch('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBQ_3-Dmkjjo9AixLZd2Mp0mUE21_hkdZk', {
      method: 'POST',
      body: JSON.stringify({
        "requests": [
          {
            "image": {
              "content": base64
            },
            "features": [
              { type: "DOCUMENT_TEXT_DETECTION", maxResults: 5 }
            ],
          }
        ]
      })
    });

    await googleVisionRes.json()
      .then(googleVisionRes => {
        setResponseGoogle(
          {
            loading: false,
            googleVisionDetection: googleVisionRes.responses[0]?.fullTextAnnotation?.text,
            array: googleVisionRes.responses[0]?.fullTextAnnotation?.text?.split('\n')
          }
        )
        executeResult(googleVisionRes.responses[0]?.fullTextAnnotation?.text?.split('\n'))
        setModalVisible(true)

      }).catch((error) => { console.log(error) })
  }

  const executeResult = (data) => {
    console.log(data);
  }
  const handleClodeModal = () => {
    setModalVisible(false)
  }
  return (


    <View style={styles.container}>
      {/* {responseGoogle ? */}
      <Modal
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
        style={{
          flex: 1,
          margin: 'auto',
          width: '100%',
          backgroundColor: COLORS.white,
          padding: SIZES.padding
        }}
      >
        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%'
          }}
        >
          <TouchableOpacity
            onPress={handleClodeModal}
          >
            <Icon
              name='close-circle'
              size={20}
              style={{
                marginLeft: 'auto'
              }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{
            width: SIZES.width * 0.8,
            height: SIZES.height * 0.6,
            alignSelf: 'center',
            padding: SIZES.padding / 2,
            backgroundColor: COLORS.darkgray,
            borderRadius: 5

          }}>


          {responseGoogle ?
            responseGoogle?.array?.map(val => <Text>{val}</Text>) : <Text>KHÔNG TÌM THẤY</Text>}

        </ScrollView>
        <View>
          <Picker
            selectedValue={selectedValue}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
          <TouchableOpacity style={styles.panelButton}>
            <Text>XÁC NHẬN</Text>
          </TouchableOpacity>

        </View>
      </Modal>
      <View style={styles.panel}>
        <View style={{ alignItems: 'center', flex: 1 }}>
          {image && <Image source={{ uri: image }} style={{ flexGrow: 1, width: '100%' }} />}
        </View>
        {image ?
          <View>
            <TouchableOpacity style={styles.panelButton} onPress={() => callGoogleVIsionApi(image)}>
              <Text style={styles.panelButtonTitle}>Xác nhận</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton} onPress={takeImage}>
              <Text style={styles.panelButtonTitle}>Chọn lại</Text>
            </TouchableOpacity>
          </View>
          :
          <View>
            <TouchableOpacity style={styles.panelButton} onPress={takeImage}>
              <Text style={styles.panelButtonTitle}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton} onPress={pickImage}>
              <Text style={styles.panelButtonTitle}>Choose From Library</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton}>
              <Text style={styles.panelButtonTitle}>Cancel</Text>
            </TouchableOpacity>
          </View>
        }
      </View>

    </View>

  );
};

export default AddPhotoScreen;

const styles = StyleSheet.create({
  container: {

    flex: 1,
    justifyContent: 'center'
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    display: 'flex',
    flexDirection: 'column',
    flex: 1
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#009387',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: 0,
    paddingLeft: 10,
    color: '#05375a',
  },
});