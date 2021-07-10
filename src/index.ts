import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors'
import fs from 'fs'
import path from 'path'

var cache = require('express-redis-cache')();

const data = fs.readFileSync(path.join(__dirname,'./public/periodicTable.json'), 'utf8');
const elementsArray: Array<Elements> = JSON.parse(data);

// load the environment variables from the .env file
dotenv.config({
  path: '.env'
});
class Server {
  public app = express();
}

// initialize server app
const server = new Server();

// make server listen on some port
((port = process.env.PORT || 3000) => {
  server.app.listen(port, () => console.log(`> Listening on port ${port}`));
})();

server.app.use(express.static(path.join(__dirname, 'public'))); 
server.app.use(cors());

//return all elements
server.app.get('/elements', cache.route(), allElements);

function allElements(req: Request, res: Response) {
    res.json(elementsArray);
}

//serach by element name
server.app.get('/elements/:element/', cache.route(), searchElement_name);

function searchElement_name(req: Request, res: Response) {
	let query: String = req.params.element; 
  // make all data in db lowercase then only convert query to lowercase
	query = query.charAt(0).toUpperCase() + query.slice(1).toLowerCase(); 
  res.json(elementsArray.find( element => element.element === query ))
}

//serach by element number
server.app.get('/elements/number/:element/', cache.route(), searchElement_number);

function searchElement_number(req: Request, res: Response) {
	let query: Number = Number(req.params.element);
  res.json(elementsArray.find( element => element.atomicNumber === query ))
} 

//search by period number
server.app.get('/elements/period/:number', cache.route(), searchPeriod); 

function searchPeriod(req: Request, res: Response) {
  let query: Number = Number(req.params.number);
  let Response: Array<Elements> = [];  
  elementsArray.forEach(element => {
    if(element.period === query) {
        Response.push(element)
    }
  });
  res.json(Response);
} 

//search by group number
server.app.get('/elements/group/:number', cache.route(), searchGroup);

function searchGroup(req: Request, res: Response) {
	let query: Number = Number(req.params.number);
  let Response: Array<Elements> = [];  
	for (var i = 0; i < elementsArray.length; i++) {
    if (elementsArray[i].group === query){
      Response.push(elementsArray[i]);
    }
  }
  res.send(JSON.stringify(Response, null, '\t'));
}

//search by type name
server.app.get('/elements/type/:name', cache.route(), searchType);

function searchType(req: Request, res: Response) {
  let query: String = req.params.name;
  query = query.charAt(0).toUpperCase() + query.slice(1).toLowerCase(); 
  let Response: Array<Elements> = [];  
	for (var i = 0; i < elementsArray.length; i++) {
    if (elementsArray[i].type === query){
      Response.push(elementsArray[i]);
    }
  }
  res.json(Response);
} 

//search by phase name
server.app.get('/elements/phase/:name', cache.route(), searchPhase);

function searchPhase(req: Request, res: Response) {
  let query: String = req.params.name;
  query = query.toLowerCase();
  let Response: Array<Elements> = [];  
	for (var i = 0; i < elementsArray.length; i++) {
    if (elementsArray[i].phase === query){
      Response.push(elementsArray[i]);
    }
  }
  res.json(Response);
} 

//search by year discovered after
server.app.get('/elements/year/:number', cache.route(), searchYear);

function searchYear(req: Request, res: Response) {
	let query: Number = Number(req.params.number);
  let Response: Array<Elements> = [];  
	for (var i = 0; i < elementsArray.length; i++) {
    if (elementsArray[i].year > query){
      Response.push(elementsArray[i]);
    }
  }
  res.json(Response);
}
// loads html when as fallback
server.app.use('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

interface Elements {
  atomicNumber: Number,
  element: String,
  symbol: String,
  atomicMass: Number,
  neutrons: Number,
  protons: Number,
  electrons: Number,
  period: Number,
  group: Number,
  phase: String,
  radioactive: Boolean,
  natural: Boolean,
  metal: Boolean,
  nonMetal: Boolean,
  metalloid: Boolean,
  type: String,
  atomicRadius: Number,
  electronegativity: Number,
  firstIonization: Number,
  density: String,
  meltingPoint: Number,
  boilingPoint: Number,
  isotopes: Number,
  discoverer: String,
  year: Number,
  specificHeat: Number,
  shells: Number,
  valence: Number,
}