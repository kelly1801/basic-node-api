import Role from "../models/role.js"

export const isValidRole = async(role = '') => {
    const existRole = await Role.findOne({role})
    if(! existRole) {
      throw new Error(`role : ${role} is not registered`)
    }}