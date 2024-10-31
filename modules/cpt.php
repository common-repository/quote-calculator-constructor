<?php

	class wccCPTInsert{
		
		var $parameters;
		var $post_type;
		
		function __construct( $in_parameters, $post_type ){
			$this->parameters = $in_parameters;
			$this->post_type = $post_type;
		 
			add_action( 'init', array( $this, 'add_post_type' ), 1 );
			register_activation_hook( __FILE__, array( $this, 'add_post_type' ) );	 
			register_activation_hook( __FILE__, 'flush_rewrite_rules' );
		}
		function add_post_type(){
			register_post_type( $this->post_type, $this->parameters );
			}
 
	}


 

$labels = array(
    'name' => __('Calculator', $this->locale),
    'singular_name' => __('Calculator', $this->locale),
    'add_new' => __('Add New', $this->locale),
    'add_new_item' => __('Add New Calculator', $this->locale),
    'edit_item' => __('Edit Calculator', $this->locale),
    'new_item' => __('New Calculator', $this->locale),
    'all_items' => __('All Calculator', $this->locale),
    'view_item' => __('View Calculator', $this->locale),
    'search_items' => __('Search Calculator', $this->locale),
    'not_found' =>  __('No Calculator found', $this->locale),
    'not_found_in_trash' => __('No Calculator found in Trash', $this->locale), 
    'parent_item_colon' => '',
    'menu_name' => __('Calculators', $this->locale)

  );
  $args = array(
    'labels' => $labels,
    'public' => true,
    'publicly_queryable' => true,
    'show_ui' => true, 
    'show_in_menu' => true, 
    'query_var' => true,
    'rewrite' => true,
    'capability_type' => 'post',
    'has_archive' => true, 
	'menu_icon' => 'dashicons-welcome-widgets-menus',
    'hierarchical' => false,
    'menu_position' => null,
    'supports' => array( 'title', /* 'custom-fields' 'editor' , 'thumbnail', 'excerpt', 'custom-fields'   'custom-fields' 'custom-fields'  'editor', 'thumbnail', 'custom-fields'  'author', , 'custom-fields', 'editor'  */)
  ); 

 
$new_pt = new wccCPTInsert( $args, 'calculator' );
 


?>