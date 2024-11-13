const getAveragesT = (arr) => {
  return arr.reduce((A, t, i, a) => {
    if ((i + 1) % 24 !== 0 || i === 0) {
      A[A.length - 1] += t
    } else if (i !== a.length - 1) {
      A[A.length - 1] = +(A[A.length - 1] / 24).toFixed(1)
      A.push(0)
    } else {
      A[A.length - 1] = +(A[A.length - 1] / 24).toFixed(1)
    }
    return A
  }, [0])
}

export default getAveragesT