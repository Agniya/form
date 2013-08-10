/*
* Form
* person - объект с объектами данных 
* validator - экземпляр валидатора
* container - узел, в который добавляется форма
*/
function Form(person,validator,container){
	this.init(person,validator,container);
	this.person = person;	
}
Form.prototype = {
	formData:{},
	//инициализация формы,навешивание событий на элементы формы
	init:function(person,validator,container){
		var that = this;
		//уход фокуса из input
		container.on('focusout','input[type=text]', function(event){
			that.checkField(event,person,validator);
			console.log(that.formData);
			}
		);
		//уход фокуса из textarea
		container.on('focusout','textarea',function(event){
			that.checkField(event,person,validator);
			console.log(that.formData);
			}
		);	
		//изменение статуса checkbox
		container.find('input[type=checkbox]').on('change',function(event){
				$(this).toggleClass('checked');
				if($(this).hasClass('checked')){var data = 'true';}else{var data = 'false';}
				var name = $('label[for='+$(event.target).attr('id')+']').html();
				that.saveData(name,data);	
				console.log(that.formData);			
			}
		);
		//сохранение данных из селекта
		$(document).on('click','option',function(event){
				var name = $('select').attr('name');
				var data = $(this).attr('value');				
				that.saveData(name,data);				
				$(this).toggleClass('selected');
				console.log(that.formData);			
			}
		);
		//отправка формы
		$('#js-submitBtn').on('click',function(){
				that.submitForm(validator,person);		
			}		
		);
		//очитска формы
		$('#js-resetBtn').on('click',function(){
				$('input[type=text]').val('');	
				$('input[type=checkbox]').val('');
				$('textarea').val('');	
				$('input[type=text]').next('span.error').remove();
				$('textarea').next('span.error').remove();				
				that.removeAllData();
			}		
		);
	},
	//проверка заполненности полей,сохранение данных либо сообщение об ошибке
	checkField:function(event,person,validator){
		var data = $(event.target).val();
		var id = $(event.target).attr('id');
		for(var val in person)
		{
			var pers = person[val];
			for(var key in pers)
			{
				if(pers[key] == id){
					pers['data'] = data; 
					validator.checkData(pers,data);
					if(pers.hasError == false){
						this.removeMessage($(event.target));
						this.saveData(pers['name'],data);
						if(this.saveData(pers['name'],data) == false){validator.emptyField();this.showMessage(validator.message[validator.message.length-1],id)};
					}else{
						this.removeMessage($(event.target));
						this.showMessage(validator.message[validator.message.length-1],id);
					};
				}
			}
		}	
	},	
	//передача данных из полей в объекты данных и сохранение данных в Форме
	saveData:function(name,data){
		this.formData[name] = data;
		if(this.formData[name]==''){delete this.formData[name];return false;};
	},
	//очистка данных объекта Формы
	removeAllData: function(){
		for(var key in this.formData){
			if(this.formData[key] !== undefined){delete this.formData[key]}
		}	
	},
	//очистка формы от сообщений
	removeMessage:function(elem){
		if(elem.next('span.error')){elem.next('span.error').remove();};
	},
	//отрисовка сообщений об ошибках, получаемых от валидатора
	showMessage:function(message,id){
		$('<span class="error">'+message+'</span>').insertAfter($('#'+id));
	},
	//преобразование данных в JSON
	makeJSON:function(){
		return JSON.stringify(this.formData);
	},
	//инициализация события submit, если от Validator не поступило сообщение об ошибке
	submitForm:function(validator,person){
		var hasError = function(obj){	
		var error = true;
		for(var val in obj)
		{
			var pers = obj[val];
			if(pers['hasError'] == true) error=true;
			else  error = false;
		}	
			return error;
		};
		if(!hasError(person)){console.log(this.makeJSON())};
	}
}
/*
Validator
*/
function Validator(data,obj){}
Validator.prototype = {
	message: [],
	checkData: function(obj,dat){
		if((obj.cls !== undefined) && (obj.cls == 'checkboxBlock')){
			if($('input.checked').length > 0){
				this.message = [];
				obj.hasError = false;
			}else{
				this.checkField(obj,dat);
			}
		}else{
			this.checkField(obj,dat);		
		}
	},
	checkField:function(obj,dat){
		if(dat == ''){this.message.push('Поле не заполнено');}else{
			var reg = new RegExp(obj.regExp);
			var data = dat;
			if(reg.test(data) != true) {
			this.message.push('Некорректно заполнено поле '+'"'+obj.name+'"');
			obj.hasError = true;
			}else{
			this.message = [];
			obj.hasError = false;
			}
		}
	},
	emptyField:function(){this.message.push('Поле не заполнено');}
}