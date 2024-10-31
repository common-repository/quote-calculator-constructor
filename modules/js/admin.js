jQuery(document).ready(function($){

/* New Interface */


var interface_fields = [
	{
		"type" : "id",
		"label" : "Block ID",
		"default_value" : "",
		"class" : "column-50",
		"subtext" : "",
		"hide_fields": {

		}
	},
	{
		"type" : "input_type",
		"label" : "Cell Type",
		"class" : "column-50",
		"default_value" : "text",
		"values": [
			{
				'type' : 'output',
				'label' : 'Output',
				'fields2hide' : [
					"select_values"
				]
			},
			{
				'type' : 'text',
				'label' : 'Text',
				'fields2hide' : [
					"select_values", "formula", "before_value", "after_value", 'decimals', 'dec_point', 'thousand_point', 'default_value', 'calculation_order'
				]
			},
			{
				'type' : 'input',
				'label' : 'Input',
				'fields2hide' : [
					"select_values", "formula", "before_value", "after_value", 'decimals', 'dec_point', 'thousand_point',  'calculation_order'
				]
			},
			{
				'type' : 'select',
				'label' : 'Select',
				'fields2hide' : [
					"formula", "before_value", "after_value", 'decimals', 'dec_point', 'thousand_point', 'default_value', 'calculation_order'
				]
			},
		]
	},
	{
		"type" : "select_values",
		"label" : "Select Values",
		"default_value" : "",
		"class" : "column-100",
		"subtext" : 'Enter values one per line in syntax:"value:text". E.g. "12:12 Percents per year"',
		"hide_fields": {

		}
	},
	{
		"type" : "title",
		"label" : "Block Title",
		"default_value" : "Default Title",
		"class" : "column-100",
		"subtext" : "",
		"hide_fields": {

		}
	},
	{
		"type" : "subtitle",
		"label" : "Block Sub Title",
		"default_value" : "Default Sub Title",
		"class" : "column-100",
		"subtext" : "",
		"hide_fields": {

		}
	},
	 
	{
		"type" : "formula",
		"label" : "Calculation Formula",
		"class" : "column-100",
		"default_value" : "",
		"subtext" : "",
		"hide_fields": {

		}
	},
	{
		"type" : "before_value",
		"label" : "Text Before Value",
		"default_value" : "$",
		"class" : "column-33",
		"subtext" : "",
		"hide_fields": {

		}
	},
	{
		"type" : "after_value",
		"label" : "Text After Value",
		"default_value" : "",
		"class" : "column-33",
		"subtext" : "",
		"hide_fields": {

		}
	},
	{
		"type" : "calculation_order",
		"label" : "Calculation order",
		"default_value" : "1",
		"class" : "column-33",
		"subtext" : "Use number from 1. 1 is earliest execution",
		"hide_fields": {

		}
	},
	{
		"type" : "decimals",
		"label" : "Decimals Number",
		"default_value" : "0",
		"class" : "column-25",
		"subtext" : "",
		"hide_fields": {

		}
	},
	{
		"type" : "dec_point",
		"label" : "Decimal Delimeter",
		"default_value" : ".",
		"class" : "column-25",
		"subtext" : "",
		"hide_fields": {

		}
	},
	{
		"type" : "thousand_point",
		"label" : "Decimal 1K Delimeter",
		"default_value" : ",",
		"class" : "column-25",
		"subtext" : "",
		"hide_fields": {

		}
	},
	{
		"type" : "default_value",
		"label" : "Default Value",
		"default_value" : "0",
		"class" : "column-25",
		"subtext" : "",
		"hide_fields": {

		}
	},
];



var current_cell_pointer;


// initial
if( $('#layout_editor').html() == '' && $('#interface_data').val() == '[]' ){
	$('#layout_editor').append( return_empty_row() );
}

// adding single row
$('body').on( 'click', '#add_row', function( e ){
	e.preventDefault();
	$('#layout_editor').append( return_empty_row( false) );
	initiate_sortable();
})

/*
$('body').on( 'click', '#remove_row', function( e ){
	var parent_pnt = $(this).parents('.column');
	$(parent_pnt).replaceWith( '' );
})
*/
	

function return_empty_row( initiate_row ){

	return '<div class="single_row field is-relative">\
	<div class="block_explainer">Row</div>\
	<div class="columns row_control">\
		<div class="column has-text-centered">\
			<a href="#" class="button is-small is-success" id="add_column" title="Add Column">\
			<span class="icon">\
				<i class="fa fa-plus" aria-hidden="true"></i>\
			</span>\
			</a>\
			<a href="#" class="button is-small is-danger" id="remove_row" title="Remove Row">\
			<span class="icon">\
				<i class="fa fa-ban" aria-hidden="true"></i>\
			</span>\
			</a>\
		</div>\
	</div>\
		<div class="columns row_content sortable">\
		'+ ( initiate_row  ? initiate_row : return_empty_col(false)+return_empty_col(false) )+'\
		</div>\
	</div>';
}

function return_empty_col( initiated_datablocks ){
	
	return '<div class="column editor_column is-relative">\
	<div class="block_explainer">Column</div>\
		<div class="column_control has-text-right">\
		<a href="#" class="button is-small is-success" id="add_datablock" title="Add Datablock">\
			<span class="icon">\
				<i class="fa fa-plus" aria-hidden="true"></i>\
			</span>\
		</a>\
		<a href="#" class="button is-small is-danger" id="remove_column" title="Remove Column">\
			<span class="icon">\
				<i class="fa fa-ban" aria-hidden="true"></i>\
			</span>\
		</a>\
		</div>\
		<div class="column_content sortable">\
			'+( initiated_datablocks  ? initiated_datablocks : return_empty_datablock( false ) )+'\
		</div>\
	</div>'; 
}

function return_empty_datablock( init_val ){
 
	return '<div class="single_datablock is-relative is-clipped" data-info="'+( init_val ? init_val : generate_dummy_json() )+'">\
	<div class="block_explainer">Datablock</div>\
	<div class="credentials is-pulled-left"></div>\
		<div class="is-pulled-right">\
			<a href="#" class="button is-small is-info edit_cell"><i class="fa fa-pencil" aria-hidden="true" title="Edit"></i> </a>\
			<a href="#" class="button is-small is-danger delete_cell"><i class="fa fa-ban" aria-hidden="true" title="Delete"></i> </a>\
		</div>\
	</div>';
}

function verify_wrong_ids(){

	var all_ids = [];
	$('.single_datablock').each(function(){
		var info = $(this).attr('data-info');
		var parsed = JSON.parse(decodeURIComponent( info ) );
 		all_ids.push( parsed.id );		
	 
	})

	var formulas = [];
	$('.single_datablock').each(function(){
		var info = $(this).attr('data-info');
		var parsed = JSON.parse(decodeURIComponent( info ) );
 
	 
		if( parsed.input_type == 'output' ){

			var inner_formula = parsed.formula;
			inner_formula = inner_formula.replace(/[()*\-\+\\]/g, '|');
			inner_formula = inner_formula.split('|');

			$.each(inner_formula, function(index, value){
				formulas.push( value );	
			})

				
		}
	})
	
	var not_found = [];
	$.each( formulas, function( index, value){
	 
		if( all_ids.indexOf( value ) == -1 ){
			not_found.push( value );
		}
	})

 
	var content = '<div class="bulma empty_bg">\
	<article class="message is-link">\
	<div class="message-header">\
		<p>Warning</p>\
		<button class="delete" aria-label="delete"></button>\
	</div>\
	<div class="message-body">\
		Look like you typed  wrong IDs in formulas. Check those Ids: '+not_found.join(', ')+'\
	</div>\
	</article>';
	if( not_found.length > 0 ){
		$.fancybox.open( content );
		$('.empty_bg').css('background', 'transparent');
	}
	
}

// close modal
$('body').on( 'click', '.delete', function( e ){
	$.fancybox.close();
})
// delete data block
$('body').on( 'click', '.delete_cell', function( e ){
	e.preventDefault();

	var pnt = $(this).parents('.single_datablock');
	$(pnt).fadeOut(function(){
		pnt.replaceWith('');
		initiate_sortable();
	})
	
})
// add single column in row
$('body').on( 'click', '#add_column', function( e ){
	e.preventDefault();

	var parent_row_cont = $(this).parents('.single_row');
	$('.row_content', parent_row_cont).append( return_empty_col( false ) );
	initiate_sortable();
})

// remove column
$('body').on( 'click', '#remove_column', function( e ){
	e.preventDefault();

	var pnt = $(this).parents('.column');
	$(this).parents('.column').fadeOut(function(){
		pnt.replaceWith('');
		initiate_sortable();
	})

})

// remove row
$('body').on( 'click', '#remove_row', function( e ){
	e.preventDefault();

	var pnt = $(this).parents('.single_row');
	$(this).parents('.single_row').fadeOut(function(){
		pnt.replaceWith('');
		initiate_sortable();
	})

})
// add datablock
$('body').on( 'click', '#add_datablock', function( e ){
	e.preventDefault();

	var pnt = $(this).parents('.column');
	$('.column_content', pnt).append( return_empty_datablock( false ) );
	initiate_sortable();
})
/* New Interface END */



// generate inital json for block
function generate_dummy_json(){

		var default_dummy_json = {};
		
		$.each(interface_fields, function( index, value ){
		 
			if( value.type == 'id' ){
				default_dummy_json['id'] = makeid(4);
			}else{
				default_dummy_json[value.type] = value.default_value;
			}
			
		})
	return encodeURIComponent( JSON.stringify( default_dummy_json ) );
}


//on edit cell link click
$('body').on('click', '.edit_link_cont a, .edit_cell', function(e){

	e.preventDefault();
	var pnt = $(this).parents('.single_datablock');

	current_cell_pointer = pnt;
	geneate_edit_interface( pnt );
})


// on page load generate existed interface

if( $('#interface_data').val() != '[]' ){
	var saved_values = $('#interface_data').val();
	
	saved_values = $.parseJSON( saved_values );
	
	$inital_rows = '';
	$.each(saved_values, function( index, row_data ){
		
		$inital_cols = '';
		$.each(row_data, function( subindex, col_data ){
			$inital_data = '';
		
			if( col_data.length > 0 ){
				console.log( col_data );
				$.each(col_data, function( subindex, single_datablock ){							
					$inital_data += return_empty_datablock( single_datablock );
					
				})
			}
			if( $inital_data == '' ){
		 
				$inital_data = '&nbsp;'
			}
			$inital_cols += return_empty_col( $inital_data );
		})
		$inital_rows += return_empty_row( $inital_cols );
	})

	$('#layout_editor').html( $inital_rows );

	//initiate interfaces of block
	
	$('.single_datablock ').each(function(){
		generate_content_block( $(this) );
	})

	initiate_sortable();

}else{

}

//  ############### OLD CODE 
//  ############### OLD CODE 
//  ############### OLD CODE 

	// get label from ID
	function get_label_from_type( type ){		

		 
		var res = '';
		$.each( interface_fields, function(index, value){
			if( value.type === type ){	 
				res = value.label;	
			}
		})
		return res;
	}

	// trace field type change	
	$('body').on('change', '.field_type_trace', function(e){
		edit_form_fields_processing();
	})


	


	// get list of fields to hide
	function get_list_fields2hide( type){
		var fields = [];
		$.each( interface_fields, function( index, value ){
			if( value.type == 'input_type'){
				$.each( value.values, function( index, value ){
					if( value.type == type ){
						fields = value.fields2hide;
					}
				})
			}
		})
		return fields;
	}

	//generate_row_block( number, predefined_data = false )

	// dynamicaly change popup fields based on type selected
	function edit_form_fields_processing(){

		var input_type = $('.editor_container .field_type_trace').val();

		var hide = get_list_fields2hide( input_type );
		helper_show_hide_fields(  hide );	

		 
	}

	// HELPER Process show hide of input fields on type change
	function helper_show_hide_fields(  array ){

		

		$('.input_trace').each(function(){
			
			var this_type = $(this).attr('attr-type');
			if( array.indexOf( this_type ) != -1 ){
				$(this).parents('.single_val').fadeOut();
			}else{
			  $(this).parents('.single_val').fadeIn();
			}
		})
	}

	// on single cell settings save
	$('body').on('click', '#save_settings', function(e){
		e.preventDefault();
		var out_list = {};
		$('.editor_container  .single_val .input_trace').each(function( index, value ){
			var this_index = $(this).attr('attr-type');
			if( this_index == 'select_values' ){
				var tmp_val = $(this).val();
				
				out_list[this_index] = tmp_val.replace(/\n/g, '|');
			}else{
				out_list[this_index] = $(this).val();
			}
			
		})
		current_cell_pointer.attr('data-info', encodeURIComponent( JSON.stringify( out_list ) ) );
		generate_content_block( current_cell_pointer );
		$.fancybox.close();
		generate_json_to_save();
		//verify_wrong_ids();
	})

	

	// process row delete functionality
	$('body').on('click', '.delete_link_cont a', function(e){
		e.preventDefault();

		var pnt = $(this).parents('.single_row ');
		pnt.fadeOut(500, function(){
			pnt.replaceWith('');
		})
	})

	// activate cell
	$('body').on('click', '.single_col', function(){
		e.preventDefault();

		$('.active_cell').removeClass('active_cell');
		$(this).addClass('active_cell');

		//console.log( JSON.parse(decodeURIComponent($(this).attr('data-info'))) );

		// generate edition interface
		
		
	})

	function generate_json_to_save(){
		var rows_data = [];
		$('#layout_editor .single_row').each(function(){
			var cols_data = []
			$('.row_content .column', this).each(function(){
		 
				var datablock_data = []
				$('.single_datablock', this).each(function(){
				
					datablock_data.push( $(this).attr('data-info') );
				})
				cols_data.push( datablock_data );
			})

			rows_data.push( cols_data );
		})
	 
		 

		var string2save = JSON.stringify( rows_data );

 
		$('#interface_data').val( string2save );
	 
	}
	

	// generate output block for add button and on load
	/*
	function generate_row_block( number, predefined_data = false ){
		//making row parent block
		

		return parent_container;
	}
	*/

	// add single row
	$('body').on('click', '.add_row', function(e){

		e.preventDefault();

		var number = $(this).attr('data-number');

		 

		var parent_container = $('<div/>').addClass('single_row').addClass('row_'+number+'_col').attr('data-rownumber', number);

		for( var i=1; i<=number; i++ ){
			var child_container = $('<div/>').addClass('single_col').attr('data-info', generate_dummy_json() );
			generate_content_block( child_container );
			parent_container.append( child_container );
		}

		// add remove link
		var delete_link = $('<div/>').addClass('delete_link_cont').html('<a href="#">Delete</a>');
		parent_container.append( delete_link );


		$('.layout_root').prepend( parent_container );

		//$('.layout_root').prepend('<div class="single_row row_1_col"><div data-info="'+generate_dummy_json()+'" class="single_col"></div></div>');
		initiate_sortable();

		generate_json_to_save();
	})
 
	// generate edition interface
	function geneate_edit_interface( block ){
		var elelent_info = parse_item_data( block.attr('data-info') );

 

		var parent_wrap = $('<div/>').addClass('wrap').addClass('bulma');

		var parent_container = $('<div/>').addClass('editor_container').addClass('bulma');

		$.each(interface_fields, function(index, value){
			var child_container = $('<div/>').addClass('single_val').addClass('field');
			child_container.addClass(value.class);


			if( value.type == 'id' ){
			
				child_container.append( '<label class="is-size-7">'+get_label_from_type(value.type)+'</label> \
				<input class="input is-small input_trace"   type="text" attr-type="'+value.type+'" value="'+elelent_info[value.type]+'" />' );
			}
			if( value.type == 'input_type' ){
			 
				child_container.append( '<label class="is-size-7">'+get_label_from_type(value.type)+'</label> \
					<div class="select  is-small is-fullwidth">\
					<select class="form-control  field_type_trace input_trace" attr-type="'+value.type+'">\
						<option value="text" '+( elelent_info[value.type] === 'text' ? ' selected ' : '' )+' >Text</option>\
						<option value="output" '+( elelent_info[value.type] === 'output' ? ' selected ' : '' )+' >Output</option>\
						<option value="input" '+( elelent_info[value.type] === 'input' ? ' selected ' : '' )+' >Input</option>\
						<option value="select" '+( elelent_info[value.type] === 'select' ? ' selected ' : '' )+' >Select</option>\
					</select></div>\
				' );
			}
			if( value.type == 'select_values' ){
				
				var tmp_val = elelent_info[value.type];
				tmp_val = tmp_val.replace(/\|/g, "\n");
				 
				child_container.append( '<label class="is-size-7">'+get_label_from_type(value.type)+'</label> \
					<textarea class="textarea input_trace" attr-type="'+value.type+'" >'+tmp_val+'</textarea>'+'<p class="subtext">'+value.subtext+'</p>' );
			}
			
			if( value.type == 'title' || value.type == 'subtitle' || value.type == 'formula' ||
			value.type == 'default_value' || value.type == 'before_value' || value.type == 'after_value' ||
			value.type == 'decimals'
			|| value.type == 'dec_point'
			|| value.type == 'thousand_point'
			|| value.type == 'default_value'
			|| value.type == 'calculation_order'
			
			){
			 
				child_container.append( '<label class="is-size-7">'+get_label_from_type(value.type)+'</label> \
					<input class="input is-small input_trace" type="text" attr-type="'+value.type+'" value="'+elelent_info[value.type]+'" />'+'<p class="subtext">'+value.subtext+'</p>' );
			}

		 
			 
			
			
			parent_container.append(child_container);

			
		})


		// add save field
		var child_container = $('<div/>').addClass('single_val').addClass('row').addClass('mb-3');
		child_container.addClass('column-100');
		child_container.append( '<button class="button is-small is-link" id="save_settings" >Save</button>' );

		parent_container.append(child_container);

		parent_wrap.append( parent_container );
		
		$.fancybox.open( parent_wrap.html() );

		edit_form_fields_processing();
 
	}

	// generate inner html of block
	function generate_content_block( block ){
		var elelent_info = parse_item_data( block.attr('data-info') );

		var parent_container = $('<div/>').addClass('content_wrap');

		var cell_type = elelent_info.input_type;

		var block_fields = [];

		$.each( interface_fields, function( index, value ){
			 
			
			if( value.type == "input_type" ){
				
				$.each( value.values, function( index, value ){
				 
					if( value.type == cell_type ){
				 
						block_fields = value.fields2hide;
					}
				})
			}
		})
	 
		// add class info
	 
		var child_container = $('<div/>').addClass('single_val');
		child_container.html( '<b>Class:</b> datablock_'+elelent_info['id'] );
		parent_container.append(child_container);

		$.each(elelent_info, function(index, value){
			
 
			if( block_fields.indexOf( index ) != -1 ){
				
			}else{
				var child_container = $('<div/>').addClass('single_val');
				if( index == 'select_values' ){
					child_container.html( '<b>'+get_label_from_type(index)+':</b> <br/>'+value.replace(/\|/g, "<br />") );
				}else{
					
					child_container.html( '<b>'+get_label_from_type(index)+':</b> '+value );
				}
			

				parent_container.append(child_container);
			}
		})
		
		// edd edit link
		var edit_link = $('<div/>').addClass('edit_link_cont').html('<a href="#">Edit</a>');
		//parent_container.append( edit_link );
		$('.credentials', block).html('');
		$('.credentials', block).append( parent_container );
	}

	

	//parse cell json
	function parse_item_data( cell_data ){
		var cell_json = JSON.parse(decodeURIComponent(  cell_data ) );
	 
		return cell_json;
	}

	// generate ID
	function makeid(length) {
		var result           = '';
		var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var charactersLength = characters.length;
		for ( var i = 0; i < length; i++ ) {
		   result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	 }

	 // init sortable element
	function initiate_sortable(){
		$('.sortable').sortable({
			update: function( event, ui ) {
			 
				generate_json_to_save();
			}
		});
		generate_json_to_save();

		
	}
});