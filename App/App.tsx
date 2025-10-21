import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image } from 'react-native';


function Button1() {
  return (
    <Button title="Click me" onPress={() => alert('Check !')} />
  );
}

function Image1() {
  return (
    <Image source={require('./assets/logo_cailloux.png')} style={{width: 200, height: 200}} />
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
      <Button1 />
      <Image1 />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
