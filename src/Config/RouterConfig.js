export const slShort_event_descriptor = [
    { label: 'Lang', key: 'lang' },
    { label: 'Name', key: 'name' },
];

export const slDetailsHeaders = [
    { label: 'Id', key: 'id' },
    { label: 'IdNo', key: 'idNo' },
    { label: 'Fname', key: 'fname' },
    { label: 'Lname', key: 'lname' },
    { label: 'Birthday', key: 'birthday' },
    { label: 'Address', key: 'addr' },
    { label: 'IdType', key: 'idType' },
    { label: 'Contact', key: 'contact' },
    { label: 'Pep', key: "pep"},
    { label: 'Resident', key: "resident"},
    { label: 'Risk', key: "risk"},
    { label: 'Documents', key: 'documents' },
];

export const slSearchList = [
  { label: 'Id', key: 'id' },
  { label: 'IdNo', key: 'idNo' },
  { label: 'Fname', key: 'fname' },
  { label: 'Lname', key: 'lname' },
];

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