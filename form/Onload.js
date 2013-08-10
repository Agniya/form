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
	
	/*�������� �������� ������ � �� html*/
		/*���� � ���������*/
		var dateOfBirth = new textField('js-dateOfBirth','���� ��������',/([0-2]\d|3[01])\.(0\d|1[012])\.(\d{4})/, container,input,countQwestions(counter));
		var city = new textField('js-city','�����, � ������� �� �����',/\D+/, container,input,countQwestions(counter));
		var edu = new textField('js-edu','���, ���������, �������������, �������',/\D+/, container,input,countQwestions(counter));
		var termination = new textField('js-termination','����� � ��� ��������� ����',/(0\d|1[012])\.(\d{4})/, container,input,countQwestions(counter));
		var englishLevel =  new checkboxGroup('js-englishLevel','������� �������� ���������� ������',['���������','�������','��������� ��������'],/\D+/,container,countQwestions(counter));
		var expectations = new textField('js-expectations','���� �� �������� �� ������� � �����?',/\D+/, container,textarea,countQwestions(counter));
		var knowFrom = new textField('js-knewFrom','������ �� � ��� ������?',/\D+/, container,textarea,countQwestions(counter));
				
		/*���� � ������������� �������*/
		var addFile = new personalInfoBlock('js-resume','������ �� 250 ��',/\D+/, container,file);
		var moiKrug = new personalInfoBlock('js-moiKrug','������ �� ������� � ���� �����',/\w+\@\w+\.(\w{2,3})/, container,input);
		var nameSurname = new personalInfoBlock('js-nameSurname','���,�������',/\D+/, container,input);
		var phone = new personalInfoBlock('js-phone','�������',/\d+/, container,input);
		var mail = new personalInfoBlock('js-mail','E-mail',/\w+\@\w+\.(\w{2,3})/, container,input);
		var additionalInfo = new personalInfoBlock('js-additionalInfo','�������������� ����������',/\D+/, container,textarea);
	
	/*�������� ������� �������� ��� �������� � �����*/
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
		
	/*���������� ����������*/
	var aboutYou = addHeader("��������� ������",$('#1quest'));
	var aboutYou = addHeader("���������� ��� � ����",$('label[for='+addFile.Object.idJs+']').parent());
	
	/*���������� �������*/
	var btnS = new btnSelect();
	btnS.init(container,'������ �� ������ � ����� �����������?','�������','btn','js-knowFrom',function(){
		$(btnS.selectOptions(['�� HR-��������� �������','�.���������','Yet another Conference',		
		'�� ������ �����������','�� ������','�� ������������','������'],'know from')).insertAfter('#js-knowFrom');		
	},'click');
	var confirmation = "� ��� ���� �������� �� �������� � ��� ������ѻ ������ �/��� ������, ���������� ��� ������������ ������, � �������� � ���, ��� ��� ����� ��������� � ��� ������ѻ � ������� 5 ��� � ����� �������������� ������������� ��� ����� ����������� ��� �������� ������ �������� ������ѻ, � ������������ � ����������� ������� �� ������������ �������";
	
	/*���������� �������� ��������*/
	addCheckbox(container,confirmation,'js-confirmation');

	/*���������� ������ �������� � ������� �����*/
	var submitBtn = submitButton('���������',container,'js-submitBtn');
	var resetBtn = submitButton('��������',container,'js-resetBtn');
	var finalstep = addFinalBlock(container,'finalstep');
	$('#finalstep').append($('#js-submitBtn'));
	$('#finalstep').append($('#js-resetBtn'));
	
	/*�������� ���������� ���������� �����*/
	var validator = new Validator();
	
	/*�������� ���������� ����� � �������� �� ����������, ������� ������ � ��� ����*/
	var form = new Form(person,validator,container);
});


