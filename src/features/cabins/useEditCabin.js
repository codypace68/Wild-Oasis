import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useEditCabin() {
    const queryClient = useQueryClient();

    const { mutate: editCabin, isLoading: isEditing } = useMutation({
        mutationFn: ({ newCabin, id }) => createEditCabin(newCabin, id),
        onSuccess: () => {
            toast.success("new cabin created");
            queryClient.invalidateQueries("cabins");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { editCabin, isEditing };
}
