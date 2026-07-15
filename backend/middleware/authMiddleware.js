import jwt from 'jsonwebtoken'


export const protect = (req,res,next) =>{
        let token = req.headers.authorization;

        if (token && token.startsWith('Bearer')){
            try{
                token = token.split(" ")[1]
                const decode = jwt.verify(token,process.env.JWT_SECRET)
                req.user = decode
                next()
            }catch(err){
                return res.status(401).json(
                    {
                       msg: 'Token failed'
                    }
                )
            }
        }else{
            return res.status(401).json({
                msg:'No token'
            })
        }


}


export const adminOnly = (req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next()
    }else{
        return res.status(403).json({
            msg:"Unauthorized (Admin Only)"
        })
    }
}




