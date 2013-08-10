/**
* Создает экземпляр космического корабля.
* @name Vessel
* @param {String} name Название корабля.
* @param {Number}[] position Местоположение корабля.
* @param {Number} capacity Грузоподъемность корабля.
*/
function Vessel(name, position, capacity) {
this.name = name;
this.position = position;
this.capacity = capacity;
this.occupiedSpace = 0;
}

/**
* Выводит текущее состояние корабля: имя, местоположение, доступную грузоподъемность.
* @example
* vessel.report(); // Грузовой корабль. Местоположение: Земля. Товаров нет.
* @example
* vesserl.report(); // Грузовой корабль. Местоположение: 50,20. Груз: 200т.
* @name Vessel.report
*/
Vessel.prototype.report = function () {
var report = 'Корабль "'+this.name+'".'+' Местоположение: '+ this.position+'.'+ ' Занято: '+ this.getOccupiedSpace() + ' т.'+ ' из ' + this.getFreeSpace()+ ' т.';
return report; 
}

/**
* Выводит количество свободного места на корабле.
* @name Vessel.getFreeSpace
*/
Vessel.prototype.getFreeSpace = function () {
return this.capacity;
}

/**
* Выводит количество занятого места на корабле.
* @name Vessel.getOccupiedSpace
*/
Vessel.prototype.getOccupiedSpace = function () {
return this.occupiedSpace;
}
/**
* Переносит корабль в указанную точку.
* @param {Number}[]|Planet newPosition Новое местоположение корабля.
* @example
* vessel.flyTo([1,1]);
* @example
* var earth = new Planet('Земля', [1,1]);
* vessel.flyTo(earth);
* @name Vessel.report
*/
Vessel.prototype.flyTo = function (newPosition) {
this.position = newPosition.position;
}

/**
* Создает экземпляр планеты.
* @name Planet
* @param {String} name Название Планеты.
* @param {Number}[] position Местоположение планеты.
* @param {Number} availableAmountOfCargo Доступное количество груза.
*/
function Planet(name, position, availableAmountOfCargo) {
this.name = name;
this.position = position;
this.availableAmountOfCargo = availableAmountOfCargo;
}

/**
* Выводит текущее состояние планеты: имя, местоположение, количество доступного груза.
* @name Planet.report
*/
Planet.prototype.report = function () {
var report = 'Планета "'+this.name+'".'+' Местоположение: '+ this.position+'.'+ ' Доступно груза: '+ this.getAvailableAmountOfCargo()+ ' т.';
return report;
}

/**
* Возвращает доступное количество груза планеты.
* @name Vessel.getAvailableAmountOfCargo
*/
Planet.prototype.getAvailableAmountOfCargo = function () {
return this.availableAmountOfCargo;
}

/**
* Загружает на корабль заданное количество груза.
*
* Перед загрузкой корабль должен приземлиться на планету.
* @param {Vessel} vessel Загружаемый корабль.
* @param {Number} cargoWeight Вес загружаемого груза.
* @name Vessel.loadCargoTo
*/
Planet.prototype.loadCargoTo = function (vessel, cargoWeight) {
this.availableAmountOfCargo -=cargoWeight;
vessel.occupiedSpace = cargoWeight; 
}

/**
* Выгружает с корабля заданное количество груза.
*
* Перед выгрузкой корабль должен приземлиться на планету.
* @param {Vessel} vessel Разгружаемый корабль.
* @param {Number} cargoWeight Вес выгружаемого груза.
* @name Vessel.unloadCargoFrom
*/
Planet.prototype.unloadCargoFrom = function (vessel, cargoWeight) {
this.availableAmountOfCargo +=cargoWeight;
vessel.occupiedSpace -= cargoWeight;
}

 

$(function(){
var vessel = new Vessel('Яндекс', [0,0], 1000);
var planetA = new Planet('A', [2,3], 0);
var planetB = new Planet('B', [100, 100], 5000);

// Проверка текущего состояния
console.log(vessel.report()); // Корабль "Яндекс". Местоположение: 0,0. Занято: 0 из 1000т.
console.log(planetA.report()); // Планета "A". Местоположене: 0,0. Грузов нет.
console.log(planetB.report()); // Планета "B". Местоположене: 100,100. Доступно груза: 5000т.

vessel.flyTo(planetB);
planetB.loadCargoTo(vessel, 1000);
vessel.report(); // Корабль "Яндекс". Местоположение: 100,100. Занято: 1000 из 1000т.

vessel.flyTo(planetA);
planetA.unloadCargoFrom(vessel, 500);
console.log(vessel.report()); // Корабль "Яндекс". Местоположение: 0,0. Занято: 500 из 1000т.
console.log(planetA.report()); // Планета "A". Местоположение: 0,0. Доступно груза: 500т.
console.log(planetB.report()); // Планета "B". Местоположение: 100,100. Доступно груза: 4000т.
});