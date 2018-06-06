import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Feather';

import { registerScreens } from './src/screens/screens';

// register screens
registerScreens();

// await vector icons
Promise.all([

  Icon.getImageSource("trending-up", 30),
  Icon.getImageSource("home", 30),
  Icon.getImageSource("settings", 30)

]).then(sources => {

  // start the app
  Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'Chart',
        screen: 'groceryexpensetracker.ChartTabScreen',
        icon: sources[0],
        title: 'Chart'
      },
      {
        label: 'Overview',
        screen: 'groceryexpensetracker.OverviewTabScreen',
        icon: sources[1],
        title: 'Overview'
      },
      {
        label: 'Settings',
        screen: 'groceryexpensetracker.SettingTabScreen',
        icon: sources[2],
        title: 'Settings'
      },
    ]
  });

});