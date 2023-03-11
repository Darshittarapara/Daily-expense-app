import { ColumnChart } from "components/ColumnChart/ColumnChart";
import ContentTitle from "components/ContentTitle/ContentTitle";
import { SectionHeader } from "components/SectionHeader/SectionHeader";
import Card from "components/UI/Card";
import { useExpenseContext } from "context/ExpenseContext/ExpenseContext";
import { useIncomeContext } from "context/IncomeContext/IncomeContext";
import { getMonthWiseAmounts } from "helper/helper";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Strings } from "resource/Strings";
import { AccountContain } from "./components/AccountContain/AccountContain";
import { List } from "./components/List/List";
import { MonthlyCharts } from "./components/MonthlyChart/MonthlyChart";
import "./DashBoard.scss";

export const DashBoard = () => {
  const navigator = useNavigate();
  const { expenseList, onDelete: onExpenseItemDelete } = useExpenseContext();
  const { incomeList, onDelete: onIncomeItemDelete } = useIncomeContext();
  const [monthlyChartType, setMonthlyChartType] = useState<string>("expense");
  const [monthlyListType, setMonthlyListType] = useState<string>("expense");

  const { monthList: monthlyExpenseList, amountList: monthlyExpenseAmounts } = getMonthWiseAmounts(expenseList);
  const { monthList: monthlyIncomeList, amountList: monthlyIncomeAmounts } = getMonthWiseAmounts(incomeList)

  const totalIncome = incomeList?.reduce((accum, currentElement) => {
    accum += Number(currentElement?.amount);
    return accum
  }, 0);
  const totalExpense = expenseList?.reduce((accum, currentElement) => {
    accum += Number(currentElement?.amount);
    return accum
  }, 0);

  const totalBalance = totalIncome - totalExpense;
  const MonthlyChartTypeSelectInputChangeHandler = (value: string) => {
    setMonthlyChartType(value.toLocaleLowerCase());
  };
  const MontlyListTypeSelectInputChangeHandler = (value: string) => {
    setMonthlyListType(value.toLocaleLowerCase());
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
              <AccountContain label="Daily expense" value={`INR ${totalExpense / 30 || 0}`} />
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
                  value={monthlyChartType}
                  col="6"
                  options={["expese", "income"]}
                  headerTitle={
                    monthlyChartType.includes("income")
                      ? "Monthly income"
                      : "Monthly expense"
                  }
                />
                <div className="card-body">
                  {monthlyChartType.includes('income') ? <MonthlyCharts
                    data={incomeList}
                    monthlyChartData={monthlyIncomeAmounts}
                    id="income-id"
                    seriesName={Strings.monthlyIncome}
                  /> : <MonthlyCharts
                    data={expenseList}
                    monthlyChartData={monthlyExpenseAmounts}
                    id="expense-id"
                    seriesName={Strings.monthlyExpense}
                  />}
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
                    months={[...monthlyExpenseList, ...monthlyIncomeList]}
                    series={[
                      { name: Strings.income, data: monthlyIncomeAmounts },
                      { name: Strings.expense, data: monthlyExpenseAmounts }
                    ]}
                    width={400}
                  />
                </div>
              </Card>
            </div>
            <div className="col-md-9 col-lg-9 col-xl-9 col-12 mt-4">
              <Card>
                <SectionHeader
                  onChangeHandler={MontlyListTypeSelectInputChangeHandler}
                  isListingPage={true}
                  col="6"
                  value={monthlyListType}
                  options={["expese", "income"]}
                  headerTitle={
                    monthlyListType.includes("income")
                      ? Strings.income
                      : Strings.expense
                  }
                />
                <div className="section-body">
                  {monthlyListType.includes("income") ? (
                    <List
                      pageName="Income"
                      data={incomeList}
                      onEditButtonClick={(id: string) => navigator(`/income/${id}/edit`)} onViewButtonClick={(id: string) => navigator(`/income/${id}/view`)} onDeleteButtonClick={(id: string) => onIncomeItemDelete(id)}
                    />
                  ) : (
                    <List
                      data={expenseList}
                      pageName="Expense"
                      onEditButtonClick={(id: string) => navigator(`/expense/${id}/edit`)} onViewButtonClick={(id: string) => navigator(`/expense/${id}/view`)} onDeleteButtonClick={(id: string) => onExpenseItemDelete(id)}
                    />
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
