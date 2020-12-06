import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors'
import fs from 'fs'
import path from 'path'

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
server.app.get('/elements', alldata);

function alldata(req: Request, res: Response) {
    res.json(elementsArray);
}

//serach by element name
server.app.get('/elements/:element/', searchElement_name);

function searchElement_name(req: Request, res: Response) {
	let query: String = req.params.element; 
	query = query.charAt(0).toUpperCase() + query.slice(1).toLowerCase(); 
	for (var i = 0; i < elementsArray.length; i++) {
    if (elementsArray[i].Element === query){
      res.json(elementsArray[i]);
   }
  }
}

//serach by element number
server.app.get('/elements/number/:element/', searchElement_number);

function searchElement_number(req: Request, res: Response) {
	let query: Number = Number(req.params.element);
	for (var i = 0; i < elementsArray.length; i++) {
    if (elementsArray[i].AtomicNumber === query){
      res.json(elementsArray[i]);
   }
  }
} 

//search by period number
server.app.get('/elements/period/:number', searchPeriod); 

function searchPeriod(req: Request, res: Response) {
  let query: Number = Number(req.params.number);
  let Response: Array<Elements> = [];  
	for (var i = 0; i < elementsArray.length; i++) {
    if (elementsArray[i].Period === query){
      Response.push(elementsArray[i]);
    }
  }
  res.json(Response);
} 

//search by group number
server.app.get('/elements/group/:number', searchGroup);

function searchGroup(req: Request, res: Response) {
	let query: Number = Number(req.params.number);
  let Response: Array<Elements> = [];  
	for (var i = 0; i < elementsArray.length; i++) {
    if (elementsArray[i].Group === query){
      Response.push(elementsArray[i]);
    }
  }
  res.send(JSON.stringify(Response, null, '\t'));
}

//search by type name
server.app.get('/elements/type/:name', searchType);

function searchType(req: Request, res: Response) {
  let query: String = req.params.name;
  query = query.charAt(0).toUpperCase() + query.slice(1).toLowerCase(); 
  let Response: Array<Elements> = [];  
	for (var i = 0; i < elementsArray.length; i++) {
    if (elementsArray[i].Type === query){
      Response.push(elementsArray[i]);
    }
  }
  res.json(Response);
} 

//search by phase name
server.app.get('/elements/phase/:name', searchPhase);

function searchPhase(req: Request, res: Response) {
  let query: String = req.params.name;
  query = query.toLowerCase();
  let Response: Array<Elements> = [];  
	for (var i = 0; i < elementsArray.length; i++) {
    if (elementsArray[i].Phase === query){
      Response.push(elementsArray[i]);
    }
  }
  res.json(Response);
} 

//search by year discovered after
server.app.get('/elements/year/:number', searchYear);

function searchYear(req: Request, res: Response) {
	let query: Number = Number(req.params.number);
  let Response: Array<Elements> = [];  
	for (var i = 0; i < elementsArray.length; i++) {
    if (elementsArray[i].Year > query){
      Response.push(elementsArray[i]);
    }
  }
  res.json(Response);
}

server.app.use('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
interface Elements {
  AtomicNumber: Number,
  Element: String,
  Symbol: String,
  AtomicMass: Number,
  NumberofNeutrons: Number,
  NumberofProtons: Number,
  NumberofElectrons: Number,
  Period: Number,
  Group: Number,
  Phase: String,
  Radioactive: Boolean,
  Natural: Boolean,
  Metal: Boolean,
  Nonmetal: Boolean,
  Metalloid: Boolean,
  Type: String,
  AtomicRadius: Number,
  Electronegativity: Number,
  FirstIonization: Number,
  Density: String,
  MeltingPoint: Number,
  BoilingPoint: Number,
  NumberOfIsotopes: Number,
  Discoverer: String,
  Year: Number,
  SpecificHeat: Number,
  NumberofShells: Number,
  NumberofValence: Number,
}