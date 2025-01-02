"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const navigateToSignup = () => {
    router.push("/auth/signup");
  };

  const navigateToLogin = () => {
    router.push("/auth/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Auth App</h1>
      <p>Please sign up or log in to continue.</p>
      <div style={{ marginTop: "20px" }}>
        <button
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={navigateToSignup}
        >
          Sign Up
        </button>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={navigateToLogin}
        >
          Log In
        </button>
      </div>
    </div>
  );
}
