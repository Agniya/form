var View = function(){
	this.init();
};

View.prototype = {
	additionalField:
		'<tr><td>A1</td><td><input type="text" name = "A1" id="A1"></td></tr>'+
		'<tr><td>B1</td><td><input type="text" name = "B1" id="B1"></td></tr>'+
		'<tr><td>C1</td><td><input type="text" name = "C1" id="C1"></td></tr>',
	init: function(){
		$('#add').click($.proxy(this.addForm,this));
	},
	addForm: function(){
		$('#userData').append(this.additionalField);
		$('#add').attr('disabled','disabled');
	}
};