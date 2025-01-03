function cosineSimilarity(a, b) {
  const dotProduct = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0));
  if (magnitudeA && magnitudeB) {
    return dotProduct / (magnitudeA * magnitudeB);
  } else {
    return 0;
  }
}

module.exports = cosineSimilarity;