import React from "react";
import ContentTitle from "components/ContentTitle/ContentTitle";
import { SelectInput } from "components/SelectInput/SelectInput";
import { Strings } from "resource/Strings";
import "./SectionHeader.scss";
import BackIcon from "components/BackIcon/BackIcon";
import { useLocation, useNavigate } from "react-router-dom";
interface Props {
  headerTitle: string;
  options?: string[];
  isBackIconRequired?: boolean
  isListingPage: boolean;
  col?: string;
  value?: string;
  onChangeHandler?: (value: string) => void;
  children?: JSX.Element;
  path?: string
}
export const SectionHeader: React.FC<Props> = (props) => {
  const navigator = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="section-header" style={{ padding: "5px 5px" }}>
      <div className="row">
        <div className={`col-${props.col || 12} mt-2`} >
          {props.isBackIconRequired && <BackIcon path={props.path!} />}
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
            {props.headerTitle === "Expense" && pathname === "/dashboard" && (
              <p className="all-page-link" onClick={() => navigator('/incomes')}>{Strings.seeAll}</p>
            )}

            {props.headerTitle === "Income" && pathname === "/dashboard" && (
              <p className="all-page-link">{Strings.seeAll}</p>
            )}
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};
