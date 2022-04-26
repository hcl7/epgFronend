export const slShort_event_descriptor = [
    // { label: 'Lang', key: 'lang' },
    { label: 'Title', key: 'name' },
    // { label: 'Shortevent', key: 'short' },
    // { label: 'content', key: 'content'},
    // { label: 'parental', key: 'parental'},
    // { label: 'Event', key: 'Event'}
];

export const imdbApiBaseUrl = 'https://imdb-api.com/en/API/SearchMovie/k_z9yeskhc/';

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

export const renameKey = (object, key, newKey) => {
    const clonedObj = Object.assign({}, object);
    const targetKey = clonedObj[key];
    delete clonedObj[key];
    clonedObj[newKey] = targetKey;
    return clonedObj;
};

export const TVAXMLHead = '<?xml version="1.0" encoding="UTF-8"?>' + 
'<TVAMain publisher="GVIDI" publicationTime="2022-02-17T14:05:29+01:00" xmlns="urn:tva:metadata:2004" xmlns:mpeg7="urn:mpeg:mpeg7:schema:2001" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="urn:bds:metadata:2006 http://www.broadcastingdata.com/dataimport/tva/new/tva_v13_am1_bds1r2.xsd" >' + 
'<ProgramDescription>';
export const TVAXMLFoot = '</ProgramDescription></TVAMain>';
export const TVAXMLBody = '<ProgramInformationTable>' +
  '<ProgramInformation programId="crid://itnm.nl/TV892537_0">' +
  '<BasicDescription>' +
    '<Title xml:lang="NL" type="main"><![CDATA[Amsterdam Vandaag]]></Title>' + 
    '<Title xml:lang="NL" type="parentSeriesTitle"><![CDATA[Amsterdam Vandaag]]></Title>' +
    '<Synopsis xml:lang="NL" length="short"><![CDATA[Informatief programma. Het dagelijkse nieuws uit Amsterdam.]]></Synopsis>' +
    '<Synopsis xml:lang="NL" length="long"><![CDATA[]]></Synopsis>' +
    '<Genre href="urn:tva:metadata:cs:DVBgenre:2005:0.0.8.1">' +
      '<Name xml:lang="NL">informatief</Name>' +
    '</Genre>' + 
    '<RelatedMaterial>' +
      '<HowRelated href="urn:rbm:metadata:cs:HowRelatedCS:2010:boxCover"><Name>boxcover</Name></HowRelated>' +
      '<MediaLocator><mpeg7:MediaUri>https://cdn.gvidi.tv/img/booxmedia/b364/dynamic/889859.JPG</mpeg7:MediaUri></MediaLocator>' +
    '</RelatedMaterial>' +
    '<ParentalGuidance>' +
      '<mpeg7:ParentalRating href="urn:po:metadata:cs:NicamParentalRatingCS:2007:4">' +
        '<mpeg7:Name xml:lang="NL">4</mpeg7:Name>' +
      '</mpeg7:ParentalRating>' +
    '</ParentalGuidance>' + 
    '<EpisodeOf crid="crid://712f2e9a39b629c1773a75f5d8db8e80"/>' +
    '<Language>NL</Language>' +
    '<Duration>PT00H06M00S</Duration>' +
  '</BasicDescription>' +
  '</ProgramInformation>' +
  '</ProgramInformationTable>' +

  '<GroupInformationTable>' +
  '<GroupInformation groupId="crid://712f2e9a39b629c1773a75f5d8db8e80">' +
  '<GroupType value="series" xsi:type="ProgramGroupTypeType"/>' +
    '<BasicDescription>' +
      '<Title type="parentSeriesTitle" xml:lang="NL"><![CDATA[Amsterdam Vandaag]]></Title>' + 
      '<Synopsis xml:lang="NL" length="long"><![CDATA[Informatief programma. Het dagelijkse nieuws uit Amsterdam.]]></Synopsis>' +
      '<Genre href="urn:tva:metadata:cs:DVBgenre:2005:0.0.8.1">' + 
        '<Name xml:lang="NL">informatief</Name>' +
      '</Genre>' +
      '<RelatedMaterial>' +
        '<HowRelated href="urn:rbm:metadata:cs:HowRelatedCS:2010:boxCover"><Name>boxcover</Name></HowRelated>' +
        '<MediaLocator><mpeg7:MediaUri>https://cdn.gvidi.tv/img/booxmedia/b364/dynamic/889859.JPG</mpeg7:MediaUri></MediaLocator>' +
      '</RelatedMaterial>' +
      '<ParentalGuidance>' +
        '<mpeg7:ParentalRating href="urn:po:metadata:cs:NicamParentalRatingCS:2007:4">' +
        '<mpeg7:Name xml:lang="NL">4</mpeg7:Name>' +
        '</mpeg7:ParentalRating>' +
      '</ParentalGuidance>' +
    '</BasicDescription>' +
  '</GroupInformation>' +
'</GroupInformationTable>' +
 
'<ProgramLocationTable>' +
'<Schedule serviceIDRef="AT5NL_11" start="2022-02-16T06:00:00+01:00" end="2022-02-17T06:00:00+01:00">' +
'<ScheduleEvent>' +
  '<Program crid="crid://itnm.nl/TV892537_0"/>' +
  '<InstanceMetadataId>imi:AT5NL_11-0000041085</InstanceMetadataId>' +
  '<PublishedStartTime>2022-02-16T05:00:00Z</PublishedStartTime>' +
  '<PublishedDuration>PT00H06M00S</PublishedDuration>' +
  '<OtherIdentifier type="ProductID">AT5NL_11-0000041085</OtherIdentifier>' +
  '<OtherIdentifier type="ParentSeriesID">AT5NL_7cbc5fbaf9ac641e14f069af701f75d1</OtherIdentifier>' +
'</ScheduleEvent>' +
'</Schedule>' +
'</ProgramLocationTable>' +
'<ServiceInformationTable>' +
  '<ServiceInformation serviceId="AT5NL_11">' +
    '<Name>AT5NL_11</Name>' +
  '</ServiceInformation>' +
'</ServiceInformationTable>';
