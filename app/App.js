/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

'use strict';

import React from 'react';

import { createAppContainer } from 'react-navigation';

import { createStackNavigator,} from 'react-navigation';
import SplashScreenPage from './screens/SplashScreenPage'
import LoginPage from './screens/LoginPage';
import GridPage from './screens/GridPage';
import InvoicePage from './screens/InvoicePage';
import StudentPage from './screens/StudentPage';
import StudentResults from './screens/StudentResults';
import StudentDetails from './screens/StudentDetails';
import ToBeDetermined from './screens/ToBeDetermined';


const AppNavigator = createStackNavigator({
  Splash: { screen: SplashScreenPage },
  Login: { screen: LoginPage },
  Grid: {screen: GridPage},
  Invoice: {screen: InvoicePage},
  Students: {screen: StudentPage},
  Results: {screen: StudentResults},
  StudentDetails: {screen: StudentDetails},
  TBD: {screen: ToBeDetermined},

});

export default createAppContainer(AppNavigator);