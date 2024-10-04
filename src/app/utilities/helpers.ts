export const flattenAndRenameObject = (obj: Record<string, unknown>, parentKey = '', result = {} as Record<string, unknown>): Record<string, unknown> => {
  if (typeof obj !== 'object' || obj === null) {
    return result;
  }

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const propName = parentKey ? `${parentKey}.${key}` : key;

      // Ignore __typename fields
      if (propName.includes("__typename")) {
        continue;
      }

      // Rename fields to shorter names if necessary
      const renamedProp = propName
        .replace("location.", "") // Remove 'location.' prefix
        .replace("characteristics.", "") // Remove 'characteristics.' prefix
        .replace("sqMts", "sqm") // Shorten sqMts to sqm
        .replace("catastroId", "Catastro ID"); // Rename catastroId for readability

      // If the key is an object, recursively flatten it
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        flattenAndRenameObject(obj[key] as Record<string, unknown>, propName, result);
      } else {
        // Directly add the key-value pair to the result
        result[renamedProp] = obj[key];
      }
    }
  }
  return result;
};

  