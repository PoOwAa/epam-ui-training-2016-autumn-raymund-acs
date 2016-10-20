/**
 * Created by ui2016 on 10/20/2016.
 */
var myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18];

function evenNumbers(arr) {
    var retArr = [];
    arr.forEach(function (item) {
        if (item % 2 == 0) {
            retArr.push(item);
        }
    });
    return retArr;
}

console.log(evenNumbers(myArray));



function getTopLevelDomain(URI) {
    // without protocols like http:// ftp:// etc.
    if (URI.indexOf('://') != -1) {
        URI = URI.substring(URI.indexOf('://')+3, URI.length);
    }
    URI = URI.split('/');
    // top level domain doesn't exist
    if (URI[0].indexOf('.') == -1) {
        return false;
    }
    URI = URI[0].split('.');
    return URI[URI.length-1];
}

console.log(getTopLevelDomain("http://example.com/path"));
console.log(getTopLevelDomain("https://www.example.hu/path"));
console.log(getTopLevelDomain("http://register.example.org/path"));
console.log(getTopLevelDomain("http://www.w3schools.custom/js/js_operators.asp"));
console.log(getTopLevelDomain("http://localhost:3000"));
console.log(getTopLevelDomain("mywebsite.com/route/router.html"));
console.log(getTopLevelDomain("ftp://mywebsite.budapest/route/router.html"));