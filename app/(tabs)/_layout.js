import { Tabs, Stack } from "expo-router";
import {FontAwesome} from "@expo/vector-icons"
import ProtectedRoute from "../../component/ProtectedRoute";


export default function RootLayout() {
    return (
      <ProtectedRoute>
        <Tabs screenOptions={{ tabBarActiveTintColor: "#8ac926" }}>
          
          <Tabs.Screen
            name="index"
            options={{
              headerShown: false,
              title: "Home",
              tabBarIcon: ({ color }) => (
                <FontAwesome name="home" color={color} size={28} />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              headerShown: false,
              title: "Profile",
              tabBarIcon: ({ color }) => (
                <FontAwesome name="user" color={color} size={28} />
              ),
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              headerShown: false,
              title: "Settings",
              tabBarIcon: ({ color }) => (
                <FontAwesome name="cog" color={color} size={28} />
              ),
            }}
          />
          <Tabs.Screen
            name="summary"
            options={{
              headerShown: false,
              title: "Daily Summary",
              tabBarIcon: ({ color }) => (
                <FontAwesome name="bell" color={color} size={28} />
              ),
            }}
          />
        </Tabs>
      </ProtectedRoute>
    );
    
} 