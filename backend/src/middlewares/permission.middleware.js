import roleHierarchy from "./roles.js";

const permit = (minRole) => {
    return (req, res, next) => {
        if(!req.user || !req.user.role) {
            return res.status(403).json({ message: "Unauthorized: No user information found"});
        }

        const userRoleLevel = roleHierarchy[req.user.role];
        const requiredRoleLevel = roleHierarchy[minRole];

        if(!userRoleLevel || !requiredRoleLevel) {
            return res.status(403).json({ message: "Server misconfiguration: Unknown role"});
        }

        if(userRoleLevel >= requiredRoleLevel) {
            next();
        } else {
            return res.status(403).json({ message: "Unauthorized: Insufficient permissions" });
        }
    }
}

export default permit;