import { Navigation } from 'react-native-navigation';

import Charts from '../components/Charts/Charts';
import Overview from '../components/Overview/Overview';
import Settings from '../components/Settings/Settings';
import AddExpense from '../components/Expenses/AddExpense';

export const registerScreens = () => {
    // Tabs
    Navigation.registerComponent('groceryexpensetracker.ChartsScreen', () => Charts);
    Navigation.registerComponent('groceryexpensetracker.OverviewScreen', () => Overview);
    Navigation.registerComponent('groceryexpensetracker.SettingsScreen', () => Settings);
    
    // Add Expense Single Screen
    Navigation.registerComponent('groceryexpensetracker.AddExpenseScreen', () => AddExpense);
}