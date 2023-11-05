import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router";

export function useLogout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {
        mutate: logout,
        isLoading,
        error,
    } = useMutation({
        mutationFn: logoutAPI,
        onSuccess: () => {
            queryClient.removeQueries();
            navigate("/login", { replace: true });
        },
    });

    return { logout, isLoading };
}
