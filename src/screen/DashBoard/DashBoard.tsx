import ContentTitle from 'components/ContentTitle/ContentTitle';
import { SectionHeader } from 'components/SectionHeader/SectionHeader';
import Card from 'components/UI/Card';
import { useExpenseContext } from 'context/ExpenseContext/ExpenseContext';
import { useIncomeContext } from 'context/IncomeContext/IncomeContext';
import React, { useState } from 'react';
import { AccountContain } from './components/AccountContain/AccountContain';
import { MonthlyCharts } from './components/AccountContain/MonthlyExpenseChart/MonthlyExpenseChart';
import './DashBoard.scss';

export const DashBoard = () => {
    const [listType, setListType] = useState<string>('expense');
    const { expenseList } = useExpenseContext()
    const { incomeList } = useIncomeContext()
    const selectInputChangeHandler = (value: string) => {
        console.log(value);
        setListType(value)
    }
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <ContentTitle title='Dashboard' />
                </div>
                <div className='col-12'>
                    <div className='row'>
                        <div className='col-md-6 col-lg-6 col-xl-6 col-12 mb-5'>
                            <Card>
                                <SectionHeader
                                    isListingPage={false}
                                    value={listType}
                                    options={["expese", "incomex"]}
                                    headerTitle="Your account" col='12'
                                />
                                <div className='card-body'>
                                    <AccountContain label='Total Balance' value="INR 50000" />
                            </Card>

                        </div>
                        <div className='col-md-6 col-lg-6 col-xl-6  col-12 mb-5'>
                            <Card>
                                <SectionHeader
                                    onChangeHandler={selectInputChangeHandler}
                                    isListingPage={true} col="6" options={["expese", "income"]}
                                    headerTitle={listType.includes("income") ? "Monthly income" : "Monthly expense"} />
                                <div className='card-body'>
                                    {listType.includes("expense") ? <MonthlyCharts data={expenseList} id="expense-id" /> : <MonthlyCharts data={incomeList} id="income-id" />}
                                </div>
                            </Card>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}