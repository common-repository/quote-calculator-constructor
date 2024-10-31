<?php 
 
	class vooMetaBoxCalculator{
		
		private $metabox_parameters = null;
		private $fields_parameters = null;
		private $data_html = null;
		
		function __construct( $metabox_parameters , $fields_parameters){
			$this->metabox_parameters = $metabox_parameters;
			$this->fields_parameters = $fields_parameters;
 
			add_action( 'add_meta_boxes', array( $this, 'add_custom_box' ) );
			add_action( 'save_post', array( $this, 'save_postdata' ) );
		}
		
		function add_custom_box(){
			add_meta_box( 
				'custom_meta_editor_'.rand( 100, 999 ),
				$this->metabox_parameters['title'],
				array( $this, 'custom_meta_editor' ),
				$this->metabox_parameters['post_type'] , 
				$this->metabox_parameters['position'], 
				$this->metabox_parameters['place']
			);
		}
		function custom_meta_editor(){
			global $post;
			
			$out = '

			<div class="tw-bs4">
				<div class="form-horizontal ">';
			
			foreach( $this->fields_parameters as $single_field){
			 
				$interface_element = new formElementsClassEditor( $single_field['type'], $single_field, get_post_meta( $post->ID, $single_field['name'], true ) );
				$out .= $interface_element->get_code();
			  
			}		
			
					
					
			$out .= '
					</div>	
				</div>
				';	
			$this->data_html = $out;
			 
			$this->echo_data();
		}
		
		function echo_data(){
			echo $this->data_html;
		}
		
		function save_postdata( $post_id ) {
			global $current_user; 
			 if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) 
				  return;

			  if ( 'page' == $_POST['post_type'] ) 
			  {
				if ( !current_user_can( 'edit_page', $post_id ) )
					return;
			  }
			  else
			  {
				if ( !current_user_can( 'edit_post', $post_id ) )
					return;
			  }
			  /// User editotions

				if( get_post_type($post_id) == $this->metabox_parameters['post_type'] ){
					foreach( $this->fields_parameters as $single_parameter ){
					 
						if( $single_parameter['name'] == 'interface_data' ){

							$json =     json_decode( stripslashes( $_POST[$single_parameter['name']]    ) ) ;
  
							// loop rows
							$row_cols = array();
							if(  $json   ){

							
								foreach( $json as $single_row ){
									$col_blocks = array();
									foreach( $single_row as $single_col ){
										$datablocks = array();
										foreach( $single_col as $single_block ){
											

											// sanitize json
									
											$datablock_json = json_decode( urldecode( $single_block), true  );
											$tmp_array = array();
											foreach( $datablock_json as $k => $v ){
									 
												$tmp_array[$k] =   sanitize_text_field( $v )  ;
										 
											}
											$datablocks[] =  rawurlencode ( json_encode( $tmp_array ) );
										}
										$col_blocks[] = $datablocks;
									}
									$row_cols[] = $col_blocks;
								}
							}

						  
							update_post_meta( $post_id, $single_parameter['name'],  addslashes( json_encode( $row_cols )   )  );
						}
						 
				 
						
					}
					
				}
				
			}
	}


 
 
add_Action('admin_init',  function (){
	 
	 
	 
	 $all_taxonomies = get_taxonomies();
	 
	 $out_categories = array();
	 
	 
	 if( count($all_taxonomies) > 0 ){
		foreach( $all_taxonomies as $key => $value ) {
			$all_cats =  get_terms( array( 'taxonomy' => $key, 'hide_empty' => 0 ) ) ;
			if( count($all_cats) > 0 ){
				$out_categories[0] = __('Select Term'); 
				foreach( $all_cats as $single_cat ){
					$out_categories[$single_cat->term_id] = $single_cat->name.' ('.$value.')';
				}
			}
		}
		 
	 }
	 
	 
	 
	 $meta_box = array(
		'title' => 'Calculator Constructor',
		'post_type' => 'calculator',
		'position' => 'advanced',
		'place' => 'high'
	);
	$fields_parameters = array(
		array(
			'type' => 'shortcode',
			'title' => 'Shortcode',
			'name' => 'custom_calculator',
		),
	 
		array(
			'type' => 'editor_block',
			'name' => 'interface_data'
		),
		/*
		array(
			'type' => 'textarea',
			'title' => 'Custom CSS',
			'name' => 'custom_css',
			'style' => 'height:400px;'
		),
		*/
	 
	);		
	$new_metabox = new vooMetaBoxCalculator( $meta_box, $fields_parameters); 
	 
 } );
 

?>