var _countries = {"BD": "Bangladesh", "WF": "Wallis v\u00e0 Futuna", "BF": "Burkina Faso", "BG": "Bungari", "BA": "Bosnia v\u00e0 Herzegovina", "BB": "Barbados", "BE": "B\u1ec9", "BL": "Saint Barth\u00e9lemy", "BM": "Bermuda", "BN": "Brunei Darussalam", "BO": "Bolivia", "BH": "Bahrain", "BI": "Burundi", "BJ": "Benin", "BT": "Bhutan", "JM": "Jamaica", "BV": "\u0110\u1ea3o Bouvet", "BW": "Botswana", "WS": "Samoa", "BR": "Brazil", "BS": "Bahamas", "JE": "Jersey", "BY": "Belarus", "BZ": "Belize", "RU": "Li\u00ean bang Nga", "RW": "Rwanda", "RS": "Serbia", "TL": "\u0110\u00f4ng Timor", "RE": "Reunion", "LU": "Luxembourg", "TJ": "Tajikistan", "RO": "Rumani", "TK": "Tokelau", "GW": "Guinea-Bissau", "GU": "Guam", "GT": "Guatemala", "GS": "South Georgia v\u00e0 South Sandwich Islands", "GR": "Hi L\u1ea1p", "GQ": "Guinea X\u00edch \u0110\u1ea1o", "GP": "Guadeloupe", "JP": "Nh\u1eadt B\u1ea3n", "GY": "Guyana", "GG": "Guernsey", "GF": "Guiana thu\u1ed9c Ph\u00e1p", "GE": "Gruzia", "GD": "Grenada", "GB": "V\u01b0\u01a1ng qu\u1ed1c Anh", "GA": "Gabon", "SV": "El Salvador", "GN": "Guinea", "GM": "Gambia", "GL": "Greenland", "KW": "Kuwait", "GI": "Gibraltar", "GH": "Ghana", "OM": "Oman", "TN": "Tunisia", "IL": "Israel", "JO": "Jordan", "HR": "Croatia", "HT": "Haiti", "HU": "Hungary", "HK": "H\u1ed3ng K\u00f4ng", "HN": "Honduras", "HM": "Heard Island v\u00e0 McDonald Islands", "AD": "Andorra", "PR": "Puerto Rico", "PS": "L\u00e3nh th\u1ed5 Palestin", "IO": "L\u00e3nh th\u1ed5 \u1ea4n \u0110\u1ed9 D\u01b0\u01a1ng thu\u1ed9c Anh", "PW": "Palau", "PT": "B\u1ed3 \u0110\u00e0o Nha", "KR": "H\u00e0n Qu\u1ed1c", "PY": "Paraguay", "AI": "Anguilla", "PA": "Panama", "PF": "Polynesia thu\u1ed9c Ph\u00e1p", "PG": "Papua New Guinea", "PE": "Peru", "PK": "Pakistan", "PH": "Philippines", "PN": "Pitcairn", "PL": "Ba Lan", "PM": "Saint Pierre v\u00e0 Miquelon", "ZM": "Zambia", "EH": "T\u00e2y Sahara", "EE": "Estonia", "EG": "Ai C\u1eadp", "ZA": "Nam Phi", "EC": "Ecuador", "AL": "Albania", "AO": "Angola", "KZ": "Kazakhstan", "ET": "Ethiopia", "ZW": "Zimbabwe", "KY": "Qu\u1ea7n \u0111\u1ea3o Cayman", "ES": "T\u00e2y Ban Nha", "ER": "Eritrea", "ME": "Montenegro", "MD": "Moldova", "MG": "Madagascar", "MF": "Saint Martin", "UY": "Uruguay", "MC": "Monaco", "UZ": "Uzbekistan", "MM": "Myanma", "ML": "Mali", "MO": "Macao", "MN": "M\u00f4ng C\u1ed5", "MH": "Qu\u1ea7n \u0111\u1ea3o Marshall", "MK": "Macedonia (C\u1ed9ng h\u00f2a thu\u1ed9c Nam T\u01b0 C\u0169)", "MU": "Mauritius", "MT": "Malta", "MW": "Malawi", "MV": "Maldives", "MQ": "Martinique", "MP": "Qu\u1ea7n \u0111\u1ea3o B\u1eafc Mariana", "MS": "Montserrat", "MR": "Mauritania", "AU": "\u00dac", "UG": "Uganda", "UA": "Ucraina", "MX": "Mexico", "AT": "\u00c1o", "FR": "Ph\u00e1p", "MA": "Mar\u1ed1c", "SH": "Saint Helena", "AF": "Afghanistan", "AX": "Qu\u1ea7n \u0111\u1ea3o \u00c5land", "FI": "Ph\u1ea7n Lan", "FJ": "Fiji", "FK": "Qu\u1ea7n \u0111\u1ea3o Falkland (Malvina)", "FM": "Micronesia", "FO": "Qu\u1ea7n \u0111\u1ea3o Faroe", "NI": "Nicaragua", "NL": "H\u00e0 Lan", "NO": "Na Uy", "NA": "Namibia", "NC": "T\u00e2n Caledonia", "NE": "Niger", "NF": "\u0110\u1ea3o Norfolk", "NG": "Nigeria", "NZ": "New Zealand", "NP": "Nepal", "NR": "Nauru", "NU": "Niue", "CK": "Qu\u1ea7n \u0111\u1ea3o Cook", "CI": "B\u1edd Bi\u1ec3n Ng\u00e0", "CH": "Th\u1ee5y S\u0129", "CO": "Colombia", "CN": "Trung Qu\u1ed1c", "CM": "Cameroon", "CL": "Chile", "CC": "Qu\u1ea7n \u0111\u1ea3o Cocos (Keeling)", "CA": "Canada", "CG": "Congo-Brazzaville", "CF": "C\u1ed9ng h\u00f2a Trung Phi", "CD": "Congo-Kinshasa", "CZ": "C\u1ed9ng h\u00f2a S\u00e9c", "CY": "S\u00edp", "CX": "\u0110\u1ea3o Gi\u00e1ng Sinh", "CR": "Costa Rica", "CV": "C\u00e1p Ve", "CU": "Cuba", "SZ": "Swaziland", "SY": "Syria", "KG": "Kyrgyzstan", "KE": "Kenya", "SR": "Suriname", "KI": "Kiribati", "KH": "Campuchia", "KN": "Saint Kitts v\u00e0 Nevis", "KM": "Comoros", "ST": "Sao Tome v\u00e0 Principe", "SK": "Slovakia", "SJ": "Svalbard v\u00e0 Jan Mayen", "SI": "Slovenia", "KP": "Tri\u1ec1u Ti\u00ean", "SO": "Somali", "SN": "Senegal", "SM": "San Marino", "SL": "Sierra Leone", "SC": "Seychelles", "SB": "Qu\u1ea7n \u0111\u1ea3o Solomon", "SA": "\u1ea2 R\u1eadp Saudi", "SG": "Singapore", "SE": "Th\u1ee5y \u0110i\u1ec3n", "SD": "Sudan", "DO": "C\u1ed9ng h\u00f2a Dominica", "DM": "Dominica", "DJ": "Djibouti", "DK": "\u0110an M\u1ea1ch", "DE": "\u0110\u1ee9c", "YE": "Yemen", "DZ": "Angi\u00eari", "US": "Hoa K\u00ec", "YT": "Mayotte", "UM": "C\u00e1c Ti\u1ec3u \u0111\u1ea3o Xa c\u1ee7a Hoa K\u00ec", "LB": "Lib\u0103ng", "LC": "Saint Lucia", "LA": "L\u00e0o", "TV": "Tuvalu", "TW": "\u0110\u00e0i Loan", "TT": "Trinidad v\u00e0 Tobago", "TR": "Th\u1ed5 Nh\u0129 K\u00ec", "LK": "Sri Lanka", "LI": "Liechtenstein", "LV": "Latvia", "TO": "Tonga", "LT": "Litva", "TM": "Turkmenistan", "LR": "Liberia", "LS": "Lesotho", "TH": "Th\u00e1i Lan", "TF": "C\u00e1c L\u00e3nh th\u1ed5 Ph\u00eda Nam thu\u1ed9c Ph\u00e1p", "TG": "Togo", "TD": "Chad", "TC": "Turks v\u00e0 Caicos Islands", "LY": "Libya", "VA": "Vatican", "VC": "Saint Vincent v\u00e0 Grenadines", "AE": "C\u00e1c Ti\u1ec3u v\u01b0\u01a1ng qu\u1ed1c \u1ea2 R\u1eadp th\u1ed1ng nh\u1ea5t", "VE": "Venezuela", "AG": "Antigua v\u00e0 Barbuda", "VG": "Qu\u1ea7n \u0111\u1ea3o Virgin thu\u1ed9c Anh", "IQ": "Iraq", "VI": "Qu\u1ea7n \u0111\u1ea3o Virgin thu\u1ed9c M\u1ef9", "IS": "Iceland", "IR": "Iran", "AM": "Armenia", "IT": "\u00dd", "VN": "Vi\u1ec7t Nam", "AN": "Antilles H\u00e0 Lan", "AQ": "Ch\u00e2u Nam C\u1ef1c", "AS": "Samoa Ch\u00e2u M\u1ef9", "AR": "Argentina", "IM": "\u0110\u1ea3o Man", "VU": "Vanuatu", "AW": "Aruba", "IN": "\u1ea4n \u0110\u1ed9", "TZ": "Tanzania", "AZ": "Azerbaijan", "IE": "Ai Len", "ID": "Indonesia", "MY": "Malaysia", "QA": "Qatar", "MZ": "Mozambique"}