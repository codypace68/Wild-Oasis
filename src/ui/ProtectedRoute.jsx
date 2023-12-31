import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const { user, isLoading, isAuthenticated } = useUser();

    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            navigate("/login");
        }
    }, [isLoading, isAuthenticated, navigate]);

    if (isLoading)
        return (
            <FullPage>
                <Spinner></Spinner>
            </FullPage>
        );

    if (isAuthenticated) return <>{children}</>;
}
