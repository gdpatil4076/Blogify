
const {ValidToken} = require('../service/authentication')

 function CheckForAuthentication(cookieName){
    
    return async (req,res,next)=>{

        const cookieValue = req.cookies[cookieName];

        if (!cookieValue) return next();


        try{
            const user = await ValidToken(cookieValue);
            // console.log("Middleware Here user => ",user);
            req.user = user; 
        }catch(error){}

        return next();
    }
}

module.exports = {
    CheckForAuthentication
}