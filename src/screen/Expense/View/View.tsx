import { DownLoadPdfButton } from 'components/DownLoadPdfButton/DownLoadPdfButton'
import { SectionHeader } from 'components/SectionHeader/SectionHeader'
import { ViewRowContain } from 'components/ViewRowContain/ViewRowContain'
import { useExpenseContext } from 'context/ExpenseContext/ExpenseContext'
import { formatDDMMYYYFormat } from 'helper/helper'
import React, { Fragment } from 'react'
import { useParams } from 'react-router'
import { Strings } from 'resource/Strings'

const View = () => {
    const { expenseList } = useExpenseContext();
    const { id } = useParams();
    const expenseItem = expenseList.filter((item) => id === item.id);

    return (
        <Fragment>
            {expenseItem.length > 0 && expenseItem.map((item, index) => {
                return (
                    <Fragment key={`${index}`}>
                        <SectionHeader isBackIconRequired={true} path='/expenses' isListingPage={false} headerTitle={Strings.viewExpense} />
                        <ViewRowContain label={Strings.name} value={item.name} />
                        <ViewRowContain label={Strings.amount} value={"INR " + item.amount.toString()} />
                        <ViewRowContain label={Strings.category} value={item.category} />
                        <ViewRowContain label={Strings.month} value={item.month} />
                        <ViewRowContain label={Strings.date} value={formatDDMMYYYFormat(new Date(item.date!))} />
                        <ViewRowContain label={Strings.time} value={new Date(item.date!).toLocaleTimeString()} />
                        <ViewRowContain label={Strings.notes} value={item.note} />
                        <DownLoadPdfButton onDownload={() => console.log('download')} />
                    </Fragment>
                )
            })}
        </Fragment>
    )
}

export default View