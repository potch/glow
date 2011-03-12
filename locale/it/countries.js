var _countries = {"BD": "Bangladesh", "WF": "Wallis e Futuna", "BF": "Burkina Faso", "BG": "Bulgaria", "BA": "Bosnia Herzegovina", "BB": "Barbados", "BE": "Belgio", "BL": "Saint Barth\u00e9lemy", "BM": "Bermuda", "BN": "Brunei Darussalam", "BO": "Bolivia", "BH": "Bahrein", "BI": "Burundi", "BJ": "Benin", "BT": "Bhutan", "JM": "Giamaica", "BV": "Isola Bouvet", "JO": "Giordania", "WS": "Samoa", "BR": "Brasile", "BS": "Bahamas", "JE": "Jersey", "BY": "Bielorussia", "BZ": "Belize", "RU": "Federazione Russa", "RW": "Ruanda", "RS": "Serbia", "TL": "Timor Est", "RE": "Reunion", "LU": "Lussemburgo", "TJ": "Tagikistan", "RO": "Romania", "TK": "Tokelau", "GW": "Guinea-Bissau", "GU": "Guam", "GT": "Guatemala", "GS": "Georgia del Sud e isole Sandwich meridionali", "GR": "Grecia", "GQ": "Guinea Equatoriale", "GP": "Guadalupe", "JP": "Giappone", "GY": "Guyana", "GG": "Guernsey", "GF": "Guiana Francese", "GE": "Georgia", "GD": "Grenada", "GB": "Regno Unito", "GA": "Gabon", "SV": "El Salvador", "GN": "Guinea", "GM": "Gambia", "GL": "Groenlandia", "KW": "Kuwait", "GI": "Gibilterra", "GH": "Ghana", "OM": "Oman", "TN": "Tunisia", "IL": "Israele", "BW": "Botswana", "HR": "Croazia", "HT": "Haiti", "HU": "Ungheria", "HK": "Hong Kong", "HN": "Honduras", "HM": "Isola Heard e isole McDonald", "AD": "Andorra", "PR": "Porto Rico", "PS": "Territori Palestinesi Occupati", "IO": "Territorio Britannico dell'Oceano Indiano", "PW": "Palau", "PT": "Portogallo", "KR": "Sud Corea", "PY": "Paraguay", "AI": "Anguilla", "PA": "Panama", "PF": "Polinesia Francese", "PG": "Papua Nuova Guinea", "PE": "Per\u00f9", "PK": "Pakistan", "PH": "Filippine", "PN": "Pitcairn", "PL": "Polonia", "PM": "Saint Pierre e Miquelon", "ZM": "Zambia", "EH": "Sahara Occidentale", "EE": "Estonia", "EG": "Egitto", "ZA": "Sud Africa", "EC": "Ecuador", "AL": "Albania", "AO": "Angola", "SB": "Isole Salomone", "ET": "Etiopia", "ZW": "Zimbabwe", "SA": "Arabia Saudita", "ES": "Spagna", "ER": "Eritrea", "ME": "Montenegro", "MD": "Moldavia", "MG": "Madagascar", "MF": "Saint Martin", "UY": "Uruguay", "MC": "Monaco", "UZ": "Uzbekistan", "MM": "Myanmar", "ML": "Mali", "MO": "Macao", "MN": "Mongolia", "MH": "Isole Marshall", "US": "Stati Uniti", "MU": "Mauritius", "MT": "Malta", "MW": "Malawi", "MV": "Maldive", "MQ": "Martinica", "MP": "Isole Marianne Settentrionali", "MS": "Montserrat", "MR": "Mauritania", "AU": "Australia", "UG": "Uganda", "UA": "Ukraina", "MX": "Messico", "MZ": "Mozambique", "FR": "Francia", "MA": "Marocco", "AF": "Afghanistan", "AX": "Isole \u00c5land", "FI": "Finlandia", "FJ": "Fiji", "FK": "Isole Falkland (Malvinas)", "FM": "Micronesia", "FO": "Isole Faroe", "NI": "Nicaragua", "NL": "Olanda", "NO": "Norvegia", "NA": "Namibia", "NC": "Nuova Caledonia", "NE": "Niger", "NF": "Isola Norfolk", "NG": "Nigeria", "NZ": "Nuova Zelanda", "NP": "Nepal", "NR": "Nauru", "NU": "Niue", "CK": "Isole Cook", "CI": "Costa d'Avorio", "CH": "Svizzera", "CO": "Colombia", "CN": "Cina", "CM": "Camerun", "CL": "Cile", "CC": "Isole Cocos (Keeling)", "CA": "Canada", "CG": "Congo-Brazzaville", "CF": "Repubblica dell'Africa Centrale", "CD": "Congo-Kinshasa", "CZ": "Repubblica Ceca", "CY": "Cipro", "CX": "Isola di Natale", "CR": "Costa Rica", "KP": "Nord Corea", "CV": "Capo Verde", "CU": "Cuba", "SZ": "Swaziland", "SY": "Siria", "KG": "Kyrgyzstan", "KE": "Kenya", "SR": "Suriname", "KI": "Kiribati", "KH": "Cambogia", "KN": "Saint Kitts and Nevis", "KM": "Comore", "ST": "Sao Tome e Principe", "SK": "Slovacchia", "SJ": "Svalbard e Jan Mayen", "SI": "Slovenia", "SH": "Sant'Elena", "SO": "Somalia", "SN": "Senegal", "SM": "San Marino", "SL": "Sierra Leone", "SC": "Seychelles", "KZ": "Kazakistan", "KY": "Isole Cayman", "SG": "Singapore", "SE": "Svezia", "SD": "Sudan", "DO": "Repubblica Dominicana", "DM": "Dominica", "DJ": "Gibuti", "DK": "Danimarca", "DE": "Germania", "YE": "Yemen", "AT": "Austria", "DZ": "Algeria", "MK": "Macedonia, prec. R.Y. di", "YT": "Mayotte", "UM": "Isole minori esterne degli Stati Uniti", "LB": "Libano", "LC": "Santa Lucia", "LA": "Laos", "TV": "Tuvalu", "TW": "Taiwan", "TT": "Trinidad e Tobago", "TR": "Turchia", "LK": "Sri Lanka", "LI": "Liechtenstein", "LV": "Lettonia", "TO": "Tonga", "LT": "Lituania", "TM": "Turkmenistan", "LR": "Liberia", "LS": "Lesotho", "TH": "Tailandia", "TF": "Territori Francesi Meridionali", "TG": "Togo", "TD": "Ciad", "TC": "Isole Turks e Caicos", "LY": "Libia", "VA": "Citt\u00e0 del Vaticano", "VC": "San Vincenzo e Grenadine", "AE": "Emirati Arabi Uniti", "VE": "Venezuela", "AG": "Antigua e Barbuda", "VG": "Isole Vergini Britanniche", "IQ": "Iraq", "VI": "Isole Vergini Statunitensi", "IS": "Islanda", "IR": "Iran", "AM": "Armenia", "IT": "Italia", "VN": "Vietnam", "AN": "Antille Olandesi", "AQ": "Antartide", "AS": "Samoa Americana", "AR": "Argentina", "IM": "Isola di Man", "VU": "Vanuatu", "AW": "Aruba", "IN": "India", "TZ": "Tanzania", "AZ": "Azerbaijan", "IE": "Irlanda", "ID": "Indonesia", "MY": "Malesia", "QA": "Qatar"}