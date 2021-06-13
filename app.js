
var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');

var session = require('express-session');
var cookieParser = require('cookie-parser');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
}));


// -------------- all get requests ------------------------///
app.get('/', function(req, res){
  res.render('login', {message:""})
});
app.get('/registration', function(req, res){
  res.render('registration',{message:""})
});
app.get('/dune', function(req, res){
  res.render('dune',{message:""})
});
app.get('/fiction', function(req, res){
  res.render('fiction')
});
app.get('/flies', function(req, res){
  res.render('flies',{message:""})
});
app.get('/grapes', function(req, res){
  res.render('grapes',{message:""})
});
app.get('/home', function(req, res){
  res.render('home')
});
app.get('/leaves', function(req, res){
  res.render('leaves',{message:""})
});
app.get('/mockingbird', function(req, res){
  res.render('mockingbird',{message:""})
});
app.get('/novel', function(req, res){
  res.render('novel')
});
app.get('/poetry', function(req, res){
  res.render('poetry')
});


app.get('/searchresults', function(req, res){
  res.render('searchresults')
});
app.get('/sun', function(req, res){
  res.render('sun',{message:""})
});

//-----------------Post requests ---------------------//

var allaccounts = new Array();
try{
  var data =fs.readFileSync("users.json");
  allaccounts = JSON.parse(data)
}
catch(error){
}

const allbooksejs= ["dune","flies","grapes","leaves","mockingbird","sun"];
const allbooks= ["Dune","Lord of the Flies","The Grapes of Wrath","Leaves of Grass","To Kill a Mockingbird","The Sun and Her Flowers"];

app.get('/readlist', function(req, res){

  var readlistlink = new Array();
  var readlistname = new Array();
  for(var i=0; i<allaccounts.length ; i++){
    if(allaccounts[i].username==req.session.usernamesession){
       readlistlink = allaccounts[i].wishlist;

       for(var k=0; k<allbooksejs.length ; k++){  

        for(var j=0 ; j<readlistlink.length; j++){
          if(readlistlink[j]==allbooksejs[k]){
          readlistname.push(allbooks[k]);
          }
        }
      }
      res.render('readlist',{readlistlink,readlistname})

    }

  }    
  
});



app.post('/register', function(req,res){

  var flag=false;
  var readlist = new Array();
  var account = {username: req.body.username, password: req.body.password, wishlist: readlist};
  for(var i=0 ; i<allaccounts.length ; i++){
    if(account.username==allaccounts[i].username){
      res.render('registration', {message:"This username is already registered before!"});
      flag=true;
      break;
    }
  }
  if(flag==false){ //username available
    allaccounts.push(account);
    var x = JSON.stringify(allaccounts)
    fs.writeFileSync("users.json",x);

    //here
    req.session.usernamesession= account.username;

    res.redirect('home');
    
  }

})

app.post('/',function(req,res){
  var account = {username: req.body.username, password: req.body.password};
  var flag=false;
  for(var i=0; i<allaccounts.length ; i++){
    if(account.username==allaccounts[i].username){
      flag=true;
      if(account.password==allaccounts[i].password){

     //here
      req.session.usernamesession= account.username;

      res.redirect('home');
 
      }
      else
      res.render('login', {message:"Wrong password!"});
      break;
    }
  }
  if(flag==false){
    res.render('login', {message:"This username does not exist!"});
  }

})
app.post('/search',function(req,res){
  const searchedpage=[];
  const searchedbook=[];
  for( var i=0;i<allbooks.length;i++){
   if(allbooks[i].toString().toLowerCase().includes(req.body.Search.toString().toLowerCase())){
    searchedbook.push(allbooks[i])
    searchedpage.push(allbooksejs[i])
   }

  }
  if(searchedpage.length!=0)
  res.render('searchresults',{searchedpage,searchedbook,message:""});
  else{
    res.render('searchresults',{searchedpage,searchedbook,message:"We Do Not Have This Book In Stock"});
  }
})

