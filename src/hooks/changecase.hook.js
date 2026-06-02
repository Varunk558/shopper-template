

export function UseChangeCase(str) {

    var firstChar = str.charAt(0);
    var restOfString = str.slice(1);
    var result = firstChar.toUpperCase() + restOfString.toLowerCase();
    return result;
}