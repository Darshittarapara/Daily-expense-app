import React from "react";
import Card from "components/UI/Card";
import './AccountContain.scss';
interface AccountContainProps {
  label: string;
  value?: string;
  children?: JSX.Element
}
export const AccountContain: React.FC<AccountContainProps> = ({
  label,
  value,
  children
}) => {
  return (
    <Card className = "total-amount-card">
      <div className="amount-title">{label}</div>
      <div className="amount-subtitle">{value}</div>
      {children}
    </Card>
  );
};
