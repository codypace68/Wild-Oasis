import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
    const {
        isLoading,
        data: cabins,
        error,
    } = useQuery({
        queryKey: ["cabins"],
        queryFn: getCabins,
        config: {
            refetchOnWindowFocus: false,
        },
    });

    return { isLoading, cabins, error };
}
