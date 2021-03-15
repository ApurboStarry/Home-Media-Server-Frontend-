function getShortNameOfPath(path) {
  const tokens = path.split("/");
  return tokens[tokens.length - 1];
}

export default getShortNameOfPath;