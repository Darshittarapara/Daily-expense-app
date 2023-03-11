export const capiltalLetter = (input: string) => {
  return (
    input?.charAt(0)?.toLocaleUpperCase() + input?.slice(1)?.toLocaleLowerCase()
  );
};

export const getMonthWiseAmounts = (list: any) => {
  const monthList: string[] = [];
  const amountList: number[] = [];
  const monthWiseAmount = list.reduce((accum: any, currentElemet: { month: any; amount: any; }) => {
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

export const formatDDMMYYYFormat = (date: Date) => {
  const [month, day, year] = date.toLocaleDateString().split('/');
  return `${day}-${month}-${year}`;
}

export const getCurrentMonth = (index: number) => {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return monthNames[index]
}

export const findDuplicateInput = (data: any[], name: string) => {
  const getItem = data?.find((item) => {
    return item?.name?.toLowerCase() === name.toLocaleLowerCase();
  });
  if (getItem) {
    return true;
  }
  return false;

}