export const getLibraries = () => {
    return [
        {
            // Datepicker
            title: 'react-native-datepicker',
            url: 'https://github.com/xgfe/react-native-datepicker'
        },
        {
            // Elements
            title: 'react-native-elements',
            url: 'https://github.com/react-native-training/react-native-elements'
        },
        {
            // Navigation
            title: 'react-native-navigation',
            url: 'https://github.com/wix/react-native-navigation'
        },
        {
            // SVG Charts
            title: 'react-native-svg-charts',
            url: 'https://github.com/JesperLekland/react-native-svg-charts'
        },
        {
            // Typography
            title: 'react-native-typography',
            url: 'https://github.com/hectahertz/react-native-typography'
        },
        {
            // Vector Icons
            title: 'react-native-vector-icons',
            url: 'https://github.com/oblador/react-native-vector-icons'
        },
        {
            // Material Dropdown
            title: 'react-native-material-dropdown',
            url: 'https://github.com/n4kz/react-native-material-dropdown'
        }
    ];
};

export const getYears = () => {

    const years = [];
    const currentYear = (new Date).getFullYear();

    for (let i = 0; i < 5; i++) {
        years.push({
            value: (currentYear - i)
        });
    }

    return years;
};

export const getMonths = () => {
    return [
        {
            value: '1',
        },
        {
            value: '2',
        },
        {
            value: '3',
        },
        {
            value: '4',
        },
        {
            value: '5',
        },
        {
            value: '6',
        },
        {
            value: '7',
        },
        {
            value: '8',
        },
        {
            value: '9',
        },
        {
            value: '10',
        },
        {
            value: '11',
        },
        {
            value: '12',
        },
    ];
};