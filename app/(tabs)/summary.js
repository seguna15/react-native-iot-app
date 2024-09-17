import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { fetchDailySummary } from "../(services)/api/api";

const TabHome = () => {
  const [stats, setStats] = useState(null);

  const fetchData  = async () => {
      const data = await fetchDailySummary();
      setStats({...data.dailySummary});
  }
  useEffect(() => {
    fetchData()
  },[])
	
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Summary</Text>
      <Text style={styles.subtitle}>Realtime Data:</Text>
      <View style={styles.techList}>
        <LinearGradient colors={["#61DBFB", "#35AFC2"]} style={styles.techItem}>
          
          <Text style={styles.techText}>Average Temp: {stats?.avgTemp}&#x2103;</Text>
        </LinearGradient>
        <LinearGradient colors={["#764ABC", "#543B9A"]} style={styles.techItem}>
         
          <Text style={styles.techText}>Min Temp: {stats?.minTemp}&#x2103;</Text>
        </LinearGradient>
        <LinearGradient colors={["#FF4154", "#D12B3A"]} style={styles.techItem}>
         
          <Text style={styles.techText}>Max Temp: {stats?.maxTemp}&#x2103;</Text>
        </LinearGradient>
       
      </View>
    </View>
  );
};

export default TabHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#666",
  },
  techList: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  techItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 5,
  },
  techText: {
    fontSize: 18,
    color: "#fff",
    marginLeft: 10,
    fontWeight: "bold",
  },
});
