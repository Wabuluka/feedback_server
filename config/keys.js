// Figure out what credentials to return
if(process.env.NODE_ENV === 'production'){
    // In production
    module.exports = require('./prod');
}else{
    // Return development
    module.exports = require('./dev');
}