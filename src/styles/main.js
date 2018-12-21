import {
  StyleSheet,
} from 'react-native';

import colors from './colors';
import card from './card';
import forms from './forms';
import header from './header';
import map from './map';
import footer from './footer';

const styles = StyleSheet.create({
  ...header,
  ...forms,
  ...map,
  ...card,
  ...footer,
  root: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: colors.light.background,
    padding: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.light.background,
    padding: 0,
    width: '100%'
  },
  containerDark: {
    backgroundColor: colors.dark.background,
  },
  landing: {
    backgroundColor: colors.dark.medium,
    flex: 1,
  },
  topMargin: {
    marginTop: 20,
  },
  page: {
    top: 70,
    flex: 5,
    marginBottom: 60
  },
  copy: {
    padding: 10,
    margin: 10,
  },
  brand: {
    width: 200,
    height: 200,
    backgroundColor: '#CCC',
    borderRadius: 100,
    marginBottom: 50,
  },
  promotion: {
    width: 150,
    height: 150,
    backgroundColor: 'transparent',
    borderRadius: 75,
    marginBottom: 10,
    margin: 20
  },
  item: {
    width: 150,
    height: 150,
    backgroundColor: 'transparent',
    marginBottom: 10,
    margin: 20
  },
  richListItem: {
    flexDirection: 'column',
    flex: 2,
    backgroundColor: colors.dark.background,
    borderBottomColor: 'rgb(227,207,175)',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  bgImage: {
    flex: 1,
    flexDirection: 'column',
    width: undefined,
    height: 200,
    backgroundColor:'transparent',
    padding: 10,
    margin: 0,
    paddingTop: 100,
  },
  locationListItem: {
    borderBottomColor: 'rgb(227,207,175)',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    padding: 10
  },
  locationListItemDistance: {
    justifyContent: 'flex-end',
    textAlign: 'right'
  },
  btnWrapper: {
    marginTop: 10,
    marginBottom: 10,
    height: 40,
    backgroundColor: colors.light.foreground,
    borderRadius: 20,
    width: 150,
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.highlight,
    borderRadius: 20,
    padding: 7.5
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  },
  btnFollow: {
    flex: 1,
flexDirection: 'column',
justifyContent: 'center',
alignItems: 'center',
backgroundColor: colors.Theme,
borderRadius: 20,
paddingTop: 7.5,
paddingRight: 25,
paddingBottom: 7.5,
paddingLeft: 25,
  },
  btnContainerDark: {
    backgroundColor: colors.dark.medium,
  },
  btn: {
    color: colors.dark.foreground,
    textAlign: 'center',
  },
  btnCheckin: {
    flex: 1,
    height: 60,
    width: 300
  },
  navBtn: {
    padding: 10,
    textAlign: 'center',
    flex: 1
  },
  lightText: {
    color: colors.dark.foreground,
  },
  h1: {
    fontWeight: 'bold',
    padding: 20,
    fontSize: 16
  },
  h2: {
    fontWeight: 'normal',
    padding: 20,
    fontSize: 14
  },
  offeringTitle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 18,
    color: colors.dark.foreground,
  },
  btnView: {   
    height: 60,
    backgroundColor: colors.highlight,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:50,
    marginTop:50
  },
  itemContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.dark.foreground,
    borderStyle: 'solid',
    margin: 10,
  },
  itemTitle: {
    fontWeight: 'bold',
    padding: 10,
    paddingBottom: 5,
    fontSize: 16,
    color: colors.dark.foreground,
    fontSize: 16,
    color: colors.dark.foreground,
  },
  itemDescription: {
    padding: 10,
    paddingTop: 0,
    fontSize: 12,
    color: colors.dark.foreground,
  },
  errorWrapper: {
    margin: 10,
    padding: 0,
    height: 50,
    width: 200,
  },
  error: {
    textAlign: 'center',
    color: colors.highlight,
    fontStyle: 'italic'
  },
  lightBg: {
    backgroundColor: colors.light.background,
  }
});

module.exports = styles;
