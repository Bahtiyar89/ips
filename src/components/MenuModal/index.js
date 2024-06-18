import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  Checkb,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import CheckBox from '@react-native-community/checkbox';
import styles from './styles';
import CustomModal from '../CustomModal';
import DownArrow from '../../assets/DownArrow';
import UpArrow from '../../assets/UpArrow';

export default function MenuModal({cancel, band, complete}) {
  const [text, onChangeText] = React.useState('');
  const [number, onChangeNumber] = React.useState('');
  const [items, setItems] = useState([
    {label: 'any', value: 'any'},
    {label: 'sim1', value: 'sim1'},
    {label: 'sim2', value: 'sim2'},
  ]);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const toggle = index => {
    console.log('index: ', index);
  };

  return (
    <CustomModal>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text style={styles.title}>Routing parameters</Text>
        <Text style={styles.sub_title}>Sender (number or text)</Text>
        <TextInput
          style={{
            height: 40,
            borderBottomColor: '#000', // Add this to specify bottom border color
            borderBottomWidth: 1, // Add this to specify bottom border thickness
          }}
          onChangeText={onChangeText}
          value={text}
          placeholder="number or text"
        />
        <Text style={styles.sub_underline}>Use * symbol to catch any SMS</Text>

        <Text style={styles.sub_title}>Webhook URL</Text>
        <TextInput
          style={{
            height: 40,
            margin: 12,
            padding: 10,
            borderBottomColor: '#000', // Add this to specify bottom border color
            borderBottomWidth: 1,
          }}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="https://example.com"
        />

        <Text style={styles.title}>Advanced parameters</Text>

        <DropDownPicker
          style={{backgroundColor: '#fff', borderWidth: 0}}
          listParentLabelStyle={{color: 'black'}}
          ArrowDownIconComponent={() => <DownArrow fill="black" />}
          ArrowUpIconComponent={() => <UpArrow fill="black" />}
          textStyle={{color: 'black'}}
          open={open}
          value={value}
          items={items}
          placeholder={'Sim Slot'}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
        <Text style={styles.sub_title}>Json Payload Yemplate</Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          style={{
            borderBottomColor: '#000', // Add this to specify bottom border color
            borderBottomWidth: 1,
            height: 140,
            textAlignVertical: 'top',
          }}
          placeholder={` 
        {
          'from':%from%,
          'text':%text%,
          'sentStamp':%sentStamp%,
          'receiveStamp':%receiveStamp%,
          'sim':%sim%,
        }`}
        />
        <Text style={styles.sub_underline}>
          Available placeholders %text%, %from%, %sentStamp%, %receiveStamp%,
          %sim%,
        </Text>
        <Text style={styles.sub_title}>Headers</Text>
        <TextInput
          style={{
            borderBottomColor: '#000', // Add this to specify bottom border color
            borderBottomWidth: 1,
          }}
          placeholder={`{'User-agent':'SMS Forwarder Aapp'}`}
        />
        <Text style={styles.sub_title}>Number of retries</Text>
        <TextInput
          style={{
            height: 40,
            borderBottomColor: '#000', // Add this to specify bottom border color
            borderBottomWidth: 1,
          }}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="1"
        />

        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{}}>Ignore SSL/TLS certificate errors</Text>
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={newValue => setToggleCheckBox(newValue)}
          />
        </View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{}}>Chunked Mode (vs fixed Length)</Text>
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={newValue => setToggleCheckBox(newValue)}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <Pressable onPress={cancel} style={styles.button}>
          <Text style={styles.cancelButtonText}>TEST</Text>
        </Pressable>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Pressable onPress={cancel} style={styles.button}>
            <Text style={styles.cancelButtonText}>CANCEL</Text>
          </Pressable>
          <Pressable onPress={cancel} style={styles.button}>
            <Text style={styles.cancelButtonText}>ADD</Text>
          </Pressable>
        </View>
      </View>
    </CustomModal>
  );
}
