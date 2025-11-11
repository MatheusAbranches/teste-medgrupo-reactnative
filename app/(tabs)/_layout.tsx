import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2563EB',
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Escolas',
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="graduation-cap" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Sobre',
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="info-circle" color={color} />,
        }}
      />
    </Tabs>
  );
}
