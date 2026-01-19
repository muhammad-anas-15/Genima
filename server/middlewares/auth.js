import jwt from 'jsonwebtoken'

const userAuth = async(req , res , next)=>{
    const {token} = req.headers

    if(!token){
        return res.json({success: false , message : "Not Authorized Login Again"})
    }

    try {
        const tokenDecode = jwt.verify(token , process.env.JWT_SECRET);

         // now using this decoded token we will find the id.
			
		if(tokenDecode.id){

		// This line ensures req.body exists before adding userId to it
            req.body = req.body || {}; 
            req.body.userId = tokenDecode.id;
		}
		else // if the id is not available 
		{
			return res.json({success : false , message : 'Not Authorized Login Again'})
		}

		// now we will call next method that will execute the controller function.
		next();

    } catch (error) {
        res.json({success : false , message : error.message});
    }
}
export default userAuth