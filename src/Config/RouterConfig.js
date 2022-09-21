import axios from 'axios';

export const slShort_event_descriptor = [
    // { label: 'Lang', key: 'lang' },
    { label: 'Title', key: 'shortEng' },
    // { label: 'Shortevent', key: 'short' },
    // { label: 'content', key: 'content'},
    // { label: 'parental', key: 'parental'},
    // { label: 'Event', key: 'Event'}
];

export const imdbApiBaseUrl = 'https://imdb-api.com/en/API/SearchMovie/k_z9yeskhc/';
export const imdbApiPostUrl = 'https://imdb-api.com/en/API/Posters/k_z9yeskhc/';
export const imdbApiWikipedia = (id)=> { return 'https://imdb-api.com/en/API/Title/k_z9yeskhc/'+ id +'/Wikipedia'; }
export const imdbApiTrailer = 'https://imdb-api.com/en/API/Trailer/k_z9yeskhc/';

export function apiGet(payload){
  axios.get(imdbApiBaseUrl + payload)
  .then(res => {
       return res.data;
   });
}

function Digits(num) {
    return num.toString().padStart(2, '0');
}

export const currentDate = () => {
    var date = new Date();
    return (
        [
          date.getFullYear(),
          Digits(date.getMonth() + 1),
          Digits(date.getDate()),
        ].join('-') +
        ' ' +
        [
          Digits(date.getHours()),
          Digits(date.getMinutes()),
          Digits(date.getSeconds()),
        ].join(':')
      );
}

export const onEventHandler = (evt) =>{
  this.setState({[evt.target.name]: evt.target.value});
  console.log("evt: ", this.state);
}

String.prototype.format = function() {
  var s = this, i = arguments.length;
  while (i--) {
      s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
  }
  return s;
};

const testString = "Hello {0} {1}";
export const testFromat = testString.format('elvin', 'mucaj');

export const renameKey = (object, key, newKey) => {
    const clonedObj = Object.assign({}, object);
    const targetKey = clonedObj[key];
    delete clonedObj[key];
    clonedObj[newKey] = targetKey;
    return clonedObj;
};

const TVAXMLHead = '<?xml version="1.0" encoding="ISO-8859-1"?><WIDECAST_DVB>' +
'<channel name="BANG-BANG">';
const TVAXMLFoot = '</channel></WIDECAST_DVB>';
const TVAXMLBody = '<Event id="{0}" start_time="{1}" duration="{2}">'+
  '<short_event_descriptor lang="alb" name="{3}">{4}</short_event_descriptor>'+
  '<short_event_descriptor lang="eng" name="{5}"></short_event_descriptor>'+
  '<extended_event_descriptor lang="alb">'+
    '<text>{6}</text>'+
  '</extended_event_descriptor>'+
  '<extended_event_descriptor lang="eng">'+
    '<text>{7}</text>'+
  '</extended_event_descriptor>'+
  '<content_descriptor nibble1="{8}" nibble2="{9}"/>'+
  '<parental_rating_descriptor country_code="alb">{10}</parental_rating_descriptor>'+
  '</Event>';

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
