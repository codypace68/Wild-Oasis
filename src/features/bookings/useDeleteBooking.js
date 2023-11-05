import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingAPI } from "../../services/apiBookings";
import { useNavigate } from "react-router";

export function useDeleteBooking() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
        mutationFn: (id) => deleteBookingAPI(id),
        onSuccess: () => {
            toast.success("Booking deleted");

            queryClient.invalidateQueries({
                queryKey: ["bookings"],
            });

            navigate("/");
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { isDeleting, deleteBooking };
}
