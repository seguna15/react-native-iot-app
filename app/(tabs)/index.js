import React, { useEffect, useState } from "react";
import MapView, {Marker} from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import { fetchLocation } from "../(services)/api/api";

export default function App() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 49.967147,
    longitude: 14.458644,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [mapRegion1, setMapRegion1] = useState({
    latitude: 49.967147,
    longitude: 14.458644,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });


  useEffect(() => {
    const location = setInterval(async () => {
      const data = await fetchLocation();
      setMapRegion({...mapRegion, ...data.latest[0]})
    }, 5000)

    return () => clearTimeout(location);
  },[])
  
  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion}>
        <Marker coordinate={mapRegion} title="Marker" />
        <Marker coordinate={mapRegion1} title="Marker" />
      </MapView>
      <View style={styles.textView}>
        <Text style={styles.bigText}>Temp: </Text>
        <Text style={styles.bigText}>{mapRegion?.temperature}</Text>
        <Text style={styles.supScriptOne}>&#x2103;</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  map: {
    width: "100%",
    height: "95%",
  },
  textView: {
    width: "100%",
    height: 60,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  bigText: {
    fontSize: 24,
    color: "#333",
  },

  supScriptOne: {
    fontSize: 12,
    lineHeight: 15,
    color: "#333",
  },
});
