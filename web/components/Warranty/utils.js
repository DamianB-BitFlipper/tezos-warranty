// https://stackoverflow.com/questions/21647928/javascript-unicode-string-to-hex
export function hexEncode(s) {
    var hex, i;
    var result = "";

    for (i = 0; i < s.length; i++) {
        hex = s.charCodeAt(i).toString(16);
        result += ("000" + hex).slice(-4);
    }

    return result
}
