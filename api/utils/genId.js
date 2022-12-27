export default function genHexId(size) {
  return (new Array(size))
    .fill(0)
    .map(() => Math.floor(Math.random() * 255).toString(16))
    .join('');
}
