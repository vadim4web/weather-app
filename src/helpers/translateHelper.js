async function translateToUkrainian(engText) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=uk&dt=t&q=${engText}`;
  const response = await fetch(url)
  const json = await response.json()

  return json[0][0][0] || engText
}

export default translateToUkrainian