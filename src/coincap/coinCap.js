
const JP = JSON.parse;

const CreateXmlHttp = () => {
    let xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xmlhttp;
}

const AjaxRequest = (xmlhttp, cb) => {

    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                const parsedResponse = JP(xmlhttp.responseText);
                cb.apply(null, [parsedResponse]);
            } else {
                cb.apply(null, [new Error('Request Failed')])
            }
        }
    };

    const url='https://coincap.io/front';

    xmlhttp.open('GET',url, true);
    xmlhttp.send();
}

export const getCoinData = (cb) => {
    const xmlhttp = CreateXmlHttp();
    AjaxRequest(xmlhttp, cb);
}
