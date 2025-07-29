import React, { FC } from "react";
import { INFO_CARD_VALUE_TYPE } from "../types/infoCardValueType";

interface IInfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

export const InfoCard: FC<IInfoCardProps> = ({ icon, label, value }) => (
  <div className="infoCard">
    <div className="infoCardHeader">
      {icon}
      <span className="infoCardLabel">{label}</span>
    </div>
    <p
      className={`${
        INFO_CARD_VALUE_TYPE.DETECTED
          ? "infoCardValueGreen"
          : "infoCardValueRed"
      }`}
    >
      {value}
    </p>
  </div>
);
