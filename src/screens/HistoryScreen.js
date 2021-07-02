import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,

} from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import * as url from '../constants/url'
import { AuthContext } from '../navigation/AuthProvider';
import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modals';
import { ScrollView } from 'react-native';

const HistoryScreen = () => {
  const [categories, setCategories] = useState([]);
  const [lastDay, setLastDay] = useState(7);
  const [isSelectDate, setIsSelectDate] = useState(false);
  const { token } = React.useContext(AuthContext);
  const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [endDate, setEndDate] = useState(new Date());
  const [detailBill, setDetailBill] = useState(null);
  useEffect(() => {
    if (token) {
      getHistoryBill()

    }
  }, [lastDay])

  const getHistoryBill = async () => {
    await axios.get(url.API_URL + "bills/last-days/" + lastDay,
      {
        headers: {
          "authorization": "Bearer " + token
        },
        params: {
          start_date: startDate,
          end_date: endDate
        }
      }
    ).then(res => {
      setCategories(res.data)
    })
  }
  const selectBill = async (id) => {
    await axios.get(url.API_URL + "bills/" + id,
      {
        headers: {
          "authorization": "Bearer " + token
        },
      }).then(
        res => setDetailBill(res.data)
      )
  }


  function renderHeader() {
    return (
      <View
        style={{
          paddingTop: 50,
          backgroundColor: COLORS.teal
        }}>
        <View
          style={{
            paddingHorizontal: SIZES.padding,
          }}

        >
          <Text style={{ color: COLORS.white, fontSize: 21, fontWeight: "bold" }}>Lịch sử chi tiêu</Text>
        </View>
        <Modal
          visible={isSelectDate}
        >
          <TouchableOpacity
            style={{
              marginLeft: "auto",
            }}
            onPress={() => {
              setIsSelectDate(false)
            }
            }
          >
            <Icon name='close-circle' size={30} />
          </TouchableOpacity>
          <View
            style={{
              width: SIZES.width - 100,
              padding: SIZES.padding
            }}
          >

            <Text
              style={{
                fontSize: 16,
                marginBottom: 10
              }}
            >Vui lòng chọn ngày bắt đầu:</Text>
            <DateTimePicker
              value={startDate}
              mode="date"
              placeholder="DD/MM/YYYY"
              format="DD-MM-YYYY"
              maxDate={moment().format('DD-MM-YYYY')}
              confirmBtnText="Chọn"
              cancelBtnText="Hủy"
              onChange={(e, selectedDate) => { setStartDate(selectedDate) }}
              locale="vi"
            />
            <Text
              style={{
                fontSize: 16,
                marginVertical: 10
              }}
            >Vui lòng chọn ngày kết thúc:</Text>
            <DateTimePicker
              value={endDate}
              mode="date"
              placeholder="DD/MM/YYYY"
              format="DD-MM-YYYY"
              maxDate={moment().format('DD-MM-YYYY')}
              confirmBtnText="Chọn"
              cancelBtnText="Hủy"
              onChange={(e, selectedDate) => { setEndDate(selectedDate) }}
              locale="vi"

            />
            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 5,
                backgroundColor: COLORS.teal,
                width: "50%",
                alignSelf: 'center',
                marginTop: SIZES.padding
              }}
            >
              <TouchableOpacity

                onPress={() => {
                  setIsSelectDate(false);
                  getHistoryBill()
                  console.log(startDate, endDate);

                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: COLORS.white
                  }}
                >

                  XÁC NHẬN
                </Text>

              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal
          visible={detailBill !== null}
        >
          <View
            style={{
              height: SIZES.height - 100,
              width: SIZES.width - 50,
              padding: SIZES.padding
            }}
          >
            <TouchableOpacity
              onPress={() => { setDetailBill(null) }}
              style={{
                position: 'absolute',
                right: 10,
                top: 10
              }}
            >
              <Icon
                name='close-circle'
                size={25}
                style={{
                  marginLeft: 'auto'
                }}
              />
            </TouchableOpacity>

            <ScrollView>
              {detailBill?.imageUrl && <Image source={{ uri: `data:image/jpeg;base64,${detailBill?.imageUrl}` }} />}
              <View style={{
                flexDirection: "row",
                marginVertical: 5,
              }}>
                <Text
                  style={{
                    flex: 1,
                    fontWeight: '600',
                    padding: 5,
                    marginRight: 10,
                    fontSize: 16
                  }}
                >Mặt hàng</Text>
                <Text
                  style={{
                    flex: 1,
                    fontWeight: '600',
                    padding: 5,
                    marginRight: 10,
                    fontSize: 16

                  }}
                >Giá tiền</Text>
              </View>
              {detailBill?.listItem.length > 0 &&
                detailBill?.listItem.map((val) => (
                  <View
                    key={val._id}
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
                    {/* <TouchableOpacity
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
                  ><Icon name="trash" size={20} /></TouchableOpacity> */}
                  </View>
                ))
              }
              {
                detailBill && <Text>{detailBill?.total}</Text>
              }

            </ScrollView>
          </View>
        </Modal>
        <View style={{
          flexDirection: 'row',
          marginTop: SIZES.padding,
          alignItems: 'center',
          backgroundColor: COLORS.lightBlue,
          paddingHorizontal: SIZES.padding,
          paddingVertical: 10
        }}>
          <TouchableOpacity style={{
            backgroundColor: COLORS.lightGray,
            height: 50,
            width: 50,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center'
          }}
            onPress={() => setIsSelectDate(true)}
          >
            <Icon name="calendar" size={20} />
            {/* <Image
              source={Icon}
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.lightBlue
              }}
            /> */}
          </TouchableOpacity>

          <View style={{ marginLeft: SIZES.padding }}>

            <Text style={{ fontSize: 16, color: COLORS.primary, fontWeight: "bold" }}>Từ :  {startDate.toLocaleDateString('vi-VN')}</Text>

            <Text style={{ fontSize: 16, color: COLORS.primary, fontWeight: "bold" }}>Đến :  {endDate.toLocaleDateString('vi-VN')}</Text>
          </View>
        </View>
      </View>
    )
  }
  function renderHistoryList() {
    const renderItem = ({ item }) => (
      <View
        // onPress={() => setSelectedCategory(item)}
        style={{
          flex: 1,
          flexDirection: 'row',
          margin: 5,
          paddingVertical: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          borderRadius: 5,
          backgroundColor: COLORS.white,

        }}
      >
        <View
          style={{
            width: '100%'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Text
              style={{
                ...FONTS.h2,
                fontWeight: 'bold'
              }}
            >{
                Intl.DateTimeFormat().format(new Date(item._id))

              }</Text>
            <Text
              style={{
                ...FONTS.h2,
                fontWeight: "bold"
              }}
            >{item.total_expense}</Text>
          </View>
          {
            item.list_bills?.map(val =>

              <View
                key={val._id}
                style={{
                  borderRadius: 6,
                  borderWidth: 1,
                  borderColor: COLORS.teal,
                  marginVertical: 5
                }}
              >

                <TouchableOpacity
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    margin: 5,
                    paddingVertical: SIZES.radius,
                    paddingHorizontal: SIZES.padding / 2,
                    borderRadius: 5,
                    backgroundColor: COLORS.white,

                  }}
                  onPress={() => selectBill(val._id)}
                >
                  <View
                    style={{
                      backgroundColor: val.category[0].icon,
                      width: 20,
                      height: 20
                    }}

                  />
                  <Text style={{ marginLeft: SIZES.base, color: COLORS.primary, fontSize: 16, fontWeight: "bold" }}>
                    {val.category[0].name}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 'auto',
                      fontWeight: "bold"
                    }}
                  >
                    {val.total}
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: SIZES.padding
                  }}
                >
                  {val.listItem?.map(val =>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                      }}
                      key={val._id}
                    >

                      <Text>{val.title}</Text>
                      <Text
                        style={{
                          fontWeight: "bold",
                          color: COLORS.red
                        }}
                      >{val.price}</Text>
                    </View>
                  )}
                </View>
              </View>
            )
          }
        </View>
      </View>
    )
    return (
      <View style={{ paddingHorizontal: SIZES.padding - 5, flex: 1 }}>

        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={item => `${item._id}`}
        />
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      {renderHeader()}


      <View style={{
        flex: 1
      }}>

        {renderHistoryList()}
      </View>



    </View>
  )
}

export default HistoryScreen