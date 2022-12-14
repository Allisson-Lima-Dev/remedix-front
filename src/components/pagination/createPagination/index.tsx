/* eslint-disable spaced-comment */
export const createPagination = (
  numberOfButtons: number,
  numberOfPages: number,
  currentPage: number
) => {
  if (currentPage > numberOfPages || currentPage < 1)
    return {
      pagination: [],
      currentPage,
    };
  //Aqui preencha o array com fill atraves do indice
  const buttons = Array(numberOfPages)
    .fill(1)
    .map((e, i) => e + i);
  //Aqui verifica se o numberOfButtons é par
  const sideButtons =
    numberOfButtons % 2 === 0 ? numberOfButtons / 2 : (numberOfButtons - 1) / 2;

  const calculLeft = (rest = 0) => ({
    array: buttons
      .slice(0, currentPage - 1)
      .reverse()
      .slice(0, sideButtons + rest)
      .reverse(),
    rest() {
      return sideButtons - calculLeft().array.length;
    },
  });

  const calculRight = (rest = 0) => ({
    array: buttons.slice(currentPage).slice(0, sideButtons + rest),
    rest() {
      return sideButtons - calculRight().array.length;
    },
  });

  const leftButtons = calculLeft(calculRight().rest()).array;
  const rightButtons = calculRight(calculLeft().rest()).array;

  return {
    pagination: [...leftButtons, currentPage, ...rightButtons],
    currentPage,
  };
};
