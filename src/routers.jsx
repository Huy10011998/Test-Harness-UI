import { Route, Router, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import React, { useState } from "react";
import { AuthContext, AuthProvider } from "./hooks/with-auth";
import { SmokeTesting } from "./pages/smoke-testing";
import { Profile } from "./pages/profile/profile";
import { Website } from "./pages/website/website";
import { Forgot } from "./pages/forgot-password";
import { Checks } from "./pages/checks/checks";
import { Dashboard } from "./pages/dashboard";
import { URL_PAGE } from "./common/constants";
import { Register } from "./pages/register";
import { Pricing } from "./pages/pricing";
import { storage } from "./common/utils";
import { Login } from "./pages/login";
import { Functionality } from "./pages/functionality-testing";
import { BookATester } from "./pages/book-a-tester";
import { TestExecutionReport } from "./pages/test-execution-reports";
import { TestCase } from "./pages/test-cases";
import { Bugs } from "./pages/bugs";
import { Career } from "./pages/careers";
import { SoftwareQualityAssurance } from "./pages/software-quality-assurance";
import { SoftwareTesting } from "./pages/software-testing";
import { WebsiteTesting } from "./pages/website-testing";
import { AboutUS } from "./pages/about-us";
import { TermsAndCondition } from "./pages/terms-and-condition";
import { Privacy } from "./pages/privacy";
import HomePage from "./pages/home";

const localStorage = storage();

const AppRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getToken();
  if (!token) return <Redirect to={URL_PAGE.LOGIN} />;
  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

const AppRouter = () => {
  const history = createBrowserHistory();
  return (
    <Router history={history}>
      <AuthProvider>
        <AuthContext.Consumer>
          {(context) => (
            <Switch>
              <AppRoute
                path={URL_PAGE.HOME}
                component={HomePage}
                exact
                {...context}
              />
              <AppRoute path={URL_PAGE.LOGIN} component={Login} {...context} />
              <AppRoute
                path={URL_PAGE.REGISTER}
                component={Register}
                {...context}
              />
              <AppRoute
                path={URL_PAGE.FORGOT}
                component={Forgot}
                {...context}
              />
              <AppRoute
                path={URL_PAGE.PRICING}
                component={Pricing}
                {...context}
              />
              <AppRoute
                path={URL_PAGE.CAREER}
                component={Career}
                {...context}
              />
              <AppRoute
                path={URL_PAGE.SOFTWARE_QUALITY_ASSURANCE}
                component={SoftwareQualityAssurance}
                {...context}
              />
              <AppRoute
                path={URL_PAGE.SOFTWARE_TESTING}
                component={SoftwareTesting}
                {...context}
              />
              <AppRoute
                path={URL_PAGE.WEBSITE_TESTING}
                component={WebsiteTesting}
                {...context}
              />
              <AppRoute
                path={URL_PAGE.ABOUT_US}
                component={AboutUS}
                {...context}
              />
              <AppRoute
                path={URL_PAGE.TERMS_AND_CONDITIONS}
                component={TermsAndCondition}
                {...context}
              />
              <AppRoute
                path={URL_PAGE.PRIVACY}
                component={Privacy}
                {...context}
              />
              <PrivateRoute
                path={URL_PAGE.DASHBOARD}
                component={Dashboard}
                {...context}
              />
              <PrivateRoute path={URL_PAGE.PROFILE} component={Profile} />
              <PrivateRoute path={URL_PAGE.WEBSITE} component={Website} />
              <PrivateRoute path={URL_PAGE.CHECK} component={Checks} />
              <PrivateRoute
                path={URL_PAGE.SMOKE_TESTING}
                component={SmokeTesting}
              />
              <PrivateRoute
                path={URL_PAGE.FUNCTIONALITY_TESTING}
                component={Functionality}
              />
              <PrivateRoute
                path={URL_PAGE.BOOK_A_TESTER}
                component={BookATester}
              />
              <PrivateRoute
                path={URL_PAGE.TEST_EXECUTION_REPORTS}
                component={TestExecutionReport}
              />
              <PrivateRoute path={URL_PAGE.TEST_CASES} component={TestCase} />
              <PrivateRoute path={URL_PAGE.BUGS} component={Bugs} />
            </Switch>
          )}
        </AuthContext.Consumer>
      </AuthProvider>
    </Router>
  );
};

export { AppRouter };
