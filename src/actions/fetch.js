import Config from 'react-native-config';
import FormData from 'form-data';

export function doFetch(method, path, data, cb){
  let payload = {
    method: method,
     headers: {
   
       'content-type': 'multipart/form-data',
     }
  }
  if(method != 'GET'){
    var form_data = new FormData();

    for ( var key in data ) {
      form_data.append(key, data[key]);
    }
    payload.body = form_data;
  }

  return fetch("http://mydesichef.com/ticketingsoft_development"+path, payload)
    .then(
      (response) => response.json()
    )
    .then((res) => {
      return cb(null, res)
    })
    .catch( (error) => {
      cb(error, null)
    })
}

const Fetch = {doFetch: doFetch}
export default Fetch 
