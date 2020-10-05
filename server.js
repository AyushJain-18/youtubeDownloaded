const express  =   require('express');
const ytdl     =   require('ytdl-core');
const cors     =   require('cors');
const path     =   require('path');
const favIcon  =   require('serve-favicon');
const logger   =   require('morgan');
let minify     =   require('express-minify');
let compression = require('compression')
let uglifyEs    = require('uglify-es');


const app      =  express();
const port = process.env.PORT || 4000;

// middlewares
app.use(cors());
app.use(logger('dev'));
app.use(compression())
app.use(minify({
    uglifyJsModule: uglifyEs,
    cache: false,
    uglifyJsModule: null,
    errorHandler: null,
    jsMatch: /javascript/,
    cssMatch: /css/,
    jsonMatch: /json/,
    sassMatch: /scss/,
    lessMatch: /less/,
    stylusMatch: /stylus/,
    coffeeScriptMatch: /coffeescript/,
  }));

// static files
app.use('/static',express.static('public'));


//application routes
app.get('/', (req,res)=>{
    console.log('loaded');
    if(req.query && req.query.error){
        res.sendFile(path.join(__dirname,'client','error.html'));
    }else{
        res.sendFile(path.join(__dirname,'client','home.html'));
    }
});



app.get('/download', async (req,res)=>{
      let filename = 'video.mp4'
       let url =  req.query.URL;
        // Content-Disposition is ued to define what kind of response we sendig back
        // inline html , attachment 
    try{
        res.header('Content-Disposition', `attachment; filename=${filename}`);
        let a = await ytdl(url, { format: '720p' }).pipe(res);
    } catch(error){
            let errorMessage = encodeURIComponent(error.message);
            res.header('Content-Disposition', `inline;`);
            res.set('Content-Type', 'text/html');
            res.statusCode = 400;
            res.redirect(`/?error=${errorMessage}`);  
            //res.send(new Buffer.from('<h2>Errosr Occured </h2>'));
    }
});

app.listen(port, ()=>console.log('app is running on port no', port))