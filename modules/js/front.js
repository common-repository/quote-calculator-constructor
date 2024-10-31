jQuery(document).ready( function($){

    // custom calculations
    if( $('.cc_input').length > 0  ){
        recalculate_dynamic_fields();
    }
    $('body').on('change, keyup', '.cc_input', function(){
        recalculate_dynamic_fields();
    })
    function recalculate_dynamic_fields(){
        // get all traced IDs
        var inital_ids = {};
        $('.cc_input').each(function(){
            inital_ids[$(this).attr('id')] = $(this).val();
        })

        $('.output_container').each(function(){


            var this_formula = $(this).attr('data-formula');
            var before_value = ( $(this).attr('data-before_value') ? $(this).attr('data-before_value') : '$' );
            var after_value = ( $(this).attr('data-after_value') ? $(this).attr('data-after_value') : '' );


            var decimals = ( $(this).attr('data-decimals') ? $(this).attr('data-decimals') : 2 );
            var dec_point = ( $(this).attr('data-dec_point') ? $(this).attr('data-dec_point') : '.' );
            var thousand_point = ( $(this).attr('data-thousand_point') ? $(this).attr('data-thousand_point') : ',');

            $.each( inital_ids, function( index, value ){
        
                var regex = new RegExp(index, "g");
                this_formula = this_formula.replace( regex, value );
                console.log( this_formula );
            })

            var result_number = math.evaluate(this_formula);

            result_number = number_format( result_number, decimals, dec_point, thousand_point );

            console.log( result_number );
            var result = before_value+result_number+after_value;
            $(this).html( result );
        })
    }


    if( $('.trace_calculation ').length > 0 ){
        make_calculations();
    }
    
    $('.trace_calculation ').change(function(){
        make_calculations();
    })

    function make_calculations(){
 
        // init variables 
        var initial_variables = {};
        $('.input_value').each(function(){
            // get all variables
            initial_variables[$(this).attr('data-id')] = $(this).val();
        })
        
        $('.output_container').each(function(){

        
            var this_formula = $(this).attr('data-formula');
            var before_value = $(this).attr('data-before_value');
            var after_value = $(this).attr('data-after_value');

            var calculation_order = $(this).attr('data-calculation_order');
            var decimals = $(this).attr('data-decimals');
            var dec_point = $(this).attr('data-dec_point');
            var thousand_point = $(this).attr('data-thousand_point');
      
            $.each( initial_variables, function( index, value ){
         
                var regex = new RegExp(index, "g");
                this_formula = this_formula.replace( regex, value );
               
            })

            var result_number = math.evaluate(this_formula);

            result_number = number_format( result_number, decimals, dec_point, thousand_point );

            console.log( result_number );
            var result = before_value+result_number+after_value;
            $(this).html( result );
        })
    }
    
    // numbe formatting function
    function number_format(number, decimals, dec_point = '.', thousands_sep = ',') {
        number = number.toFixed(decimals);

        var nstr = number.toString();
        nstr += '';
        x = nstr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? dec_point + x[1] : '';
        var rgx = /(\d+)(\d{3})/;

        while (rgx.test(x1))
            x1 = x1.replace(rgx, '$1' + thousands_sep + '$2');

        return x1 + x2;
    }
	
}) // global end
