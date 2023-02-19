import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Routing } from "./navigation/Routing";
import { AuthContext as AuthContextProvider } from "context/AuthContext/AuthContext";
import { UserContext as UserContextProvider } from "context/UserContext/UserContext";
import { ExpenseContext as ExpenseContextProvider } from "context/ExpenseContext/ExpenseContext";
import { IncomeContextProvider } from "context/IncomeContext/IncomeContext";
import { CategoryContextProvider } from "context/CategoryContext/CategoryContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <UserContextProvider>
          <CategoryContextProvider>
            <ExpenseContextProvider>
              <IncomeContextProvider>
                <Routing />
              </IncomeContextProvider>
            </ExpenseContextProvider>
          </CategoryContextProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
