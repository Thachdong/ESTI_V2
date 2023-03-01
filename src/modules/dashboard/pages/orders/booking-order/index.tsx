/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { _format } from "~modules-core/utility/fomat";
import {
  BookingOrderStatistic,
  BookingOrderTable,
} from "~modules-dashboard/components";

export const BookingOrderPage: React.FC = () => (
  <>
    {/* <BookingOrderStatistic /> */}

    <BookingOrderTable />
  </>
);
