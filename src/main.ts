import './styles/style.scss'

import './modules/codrops.stapel.custom.js'
import ThemeToggler from './modules/ThemeToggler';
import ToolsGrid from './modules/ToolsGrid';


const themer = new ThemeToggler("rgb(151, 66, 255)").registerEvents();
themer.matchMediaToImgs();

new ToolsGrid().registerEvents();