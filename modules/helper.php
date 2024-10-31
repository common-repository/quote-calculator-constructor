<?php 
 
class vooCalcHelper{
	public function set_featured_image( $post_id, $image_url ){
		require_once(ABSPATH . "wp-admin" . '/includes/image.php');
		require_once(ABSPATH . "wp-admin" . '/includes/file.php');
		require_once(ABSPATH . "wp-admin" . '/includes/media.php');
		
		$upload_dir = wp_upload_dir();
		$response = wp_remote_get($image_url, array(
		  'timeout' => 20,
		  'User-Agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:20.0) Gecko/20100101 Firefox/20.0'
		));
		$image_data = wp_remote_retrieve_body( $response );
		$filename = basename($image_url);
		
		$filename = md5( time() ).$filename;
		
		$filename_ar = explode('.', $filename);
		$filename = sanitize_file_name( $filename_ar[0] ).'.'.$filename_ar[count($filename_ar)-1];
		if(wp_mkdir_p($upload_dir['path']))
			$file = $upload_dir['path'] . '/' . $filename;
		else
			$file = $upload_dir['basedir'] . '/' . $filename;
		file_put_contents($file, $image_data);

		$wp_filetype = wp_check_filetype($filename, null );
		$attachment = array(
			'post_mime_type' => $wp_filetype['type'],
			'post_title' => sanitize_file_name($filename),
			'post_content' => '',
			'post_status' => 'inherit'
		);
		$attach_id = wp_insert_attachment( $attachment, $file, $post_id );
		require_once(ABSPATH . 'wp-admin/includes/image.php');
		$attach_data = wp_generate_attachment_metadata( $attach_id, $file );
		wp_update_attachment_metadata( $attach_id, $attach_data );

		set_post_thumbnail( $post_id, $attach_id );
	
	}
	public function add_image( $image_url ){
			require_once(ABSPATH . "wp-admin" . '/includes/image.php');
			require_once(ABSPATH . "wp-admin" . '/includes/file.php');
			require_once(ABSPATH . "wp-admin" . '/includes/media.php');
			
			$upload_dir = wp_upload_dir();
			$response = wp_remote_get($image_url, array(
			  'timeout' => 20,
			  'User-Agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:20.0) Gecko/20100101 Firefox/20.0'
			));
			$image_data = wp_remote_retrieve_body( $response );
			$filename = basename($image_url);
			
			$filename = md5( time() ).$filename;
			
			$filename_ar = explode('.', $filename);
			$filename = sanitize_file_name( $filename_ar[0] ).'.'.$filename_ar[count($filename_ar)-1];
			if(wp_mkdir_p($upload_dir['path']))
				$file = $upload_dir['path'] . '/' . $filename;
			else
				$file = $upload_dir['basedir'] . '/' . $filename;
			file_put_contents($file, $image_data);

			$wp_filetype = wp_check_filetype($filename, null );
			$attachment = array(
				'post_mime_type' => $wp_filetype['type'],
				'post_title' => sanitize_file_name($filename),
				'post_content' => '',
				'post_status' => 'inherit'
			);
			$attach_id = wp_insert_attachment( $attachment, $file );
			require_once(ABSPATH . 'wp-admin/includes/image.php');
			$attach_data = wp_generate_attachment_metadata( $attach_id, $file );
			wp_update_attachment_metadata( $attach_id, $attach_data );

			return $attach_id ;
	
	}
	public function return_post_type_list( $post_type ){
		$args = array(
			'showposts' => -1,
			'post_type' => $post_type,
			'orderby' => 'title'
		);
		$all_posts = get_posts( $args );
		$all_prods = array();
		if( count( $all_posts ) > 0 ){
			foreach( $all_posts as $single_post ){
				$all_prods[ $single_post->ID ] = $single_post->post_title;
			}
		}
		return $all_prods;
	}
	public function get_shortcode_page( $shortcode ){
		$args = array(
			'showposts' => 1,
			'post_type' => array( 'any' ),
			's' => $shortcode
		);
		$all_posts = get_posts( $args );
	 
		 
		return $all_prods[0]->ID;
	}
	public function get_users_list( $args = array() ){

		$all_users = get_users( $args );
		$out_users = array();
		foreach( $all_users as $s_user ){
			$out_users[ $s_user->ID ] = $s_user->userlogin;
		}
	 
		 
		return $out_users;
	}
}

?>