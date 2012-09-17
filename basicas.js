/* Author: Jaime Pérez Dans para Introarte S.L.
 * http://www.introarte.net
 * Requires: jquery
*/

//Convertimos los enlaces que tengan clase external a blank
$(document).ready(function () {
    $("a.external").attr('target', '_blank');
});

//----COMPROBAR FORMS
//Filtros
var filters = {
    required: function(el) {return ($.trim($(el).val()) != '');},
    number: function(el) {return ($(el).val()=='' || !isNaN($(el).val()))},
	email: function(el) {return /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/.test($(el).val());},
    telefono: function(el){return /^[0-9]*$/.test($(el).val());},
	isChecked: function(el) {
			result=false; 
			$("form").find("input").each(function(y,radio) {
				if (radio.name==el.name) {if (radio.checked) result=true;}
			});
			return result;
	},
	nomultiples: function (el) {return (/[;.\/,]/.test($(el).val())?false:true);},
	coincideClave: function(el) {return $(el).val()==$("#CLAVE").val();},
	isImage: function(el) {valor=$(el).val(); return (valor != '' && (valor.indexOf('jpg')>0 || valor.indexOf('jpeg')>0 || valor.indexOf('gif')>0 || valor.indexOf('png')>0));}
};	
// Extensiones
$.extend({
	stop: function(e){
        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();
    }
});
// Código
$(document).ready(function(){
	$("form").bind("submit", function(e){
		//Limpiamos las clases de error anteriores si las hay
		$(this).find(".error").removeClass("error");
		$(this).find(".errorSpan").removeClass("errorSpan");
		
		if (typeof filters == 'undefined') return;
	    $(this).find("input, textarea, select").each(function(x,el){
	        if ($(el).attr("class") != 'undefined') {
	        $.each(new String($(el).attr("class")).split(" "), function(x, klass){
	            if ($.isFunction(filters[klass]))
	                if (!filters[klass](el))  {
						//Definimos las clases de error
						$(el).addClass("error");
						$(el.parentNode).addClass("errorSpan");
					}
			});
	        }
	    });
		if ($(this).find(".error").size() > 0) {
			$.stop(e || window.event);
			$(this).find(".error:first").focus();
			
			//Movemos scroll hasta el error
			var targetOffset = $(this).find(".error:first").offset().top;
			targetOffset-=30;
			$('html, body').animate({scrollTop: targetOffset}, 1000);	
			//Fin movimiento scroll hasta el error
			
			return false;
		}
	    return true;
	});
});
//---- FIN COMPROBAR FORMS

//Función para realizar movimientos de scroll hacia un id
function moveTo(idCapa) {	//Scroll vertical de la página
	var targetOffset = $('#'+idCapa).offset().top;
	$('html, body').animate({scrollTop: targetOffset}, 1000);		
}