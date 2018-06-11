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
        }
    ];
};

export const getYears = () => {

    const years = [];
    const currentYear = (new Date).getFullYear();

    for (let i = 0; i < 5; i++) {
        years.push((currentYear - i));
    };

    return years;
};

export const getMonths = () => {
    return [
        {
            value: 1,
            label: 'January'
        },
        {
            value: 2,
            label: 'February'
        },
        {
            value: 3,
            label: 'March'
        },
        {
            value: 4,
            label: 'April'
        },
        {
            value: 5,
            label: 'May'
        },
        {
            value: 6,
            label: 'June'
        },
        {
            value: 7,
            label: 'July'
        },
        {
            value: 8,
            label: 'August'
        },
        {
            value: 9,
            label: 'September'
        },
        {
            value: 10,
            label: 'October'
        },
        {
            value: 11,
            label: 'November'
        },
        {
            value: 12,
            label: 'December'
        },
    ];
};