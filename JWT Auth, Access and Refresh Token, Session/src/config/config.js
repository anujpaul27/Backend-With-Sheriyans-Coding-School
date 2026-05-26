require('dotenv').config()

if (!process.env.MONGODB_URI)
{
    throw new Error("MONGODB_URI not define in your env file ")
}

const config = 
{
    MONGODB_URI : process.env.MONGODB_URI,
}

module.exports = config