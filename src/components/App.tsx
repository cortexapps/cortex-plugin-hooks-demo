import type React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ChakraProvider } from '@chakra-ui/react'

import {
  PluginProvider,
  Stack,
} from "@cortexapps/plugin-core/components";

import "../baseStyles.css";
import ErrorBoundary from "./ErrorBoundary";
import PluginContext from "./PluginContext";

const App: React.FC = () => {
  const queryClient = new QueryClient();
  return (
    <ErrorBoundary>
      <PluginProvider>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider>
            <Stack>
              <PluginContext />
            </Stack>
          </ChakraProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </PluginProvider>
    </ErrorBoundary>
  );
};

export default App;
