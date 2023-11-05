import { useMutation } from "@tanstack/react-query";
import { signup as signupAPI } from "../../services/apiAuth";

export function useSignup() {
    const { mutate: signup, isLoading } = useMutation({
        mutationFn: signupAPI,
        onSuccess: (user) => {
            console.log(user);
        },
    });

    return { signup, isLoading };
}
