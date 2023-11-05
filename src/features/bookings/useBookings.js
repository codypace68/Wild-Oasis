import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    const filterValue = searchParams.get("status");
    const filter =
        !filterValue || filterValue === "all"
            ? null
            : { field: "status", value: filterValue };

    const soryByRaw = searchParams.get("sortBy") || "startDate-desc";
    const [field, direction] = soryByRaw.split("-");
    const sortBy = { field, direction };

    const page = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));

    const {
        isLoading,
        data: { data: bookings, count } = {},
        error,
    } = useQuery({
        queryKey: ["bookings", filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page }),
        config: {
            refetchOnWindowFocus: false,
        },
    });

    const pageCount = Math.ceil(count / PAGE_SIZE);

    // prefetch
    if (page < pageCount)
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page + 1],
            queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
            config: {
                refetchOnWindowFocus: false,
            },
        });

    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page - 1],
            queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
            config: {
                refetchOnWindowFocus: false,
            },
        });

    return { isLoading, bookings, error, count };
}
