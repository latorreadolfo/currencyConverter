import React, {useState} from 'react';
import {
  FlatList,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

//Constants
import {currencyByGuarani} from './constants';
//Component
import CurrencyButton from './components/CurrencyButton';

import Snackbar from 'react-native-snackbar';

function App(): JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const [resultValue, setResultValue] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');

  const buttonPressed = (targetValue: Currency) => {
    if (!inputValue) {
      return Snackbar.show({
        text: 'Enter a value to convert',
        backgroundColor: '#EA7773',
        textColor: '#000000',
      });
    }

    const inputAmount = parseFloat(inputValue);
    if (!isNaN(inputAmount)) {
      const convertedValue = inputAmount * targetValue.value;
      const result = `${targetValue.symbol} ${convertedValue.toFixed(2)} 💱`;
      setResultValue(result);
      setTargetCurrency(targetValue.name);
    } else {
      return Snackbar.show({
        text: 'Not a valid number to convert',
        backgroundColor: '#F4BE2C',
        textColor: '#000000',
      });
    }
  };

  return (
    <>
      <ImageBackground
        source={{
          uri: 'https://bitcoinist.com/wp-content/uploads/2020/05/shutterstock_393692620.jpg',
        }}
        style={styles.imgBg}>
        <StatusBar />
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <View style={styles.guaraniContainer}>
              <Text style={styles.guarani}>G$</Text>
              <TextInput
                style={styles.inputAmountField}
                maxLength={14}
                value={inputValue}
                clearButtonMode="always"
                onChangeText={setInputValue}
                keyboardType="number-pad"
                placeholder="Enter amount in Guarani"
              />
            </View>
            {resultValue && <Text style={styles.resultTxt}>{resultValue}</Text>}
          </View>
          <View style={styles.bottomContainer}>
            <FlatList
              numColumns={3}
              data={currencyByGuarani}
              keyExtractor={item => item.name}
              renderItem={({item}) => (
                <Pressable
                  style={[
                    styles.button,
                    targetCurrency === item.name && styles.selected,
                  ]}
                  onPress={() => buttonPressed(item)}>
                  <CurrencyButton {...item} />
                </Pressable>
              )}
            />
          </View>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgBg: {
    flex: 1,
    width: '100%',
  },

  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 50,
  },
  resultTxt: {
    fontSize: 32,
    marginTop: 50,
    color: '#000000',
    fontWeight: '800',
    borderWidth: 2,
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#D3D3D3',
  },
  guarani: {
    marginRight: 8,
    fontSize: 32,
    color: '#000000',
    fontWeight: '800',
  },
  guaraniContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputAmountField: {
    height: 40,
    width: 200,
    padding: 8,
    borderWidth: 2,
    borderRadius: 4,
    backgroundColor: '#000',
  },
  bottomContainer: {
    marginTop: 50,
    flex: 3,
  },
  button: {
    flex: 1,

    margin: 12,
    height: 60,

    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selected: {
    backgroundColor: '#A9A9A9',
  },
});

export default App;
