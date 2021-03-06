
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
import { AuthContext } from '../navigation/AuthProvider';
//import { GoogleAPI } from '../constants/GGKeys';
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/Ionicons';
import SelectBox from 'react-native-multi-selectbox'
import axios from 'axios';
import * as url from '../constants/url'
import { KeyboardAvoidingView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import { executeResult2 } from '../constants/execute2';
const AddPhotoScreen = ({ navigation }) => {

  const [image, setImage] = useState();
  const [responseGoogle, setResponseGoogle] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCate, setSelectedCate] = useState("");
  const [listCate, setListCate] = useState([]);
  const [form, setForm] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [publishDate, setPublishDate] = useState(new Date());
  const [isEdit, setIsEdit] = useState(-1)
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
  const { token } = React.useContext(AuthContext);

  React.useEffect(() => {
    getCate()
  }, [])
  const getCate = async () => {
    await axios.get(url.API_URL + 'category', {
      headers: {
        'authorization': "Bearer " + token
      }
    }).then(res => {
      if (res.status === 200) {
        const listCate = res.data.map((val) => ({ ...val, item: val.name }))
        setListCate(listCate)
      }
    })
  }
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
      base64: true
    });

    if (!result.cancelled) {
      setImage(result.base64);
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
      setImage(result.base64);
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
        // setResponseGoogle(
        //   {
        //     loading: false,
        //     googleVisionDetection: googleVisionRes.responses[0]?.fullTextAnnotation?.text,
        //     array: googleVisionRes.responses[0]?.fullTextAnnotation?.text?.split('\n')
        //   }
        // )
        const executed_result = executeResult2(googleVisionRes.responses[0]?.textAnnotations)
        if (executed_result.length > 0) {
          console.log(executed_result);
          setForm(executed_result)
          // setResponseGoogle(executed_result)
        }

        setModalVisible(true)

      }).catch((error) => { console.log(error) })
  }
  // const executeResult = (data) => {
  //   let result = [];

  //   let temp = [];
  //   let total = [];
  //   for (let i = 1; i < data.length; i++) {
  //     if (data[i + 1]?.boundingPoly?.vertices[0].x - data[i]?.boundingPoly?.vertices[1].x > 0) {
  //       temp.push(data[i].description);
  //     } else {
  //       temp.push(data[i].description);
  //       result.push(temp);
  //       temp = [];
  //     }
  //   }
  //   console.log("result", result);
  //   for (let i = 1; i < result.length; i++) {
  //     if (result[i][result[i].length - 1].match(/\d*\.\d+/) && result[i - 1][0].match(/\D/)) {

  //       total.push({
  //         title: result[i - 1].join(' '),
  //         price: result[i][result[i].length - 1]
  //       })
  //     }
  //   }
  //   setForm(total)
  //   setResponseGoogle(result)
  // }
  const handleClodeModal = () => {
    setModalVisible(false)
  }
  const handeAddBill = async () => {
    await axios.post(url.API_URL + 'bills',

      {
        name: "Bill m???i",
        categoryID: selectedCate,
        listItem: form,
        publishDate: publishDate,
        imageUrl: JSON.stringify({
          image: image
        }),
        createAt: Date.now()
      }
      , {
        headers: {
          "authorization": "Bearer " + token
        }
      }).then(res => {
        if (res.status === 200) {
          alert("Th??m h??a ????n th??nh c??ng")
          setForm([])
          setModalVisible(false)
          setName('')
          setPrice('')
        }
      })
  }

  //Delete item
  const removeItem = (id) => {
    let tempList = [...form];
    tempList.splice(id, 1)
    setForm(tempList)
  }

  const editItem = (id) => {
    let tempList = [...form];
    tempList[id] = {
      title: editName,
      price: editPrice
    }
    setForm(tempList)
    setIsEdit(-1)
    setEditName('')
    setEditPrice('')
  }
  const renderInput = () => {
    return (
      <ScrollView
        style={{
          flex: 1,
          alignSelf: 'stretch',

        }}
      >
        {form.map((val, ind) =>
          <View
            key={ind}
            style={{
              flexDirection: "row",
              marginVertical: 5,
            }}
          >
            <Text
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: COLORS.darkgreen,
                borderRadius: 5,
                padding: 5,
                marginRight: 10
              }}
            >{val.title}</Text>
            <Text
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: COLORS.darkgreen,
                borderRadius: 5,
                padding: 5,
                marginRight: 10
              }}
            >{val.price}</Text>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderRadius: 5,
                borderColor: COLORS.yellow,
                padding: 5,
                marginRight: 10
              }}
              onPress={() => {
                setIsEdit(ind)
                setEditName(val.title)
                setEditPrice(val.price)
              }}
            ><Icon name="create" size={20} /></TouchableOpacity>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderRadius: 5,
                borderColor: "#cd0000",
                padding: 5
              }}
              onPress={() => removeItem(ind)}
            ><Icon name="trash" size={20} /></TouchableOpacity>
          </View>
        )}
        <View
          style={{
            flexDirection: 'row'
          }}
        >
          <TextInput
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: '#d3d3d3',
              borderRadius: 5,
              padding: 5,
              marginRight: 10
            }}
            clearButtonMode="always"
            placeholder="T??n s???n ph???m"
            placeholderTextColor="#999999"
            onChangeText={(val) => setName(val)}
          />
          <TextInput
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: '#d3d3d3',
              borderRadius: 5,
              padding: 5,
              marginRight: 10
            }}
            clearButtonMode="always"
            placeholder="Gi??"
            placeholderTextColor="#999999"
            keyboardType="numeric"
            onChangeText={(val) => setPrice(val)} />
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.darkgreen,
              borderRadius: 5,
              padding: 5,
            }}
            onPress={() => {
              var formData = [...form, {
                title: name,
                price: price
              }]
              setForm(formData)
            }}

          >
            <Text
              style={{
                color: COLORS.white,
                fontWeight: 'bold'
              }}
            >Th??m</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
  return (


    <View style={styles.container}>
      {/* {responseGoogle ? */}
      <Modal
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
        style={{
          backgroundColor: COLORS.white,
          padding: SIZES.padding / 2,
          borderRadius: 6,
          borderWidth: 1,
          borderColor: COLORS.teal,
          marginTop: 50
        }}
      >
        <View
          style={{
            width: '100%',
            flex: 1
          }}
        >
          <Modal
            visible={isEdit !== -1}

          >
            <KeyboardAvoidingView
              style={{
                height: SIZES.height,
                justifyContent: 'center',
                alignItems: 'center',
                width: SIZES.width - 50
              }}
              behavior="padding"
            >
              <View
                style={{
                  alignSelf: 'stretch',
                  marginHorizontal: 32,
                  backgroundColor: COLORS.white,
                  padding: SIZES.padding,
                  borderRadius: 10,
                  borderColor: COLORS.teal,
                  borderWidth: 1
                }}
              >
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10
                  }}
                  onPress={() => {
                    setIsEdit(-1)
                    setEditName('')
                    setEditPrice('')
                  }
                  }

                >
                  <Icon name='close-circle' size={30} />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '600',
                    alignSelf: 'center'
                  }}
                >Nh???p t??n :</Text>
                <TextInput style={{
                  borderWidth: 1,
                  borderColor: COLORS.teal,
                  borderRadius: 6,
                  height: 30,
                  marginTop: 8,
                  paddingHorizontal: 16,
                  fontSize: 16
                }}
                  onChangeText={(val) => setEditName(val)}
                  defaultValue={editName}
                />
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '600',
                    alignSelf: 'center',
                    marginVertical: 10
                  }}
                >Nh???p gi?? :</Text>
                <TextInput style={{
                  borderWidth: 1,
                  borderColor: COLORS.teal,
                  borderRadius: 6,
                  height: 30,
                  marginTop: 8,
                  paddingHorizontal: 16,
                  fontSize: 16
                }}
                  onChangeText={(val) => setEditPrice(val)}
                  defaultValue={editPrice}
                />
                <TouchableOpacity
                  style={{
                    marginTop: 24,
                    height: 30,
                    borderRadius: 6,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: COLORS.teal
                  }}
                  onPress={() => editItem(isEdit)}
                >
                  <Text
                    style={{
                      color: COLORS.white,
                      fontWeight: '600'
                    }}
                  >X??c nh???n</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </Modal>
          <TouchableOpacity
            onPress={handleClodeModal}
          >
            <Icon
              name='close-circle'
              size={25}
              style={{
                marginLeft: 'auto'
              }}
            />
          </TouchableOpacity>

          <ScrollView
            style={{
              alignSelf: 'stretch',
              padding: SIZES.padding / 2,
              borderRadius: 5

            }}>
            {renderInput()}
            {image &&
              <Image source={{ uri: `data:image/jpeg;base64,${image}` }} style={{ flexGrow: 1, width: '100%' }} />}


            {/* {responseGoogle ?
              responseGoogle?.map(val => <Text>{val}</Text>) : <Text>KH??NG T??M TH???Y</Text>} */}

          </ScrollView>
          <View>
            <Text>Ch???n ng??y t???o h??a ????n</Text>
            <DateTimePicker
              value={publishDate}
              mode="date"
              placeholder="DD/MM/YYYY"
              format="DD-MM-YYYY"
              maxDate={moment().format('DD-MM-YYYY')}
              confirmBtnText="Ch???n"
              cancelBtnText="H???y"
              onChange={(e, selectedDate) => { setPublishDate(selectedDate) }}
              locale="vi"
            />
          </View>
          <View
            style={{
              marginTop: 20,
            }}
          >
            <SelectBox
              label="Ch???n danh m???c ????? th??m v??o"
              options={listCate}
              value={selectedCate}
              onChange={(value) => setSelectedCate(value)}
              hideInputFilter={false}
            />

            <TouchableOpacity
              style={styles.panelButton}
              onPress={() => { handeAddBill() }}
            >
              <Text>X??C NH???N</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>



      <View style={{ alignItems: 'center', flex: 1, padding: SIZES.padding, paddingTop: 40 }}>
        {image && <Image source={{ uri: `data:image/jpeg;base64,${image}` }} style={{ flexGrow: 1, width: '100%' }} />}
      </View>
      <View style={styles.panel}>

        {image ?
          <View>
            <TouchableOpacity style={styles.panelButton} onPress={() => callGoogleVIsionApi(image)}>
              <Text style={styles.panelButtonTitle}>X??c nh???n</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton} onPress={pickImage}>
              <Text style={styles.panelButtonTitle}>Ch???n l???i</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton} onPress={takeImage}>
              <Text style={styles.panelButtonTitle}>Ch???p l???i</Text>
            </TouchableOpacity>
          </View>
          :
          <View>
            <TouchableOpacity style={styles.panelButton} onPress={() => setModalVisible(true)} >
              <Text style={styles.panelButtonTitle}>Nh???p th??? c??ng</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton} onPress={takeImage}>
              <Text style={styles.panelButtonTitle}>Ch???p ???nh</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton} onPress={pickImage}>
              <Text style={styles.panelButtonTitle}>Ch???n t??? th?? vi???n</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton}>
              <Text style={styles.panelButtonTitle}>H???y</Text>
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
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