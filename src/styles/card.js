import Dimensions from 'Dimensions';
const {width, height} = Dimensions.get('window');

const card = {
  overlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: width,
    height: height,
    flex: 1
  },

  cardActions: {
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.25)',
    width: '100%',
    position: 'absolute',
    paddingBottom: 50,
    bottom: 0,
    left: 0
  },
  horizontalGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  verticalGroup: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 5
  },
  cardTitle: {
    color: '#000',
    width: 200,
    fontWeight: 'bold',
    fontSize: 12
  },
  cardCategory: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'left'
  }
}

export default card;

