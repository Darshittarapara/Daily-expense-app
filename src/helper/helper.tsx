import { ExpenseState } from "Modal/Modal";

export const capiltalLetter = (input: string) => {
  return (
    input.charAt(0).toLocaleUpperCase() + input.slice(1).toLocaleLowerCase()
  );
};

export const getMonthWiseAmounts = (list: ExpenseState[]) => {
  const monthList: string[] = [];
  const amountList: number[] = [];
  const monthWiseAmount = list.reduce((accum: any, currentElemet) => {
    const { month, amount } = currentElemet;
    if (!accum[month]) {
      accum[month] = Number(amount);
    } else {
      accum[month] += Number(amount);
    }
    return accum;
  }, {});
 
  Object.entries(monthWiseAmount).forEach(([key, value]) => {
    const amount = value as number
    monthList.push(key);
    amountList.push(amount);
  });

  return { monthList, amountList };
};
