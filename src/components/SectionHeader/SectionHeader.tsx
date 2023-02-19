import React from 'react';
import ContentTitle from 'components/ContentTitle/ContentTitle'
import { SelectInput } from 'components/SelectInput/SelectInput';
import { Strings } from 'resource/Strings';
import './SectionHeader.scss'
interface Props {
    headerTitle: string
    options?: string[]
    isListingPage: boolean
    col?: string
    value?: string
    onChangeHandler?: (value: string) => void
}
export const SectionHeader: React.FC<Props> = (props) => {
    return (
        <div className='card-header'>
            <div className='row'>
                <div className={`col-${props.col || 12}`}>
                    <ContentTitle title={props.headerTitle} />
                </div>
                <div className='col-6'>
                    <div className='float-end right-corner-container'>
                        {props.isListingPage && <SelectInput
                            value={props.value!} name='transitionType' options={
                                props.options!
                            }
                            onChange={(value) => props.onChangeHandler!(value)}
                            />}
                        {props.headerTitle.includes("expense") || props.headerTitle.includes("income") && <p className='all-page-link'>{Strings.seeAll}</p>}
                    </div>
                </div>
            </div>




        </div>
    )
}