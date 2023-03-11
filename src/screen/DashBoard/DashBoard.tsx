import { ColumnChart } from "components/ColumnChart/ColumnChart";
import ContentTitle from "components/ContentTitle/ContentTitle";
import { SectionHeader } from "components/SectionHeader/SectionHeader";
import Card from "components/UI/Card";
import { useExpenseContext } from "context/ExpenseContext/ExpenseContext";
import { useIncomeContext } from "context/IncomeContext/IncomeContext";
import { getMonthWiseAmounts } from "helper/helper";
import React, { useEffect, useMemo, useState } from "react";
import { Strings } from "resource/Strings";
import { AccountContain } from "./components/AccountContain/AccountContain";
import { List } from "./components/List/List";
import { MonthlyCharts } from "./components/MonthlyChart/MonthlyChart";
import "./DashBoard.scss";

export const DashBoard = () => {
  const { expenseList } = useExpenseContext();
  const { incomeList } = useIncomeContext();
  const [monthlyChartType, setMonthlyChartType] = useState<string>("expense");
  const [montlyListType, setMontlyListType] = useState<string>("expense");
  const [monthlyExpenses, setMontlyExpenses] = useState<number[]>([]);
  const [expenseMonths, setExpenseMonths] = useState<string[]>([]);
  const [incomeMonths, setIncomeMonths] = useState<string[]>([]);
  const [monthlyIncome, setMontlyIncome] = useState<number[]>([]);
  const expense = useMemo(() => expenseList, [expenseList]);
  const income = useMemo(() => incomeList, [incomeList]);

  const totalIncome = incomeList?.reduce((accum, currentElement) => {
    accum += Number(currentElement?.amount);
    return accum
  }, 0);
  const totalExpense = expenseList?.reduce((accum, currentElement) => {
    accum += Number(currentElement?.amount);
    return accum
  }, 0);

  const totalBalance = totalIncome - totalExpense;
  useEffect(() => {
    const monthWiseExpense = getMonthWiseAmounts(expense);
    const monthWiseIncome = getMonthWiseAmounts(income);
    setExpenseMonths(monthWiseExpense.monthList);
    setIncomeMonths(monthWiseIncome.monthList);
    setMontlyExpenses(monthWiseExpense.amountList);
    setMontlyIncome(monthWiseIncome.amountList);
  }, [expense, income]);
  const MonthlyChartTypeSelectInputChangeHandler = (value: string) => {
    setMonthlyChartType(value);
  };
  const MontlyListTypeSelectInputChangeHandler = (value: string) => {
    setMontlyListType(value);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <ContentTitle title="Dashboard" />
        </div>
        <div className="col-12">
          <div className="row">
            <div className="col-md-4 col-lg-4 col-xl-4 col-12 mb-3">
              <AccountContain label="Total Balance" value={`INR ${totalBalance || 0}`} />
            </div>
            <div className="col-md-4 col-lg-4 col-xl-4 col-12 mb-3">
              <AccountContain label="Daily Average expense" value="INR 300" />
            </div>
            <div className="col-md-4 col-lg-4 col-xl-4 col-12">
              <AccountContain label="UpComing payment">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>Electricity bill</div>
                  <div>INR 3000</div>
                </div>
              </AccountContain>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6  col-12 mb-5 monthly-graph">
              <Card>
                <SectionHeader
                  onChangeHandler={MonthlyChartTypeSelectInputChangeHandler}
                  isListingPage={true}
                  col="6"
                  options={["expese", "income"]}
                  headerTitle={
                    monthlyChartType.includes("income")
                      ? "Monthly income"
                      : "Monthly expense"
                  }
                />
                <div className="card-body">
                  {monthlyChartType.includes("income") ? (
                    <MonthlyCharts
                      data={incomeList as any}
                      monthlyChartData={monthlyIncome}
                      setMontlyChartData={setMontlyIncome}
                      id="income-id"
                      seriesName={Strings.monthlyIncome}
                    />
                  ) : (
                    <MonthlyCharts
                      data={expenseList}
                      monthlyChartData={monthlyExpenses}
                      setMontlyChartData={setMontlyExpenses}
                      id="expense-id"
                      seriesName={Strings.monthlyExpense}
                    />
                  )}
                </div>
              </Card>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6  col-12 ">
              <Card>
                <SectionHeader
                  isListingPage={false}
                  col="12"
                  headerTitle={Strings.monthlyExpenseVsIncome}
                />
                <div className="card-body">
                  <ColumnChart
                    id="expense-and-income"
                    months={[...incomeMonths, ...expenseMonths]}
                    series={[
                      { name: Strings.income, data: monthlyIncome },
                      { name: Strings.expense, data: monthlyExpenses }
                    ]}
                    width={400}
                  />
                </div>
              </Card>
            </div>
            <div className="col-md-9 col-lg-9 col-xl-9 col-12">
              <Card>
                <SectionHeader
                  onChangeHandler={MontlyListTypeSelectInputChangeHandler}
                  isListingPage={true}
                  col="6"
                  options={["expese", "income"]}
                  headerTitle={
                    montlyListType.includes("income")
                      ? Strings.income
                      : Strings.expense
                  }
                />
                <div className="section-body">
                  {montlyListType.includes("income") ? (
                    <List data={incomeList} />
                  ) : (
                    <List data={expenseList} />
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
