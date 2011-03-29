<?php
require 'locales.php';

$locales = array('ar', 'ca', 'cs', 'de', 'el', 'en-us', 'es', 'eu', 'fr', 'fy', 'fy-nl', 'ga', 'ga-ie', 'he', 'hr', 'hu', 'id', 'it', 'ja', 'ko', 'nl', 'pl', 'pt', 'pt-br', 'rm', 'ru', 'si', 'sk', 'sl', 'sq', 'sr', 'th', 'tr', 'uk', 'vi', 'zh-tw');
$rtl_locales = array('ar', 'fa', 'fa-ir', 'he');

date_default_timezone_set('UTC');
$time = strftime('%Y/%m/%d/%H/%M', strtotime('-2 minutes'));
$locale = chooseLocale($locales);
$rtl = in_array($locale, $rtl_locales) ? 'rtl' : 'ltr';
if (strpos($locale, '-')) {
    $x = explode('-', $locale);
    $locale = $x[0].'_'.strtoupper($x[1]);
}

header('Vary: Accept-Language');
// We can cache until the minute rolls over.
header('Cache-Control: max-age='.(60 - strftime('%S')));
?>
var glow = {"time": "<?= $time ?>", "locale": "<?= $locale ?>", "dir": "<?= $rtl ?>"};
