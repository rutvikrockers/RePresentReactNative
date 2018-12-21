import {
  StyleSheet,
} from 'react-native';
import colors from './colors';
const forms = {
  label: {
    color: colors.dark.foreground, 
  },
  inputWrapper: {
    alignSelf: 'stretch',
    borderStyle: 'solid',
    borderTopColor: colors.light.background,
    borderBottomColor: colors.light.foreground,
    borderBottomWidth: StyleSheet.hairlineWidth,
    margin: 5,
  },
  input: {
    height: 40,
    alignSelf: 'stretch',
    color: colors.light.lightForegound,
    backgroundColor: colors.light.background,
    fontSize: 18,
    padding: 5,
    margin: 5,
    fontStyle: 'italic',
  },
  dateField: {
    height: 40,
    alignSelf: 'stretch',
    color: colors.light.lightForegound,
    backgroundColor: colors.light.background,
    padding: 10,
    fontSize: 18,
    fontStyle: 'italic',
  },
}

export default forms;
