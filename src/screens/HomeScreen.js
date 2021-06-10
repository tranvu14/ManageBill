import React, { useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
  KeyboardAvoidingView
} from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants';
import { VictoryPie } from 'victory-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../navigation/AuthProvider';
import Modal from 'react-native-modals';
import { TextInput } from 'react-native';
import * as url from '../constants/url'
import axios from 'axios';
import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker';

moment.locale('vi')


const HomeScreen = () => {


  const [categories, setCategories] = useState([]);
  const [viewMode, setViewMode] = React.useState("chart")
  const [selectedCategory, setSelectedCategory] = React.useState(null)
  const categoryListHeightAnimationValue = useRef(new Animated.Value(115)).current;
  const { logout, token, user } = React.useContext(AuthContext);

  //Cate 
  const [cateColor, setCateColor] = useState('#5CD859');
  const [isAddingCate, setIsAddingCate] = useState(false);
  const [isSelectDate, setIsSelectDate] = useState(false);
  const [idEditCate, setIdEditCate] = useState("");
  const [isEditCate, setIsEditCate] = useState(false);
  const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [endDate, setEndDate] = useState(new Date());
  const [cateName, setCateName] = useState('');
  const backgroundColors = ['#5CD859', '#24A6D9', '#595BD9', '#8022D9', '#D159D8', '#D85963', '#D88559']


  useEffect(() => {
    if (token) {
      getCate()

    }

  }, [token])


  const getCate = async () => {
    axios.get(url.API_URL + 'category/category_bills', {
      headers: {
        'authorization': "Bearer " + token
      },
      params: {
        end_date: endDate,
        start_date: startDate
      }
    })
      .then(res => { setCategories(res.data) })
  }

  function renderHeader() {
    return (
      <View style={{
        backgroundColor: COLORS.teal,
        paddingTop: 10
      }}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: SIZES.padding,
            paddingVertical: SIZES.padding,
            paddingBottom: 10
          }}
        >
          <Text style={{ color: COLORS.white, fontSize: 21, alignSelf: 'center' }}>Tổng chi tiêu:</Text>
          <TouchableOpacity
            style={{
              marginLeft: 'auto',
              backgroundColor: COLORS.white,
              width: 40,
              height: 40,
              borderRadius: 35,
              justifyContent: 'center',
              alignItems: 'center',

            }}
            onPress={() => logout()}
          >
            <Icon
              name="person-circle-outline"
              size={24}

            />
          </TouchableOpacity>

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
                  getCate();
                  setIsSelectDate(false);
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
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
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
            alignItems: 'center',
          }}

            onPress={() => { setIsSelectDate(true) }}
          >
            <Icon name="calendar" size={20} />
          </TouchableOpacity>
          <View style={{ marginLeft: SIZES.padding }}>


            <Text style={{ fontSize: 16, color: COLORS.primary, fontWeight: "bold" }}>Từ :  {startDate.toLocaleDateString('vi-VN')}</Text>

            <Text style={{ fontSize: 16, color: COLORS.primary, fontWeight: "bold" }}>Đến :  {endDate.toLocaleDateString('vi-VN')}</Text>
            <Text style={{ fontSize: 20, color: COLORS.red, fontWeight: "bold" }}>{categories.length > 0 ? categories.reduce((sum, arr) => { return sum + arr.summary }, 0) : 0} VNĐ</Text>
            <Text style={{ fontSize: 16, color: COLORS.darkgray }}>18% more than last month</Text>
          </View>
        </View>
      </View >
    )
  }
  function renderCategoryHeaderSection() {
    return (
      <View style={{ flexDirection: 'row', padding: SIZES.padding / 2, justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Title */}
        <View>
          <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>DANH MỤC CHI TIÊU</Text>
          <Text style={{ color: COLORS.darkgray, ...FONTS.body4 }}>{categories.length} danh mục</Text>
        </View>

        {/* Button */}
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: viewMode == "chart" ? COLORS.secondary : null,
              height: 50,
              width: 50,
              borderRadius: 25
            }}
            onPress={() => setViewMode("chart")}
          >
            <Icon
              name="stats-chart"
              size={20}

            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: viewMode == "list" ? COLORS.secondary : null,
              height: 50,
              width: 50,
              borderRadius: 25,
              marginLeft: SIZES.base
            }}
            onPress={() => setViewMode("list")}
          >
            <Icon
              name="menu"
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  function renderCategoryList() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        key={item._id}
        onLongPress={() => {
          setIsEditCate(true)
          setCateName(item.name);
          setCateColor(item.icon);
          setIdEditCate(item._id)
        }}
        style={{
          flex: 1,
          maxWidth: "50%",
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
            width: 20,
            height: 20,
            backgroundColor: item.icon
          }}
        />
        <Text style={{ marginLeft: SIZES.base, color: COLORS.primary, ...FONTS.h4 }}>{item.name}</Text>
      </TouchableOpacity>
    )

    return (
      <View style={{ paddingHorizontal: SIZES.padding - 5 }}>

        <Animated.View >
          <FlatList
            data={categories}
            renderItem={renderItem}
            keyExtractor={item => `${item._id}`}
            numColumns={2}
          />
        </Animated.View>
        <View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              marginVertical: SIZES.base,
              margin: 'auto',
              padding: SIZES.padding / 2,
              justifyContent: 'center',
              borderRadius: 10,
              backgroundColor: '#009387',
              width: '50%'
            }}
            onPress={() => setIsAddingCate(true)}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  marginRight: 5,
                  color: '#ffffff'
                }}

              >Thêm mới</Text>
              <Icon
                name='add-circle'
                size={25}
              />
            </View>

          </TouchableOpacity>
        </View>

      </View>
    )
  }
  function processCategoryDataToDisplay() {
    // Filter expenses with "Confirmed" status
    let chartData = categories.map((item) => {

      return {
        name: item.name,
        y: item.summary,
        expenseCount: item.list_bills?.length || 0,
        color: item.icon,
        id: item._id
      }
    })
    // filter out categories with no data/expenses
    let filterChartData = chartData.filter(a => a.y > 0)

    // Calculate the total expenses
    let totalExpense = filterChartData.reduce((a, b) => a + (b.y || 0), 0)

    // Calculate percentage and repopulate chart data
    let finalChartData = filterChartData.map((item) => {

      let percentage = (item.y / totalExpense * 100).toFixed(0)
      return {
        label: `${percentage}%`,
        y: Number(item.y),
        expenseCount: item.expenseCount,
        color: item.color,
        name: item.name,
        id: item.id
      }
    })
    return finalChartData
  }

  const renderChart = () => {
    let chartData = processCategoryDataToDisplay()
    let colorScales = chartData.map((item) => item.color)
    let totalExpenseCount = chartData.reduce((a, b) => a + (b.expenseCount || 0), 0)

    return (


      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <VictoryPie

          data={chartData}
          labels={(datum) => `${datum.y}`}
          radius={({ datum }) => (selectedCategory && selectedCategory.name == datum.name) ? SIZES.width * 0.4 : SIZES.width * 0.4 - 10}
          innerRadius={70}
          labelRadius={({ innerRadius }) => (innerRadius) / 2.5}
          style={{
            labels: { fill: "white", },

          }}
          width={SIZES.width * 0.8}
          height={SIZES.width * 0.8}
          colorScale={colorScales}
          events={[{
            target: "data",
            eventHandlers: {
              onPress: () => {
                return [{
                  target: "labels",
                  mutation: (props) => {
                    let categoryName = chartData[props.index].name
                    setSelectCategoryByName(categoryName)
                  }
                }]
              }
            }
          }]}

        />

        <View style={{ position: 'absolute', top: '42%', left: "42%" }}>
          <Text style={{ ...FONTS.h1, textAlign: 'center' }}>{totalExpenseCount}</Text>
          <Text style={{ ...FONTS.body3, textAlign: 'center' }}>Hóa đơn</Text>
        </View>
      </View>

    )
  }


  function renderExpenseSummary() {
    let data = processCategoryDataToDisplay()
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          height: 40,
          paddingHorizontal: SIZES.radius,
          borderRadius: 10,
          backgroundColor: (selectedCategory && selectedCategory.name == item.name) ? item.color : COLORS.white,
          marginBottom: 10
        }}
        onPress={() => {
          let categoryName = item.name
          setSelectCategoryByName(categoryName)
        }}
      >
        {/* Name/Category */}
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor: (selectedCategory && selectedCategory.name == item.name) ? COLORS.white : item.color,
              borderRadius: 5
            }}
          />

          <Text style={{ marginLeft: SIZES.base, color: (selectedCategory && selectedCategory.name == item.name) ? COLORS.white : COLORS.primary, ...FONTS.h3 }}>{item.name}</Text>
        </View>

        {/* Expenses */}
        <View style={{ justifyContent: 'center' }}>
          <Text style={{ color: (selectedCategory && selectedCategory.name == item.name) ? COLORS.white : COLORS.primary, ...FONTS.h3 }}>{item.y} VNĐ - {item.label}</Text>
        </View>
      </TouchableOpacity>
    )

    return (
      <View style={{ padding: SIZES.padding }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
        />
      </View>

    )
  }

  function setSelectCategoryByName(name) {
    let category = categories.filter(a => a.name == name)
    setSelectedCategory(category[0])
  }
  return (
    <View style={{
      flex: 1
    }}>
      {renderHeader()}
      {renderCategoryHeaderSection()}
      <Modal
        visible={isAddingCate}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          style={{
            height: '80%',
            justifyContent: 'center',
            alignItems: 'center',
            width: SIZES.width - 50
          }}
          behavior="padding"
        >
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 10,
              right: 10
            }}
            onPress={() => {
              setIsAddingCate(false)
              setCateName('')
              setCateColor(backgroundColors[0])
            }
            }

          >
            <Icon name='close-circle' size={30} />
          </TouchableOpacity>
          <View
            style={{
              alignSelf: 'stretch',
              marginHorizontal: 32
            }}
          >

            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                alignSelf: 'center'
              }}
            >Nhập tên danh mục bạn muốn thêm</Text>
            <TextInput style={{
              borderWidth: 1,
              borderColor: COLORS.teal,
              borderRadius: 6,
              height: 30,
              marginTop: 8,
              paddingHorizontal: 16,
              fontSize: 16

            }}
              onChangeText={(val) => setCateName(val)}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                alignSelf: 'center'
              }}
            >Chọn màu sắc đặc trưng </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 12
              }}
            >
              {backgroundColors.map(color => (
                <TouchableOpacity
                  key={color}
                  style={{ width: 30, height: 30, borderRadius: 4, backgroundColor: color }}
                  onPress={() => setCateColor(color)} />
              ))}
            </View>
            <TouchableOpacity
              style={{
                marginTop: 24,
                height: 30,
                borderRadius: 6,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: cateColor
              }}
              onPress={() => {
                axios.post(url.API_URL + 'category', {
                  name: cateName,
                  icon: cateColor
                }, {
                  headers: {
                    'authorization': "Bearer " + token
                  }
                })
                  .then(res => {
                    if (res.status === 200) {
                      alert('Thêm danh mục thành công')
                      setCateName('')
                      setCateColor(backgroundColors[0])
                      getCate()
                    }
                  })
              }}
            >
              <Text style={{
                color: COLORS.white,
                fontWeight: '600'
              }} >Thêm</Text>
            </TouchableOpacity>
          </View>


        </KeyboardAvoidingView>
      </Modal>
      <Modal
        visible={isEditCate}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          style={{
            height: '80%',
            justifyContent: 'center',
            alignItems: 'center',
            width: SIZES.width - 50
          }}
          behavior="padding"
        >
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 10,
              right: 10
            }}
            onPress={() => {
              setIsEditCate(false)
              setCateName('')
              setCateColor(backgroundColors[0])
            }
            }

          >
            <Icon name='close-circle' size={30} />
          </TouchableOpacity>
          <View
            style={{
              alignSelf: 'stretch',
              marginHorizontal: 32
            }}
          >

            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                alignSelf: 'center'
              }}
            >Nhập tên danh mục </Text>
            <TextInput style={{
              borderWidth: 1,
              borderColor: COLORS.teal,
              borderRadius: 6,
              height: 30,
              marginTop: 8,
              paddingHorizontal: 16,
              fontSize: 16
            }}
              onChangeText={(val) => setCateName(val)}
              defaultValue={cateName}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                alignSelf: 'center',
                marginVertical: 10
              }}
            >Chọn màu sắc đặc trưng </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 12
              }}
            >
              {backgroundColors.map(color => (
                <TouchableOpacity
                  key={color}
                  style={{ width: 30, height: 30, borderRadius: 4, backgroundColor: color }}
                  onPress={() => setCateColor(color)} />
              ))}
            </View>
            <TouchableOpacity
              style={{
                marginTop: 24,
                height: 30,
                borderRadius: 6,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: cateColor
              }}
              onPress={() => {
                console.log(idEditCate);
                axios.patch(url.API_URL + 'category/' + idEditCate, {
                  name: cateName,
                  icon: cateColor
                }, {
                  headers: {
                    'authorization': "Bearer " + token
                  }
                })
                  .then(res => {
                    if (res.status === 200) {
                      alert('Sửa danh mục thành công')
                      setCateName('')
                      setCateColor(backgroundColors[0])
                      getCate()
                      setIdEditCate(false)
                    }
                  })
              }}
            >
              <Text style={{
                color: COLORS.white,
                fontWeight: '600'
              }} >Sửa</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginTop: 24,
                height: 30,
                borderRadius: 6,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#FF0000"
              }}
              onPress={() => {
                axios.delete(url.API_URL + 'category/' + idEditCate, {
                  headers: {
                    'authorization': "Bearer " + token
                  }
                })
                  .then(res => {
                    if (res.status === 200) {
                      alert('Xóa danh mục thành công')
                      setCateName('')
                      setCateColor(backgroundColors[0])
                      getCate()
                      setIsEditCate(false)
                    }
                  })
              }}
            >
              <Text style={{
                color: COLORS.white,
                fontWeight: '600'
              }} >Xóa</Text>
            </TouchableOpacity>
          </View>


        </KeyboardAvoidingView>
      </Modal>
      <ScrollView style={{
        flex: 1
      }}>
        {
          viewMode == "list" &&
          <View>
            {renderCategoryList()}
          </View>
        }
        {
          viewMode == "chart" &&
          <View>
            {renderChart()}
            {renderExpenseSummary()}
          </View>
        }
        {
          categories.length === 0 ? <View>
            <Text>Bạn chưa chi tiêu gì cả, hãy thêm một giao dịch mới nhé!</Text>
          </View> : null
        }
      </ScrollView>
    </View >
  )
}

export default HomeScreen
