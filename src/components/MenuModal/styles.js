import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  title: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: 8,
  },
  sub_title: {
    color: '#000',
    fontSize: 16,
    lineHeight: 24,
  },
  sub_underline: {
    color: 'grey',
    fontSize: 12,
  },
  message: {
    color: '#929292',
    fontSize: 16,
    lineHeight: 24,
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 20,
    alignItems: 'center',
  },
  button: {
    width: 86,
    fontWeight: '700',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: '#2691FF',
    lineHeight: 18,
    fontSize: 18,
    fontWeight: '700',
  },
  continueButton: {
    backgroundColor: 'blue',
  },
  continueButtonText: {
    color: 'white',
    lineHeight: 16,
  },
});

export default styles;
