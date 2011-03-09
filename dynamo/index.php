<?php
require 'locales.php';

$locales = array('ar', 'ca', 'cs', 'de', 'el', 'en-us', 'es', 'eu', 'fr', 'fy', 'fy-nl', 'ga', 'ga-ie', 'he', 'hr', 'hu', 'id', 'it', 'ja', 'ko', 'nl', 'pl', 'pt', 'pt-br', 'rm', 'ru', 'sk', 'sl', 'sq', 'th', 'tr', 'zh-tw');
$rtl_locales = array('ar', 'fa', 'fa-ir', 'he');

$time = strftime('%Y/%m/%d/%H/%M', strtotime('-2 minutes'));
$chooser = new ChooseLocale($locales);
$locale = $chooser->getCompatibleLocale();
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