app.post('/dune',function(req,res){
  
  for(var i=0; i<allaccounts.length ; i++){
    if(allaccounts[i].username==req.session.usernamesession){
      var bookalreadythere =false;
      for(var j=0 ; j<allaccounts[i].wishlist.length ;j++){
        if(allaccounts[i].wishlist[j]=='dune')
        bookalreadythere=true;
      }
      if(bookalreadythere==false){
        allaccounts[i].wishlist.push('dune');
        var x = JSON.stringify(allaccounts)
      fs.writeFileSync("users.json",x);
      res.render('dune',{message:'book added to readlist'})
      }
      else{
        res.render('dune',{message:'This book is already in your wishlist'})
      }
    }
  }
})

app.post('/flies',function(req,res){
  
  for(var i=0; i<allaccounts.length ; i++){
    if(allaccounts[i].username==req.session.usernamesession){
      var bookalreadythere =false;
      for(var j=0 ; j<allaccounts[i].wishlist.length ;j++){
        if(allaccounts[i].wishlist[j]=='flies')
        bookalreadythere=true;
      }
      if(bookalreadythere==false){
        allaccounts[i].wishlist.push('flies');
        var x = JSON.stringify(allaccounts)
      fs.writeFileSync("users.json",x);
      res.render('flies',{message:'book added to readlist'})
      }
      else{
        res.render('flies',{message:'This book is already in your wishlist'})
      }
    }
  }
})

app.post('/grapes',function(req,res){
  
  for(var i=0; i<allaccounts.length ; i++){
    if(allaccounts[i].username==req.session.usernamesession){
      var bookalreadythere =false;
      for(var j=0 ; j<allaccounts[i].wishlist.length ;j++){
        if(allaccounts[i].wishlist[j]=='grapes')
        bookalreadythere=true;
      }
      if(bookalreadythere==false){
        allaccounts[i].wishlist.push('grapes');
        var x = JSON.stringify(allaccounts)
      fs.writeFileSync("users.json",x);
      res.render('grapes',{message:'book added to readlist'})
      }
      else{
        res.render('grapes',{message:'This book is already in your wishlist'})
      }
    }
  }
})

app.post('/leaves',function(req,res){
  
  for(var i=0; i<allaccounts.length ; i++){
    if(allaccounts[i].username==req.session.usernamesession){
      var bookalreadythere =false;
      for(var j=0 ; j<allaccounts[i].wishlist.length ;j++){
        if(allaccounts[i].wishlist[j]=='leaves')
        bookalreadythere=true;
      }
      if(bookalreadythere==false){
        allaccounts[i].wishlist.push('leaves');
        var x = JSON.stringify(allaccounts)
      fs.writeFileSync("users.json",x);
      res.render('leaves',{message:'book added to readlist'})
      }
      else{
        res.render('leaves',{message:'This book is already in your wishlist'})
      }
    }
  }
})

app.post('/mockingbird',function(req,res){
  
  for(var i=0; i<allaccounts.length ; i++){
    if(allaccounts[i].username==req.session.usernamesession){
      var bookalreadythere =false;
      for(var j=0 ; j<allaccounts[i].wishlist.length ;j++){
        if(allaccounts[i].wishlist[j]=='mockingbird')
        bookalreadythere=true;
      }
      if(bookalreadythere==false){
        allaccounts[i].wishlist.push('mockingbird');
        var x = JSON.stringify(allaccounts)
      fs.writeFileSync("users.json",x);
      res.render('mockingbird',{message:'book added to readlist'})
      }
      else{
        res.render('mockingbird',{message:'This book is already in your wishlist'})
      }
    }
  }
})

app.post('/sun',function(req,res){
  
  for(var i=0; i<allaccounts.length ; i++){
    if(allaccounts[i].username==req.session.usernamesession){
      var bookalreadythere =false;
      for(var j=0 ; j<allaccounts[i].wishlist.length ;j++){
        if(allaccounts[i].wishlist[j]=='sun')
        bookalreadythere=true;
      }
      if(bookalreadythere==false){
        allaccounts[i].wishlist.push('sun');
        var x = JSON.stringify(allaccounts)
      fs.writeFileSync("users.json",x);
      res.render('sun',{message:'book added to readlist'})
      }
      else{
        res.render('sun',{message:'This book is already in your wishlist'})
      }
    }
  }
})






//----------------------------------------------------//




if(process.env.PORT){
  app.listen(process.env.PORT,function() {console.log('Server started')});
}
else{
  app.listen(3000,function(){console.log('server started on port 3000')});
}


