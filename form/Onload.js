$(function(){
	var counter = 0;
	function countQwestions(){
		counter++;
		return counter;
	};	
	
	var container = $('.applicationForm');
	var textarea = {tag:'textarea',cls:'textFields'};
	var input = {tag:'input',cls:'inputs',type:'text'};
	var file = {tag:'input',cls:'mleft10',type:'file'};
	var checkbox = {tag:'input',cls:'',type:'checkbox'};
	
	/*создание объектов данных и их html*/
		/*блок с вопросами*/
		var dateOfBirth = new textField('js-dateOfBirth','Дата рождения',/([0-2]\d|3[01])\.(0\d|1[012])\.(\d{4})/, container,input,countQwestions(counter));
		var city = new textField('js-city','Город, в котором вы живёте',/\D+/, container,input,countQwestions(counter));
		var edu = new textField('js-edu','Вуз, факультет, специальность, кафедра',/\D+/, container,input,countQwestions(counter));
		var termination = new textField('js-termination','Месяц и год окончания вуза',/(0\d|1[012])\.(\d{4})/, container,input,countQwestions(counter));
		var englishLevel =  new checkboxGroup('js-englishLevel','Уровень владения английским языком',['Начальный','Средний','Свободное владение'],/\D+/,container,countQwestions(counter));
		var expectations = new textField('js-expectations','Чего вы ожидаете от участия в Школе?',/\D+/, container,textarea,countQwestions(counter));
		var knowFrom = new textField('js-knewFrom','Откуда вы о нас узнали?',/\D+/, container,textarea,countQwestions(counter));
				
		/*блок с персональными данными*/
		var addFile = new personalInfoBlock('js-resume','Резюме до 250 КБ',/\D+/, container,file);
		var moiKrug = new personalInfoBlock('js-moiKrug','Ссылка на профиль в Моем Круге',/\w+\@\w+\.(\w{2,3})/, container,input);
		var nameSurname = new personalInfoBlock('js-nameSurname','Имя,Фамилия',/\D+/, container,input);
		var phone = new personalInfoBlock('js-phone','Телефон',/\d+/, container,input);
		var mail = new personalInfoBlock('js-mail','E-mail',/\w+\@\w+\.(\w{2,3})/, container,input);
		var additionalInfo = new personalInfoBlock('js-additionalInfo','Дополнительная информация',/\D+/, container,textarea);
	
	/*создание объекта объектов данных для передачи в форму*/
	var person = {};
	person['dateOfBirth'] = dateOfBirth.Object;
	person['city'] = city.Object;
	person['edu'] = edu.Object;
	person['termination'] = termination.Object;
	person['expectations'] = expectations.Object;
	person['knowFrom'] = knowFrom.Object;
	
	person['phone'] = phone.Object;
	person['mail'] = mail.Object;
	person['englishLevel'] = englishLevel.Object;
	
	person['addFile'] = addFile.Object;
	person['moiKrug'] = moiKrug.Object;
	person['nameSurname'] = nameSurname.Object;
	person['phone'] = phone.Object;
	person['mail'] = mail.Object;
	person['additionalInfo'] = additionalInfo.Object;
		
	/*добавление заголовков*/
	var aboutYou = addHeader("Заполните анкету",$('#1quest'));
	var aboutYou = addHeader("Расскажите нам о себе",$('label[for='+addFile.Object.idJs+']').parent());
	
	/*добавление селекта*/
	var btnS = new btnSelect();
	btnS.init(container,'Откуда Вы узнали о нашем предложении?','Выбрать','btn','js-knowFrom',function(){
		$(btnS.selectOptions(['от HR-менеджера Яндекса','Я.Субботник','Yet another Conference',		
		'на другой конференции','из поиска','по рекомендации','другое'],'know from')).insertAfter('#js-knowFrom');		
	},'click');
	var confirmation = "Я даю свое согласие на передачу в ООО «ЯНДЕКС» резюме и/или анкеты, содержащих мои персональные данные, и согласен с тем, что они будут храниться в ООО «ЯНДЕКС» в течение 5 лет и будут обрабатываться исключительно для целей предложения мне вакансий группы компаний «ЯНДЕКС», в соответствии с Федеральным законом «О персональных данных»";
	
	/*добавление чекбокса согласия на обработку персональных данных*/
	addCheckbox(container,confirmation,'js-confirmation');

	/*добавление кнопок отправки и очистки формы*/
	var submitBtn = submitButton('Отправить',container,'js-submitBtn');
	var resetBtn = submitButton('Очистить',container,'js-resetBtn');
	var finalstep = addFinalBlock(container,'finalstep');
	$('#finalstep').append($('#js-submitBtn'));
	$('#finalstep').append($('#js-resetBtn'));
	
	/*создание экземпляра валидатора формы*/
	var validator = new Validator();
	
	/*создание экземпляра формы и передача ей валидатора, объекта данных и ДОМ-узла*/
	var form = new Form(person,validator,container);
});


