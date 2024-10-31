<?php 
add_filter( 'the_content', 'wcc_the_content' ) ;
function wcc_the_content( $content ) {
	global $post;

	if( is_single() && get_post_type( $post->ID ) == 'calculator' ){
		$content = do_shortcode('[custom_calculator id='.$post->ID.']');
	}

	 
	return $content;
}
 
add_filter( 'manage_edit-calculator_columns', 'wcc_calculator_columns' ) ;
function wcc_calculator_columns( $columns ) {

	$columns['shortcode'] = __( 'Shortcode' );
	unset( $columns['date'] );

	return $columns;
}

add_action( 'manage_calculator_posts_custom_column', 'wcc_calculator_posts_custom_column', 10, 2 );

function wcc_calculator_posts_custom_column( $column, $post_id ) {
	global $post;
	switch( $column ) {
		/* If displaying the 'duration' column. */
		case 'shortcode' :
			echo '[custom_calculator id=\''.$post_id.'\']';
			break;
 
		default :
			break;
	}
}
 
 
?>