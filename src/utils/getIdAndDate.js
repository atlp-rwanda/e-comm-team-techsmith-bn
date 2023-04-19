function getExpiryDateAndId(arr) {
  const result = [];
  /* eslint-disable */
  for (let i = 0; i < arr.length; i++) {
    const { id, expiryDate,userId,name } = arr[i];
    result.push({ id, expiryDate,userId,name});
  }

  return result;
}

// Path: src/utils/getIdAndDate.js
export default getExpiryDateAndId ;
