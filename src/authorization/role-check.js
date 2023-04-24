const express   = require('express');
const app       = express();
const rolePermissions = require("../constants");

function verifyRole(rolesWithAccess) {
    return async (req, res, next) => {
        let role = req.user.role
        
        if (role) {
            if (role == rolePermissions.roles.master || role == rolePermissions.roles.admin || (rolesWithAccess && Object.values(rolesWithAccess).includes(role))) {
                return next();
            } else {
                res.status(403).json({error: "Unauthorized. You do not have the correct permissions for this action."});
            }
        } else {
            res.status(403).json({error: "Unauthorized"});
        }
    }
}
  
module.exports = verifyRole;
