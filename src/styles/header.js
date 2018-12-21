import colors from './colors';
const header = {
  locationHeader: {
    height: 50,
    paddingTop: 15,
    backgroundColor: colors.hero,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 55
  },
  header: {
    marginTop: 10,
    position: 'absolute',
    opacity: 0.8,
    zIndex: 99,
    top: 0,
    height: 60,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'flex-end',
    width: '100%'
  },
  headerDark: {
    backgroundColor: colors.dark.background,
  },
  headerText: {
    fontSize: 16,
    textAlign: 'center',
    flex: 5
  },
  headerBtn: {
    flex: 1,
    width: 40,
    maxWidth: 40,
    padding: 10,
    alignItems: 'center',
  },
  headerBtnText: {
    color: colors.dark.foreground,
  },
}

export default header;
