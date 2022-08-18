const { verifyJwt } = require("../helper/hashJwt")
const {User} = require("../models")

let auth = async (req, res, next) => {
    try {
        let {access_token} = req.headers
        if(!access_token){
            throw({name: `No token`})
        }

        let payload = verifyJwt(access_token)
        if(!payload){
            throw({name: `No token`})
        }

        let foundUser = await User.findByPk(+payload.id)
        if(!foundUser) {
            throw({name: `No token`})
        }
        req.user = {
            id: foundUser.id,
            age: foundUser.age
        }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = {auth}