<?php
	$path = $_GET["path"];
	$content = file_get_contents($path . $file, FILE_USE_INCLUDE_PATH);
	echo $content;
?>