"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux/store";
import AuthSyncWrapper from "@/components/auth/AuthSyncWrapper";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthSyncWrapper>{children}</AuthSyncWrapper>
      </PersistGate>
    </Provider>
  );
}
