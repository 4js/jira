import React, { useEffect, useState } from "react";
import { AuthenticatedApp } from "authenticated";
import { UnauthenticatedApp } from "unauthenticated-app";
import { useAuth } from "context/auth-context";
import { ErrorBoundary } from "components/error-bundary";
import { QueryClientProvider, QueryClient } from "react-query";
import "./App.css";
import { ErrorBox } from "components/lib";

const queryClient = new QueryClient();

const FullPageErrorFallback = ({ error }: { error: Error | null }) => {
  return <ErrorBox error={error} />;
};

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {/* <React.StrictMode> */}
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        <QueryClientProvider client={queryClient}>
          {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </QueryClientProvider>
      </ErrorBoundary>
      {/* </React.StrictMode> */}
    </div>
  );
}

export default App;
