import React from "react";
import ContentTitle from "components/ContentTitle/ContentTitle";
import { SelectInput } from "components/SelectInput/SelectInput";
import { Strings } from "resource/Strings";
import "./SectionHeader.scss";
interface Props {
  headerTitle: string;
  options?: string[];
  isListingPage: boolean;
  col?: string;
  value?: string;
  onChangeHandler?: (value: string) => void;
  children?: JSX.Element;
}
export const SectionHeader: React.FC<Props> = (props) => {
  return (
    <div className="section-header" style={{ padding: "5px 5px" }}>
      <div className="row">
        <div className={`col-${props.col || 12} mt-2`} >
          <ContentTitle title={props.headerTitle} />
        </div>
        <div className="col-6">
          <div className="float-end right-corner-container">
            {props.isListingPage && (
              <SelectInput
                value={props.value!}
                name="transitionType"
                options={props.options!}
                onChange={(value) => props.onChangeHandler!(value)}
              />
            )}
            {props.headerTitle === "Expense" && (
              <p className="all-page-link">{Strings.seeAll}</p>
            )}

            {props.headerTitle === "Income" && (
              <p className="all-page-link">{Strings.seeAll}</p>
            )}
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};
