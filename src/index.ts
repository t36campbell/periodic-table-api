import dotenv from 'dotenv';
import express from 'express';
import expressRedisCache from 'express-redis-cache'
import cors from 'cors'
import fs from 'fs'
import path from 'path'

import { Request, Response } from 'express';
import { Element } from './element.model';

const data = fs.readFileSync(path.join(__dirname,'./public/periodicTable.json'), 'utf8');
const elementsArray: Element[] = JSON.parse(data);

// load the environment variables from the .env file
dotenv.config({
  path: '.env'
});

class Server {
  public express = express();
  public cache = expressRedisCache();
}

// initialize express server
const server = new Server();

// make server listen on some port
((port = process.env.PORT || 3000) => {
  server.express.listen(port, () => console.log(`> Listening on port ${port}`));
})();

server.express.use(express.static(path.join(__dirname, 'public'))); 
server.express.use(cors());

//return all Element
server.express.get('/elements', server.cache.route(), allElements);

function allElements(req: Request, res: Response) {
  res.json(elementsArray);
}

//serach by element number
server.express.get('/:number', server.cache.route(), searchElementByNumber);

function searchElementByNumber(req: Request, res: Response) {
  res.json(elementsArray.find( element => element.atomicNumber === +req.params.number ))
} 

//serach by element name
server.express.get('/elements/:name', server.cache.route(), searchElementByName);

function searchElementByName(req: Request, res: Response) {
  res.json(elementsArray.find( element => element.element.toLowerCase() === req.params.name.toLowerCase() ))
}

//search by period number
server.express.get('/elements/period/:number', server.cache.route(), searchPeriod); 

function searchPeriod(req: Request, res: Response) {
  res.json(elementsArray.filter(element => element.period === +req.params.number ));
} 

//search by group number
server.express.get('/elements/group/:number', server.cache.route(), searchGroup);

function searchGroup(req: Request, res: Response) {
  res.json(elementsArray.filter(element => element.group === +req.params.number ));
}

//search by type name
server.express.get('/elements/type/:name', server.cache.route(), searchType);

function searchType(req: Request, res: Response) {
  res.json(elementsArray.filter(element => element.type.toLowerCase() === req.params.name.toLowerCase() ));
} 

//search by phase name
server.express.get('/elements/phase/:name', server.cache.route(), searchPhase);

function searchPhase(req: Request, res: Response) {
  res.json(elementsArray.filter(element => element.phase.toLowerCase() === req.params.name.toLowerCase() ));
} 

//search by year discovered after
server.express.get('/elements/year/:number', server.cache.route(), searchYear);

function searchYear(req: Request, res: Response) {
  res.json(elementsArray.filter(element => element.year > +req.params.number ));
}

// loads html when as fallback
server.express.use('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));