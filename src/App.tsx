import React from "react";
import { AuthenticatedApp } from "authenticated";
import { UnauthenticatedApp } from "unauthenticated-app";
import { useAuth } from "context/auth-context";
import "./App.css";
import { ErrorBoundary } from "components/error-bundary";

const FullPageErrorFallback = ({ error }: { error: Error | null }) => {
  return <p>{error?.message}</p>;
};

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
