import { success, notFound } from '../../services/response/'
import { Event } from '.'
import * as FormData from 'form-data';
import * as moment from 'moment';

const imgur = require('imgur-module');
imgur.setClientId('f88a890c27ad834');
const fs = require('fs');
const imgurUploader = require('imgur-uploader');
const fetch = require("node-fetch");
global.fetch = fetch
global.Headers = fetch.Headers;
//const form = document.querySelector('form');
//const formData = new FormData();

export const create = ({ bodymen: { body } }, res, next) =>
  Event.create(body)
    .then((event) => event.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Event.find(query, select, cursor)
    .then((events) => events.map((event) => event.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Event.findById(params.id)
    .then(notFound(res))
    .then((event) => event ? event.view() : null)
    .then(success(res))
    .catch(next)
	
export const dohvatiAktualne = (req, res, next) =>
  Event.find({"dateStart" : { $gte : new Date()}})
    .then(notFound(res))
     .then((event) => {
       res.json({success:true, rezultat: event})
     })
    .then(success(res))
    .catch(next)

export const dohvatiOdabrani = (req, res, next) =>{
  
  let danPrije=new Date(req.body.datum);
  danPrije.setDate( danPrije.getDate() - 1 );
  danPrije.setHours(23, 59, 59);
  let danPoslje =new Date(req.body.datum);
  danPoslje.setDate( danPoslje.getDate() +1 );
  danPoslje.setHours(0, 0, 0);

  Event.find({$and:[{"dateStart" : { $gte : danPrije}},{"dateStart" : { $lte : danPoslje}}]})
    .then(notFound(res))
     .then((event) => {
       res.json({success:true, rezultat: event})
     })
    .then(success(res))
    .catch(next)
}

export const update = ({ bodymen: { body }, params }, res, next) =>
  Event.findById(params.id)
    .then(notFound(res))
    .then((event) => event ? Object.assign(event, body).save() : null)
    .then((event) => event ? event.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Event.findById(params.id)
    .then(notFound(res))
    .then((event) => event ? event.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const allEvents=(res,next) =>
event.collection("events").find({}).toArray(function(err, result) {
  if (err) throw err;
  console.log(result);
  if(event){
    res.json({success:true})
    }
    else{
    res.json({success:false})
    }
});
  
export const imageUpload = (req, res, next) =>{
  imgur.uploadImgur(req.body.slika).then((result) => {
    console.log(result);
    res.json({success:true, slika:result })
  });

}

export const imageUpload2 = (req, res, next) =>{

//  let headers2 = new Headers({'Content-Type': 'application/json'});  
//  headers2.append('Authorization','Bearer ')

//  let options = new RequestOptions({headers: headers2});
//  return this.http.post(APIname,body,options)
//   .map(this.extractData)
//   .catch(this.handleError);
//   new Headers({
//     Authorization: 'Client-ID f88a890c27ad834'
//   })
//   //imgurUploader(fs.readFileSync(req.body.slika), {title: 'Hello!'}).then(result => {
        //C:/Users/Aleksandar/Desktop/Petar/Slike/Vinkovci/7hw642axbt7n31y7u8pzcrn2fxvt3pmhzsp42zxb.jpg
//     //res.json({success:true, slika:result})

    // let formData = new FormData();
    // formData.append('slika', req.body.slika);

    let options = {
      method: 'POST',
      key: 'GIKNQUXY3bedb3244568f8d06a9ee6f10e1b201b',
      body: req.body.slika
  }
  // create the request
  fetch('https://api.imageshack.com/v2/images', options)
      // convert the response to json
      .then(response => response.json())
      // take the results and do stuff with it
      .then(result => {
          if (result.success) {
            let link = result.data.link;
            // do more stuff
            console.log(result)
          }
          else {
            console.log(result)
          }
      });

}