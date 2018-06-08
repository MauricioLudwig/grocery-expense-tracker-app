import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Feather';

import { registerScreens } from './src/screens/screens';

// Register screens
registerScreens();

// Await vector icons
Promise.all([

  Icon.getImageSource("trending-up", 30),
  Icon.getImageSource("home", 30),
  Icon.getImageSource("settings", 30)

]).then(sources => {

  // Start the app
  Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'Charts',
        screen: 'groceryexpensetracker.ChartsScreen',
        icon: sources[0],
        title: 'Charts'
      },
      {
        label: 'Overview',
        screen: 'groceryexpensetracker.OverviewScreen',
        icon: sources[1],
        title: 'Overview'
      },
      {
        label: 'Settings',
        screen: 'groceryexpensetracker.SettingsScreen',
        icon: sources[2],
        title: 'Settings'
      },
    ]
  });

});