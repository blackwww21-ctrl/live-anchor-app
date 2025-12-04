import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import PreliveScreen from '../screens/Live/PreliveScreen';
import LiveRoomScreen from '../screens/Live/LiveRoomScreen';
import EndSummaryScreen from '../screens/Live/EndSummaryScreen';

export type RootStackParamList = {
  Login: undefined;
  Prelive: undefined;
  LiveRoom: { roomId: string };
  EndSummary: { roomId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Prelive" component={PreliveScreen} />
      <Stack.Screen name="LiveRoom" component={LiveRoomScreen} />
      <Stack.Screen name="EndSummary" component={EndSummaryScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
