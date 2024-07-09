import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#303030',
    alignItems: 'center',
  },
  titleContainer: {
    paddingTop: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36.79,
    lineHeight: 43.47,
    alignSelf: 'center',
    color: '#438FF4',
    fontWeight: '900',
  },
  legend: {
    paddingTop: 20,
    fontWeight: '600',
    fontSize: 18,
    color: '#94A1CB',
    textAlign: 'center',
  },
  nextBtnWrapper: {
    marginTop: 40,
    bottom: 10,
    backgroundColor: 'blue',
    height: 50,
    borderRadius: 10,
  },
  nextTxt: {
    textAlign: 'center',
    color: '#FFFFFF',
    textAlignVertical: 'center',
    height: 50,
    fontSize: 18,
  },
});

export default styles;
