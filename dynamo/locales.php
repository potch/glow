<?php

/* ChooseLocale
 *
 * Licence: MPL 2/GPL 2.0/LGPL 2.1
 * Author: Pascal Chevrel, Mozilla
 * Date : 2010-07-17
 *
 * Description:
 * Class to choose the locale which locale we will show to the visitor
 * based on http acceptlang headers and our list of supported locales.
 *
 *
*/




class ChooseLocale
{
    public    $HTTPAcceptLang;
    public    $supportedLocales;
    protected $detectedLocale;
    protected $defaultLocale;
    public    $mapLonglocales;


    public function __construct($list=array('en-US'))
    {
        $lang = isset($_SERVER['HTTP_ACCEPT_LANGUAGE']) ? $_SERVER['HTTP_ACCEPT_LANGUAGE'] : '';
        $this -> HTTPAcceptLang   = $lang;
        $this -> supportedLocales = array_unique($list);
        $this -> setDefaultLocale('en-US');
        $this -> setCompatibleLocale();
        $this -> mapLonglocales = true;

    }

    public function getAcceptLangArray()
    {
        if (empty($this->HTTPAcceptLang)) return null;

        return explode(',', $this->HTTPAcceptLang);
    }

    public function getCompatibleLocale()
    {
        $l       = $this -> defaultLocale;
        $acclang = $this -> getAcceptLangArray();

        if(!is_array($acclang)) {
            return $this -> defaultLocale;
        }

        foreach ($acclang as $var) {
            $locale      = $this -> _cleanHTTPlocaleCode($var);
            $shortLocale = array_shift((explode('-', $locale)));

            if (in_array($locale, $this -> supportedLocales)) {
                $l = $locale;
                break;
            }

            if (in_array($shortLocale, $this -> supportedLocales)) {
                $l = $shortLocale;
                break;
            }

            // check if we map visitors short locales to site long locales
            // like en -> en-GB
            if ($this -> mapLonglocales == true) {
                foreach ($this -> supportedLocales as $var) {
                    $shortSupportedLocale = array_shift((explode('-', $var)));
                    if ($shortLocale == $shortSupportedLocale) {
                        $l = $var;
                        break;
                    }
                }
            }

            }

        return $l;
    }

    public function getDefaultLocale() {
        return $this -> defaultLocale;
    }

    public function setCompatibleLocale() {
        $this -> detectedLocale  = $this -> getCompatibleLocale();
    }

    public function setDefaultLocale($locale) {

        // the default locale should always be among the site locales
        // if not, the first locale in the supportedLocales array is default
        if (!in_array($locale, $this -> supportedLocales)) {
            $this -> defaultLocale = $this -> supportedLocales[0];

        } else {
            $this -> defaultLocale = $locale;
        }
        return;
    }

    private function _cleanHTTPlocaleCode($str)
    {
        $locale = explode(';', $str);
        $locale = trim($locale[0]);

        return $locale;
    }

}

?>
