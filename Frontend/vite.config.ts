import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.ts",
    coverage: {
      provider: "istanbul",
      reporter: ["text", "html"],
      exclude: [
        "src/main.tsx",
        "src/App.tsx",
        "**/*.css",
        "src/apis/axios.ts",
        "src/apis/auth.api.ts",
        "src/apis/user.api.ts",
        "src/apis/credit.api.ts",
        // "src/components/**/**Menu.tsx",
        // "src/components/reusable/MainLayout.tsx",
        // "src/components/reusable/Sidebar.tsx",
        // "src/components/reusable/Topbar.tsx",
        "src/redux/menuSlice.ts",

        "src/components/reusable/MainLayout.tsx",

        //  Admin pages EXCEPT AdminDashboard
        "src/components/admin/CreateUser.tsx",
        "src/components/admin/UserManagement.tsx",
        "src/components/admin/AdminMenu.tsx",

        //  RM pages EXCEPT RMDashboard
        "src/components/rm/CreateRMClients.tsx",
        "src/components/rm/RMClients.tsx",
        "src/components/rm/EditClient.tsx",
        "src/components/rm/CreateRMCreditRequests.tsx",
        "src/components/rm/RMCreditRequests.tsx",
        "src/components/rm/ViewClient.tsx",
        "src/components/rm/ViewCreditRequest.tsx",
        "src/components/rm/RMMenu.tsx",
        

        //  Analyst pages EXCEPT AnalystDashboard
        "src/components/analyst/CreditReview.tsx",
        "src/components/analyst/ViewCreditRequest.tsx",
        "src/components/analyst/AnalystMenu.tsx",
      ],
    },
  },
});
