/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { _format } from "~modules-core/utility/fomat";
import {
  BookingOrderStatistic,
  BookingOrderTable,
} from "~modules-dashboard/components";

export const BookingOrderPage: React.FC = () => {
  const [ViewReport, setViewReport] = useState(false);
  return (
    <>
      {ViewReport ? <BookingOrderStatistic /> : null}

      <BookingOrderTable
        onViewReport={() => setViewReport(!ViewReport)}
        ViewReport={ViewReport}
      />
    </>
  );
};
