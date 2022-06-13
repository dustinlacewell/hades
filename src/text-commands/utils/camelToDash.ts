
export function camelToDash(myStr: string) {
    return myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}