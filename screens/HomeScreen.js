import {
  View,
  Text,
  Pressable,
  ImageBackground,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import ButtonDesign from "../components/ButtonDesign";
import firebase from "@firebase/app-compat";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFavorites } from "../context/FavoriteContext";
import axios from "axios";
import { EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const HomeScreen = () => {
  const images = {
    z: require("../assets/z.png"),
    x: require("../assets/x.png"),
    i: require("../assets/i.png"),
    ı: require("../assets/ı.png"),
    w: require("../assets/w.png"),
    r: require("../assets/r.png"),
    g: require("../assets/g.png"),
    f: require("../assets/f.png"),
  };
  const [selectedDateRange, setSelectedDateRange] = useState("today");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const { favorites, toggleFavorite } = useFavorites();
  const navigation = useNavigation();
  const [name, setFirstName] = useState("");
  const [events, setEvents] = useState([]);
  const [eventss, setEventss] = useState([]);
  const navigateToEventDetail = (event) => {
    navigation.navigate("EventsDetail", { event });
  };
  const navigateToEventDetails = (events) => {
    navigation.navigate("Date", { events });
  };
  const [searchQuery, setSearchQuery] = useState(""); // Step 1: State variable for search query

  // ... (other code)

  // Function to update the search query
  const updateSearchQuery = (query) => {
    setSearchQuery(query);
  };

  function randomImageFileName() {
    const imageFileNames = Object.keys(images);
    const randomIndex = Math.floor(Math.random() * imageFileNames.length);
    return imageFileNames[randomIndex];
  }
  useEffect(() => {
    // Axios ile istek atma
    axios.get('https://serpapi.com/search.json', {
      params: {
        engine: 'google_events',
        q: 'Events in Austin',
        hl: 'en',
        gl: 'us',
        api_key: '66bc835bfca5167c1ad92cf9cc998f1a691351f39b6c9a11c7c956077d77a7dd'
      }
    })
      .then(response => {
        const eventsData = response.data.events_results;
        setEvents(eventsData);
      })
      .catch(error => {
        console.error('İstek hatası:', error);
      });

    // Bu fonksiyon, tarih aralığına göre etkinlikleri getiren Axios isteğini yapar.
    const handleDateButtonClick = (dateRange) => {
      let dateParam = "";

      switch (dateRange) {
        case "today":
          dateParam = "date:today";
          break;
        case "thisWeek":
          dateParam = "date:thisweek";
          break;
        case "tomorrow":
          dateParam = "date:tomorrow";
          break;
        case "thisMonth":
          dateParam = "date:thismonth";
          break;
        default:
          // Diğer durumları veya varsayılanları işleyin
          break;
      }

      axios
        .get("https://serpapi.com/search.json", {
          params: {
            engine: "google_events",
            q: `Events in ${searchQuery}`,
            hl: "en",
            gl: "us",
            htichips: `event_type:Virtual-Event,${dateParam}`,
            api_key: "66bc835bfca5167c1ad92cf9cc998f1a691351f39b6c9a11c7c956077d77a7dd",
          },
        })
        .then((response) => {
          const eventsData = response.data.events_results;
          setEventss(eventsData);
        })
        .catch((error) => {
          console.error("İstek hatası:", error);
        });
    };

    // handleDateButtonClick fonksiyonunu kullanabilirsiniz
    handleDateButtonClick("today"); // Örnek olarak "today" ile çağırdım, gerektiğiniz yerde farklı bir tarih aralığı ile çağırabilirsiniz.
  }, [searchQuery]); 

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        blurRadius={200}
        source={require("../assets/back.png")}
      >
        <View
          style={{
            marginLeft: 50,
            marginRight: 20,
            marginLeft: 20,
            marginTop: 30,
          }}
        >
          <View style={styles.menu}>
            <MaterialCommunityIcons
              name="microsoft-xbox-controller-menu"
              size={34}
              color="black"
            />
            <Text style={styles.text}>HOME</Text>
            <Ionicons
              name="heart-circle-outline"
              size={34}
              color="black"
              style={styles.text1}
            />
          </View>
          <View style={styles.inputContainer}>
            <EvilIcons
              name="search"
              size={24}
              color="gray"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Search"
              value={searchQuery}
              onChangeText={updateSearchQuery}
              placeholderTextColor="gray"
            />
          </View>
          <Pressable
            onPress={() => {
              firebase.auth().signOut();
            }}
          ></Pressable>
                  <View style={styles.buttonS}>
                      <TouchableOpacity
                          style={[styles.buttonDate, { backgroundColor: "orange" }]}
                          onPress={() => handleDateButtonClick("today")}
                      >
                          <Text style={styles.buttonText}>Today</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                          style={[styles.buttonDate, { backgroundColor: "orange" }]}
                          onPress={() => handleDateButtonClick("thisWeek")}
                      >
                          <Text style={styles.buttonText}>This Week</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                          style={[styles.buttonDate, { backgroundColor: "orange" }]}
                          onPress={() => handleDateButtonClick("tomorrow")}
                      >
                          <Text style={styles.buttonText}>Tomorrow</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                          style={[styles.buttonDate, { backgroundColor: "orange" }]}
                          onPress={() => handleDateButtonClick("thisMonth")}
                      >
                          <Text style={styles.buttonText}>This Month</Text>
                      </TouchableOpacity>
                  </View>
                  <View style={styles.dateE}>
                      <ScrollView horizontal showsVerticalScrollIndicator={false}>
                          {eventss.map((events, index) => (
                              <View key={index} style={styles.eventsContainer}>
                                  <TouchableOpacity
                                      key={index}
                                      onPress={() => navigateToEventDetails(events)}
                                  >
                                      <ImageBackground
                                          source={images[randomImageFileName()]} // Resim dosyasını nesneden alın
                                          style={styles.backgroundImg}
                                      >
                                          <View style={styles.headerr}>
                                              <View style={styles.etitlee}>
                                                  <Text style={styles.eventTitle}>{events.title}</Text>
                                              </View>
                                              <TouchableOpacity>
                                      <View style={styles.icon}>
                                        <MaterialIcons
                                          name="favorite"
                                          size={24}
                                          color="white"
                                        />
                                      </View>
                                              </TouchableOpacity>
                                             
                                          </View>
                                          <View style={styles.time}>
                                              <Text style={styles.eventDate}>{events.date.when}</Text>
                                          </View>
                                      </ImageBackground>
                                  </TouchableOpacity>
                              </View>
                          ))}
                      </ScrollView>
                  </View>
          <View style={styles.ki}>
            <Text style={styles.z}>Recommend Event</Text>
            <Text style={styles.k}>View All</Text>
          </View>
          <ScrollView horizontal showsVerticalScrollIndicator={false}>
            {eventss.map((events, index) => (
              <View key={index} style={styles.eventsContainer}>
                <TouchableOpacity
                  key={index}
                  onPress={() => navigateToEventDetails(events)}
                >
                  <ImageBackground
                    source={images[randomImageFileName()]}
                    style={styles.backgroundImg}
                  >
                    <View style={styles.headerr}>
                      <View style={styles.etitlee}>
                        <Text style={styles.eventTitle}>{events.title}</Text>
                      </View>
                      <TouchableOpacity onPress={() => toggleFavorite(events)}>
                        <View style={styles.icon}>
                          <MaterialIcons
                            name={favorites.includes(events) ? "favorite" : "favorite-border"}
                            size={24}
                            color="white"
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.time}>
                      <Text style={styles.eventDate}>{events.date.when}</Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            ))}

          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    height: 1200,
    width: 500,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    height: 20,
    marginLeft:20,
    marginRight:60,
    width:10
  },
  headerr: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    height: 90,
    marginLeft: 20,
    marginRight: 60
  },
  backgroundImage: {
    flex: 1, // Ana arka plan görselinin tüm alanı kaplaması için flex ekliyoruz
    resizeMode: "cover", // Görselin ekranı kaplamasını sağlıyoruz
    borderRadius: 20,
  },
  backgroundImag: {
    flex: 0.5, // Ana arka plan görselinin tüm alanı kaplaması için flex ekliyoruz
    // Görselin ekranı kaplamasını sağlıyoruz
    borderRadius: 100,
    height: 230,
    width: 300,
  }, backgroundImg: {
    marginTop:10,
    flex: 0.5, // Ana arka plan görselinin tüm alanı kaplaması için flex ekliyoruz
    // Görselin ekranı kaplamasını sağlıyoruz
    borderRadius: 100,
    height: 200,
    width: 170,
  },
  buttonS: { display: "flex", flexDirection: "row",
  marginLeft:20,
  marginRight:20,
marginTop:20 },
  text: {
    fontSize: 32,
    color: "white",
    marginLeft: 90,
    marginRight: 90,
  },
    buttonDate: {
        width: 80,
        height: 40,
        borderRadius: 40,
        marginRight:10,
        backgroundColor:"orange",
        alignItems:"center",
        justifyContent:"center"
    },
  etitle: { height: 40, width: 250 },
  icon: {
   width:40,
   marginRight:10
  },
  eventContainer: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 20, // Burada border radius ekliyoruz
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 200,
    width: 300,
    overflow: "hidden", // Görselin sınırlarını aşan kısmını kesmek için overflow ekliyoruz
  },
  eventsContainer: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 20, // Burada border radius ekliyoruz
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 230,
    width: 200,
    overflow: "hidden", // Görselin sınırlarını aşan kısmını kesmek için overflow ekliyoruz
  },
  
  ki: {
    display: "flex",
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 10,
  },
  z: {
    fontSize: 20,
    color: "white",
    marginRight: 100,
  },
  k: {
    fontSize: 20,
    color: "cyan",
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  eventDate: {
    fontSize: 14,
    color: "gray",
  },
  eventDescription: {
    marginTop: 5,
    fontSize: 14,
  },
  time: {
    backgroundColor:"orange",
    height: 50,
    borderRadius: 10,
    marginTop: 120,
    width: 290,
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginHorizontal: 16,
    marginTop: 16,
    width: 350,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "black",
    // Add other styles for your input as needed
  },
});

export default HomeScreen;
