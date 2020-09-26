import {DefaultTheme} from 'react-native-paper';
import { PRIMARY_COLOR } from './constants';

export const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: PRIMARY_COLOR,
        accent: 'white',
        // text: "#FFFFFF"
    },
};