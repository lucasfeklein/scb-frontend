import { useRouter } from "next/router";
import { useEffect } from "react";

const MagicLink = () => {
    const router = useRouter();
    const token = router.query.token;

    useEffect(() => {
        const verifyMagicLink = async () => {
            try {
                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token }),
                };
                const response = await fetch(
                    "http://localhost:8000/verify-magic-link",
                    requestOptions
                );
                if (response.ok) {
                    // handle success response
                    const data = await response.json()
                    localStorage.setItem("token", data.token);
                    router.push('/dashboard')
                } else {
                    // handle error response
                }
            } catch (error) {
                // handle network error
            }
        };
        token && verifyMagicLink();
    }, [token]);

    return (
        <>
            <h1>Loading...</h1>
        </>
    );
};

export default MagicLink;