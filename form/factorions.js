function countFactorions(){
//функция вычисления факториала
	function factorial(j) {
	var res = 1;
	while(j) res *= j--;
	return res;
}
//созданиепустого массива для факторионов
	var factorions = [];
//цикл для создания числе от 1 до 2540160
	for(var n=1; n<= 2540160; n++){

	var factorials = 0;
	var srt = new String(n);
	//для каждого числа запускаем цикл длинною n.length
	for(var i=0; i<srt.length;i++){
	//к каждому индексу применяем функцию факториала, записываем результат в массив
	var k = +srt[i];
	var f = factorial(k);
	factorials +=f;
	}
if(n == factorials)
	{factorions.push(n)}; 
} 
	return factorions;
}
alert(countFactorions()); 
});