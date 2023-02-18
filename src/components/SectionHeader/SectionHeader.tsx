import React from 'react';
import ContentTitle from 'components/ContentTitle/ContentTitle'
import { SelectInput } from 'components/SelectInput/SelectInput';
interface Props {
    headerTitle: string
    options: string[]
    isListingPage: boolean
    col?: string
    value?: string
    onChangeHandler?: (value: string) => void
}
export const SectionHeader: React.FC<Props> = (props) => {
    return (
        <div className='card-header'>
            <div className='row'>
                <div className={`col-${props.col || 6}`}>
                    <ContentTitle title={props.headerTitle} />
                </div>
                <div className='col-6'>
                    <div className='float-end' style={{ width: "140px" }}>
                        {props.isListingPage && <SelectInput
                            value={props.value!} name='transitionType' options={
                                props.options!
                            }
                            onChange={(value) => props.onChangeHandler!(value)}
                            label="Select type" />}
                    </div>
                </div>
            </div>




        </div>
    )
}