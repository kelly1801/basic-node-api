import { response } from "express";

export const isAdminRole = (req, res = response, next) => {
if (!req.user){ 

    return res.status(500).json({
        msg: 'Token have not been verified'
    })
}

const {role, name} = req.user

if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
        msg: `${name} does not have admin rigths`
    })
}

    next()
}

export const haveRole = (...roles) => {
 return (req, res= response, next) => {

    if (!req.user){ 

        return res.status(500).json({
            msg: 'Token have not been verified'
        })
    }

    if (!roles.includes(req.user.role)){
        return res.status(401).json({
            msg: 'You dont have rights to do this'
        })
    }

        next()
    }
}