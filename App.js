import { useEffect, useState, React } from 'react'
import { StyleSheet, Text, View, Button, FlatList, ScrollView } from 'react-native'
import History from './src/components/History'
import * as ScreenOrientation from 'expo-screen-orientation'

export default function App() {
return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title}>Calculator</Text>
      <History/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 96,
    paddingHorizontal: 36,
  },
  title: {
    color: 'black',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
  }
})
