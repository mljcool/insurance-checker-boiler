const getFormattedDate = (date) => {
   var year = date.getFullYear();

   var month = (1 + date.getMonth()).toString();
   month = month.length > 1 ? month : '0' + month;

   var day = date.getDate().toString();
   day = day.length > 1 ? day : '0' + day;

   return day + '/' + month + '/' + year;
};

const safeKeys = (data = {}) => {
   return (keys) => {
      const exist = (data || {}).hasOwnProperty(keys);
      return exist ? data[keys] : (data[keys] = null);
   };
};

const setInitials = (fname = '', lname = '') => {
   const strsFormat = (str) => (str || '').charAt(0).toUpperCase();
   const setNames = strsFormat(fname) + '' + strsFormat(lname);
   return setNames;
};

const urlSPliter = () => {
   return new Promise((resolve, reject) => {
      const url = window.location.href;
      const splitURL = url.split('/');
      const isInContactPage =
         splitURL.includes('contacts') && splitURL.length >= 5;
      if (!!splitURL.length && isInContactPage) {
         resolve({
            success: true,
            familyId: splitURL[6],
         });
      } else {
         resolve({
            success: false,
            familyId: 0,
         });
      }
   });
};
