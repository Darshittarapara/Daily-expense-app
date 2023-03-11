import { SectionHeader } from 'components/SectionHeader/SectionHeader'
import { ViewRowContain } from 'components/ViewRowContain/ViewRowContain'
import { useIncomeContext } from 'context/IncomeContext/IncomeContext'
import { formatDDMMYYYFormat } from 'helper/helper'
import React, { Fragment } from 'react'
import { useParams } from 'react-router'
import { Strings } from 'resource/Strings'

const View = () => {
    const { incomeList } = useIncomeContext();
    const { id } = useParams();
    const incomeItem = incomeList.filter((item) => id === item.id);

    return (
        <Fragment>
            {incomeItem.length > 0 && incomeItem.map((item, index) => {
                return (
                    <Fragment key={`${index}`}>
                        <SectionHeader isBackIconRequired={true} path='/incomes' isListingPage={false} headerTitle={Strings.viewIncome} />
                        <ViewRowContain label={Strings.name} value={item.name} />
                        <ViewRowContain label={Strings.amount} value={"INR "  + item.amount.toString()} />
                        <ViewRowContain label={Strings.category} value={item.category} />
                        <ViewRowContain label={Strings.month} value={item.month} />
                        <ViewRowContain label={Strings.date} value={formatDDMMYYYFormat(new Date(item.date!))} />
                        <ViewRowContain label={Strings.time} value={new Date(item.date!).toLocaleTimeString()} />
                    </Fragment>
                )
            })}
        </Fragment>
    )
}

export default View