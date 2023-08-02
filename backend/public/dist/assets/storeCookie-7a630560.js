function o(t){let e=new Date;e.setTime(e.getTime()+60*24*60*60*1e3);let i="expires="+e.toUTCString();document.cookie="jwt="+t+"; "+i+"; path=/"}export{o as s};
