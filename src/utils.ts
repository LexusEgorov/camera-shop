export default function generator () {
  let number = 0;
  return function () {
    return number++;
  };
}
