import { Navigation } from 'react-native-navigation';

import Chart from '../components/Chart/Chart';
import Overview from '../components/Overview/Overview';
import Settings from '../components/Settings/Settings';
import AddExpense from '../components/Expenses/AddExpense';

export const registerScreens = () => {
    // Tabs
    Navigation.registerComponent('groceryexpensetracker.ChartTabScreen', () => Chart);
    Navigation.registerComponent('groceryexpensetracker.OverviewTabScreen', () => Overview);
    Navigation.registerComponent('groceryexpensetracker.SettingTabScreen', () => Settings);
    
    // Add Expense Screen
    Navigation.registerComponent('groceryexpensetracker.AddExpenseScreen', () => AddExpense);
}