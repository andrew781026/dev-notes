/*
var fs = require('fs');

function getC(fp) {
    var a;
    fs.getFile(fp, function (cont) {
        a = cont;
    })

    return a;
}

getC('D:\\test\\blogs\\dev-notes\\2021-10-15\\readme.md')
*/
/*
const wantedCriminals = [
    "rob-debob", // criminal_ids
    "jeff-bizos",
    "de-coder",
    "intu-ishun",
];

class FBIServer {
    constructor(_criminalData, _baseUrl) {
        this.baseUrl = _baseUrl;
        this.criminalData = _criminalData;
    }

    async getCriminalRecord(criminalName) {
        return await this.criminalData.criminalRecord(criminalName);
    }

    // <base_url>: Looks like this: https://<>.<>/
    // possible urls to handle:
    // <base_url>/criminal_data/<criminal_id>: Expected output: value of getCriminalRecord as object
    //                                         If no criminal exists, return "no criminal found"
    // <base_url>/does_criminal_exist/<criminal_id>: Expected output: boolean indicating wether the criminal exists
    // <base_url>/<anything else>: Expected output: "404 not found"
    async handleWebRequest(url) {
        // only change after
        // INSERT CODE HERE

        // only change before
    }
}

new FBIServer()

 */
/*
const wantedCriminals = [
    "rob-debob", // criminal_ids
    "jeff-bizos",
    "de-coder",
    "intu-ishun",
];

const baseUrl = 'https://<>.<>/'

const tt = url => {

    // <base_url>/criminal_data/<criminal_id>: Expected output: value of getCriminalRecord as object
    //                                         If no criminal exists, return "no criminal found"
    // <base_url>/does_criminal_exist/<criminal_id>: Expected output: boolean indicating wether the criminal exists
    // <base_url>/<anything else>: Expected output: "404 not found"

    const tempUrl = url.substr(baseUrl.length);
    const middleStr01 = 'criminal_data/'
    const middleStr02 = 'does_criminal_exist/'

    if (tempUrl.startsWith(middleStr01)) {

        const criminal_id = tempUrl.substr(middleStr01.length)
      return   wantedCriminals.includes(criminal_id) ?'getCriminalRecord':"no criminal found"


    } else if (tempUrl.startsWith(middleStr02)) {

        const criminal_id = tempUrl.substr(middleStr02.length)
        return   wantedCriminals.includes(criminal_id)

    } else return '404 not found'

}
const test01 = 'https://<>.<>/criminal_data/rob-debob'
const tempUrl = test01.substr(baseUrl.length);

console.log(tempUrl);
console.log(tempUrl.substr('criminal_data/'.length));
console.log(wantedCriminals.includes(tempUrl.substr('criminal_data/'.length)));

console.log(tt(test01))
console.log(tt('https://<>.<>/criminal_data/sds'))
console.log(tt('https://<>.<>/does_criminal_exist/rob-debob'))
console.log(tt('https://<>.<>/does_criminal_exist/sds'))
console.log(tt('https://<>.<>/does_rob-debob'))

*/

function fuzzyCompareTwoStrings(reference, input) {

    if (!input) return reference?.length

  // You can assume that both strings have the same length - return the amount of wrong letters!
  const refArr =  reference.split('');
  const inputArr =  input.split('');

  let counter = 0;

    for (let i = 0; i < reference.length; i++) {

        if (refArr[i] !== inputArr[i])counter ++
    }

    return counter
}

console.log(fuzzyCompareTwoStrings("Javascript", "javascript"))
console.log(fuzzyCompareTwoStrings("Mika Joe", "Mike Joe"))
console.log(fuzzyCompareTwoStrings("Mika Joe", "Mike JoE"))
