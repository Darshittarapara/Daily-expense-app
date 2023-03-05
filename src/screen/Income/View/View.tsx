import { SectionHeader } from 'components/SectionHeader/SectionHeader'
import { ViewRowContain } from 'components/ViewRowContain/ViewRowContain'
import { useCategoryContext } from 'context/CategoryContext/CategoryContext'
import React, { Fragment } from 'react'
import { useParams } from 'react-router'
import { Strings } from 'resource/Strings'

const View = () => {
    const { categoryList } = useCategoryContext();
    const { id } = useParams();
    const categoryItem = categoryList.filter((item) => id === item.id);

    return (
        <Fragment>
            {categoryItem.length > 0 && categoryItem.map((item, index) => {
                return (
                    <Fragment key={`${index}`}>
                        <SectionHeader isBackIconRequired={true} path='/category' isListingPage={false} headerTitle={Strings.viewCategory} />
                        <ViewRowContain label={Strings.categoryName} value={item.name} />
                        <ViewRowContain label={Strings.categoryType} value={item.type} />
                        <ViewRowContain label={Strings.categoryIcon} value={item.icon} />
                    </Fragment>
                )
            })}

        </Fragment>
    )
}

export default View