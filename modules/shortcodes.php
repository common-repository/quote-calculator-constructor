<?php  
add_shortcode( 'custom_calculator', 'wcc_calculator' );
function wcc_calculator( $atts, $content = null ){
	
	$post_id = $atts['id'];

	$str =   html_entity_decode (   urldecode( get_post_meta( $post_id, 'interface_data' , true )  ) );
	$str = str_replace( '"{', '{', $str );
	$str = str_replace( '}"', '}', $str );

	$all_data = json_decode( $str  );

	$out .= '
	<style>
	'.get_post_meta( $post_id, 'custom_css' , true ).'
	</style>
	<div class="tw-bs1 bulma">
		 <div class="wlb_container">';
		
		foreach( (array)$all_data  as $single_row ){

			$out .= '<div class="single_row ">';
			$out .= '<div class="columns">';
			foreach( (array)$single_row  as $single_col ){
				
			 
					$out .= '<div class="column  has-text-centered1 wlb_col_'.$single_row->rows.' col_type_'.$json_params->input_type.' ">';
						foreach( (array)$single_col  as $single_data ){
					
							$json_params =  $single_data ;
						
								if( $json_params->input_type == 'text' ){
									$out .= '

									<div class="field  datablock_'.$json_params->id.'">
										<label class="label_ is-size-6">'.$json_params->title.'</label>
										<p class="help">'.$json_params->subtitle.'</p>
									</div>

								 
									';	
								}




								// otuput based on type
								if( $json_params->input_type == 'output' ){
									$out .= '<div class="field has-text-centered  datablock_'.$json_params->id.'">';
									$out .= '<div class="is-size-4">'.$json_params->title.'</div>';
									$out .= '<div class="is-size-6">'.$json_params->subtitle.'</div>';
									$out .= '<div class="output_container  subtitle is-3" 
									data-before_value = "'.$json_params->before_value.'"
									data-after_value = "'.$json_params->after_value.'"

									data-decimals = "'.$json_params->decimals.'"
									data-dec_point = "'.$json_params->dec_point.'"
									data-calculation_order = "'.$json_params->calculation_order.'"
									data-thousand_point = "'.$json_params->thousand_point.'"
									

									data-formula="'.$json_params->formula.'" id="personal_id_'.$json_params->id.'"><div class="title is-2">'.$json_params->before_value.$json_params->default_value.$json_params->after_value.'</div></div>';
									$out .= '</div>';
								}
								if( $json_params->input_type == 'input' ){
									//$out .= wlb_out_title_subtitle( $json_params );

									 

									$out .= '

									<div class="field  datablock_'.$json_params->id.'">
										<label class="label_ is-size-6">'.$json_params->title.'</label>
										<div class="control">
											<input class="input input_value  trace_calculation" type="text" value="'.$json_params->default_value.'" data-id="'.$json_params->id.'" id="personal_id_'.$json_params->id.'">
										</div>
										<p class="help">'.$json_params->subtitle.'</p>
									</div>

								 
									';	
								}
								if( $json_params->input_type == 'select' ){
								 

									$out .= '

									<div class="field  datablock_'.$json_params->id.'">
										<label class="label_ is-size-6">'.$json_params->title.'</label>
										<div class="select is-fullwidth">
											<select class="trace_calculation input_value" data-id="'.$json_params->id.'" id="personal_id_'.$json_params->id.'">'.$json_params->subtitle;

											$values_rows = explode("|", $json_params->select_values);

												if( count($values_rows) > 0 ){
													foreach( (array)$values_rows as $single_sel_row  ){
														$row_inner = explode(':', $single_sel_row);
														$out .= '<option value="'.$row_inner[0].'">'.$row_inner[1].'</option>';
													}
												}
											$out .= '
											</select>
										</div>
										<p class="help">'.$json_params->subtitle.'</p>
									</div>

								 
									';

								}
					 
					  
						}
					$out .= '</div>';
			 
				
				 
			}
			$out .= '</div>';
			$out .= '</div>';

			
			
			
		}

		$out .= '
		 </div>
	  
	</div>
	';
	
	return $out;	
}

function wlb_out_title_subtitle( $json_params ){
	if( $json_params->title != '' ){
		$out .= '<div class="title is-4 ">'.$json_params->title.'</div>';
	}else{
		$out .= '<div class="title is-4">&nbsp;</div>';
	}
	if( $json_params->subtitle != '' ){
		$out .= '<div class="subtitle is-5">'.$json_params->subtitle.'</div>';
	}else{
		$out .= '<div class="subtitle is-5">&nbsp;</div>';
	}
	return $out;
}