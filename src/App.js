import React from 'react'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import mqtt from 'mqtt'

import logo from './logo.svg';

import './App.css';
import './index.css';
import Sensor from './ClassSensor';
var listC = [];

/****************************************************************************************/


/****************************************************************************************/


//Zone du menu dynamique
const Menu = (props) => (
	
		<div className="menu" id = "menu">
			{props.capteurs}
		</div>
	
)



//Zone information du capteur
const Capteur = (props) => (

	<div className="infoC">	
			

		{props.path[1] === undefined || props.infoC[props.path[1]] === undefined ? '' : <div className="titre">Information du capteur  : {props.infoC[props.path[1]].name}</div>}
		{props.path[1] === undefined || props.infoC[props.path[1]] === undefined ? '' :
			<div className="parametre">

				<div className="actuel">Valeur actuelle :</div>
				<div className="actuel">{props.infoC[props.path[1]].value}{props.infoC[props.path[1]].type === 'TEMPERATURE' ? '°' : ''}</div>
			</div>

		}

		{props.path[1] === undefined || props.infoC[props.path[1]] === undefined ? '' :
			<div className="history">
				<div>Historique :</div>
				<div className="h">{props.infoC[props.path[1]].history[0]}{ props.infoC[props.path[1]].type === 'TEMPERATURE' ? '°' : ''}</div>
				<div className="h">{props.infoC[props.path[1]].history[1]}{ props.infoC[props.path[1]].type === 'TEMPERATURE' ? '°' : ''}</div>
				<div className="h">{props.infoC[props.path[1]].history[2]}{ props.infoC[props.path[1]].type === 'TEMPERATURE' ? '°' : ''}</div>
				<div className="h">{props.infoC[props.path[1]].history[3]}{ props.infoC[props.path[1]].type === 'TEMPERATURE' ? '°' : ''}</div>
				<div className="h">{props.infoC[props.path[1]].history[4]}{ props.infoC[props.path[1]].type === 'TEMPERATURE' ? '°' : ''}</div>
				<div className="h">{props.infoC[props.path[1]].history[5]}{ props.infoC[props.path[1]].type === 'TEMPERATURE' ? '°' : ''}</div>
				<div className="h">{props.infoC[props.path[1]].history[6]}{ props.infoC[props.path[1]].type === 'TEMPERATURE' ? '°' : ''}</div>
				<div className="h">{props.infoC[props.path[1]].history[7]}{ props.infoC[props.path[1]].type === 'TEMPERATURE' ? '°' : ''}</div>
				<div className="h">{props.infoC[props.path[1]].history[8]}{ props.infoC[props.path[1]].type === 'TEMPERATURE' ? '°' : ''}</div>
				<div className="h">{props.infoC[props.path[1]].history[9]}{ props.infoC[props.path[1]].type === 'TEMPERATURE' ? '°' : ''}</div>
			</div>	
		}

	</div>
)

/****************************************************************************************/

//Page
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			capteurs: []
		};
		this.connexion = this.connexion.bind(this)
	}


	connexion() {
try{
		//Récupération de l'url
		var url = document.getElementById('server').value;

		//Connexion par défaut
		if(url === '') {
			url = 'mqtt://127.0.0.1:8080';
		}
}
catch(er){
alert("erreur connection")

}
	
	var client  = mqtt.connect(url);
		client.subscribe('#');


		const that = this;}
		if (connexion){	
	connexion.client.on('message', function (topic, message) {

			//Récupération du nom, l'etat et le type du capteur
			var val = topic.search('/');
			var name = topic.substring(val+1);
			var json = JSON.parse(message);
			    name = json.name;
			var etat = json.value;
			var type = json.type;

			var i; var pos = -1;
			//Recherche du capteur actuel
			for(i = 0; i < listC.length; i++)  {
				if(listC[i].name === name) {
					pos = i;
				}
			}

			//Si on ajoute un nouveau capteur
			if(pos === -1){

				var sensor;

				//Convertions de la valeur du capteur en nombre (quand c'est possible)
				if(isNaN(Number(etat))) {
					sensor = new Sensor(name, etat, type);
				}
				else {
					sensor = new Sensor(name, Number(etat), type);
				}


				sensor.id = listC.length;
				listC.push(sensor);		
			
			}
			//Si on met à jour un ancien capteur
			else {

				//Mise à jour de la valeur du capteur
				listC[pos].value = etat;

			}

		connexion.that.setState({capteurs: listC});
		});

	
		}
	
	render(props) {
		//nom des capteurs
		const capts = this.state.capteurs.map((s) => <Link to={'/'+s.id+'/'+s.name}>{s.name}</Link>);

		const infoCapts = this.state.capteurs;

		return (
			<Router>	
				 <div>
					<header className="App-header">
						<img src={logo} className="App-logo" alt="logo" />
						<h1 className="App-title">Lab React Router</h1>
					</header>
					<div className="brocker">
						Url du Brocker:<input className="server" id="server" onBlur={this.connexion}></input>
					</div>
					<div className="centre"> 
						<Menu capteurs={capts}/>
				
						<Route path={`/:id/:name`} component={(path) => <Capteur infoC={infoCapts} path={path.location.pathname}/>}/>
					</div>
				</div>
				
			</Router>
		);
	}

}

export default App
