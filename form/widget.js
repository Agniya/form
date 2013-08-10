/* 
* idJs - id поля
* name - текст для лейбла
* regExp - регулярное выражение, которому должно соответствовать введенное значение
* container - узел, в который добавляется поле
* field - объект, в котором определен тэг - input, texterea -, класс
* counter - номер вопроса
*/
/*конструктор для создания inputs, textareas*/
function textField(idJs,name,regExp,container,field,counter){
	var object = this.init(idJs,name,regExp);
	this.render(container,field,counter);
}
textField.prototype = {
	//создание объект текстового поля
	init: function(idJs,name,regExp){
		this.Object = {
			hasError: true,
			data:''
		};
		this.Object.idJs = idJs;
		this.Object.name = name;
		this.Object.regExp = regExp;
	},
	//создание html и добавление его в указанный узел
	render: function(container,field,counter){
		var label = '<label class="labels labels_orig" for="'+this.Object.idJs+'">'+this.Object.name+'</label><br/>';
		if(field.type !== undefined){
			var fiel = '<'+field.tag+' type='+field.type+' class="'+field.cls+'" id="'+this.Object.idJs+'">';
		}else{fiel = '<'+field.tag+' class="'+field.cls+'" id="'+this.Object.idJs+'"></'+field.tag+'>';};
		var question = '<div class="block20 question" id="'+counter+'quest">Вопрос '+counter+'</div>';
		var clear = '<div class="clear"></div>';
		var divisionLine = '<hr class="block100 m20 mt20"/>';
		var questionBlock = '<div class="block100">'+question+'<div class="block78">'+label+fiel+'</div>'+clear+divisionLine+'</div>';		
		container.append(questionBlock);	
	}
}

/*группа с чекбоксом и текстовым полем - группа должна учитываться Формой как отдельный объект */
function checkboxGroup(idJs,name,labels,regExp,container,counter){
	var object = this.init(idJs,name,labels,regExp);
	this.render(container,counter);	
}
checkboxGroup.prototype = {
	//создание объекта группы с текстовым полем и чекбоксами
	init: function(idJs,name,labels,regExp){
		this.Object = {
			cls: 'checkboxBlock',
			hasError: true,
			data:''
		};
		this.Object.idJs = idJs;
		this.Object.name = name;
		this.Object.labels = labels;
		this.Object.regExp = regExp;		
	},
	//создание html и добавление его в указанный узел
	render: function(container,counter){
		var label = '<label class="labels labels_orig" for="'+this.Object.idJs+'">'+this.Object.name+'</label><br/>';
		var text = '';
		var count = 0;
		for(var i = 0; i<this.Object.labels.length; i++){
			count++;
			text +='<input class="labels_orig" type="checkbox" id='+this.Object.idJs+count+'><label class="labels" for="'+this.Object.idJs+count+'">'+this.Object.labels[i]+'</label><br/>';
		}
		var fiel = '<textarea class="textFields" id="'+this.Object.idJs+'"></textarea>';
		var question = '<div class="block20 question">Вопрос '+counter+'</div>';
		var clear = '<div class="clear"></div>';
		var divisionLine = '<hr class="block100 mt20 m20"/>';
		
		var questionBlock = '<div class="block100">'+question+'<div class="block78">'+label+text+fiel+'</div>'+clear+divisionLine+'</div>';		
		container.append(questionBlock);	
	}
}
/*отдельный блок для ввода персональной информации - самостоятельный блок из-за особенностей отрисовки*/
function personalInfoBlock(idJs,name,regExp,container,field){
	var object = this.init(idJs,name,regExp);
	this.render(container,field);
	}
	//создание объекта текстового поля
	personalInfoBlock.prototype = {
		init: function(idJs,name,regExp){
		this.Object = {
		hasError: true,
		data:''
		};
		this.Object.idJs = idJs;
		this.Object.name = name;
		this.Object.regExp = regExp;
		},
		//создание html и добавление его в указанный узел
		render: function(container,field){
		var label = '<div class="block20"><label for="'+this.Object.idJs+'">'+this.Object.name+'</label></div>';
		if(field.type !== undefined){
		var fiel = '<'+field.tag+' type='+field.type+' class="'+field.cls+'" id="'+this.Object.idJs+'">';
		}else{fiel = '<'+field.tag+' class="'+field.cls+'" id="'+this.Object.idJs+'"></'+field.tag+'>';};
		var clear = '<div class="clear"></div>';
		var divisionLine = '<hr class="block100 m20 mt20"/>';
		var questionBlock = '<div class="block100">'+label+'<div class="block78">'+fiel+'</div>'+clear+divisionLine+'</div>'; 
		container.append(questionBlock); 
	}
}

/*добавление заголовка*/
function addHeader(value,elements){
	var header = '<h3 class = "mt30 m30">'+value+'</h3>';	
	$(header).insertBefore(elements);
}

/*добавление кнопки. Общие свойства для всех объектов*/
var addBtn = {
	init: function(container,label,value,cls,id,handler,event){
		var instance = '<span class="mleft '+cls+'" mleft id='+id+'>'+value+'</span>';
		var label = '<label style="line-height:3" class="mleft" for='+id+'>'+label+'</label><br/>';
		container.append(label);
		container.append(instance);
		container.one(event,'#'+id,handler);
		$('#'+id).on('mousedown',function(){
			$('#'+id).toggleClass('pressed');
			$('#selectBtn').toggleClass('dn');
		});
		$('#'+id).on('mouseup',function(){
			$('#'+id).removeClass('pressed');
		});
	}
}

/*добавление кнопки с селектом*/
function btnSelect(){}
btnSelect.prototype = addBtn;
btnSelect.prototype.constructor = btnSelect;
btnSelect.prototype.selectOptions = function(options,name){
	var size = options.length;
	var text = '<div class="mleft mt5 opt"><select class="sectList" size="'+size+'" id="selectBtn" name="'+name+'">';
	for(var i=0;i<options.length;i++){
		text += '<option value="'+options[i]+'">'+options[i]+'</option>';
	}
	text +='</select></div>';
	return text;
}

/*один чекбокс*/
function addCheckbox(container,label,id){
	var text = '<div class="mleft mt30 confirmation_text"><input type="checkbox" id='+id+'><label class="labels" for="'+id+'">'+label+'</label></div>';
	container.append($(text));
}	

/*кнопки отправки/очистки формы*/
function submitButton(value,container,id){
	var submit = '<input type="button" value="'+value+'"class="btn" id="'+id+'">';	
	container.append(submit);	
	$('#'+id).on('mousedown',function(){
		$('#'+id).toggleClass('pressed');
		});
	$('#'+id).on('mouseup',function(){
		$('#'+id).removeClass('pressed');
	});
}

/*блок отправки формы*/
function addFinalBlock(container,id){
	var block = '<div id="'+id+'" class = "final_block block100 mt30"></div>';
	container.append(block);
}