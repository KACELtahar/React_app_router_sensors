export default class Sensor {

	constructor(id, value, type, description) {
		this._description=description;
		this._id = id;
		this._value = value;
		this._type = type;
		this._Sv = value;
		this._compteur = 1;
	}

	/*--- GETTER ---*/
	get id() {
		 return this._id;
		 }
	get value() {
		 return this._value;
		 }
	get moy() {
		 return this._Sv / this._compteur;
		 }
	
	
	set value(value) { 
		this._value = '' + value; 
		//accumulé les valeurs
			this._Sv += Number(value);
		//compteur
			this._compteur++;
		
	}

	//Affichage
	affichage() {

		var s = '<th>' + this._id + '</th> <th>&nbsp;&nbsp;&nbsp;</th>  <th>' + '<br />'+this._description ;
		s+= '</th><th>&nbsp;&nbsp;&nbsp;</th><th>' + this._value+ '</th>';

		//Cas des valeurs convertible en nombre
		if(!isNaN(Number(this._value))) {
			s+= '</th><th>&nbsp;&nbsp;&nbsp;</th><th>' + this.moy+ '</th>';
		}
		else {
			s+= '</th><th></th><th></th>';
		}

		s+= '<th>&nbsp;&nbsp;&nbsp;</th><th>' + this._type + '</th>';	

		return s
	}

}
