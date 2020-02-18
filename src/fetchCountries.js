export default function fetchCountries(searchCountry, callback) {
 if(searchCountry === ""){
   return
 }
    return fetch(
      `https://restcountries.eu/rest/v2/name/${searchCountry}`,
  
    ).then(res => res.json()).then(res => {
      callback(res)
    });
  }