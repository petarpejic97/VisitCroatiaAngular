import { success, notFound } from '../../services/response/'
import { User2 } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  User2.create(body)
    .then((user2) => user2.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  User2.find(query, select, cursor)
    .then((user2S) => user2S.map((user2) => user2.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  User2.findById(params.id)
    .then(notFound(res))
    .then((user2) => user2 ? user2.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  User2.findById(params.id)
    .then(notFound(res))
    .then((user2) => user2 ? Object.assign(user2, body).save() : null)
    .then((user2) => user2 ? user2.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  User2.findById(params.id)
    .then(notFound(res))
    .then((user2) => user2 ? user2.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const loginUser = (req, res, next) =>
User2.find({ email: req.body.email, password:req.body.pass})
  .then(notFound(res))
  .then((user) => {
    console.log(user[0])
    if(user[0]){
      res.json({success:true, rez: user, message:"Ulogiran!"})
    }
    else{
      res.json({success:false,message:"Wrong email or password"})}
    }
    )
  .then(success(res))
  .catch(next)
