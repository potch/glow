<?php

function chooseLocale($locales, $default='en-us') {
    $accept = isset($_SERVER['HTTP_ACCEPT_LANGUAGE']) ? $_SERVER['HTTP_ACCEPT_LANGUAGE'] : $default;
    return _chooseLocale($locales, $accept, $default);
}

// From https://github.com/auraphp/aura.web/blob/master/src/Context.php
function parseAccept($accept) {
    $accept = explode(',', $accept);
    $sorted = array();

    foreach ($accept as $key => $value) {
        $value = trim($value);

        if (false === strpos($value, ';q=')) {
            $sorted[$value] = 1.0;
        } else {
            list($value, $q) = explode(';q=', $value);
            $sorted[$value] = $q;
        }
    }

    // sort by quality factor, highest first.
    asort($sorted);
    return array_reverse($sorted);
}


function _lowerLocales($locales) {
    $rv = array();
    foreach ($locales as $lang) {
        $rv[strtolower($lang)] = $lang;
        $short = array_shift(explode('-', $lang));
        if (!in_array($short, $locales)) {
            $rv[$short] = $lang;
        }
    }
    return $rv;
}

function _chooseLocale($locales, $accept, $default) {
    $locales = _lowerLocales($locales);
    $accept = parseAccept(strtolower($accept));

    foreach ($accept as $lang => $rank) {
        $short = array_shift(explode('-', $lang));
        if (array_key_exists($lang, $locales)) {
            return $locales[$lang];
        } else if (array_key_exists($short, $locales)) {
            return $locales[$short];
        }
    }
    return $default;
}

/*
// These are my "tests".
$loc = array('ar', 'en-US', 'fr', 'ga', 'ga-IE', 'pt-BR', 'zh-TW', 'zh-CN');
echo "\nga-IE == " . _chooseLocale($loc, 'ga-ie', 'def');
echo "\nga-IE == " . _chooseLocale($loc, 'ga-IE', 'def');
echo "\nga-IE == " . _chooseLocale($loc, 'GA-ie', 'def');
echo "\nga == " . _chooseLocale($loc, 'ga-XX', 'def');
echo "\nga == " . _chooseLocale($loc, 'ga', 'def');
echo "\nfr == " . _chooseLocale($loc, 'fr-FR', 'def');
echo "\npt-BR == " . _chooseLocale($loc, 'pt', 'def');
echo "\nzh-CN == " . _chooseLocale($loc, 'zh', 'def');
echo "\ndef == " . _chooseLocale($loc, 'xx', 'def');
echo "\nfr == " . _chooseLocale($loc, 'fr,en;q=0.8', 'def');
echo "\nfr == " . _chooseLocale($loc, 'en;q=0.8,fr,ga-IE;q=0.9', 'def');
echo "\nzh-CN == " . _chooseLocale($loc, 'zh, fr;q=0.8', 'def');
echo "\nga-IE == " . _chooseLocale($loc, 'ga-IE,en;q=0.8,fr;q=0.6', 'def');
echo "\nfr == " . _chooseLocale($loc, 'fr-fr, en;q=0.8, es;q=0.2', 'def');
 */
