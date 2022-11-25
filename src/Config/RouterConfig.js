import axios from 'axios';

export const slShort_event_descriptor = [
  { label: 'Title', key: 'shortEng' },
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

export const renameKey = (object, key, newKey) => {
  const clonedObj = Object.assign({}, object);
  const targetKey = clonedObj[key];
  delete clonedObj[key];
  clonedObj[newKey] = targetKey;
  return clonedObj;
};

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

String.prototype.format = function() {
  var s = this, i = arguments.length;
  while (i--) {
    s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
  }
  return s;
};

export const TVepgExportHead = (channel) => {
  return TVAXMLHead.format(channel);
}
export const TVepgExportBody = (eid, st, d, sedname, genre, sedename, eeda, eede, n1, n2, rate) => {
  return TVAXMLBody.format(eid, st, d, sedname, genre, sedename, eeda, eede,  n1, n2, rate);
}

const TVAXMLHead = '<?xml version="1.0" encoding="ISO-8859-1"?><WIDECAST_DVB>\n' +
'<channel name="{0}">';

export const TVAXMLFoot = '</channel></WIDECAST_DVB>\n';

const TVAXMLBody = '<Event id="{0}" start_time="{1}" duration="{2}">\n'+
  '<short_event_descriptor lang="alb" name="{3}">{4}</short_event_descriptor>\n'+
  '<short_event_descriptor lang="eng" name="{5}"></short_event_descriptor>\n'+
  '<extended_event_descriptor lang="alb">\n'+
    '<text>{6}</text>\n'+
  '</extended_event_descriptor>\n'+
  '<extended_event_descriptor lang="eng">\n'+
    '<text>{7}</text>\n'+
  '</extended_event_descriptor>\n'+
  '<content_descriptor nibble1="{8}" nibble2="{9}"/>\n'+
  '<parental_rating_descriptor country_code="alb">{10}</parental_rating_descriptor>\n'+
  '</Event>\n';

export const OTTXMLExportHead = (channel) =>{
  return OTTXMLHead.format(channel);
}
const OTTXMLHead = '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE tv SYSTEM "xmltv.dtd">\n'+
  '<tv generator-info-name="DigitAlb_Epg">\n'+
  '<channel id="11">\n'+
    '<display-name>{0}</display-name>\n'+
  '</channel>\n';
  
export const OTTXMLFoot = '</tv>\n';

export const OTTXMLExportBody = (id, st, stp, seda, sede, eeda) =>{
  return OTTXMLBody.format(id, st, stp, seda, sede, eeda);
}
const OTTXMLBody = '<programme ID="{0}" start="{1}" stop="{2}" channel="11">\n'+
  '<title lang="alb">{3}</title>\n'+
  '<original-title lang="eng">{4}</original-title>\n'+
  '<desc lang="alb">{5}</desc>\n'+
  '<credits />\n'+
  '<date />\n'+
  '<country />\n'+
  '<category />\n'+
  '<genres />\n'+
  '<icon />\n'+
  '<blackout />\n'+
  '<disable_catchup />\n'+
  '</programme>\n';

  const FilmBoxPremiumHeadOne = '';
  const FilmBoxPremiumHeadTwo = '';
  const FilmBoxPremiumHeadThree = '';
  const FilmBoxPremiumFootOne = '';
  const FilmBoxPremiumFootTwo = '';
  const FilmBoxPremiumFootThree = '';
  const FilmBoxPremiumBodyOne = '';
  const FilmBoxPremiumBodyTwo = '';
  const FilmBoxPremiumBodyThree = '';