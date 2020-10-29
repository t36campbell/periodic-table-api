import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors'
import fs from 'fs'
import path from 'path'

// interface Elements {
//   AtomicNumber: Number,
//   Element: String,
//   Symbol: String,
//   AtomicMass: Number,
//   NumberofNeutrons: Number,
//   NumberofProtons: Number,
//   NumberofElectrons: Number,
//   Period: Number,
//   Group: Number,
//   Phase: String,
//   Radioactive: Boolean,
//   Natural: Boolean,
//   Metal: Boolean,
//   Nonmetal: Boolean,
//   Metalloid: Boolean,
//   Type: String,
//   AtomicRadius: Number,
//   Electronegativity: Number,
//   FirstIonization: Number,
//   Density: String,
//   MeltingPoint: Number,
//   BoilingPoint: Number,
//   NumberOfIsotopes: Number,
//   Discoverer: String,
//   Year: Number,
//   SpecificHeat: Number,
//   NumberofShells: Number,
//   NumberofValence: Number,
// }

let data = fs.readFileSync(path.join(__dirname,'/periodicTable.json'), 'utf8');
let elements: string = JSON.stringify(JSON.parse(data), null, '\t');

// load the environment variables from the .env file
dotenv.config({
  path: '.env'
});

/**
 * Express server application class.
 * @description Will later contain the routing system.
 */
class Server {
  public app = express();
}

// initialize server app
const server = new Server();

// make server listen on some port
((port = process.env.APP_PORT || 5000) => {
  server.app.listen(port, () => console.log(`> Listening on port ${port}`));
})();

server.app.use(express.static('public')); 
server.app.use(cors());

server.app.get('/elements',alldata);

function alldata(req: Request, res: Response) {
    res.send(elements);
}

// server.app.get('/elements/:element/', searchElement); 

// function searchElement(req: Request, res: Response) {
// 	let word: String = req.params.element; 
// 	word = word.charAt(0).toUpperCase() 
// 		+ word.slice(1).toLowerCase(); 
	
// 	elements.forEach(element => {
    
//   });
	
// 	response.send(reply); 
// } 
