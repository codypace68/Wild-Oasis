import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: login, isLoading } = useMutation({
        mutationFn: ({ email, password }) => loginAPI({ email, password }),
        onSuccess: (user) => {
            queryClient.setQueryData(["user"], user.user);

            console.log("logging in");
            navigate("/dashboard", { replace: true });
        },
        onError: (error) => {
            console.log(error);
            toast.error("login failed");
        },
    });

    return { login, isLoading };
}
