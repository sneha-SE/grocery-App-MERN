import jwt from "jsonwebtoken"


export const sellerLogin = async (req, res) => {
    try{

        const {email, password} = req.body

        if(password == process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL){
            
            const token = jwt.sign({email}, process.env.JWT, {expiresIn: '7d'})

            res.cookie('sellerToken', token, {
                httpOnly: true, 
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })

            return res.json({success:true, message: "logged in"})
        }
        else{
            return res.json({message: "invalid credentials", success:false});
        }
    }
    catch(error){
        console.log(error);
        res.json({message:'internal server error', success: false})
    }
}

export const isSellerAuth = async (req, res) => {
    try{
       return res.json({success:true})
    }
    catch(error) {
        console.log(error);
        res.json({message:'internal server error', success: false})
    }
}

export const sellerLogout = async (req, res) => {
    try{
        res.clearCookies('sellerToken', {
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            samesite: process.env.NODE_ENV === 'production' ? 'none' : 'strick'
        })

        return res.json({message: "logged out", success: true})
    }
    catch(error){
        console.log(error)
        res.json({message: "internal server error", success: false});
        
    }
}