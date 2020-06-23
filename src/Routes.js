import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { ThemeProvider } from '@material-ui/styles';

import MuiTheme from './theme';

// Layout Blueprints

import { LeftSidebar, PresentationLayout } from './layout-blueprints';
import Login from './components/auth/Login';
import Signup from './components/auth/SignUp';
import ForgotPassword from './components/auth/ForgotPassword';
import Home from './components/Home';
import Restaurant from './components/Restaurant/RestaurantForm'
import Category from './components/Category/CategoryForm'
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const DashboardDefault = lazy(() => import('./example-pages/DashboardDefault'));
const LandingPage = lazy(() => import('./example-pages/LandingPage'));

const Routes = () => {
  const location = useLocation();

  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.99
    },
    in: {
      opacity: 1,
      scale: 1
    },
    out: {
      opacity: 0,
      scale: 1.01
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
  };

  return (
    <ThemeProvider theme={MuiTheme}>
      <AnimatePresence>
        <Suspense
          fallback={
            <div className="d-flex align-items-center vh-100 justify-content-center text-center font-weight-bold font-size-lg py-3">
              <div className="w-50 mx-auto">
              <LinearProgress />             
              </div>
            </div>
          }>
          <Switch>
            <Redirect exact from="/" to="/LandingPage" />
            <Route path={[
              '/LandingPage',
              '/login',
              '/signup',
              '/forgot'
            ]}>
              <PresentationLayout>
                <Switch location={location} key={location.pathname}>
                  
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    <Route path="/LandingPage" component={LandingPage} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/forgot" component={ForgotPassword} />
                  </motion.div>
                </Switch>
              </PresentationLayout>
            </Route>

            <Route
              path={[
                '/DashboardDefault',
                '/home',
               // '/login',
                '/restaurant',
                '/category'
              ]}>
              <LeftSidebar>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    <Route
                      path="/DashboardDefault"
                      component={DashboardDefault}
                    />
                    {/* <Route path="/login" component={Login} /> */}
                    <Route path="/home" component={Home} />
                    <Route path="/restaurant" component={Restaurant} />
                    <Route path="/category" component={Category} />
                  </motion.div>
                </Switch>
              </LeftSidebar>
            </Route>
          </Switch>
        </Suspense>
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default Routes;
