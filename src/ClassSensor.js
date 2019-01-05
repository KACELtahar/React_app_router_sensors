export default class Sensor {

	constructor(name, value, type) {
		this._name = name;
		this._value = value;
		this._type = type;
		this._moy = value;
		this._cpt = 1;
		this._history = [];
		this._history.push(value);;
		this._id = -1;
		
	}

	/*--- GETTER ---*/
	get name() { return this._name; }
	get value() { return this._value; }
	get type() {return this._type; }
	get moy() {return (this._history/this._cpt); }
	get history() {return this._history; }
	get id() {return this._id; }
	
	/*--- SETTER ---*/
	set value(value) { 


		//Mise en historique
		this._history.push(this._value);

		//Sauvegarde de 10 valeurs
		if(this._history.length > 10) {
			this._history.splice(0,1);
		}

		this._value = '' + value; 
	
		//Cas d'une valeur convertible en nombre
		if(!isNaN(Number(this._value))) {
			this._moy += Number(value);
			this._cpt++;
		}
	}

	set id(id) {
		this._id = id; 
	}
}