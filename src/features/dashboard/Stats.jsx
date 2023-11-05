import styled from "styled-components";
import Stat from "./Stat";
import {
    HiOutlineBriefcase,
    HiOutlineChartBar,
    HiOutlineCurrencyDollar,
    HiOutlineCalendar,
} from "react-icons/hi";
import { formatCurrency } from "../../utils/helpers";

export default function Stats({
    bookings,
    confirmedStays,
    numDays,
    cabinsCount,
}) {
    const numBookings = bookings.length;

    const sales = bookings.reduce((acc, booking) => {
        return acc + booking.totalPrice;
    }, 0);

    const checkins = confirmedStays.length;

    const occupation =
        confirmedStays.reduce((acc, stay) => {
            return acc + stay.numNights;
        }, 0) /
        (numDays * cabinsCount);

    return (
        <>
            <Stat
                title="Bookings"
                color="blue"
                icon={<HiOutlineBriefcase />}
                value={numBookings}
            ></Stat>
            <Stat
                title="Sales"
                color="green"
                icon={<HiOutlineCurrencyDollar />}
                value={formatCurrency(sales)}
            ></Stat>
            <Stat
                title="Check-ins"
                color="indigo"
                icon={<HiOutlineCalendar />}
                value={checkins}
            ></Stat>
            <Stat
                title="Occupancy rate"
                color="yellow"
                icon={<HiOutlineChartBar />}
                value={Math.round(occupation * 100) + "%"}
            ></Stat>
        </>
    );
}
