import jwt from 'jsonwebtoken';

const authToken = (req, res, next) => {
    let jwtToken;
    const authHeader = req.headers['authorization'];
    if(authHeader !== undefined){
        jwtToken = authHeader.split(' ')[1];
    }

    if(jwtToken === undefined){
        return res.status(401).json({ message: "Unauthorized: No token provided"});
    }
    else{
        jwt.verify(jwtToken, process.env.JWT_SECRET, (err, payload) => {
            if(err){
                return res.status(403).json({ message: "Forbidden: Invalid token"});
            }
            else{
                req.user_id = payload.id;
                req.user_role = payload.role;
                next();
            }
        })
    }
}

export default authToken;