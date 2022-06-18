
/**
 * Convert a string from CamelCase to dashed-style.
 * @param myStr String to convert.
 */
export function camelToDash(myStr: string) {
    return myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}