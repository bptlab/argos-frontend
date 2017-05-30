import help_en from './help_en';
import help_de from './help_de';
import config from './config';


const language = config.language;

let help = help_en;

if (language === "en") {
	help = help_en;
}

if (language === "de") {
	help = help_de;
}

export default help;