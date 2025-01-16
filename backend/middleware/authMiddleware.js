const jwt=require('jsonwebtoken')

const protected=(req,res,next)=>{
    const token=req.cookies.token;
    if(!token) return res.status(401).json({msg:"unauthorized"});

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();

    } catch(err){
        res.status(401).json({msg:"invalid token"})
    }
}

module.exports=protected;