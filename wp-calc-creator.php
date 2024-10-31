<?php
/*
Plugin Name: Quote Calculator Constructor
Description: With this simple plugin you can create simple quote calulators for your website.
Version: 1.1
Author: Evgen "EvgenDob" Dobrzhanskiy
Author URI: http://voodoopress.net
Stable tag: 1.1
*/

//error_reporting(E_ALL);
//ini_set('display_errors', 'On');


// core initiation
if( !class_Exists('vooMainStart') ){
	class vooMainStart{
		var $locale;
		function __construct( $locale, $includes, $path ){
			$this->locale = $locale;
			
			// include files
			foreach( $includes as $single_path ){
				include( $path.$single_path );				
			}
			// calling localization
			add_action('plugins_loaded', array( $this, 'myplugin_init' ) );
		}
		function myplugin_init() {
		 $plugin_dir = basename(dirname(__FILE__));
		 load_plugin_textdomain( $this->locale , false, $plugin_dir );
		}
	}
	
	
}


// initiate main class
new vooMainStart('wcc', array(
	'modules/formElementsClass.php',
	
	'modules/shortcodes.php',
	'modules/scripts.php',
	'modules/meta_box.php',

	'modules/cpt.php',
	'modules/hooks.php',
), dirname(__FILE__).'/' );

 


 
?>