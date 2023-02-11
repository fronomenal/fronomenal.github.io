import './styles/style.scss'

import ThemeToggler from './modules/ThemeToggler';

const themer = new ThemeToggler("rgb(151, 66, 255)").registerEvents();
themer.matchMediaToImgs();