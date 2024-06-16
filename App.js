import React, {useState} from 'react';
import {
  Alert,
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DropDownPicker from 'react-native-dropdown-picker';
import DownArrow from './src/assets/DownArrow';
import UpArrow from './src/assets/UpArrow';
import SvgWorld from './src/assets/SvgWorld';
import Entrypoint from './src/Entrypoint';

const Drawer = createDrawerNavigator();

const App = () => {
  function Feed({navigation}) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Feed</Text>
        <Button
          onPress={() => navigation.navigate('Home')}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Feed"
        />
      </View>
    );
  }
  function Article({navigation}) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Article</Text>
        <Button
          onPress={() => navigation.navigate('Home')}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Feed"
        />
      </View>
    );
  }
  function HomeScreen({navigation}) {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Feed" component={Feed} />
        <Drawer.Screen name="Article" component={Article} />
      </Drawer.Navigator>
    );
  }
  function Home1Screen({navigation}) {
    const [selected, setSelected] = React.useState('');
    const [items, setItems] = useState([
      {label: 'Apple', value: 'apple'},
      {label: 'Banana', value: 'banana'},
    ]);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{flex: 1}}>
          <SvgWorld />
          <DropDownPicker
            style={{backgroundColor: '#0A84FF', borderWidth: 0}}
            closeIconContainerStyle={{color: 'white'}}
            listParentLabelStyle={{color: 'black'}}
            modalContentContainerStyle={{
              backgroundColor: 'red',
              borderWidth: 1,
            }}
            ArrowDownIconComponent={() => <DownArrow />}
            ArrowUpIconComponent={() => <UpArrow />}
            textStyle={{color: 'white'}}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
          <Text>Home Screen1</Text>
          <Button
            onPress={() => navigation.navigate('Home')}
            title="Learn More"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </View>
    );
  }

  const Stack = createNativeStackNavigator();

  return <Entrypoint />;
};

export default App;
