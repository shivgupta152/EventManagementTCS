const express = require('express')
const app = express()
const router = express.Router()
const MongoClient = require('mongodb').MongoClient
const assert = require('assert');
const session =  require('express-session')
const mongoDB = require('mongodb')
const path = require('path')
const fs = require('fs')
const formidable = require('formidable')


const url = 'mongodb+srv://Shivam:Shivam123@cluster0-vry4e.mongodb.net/EventMangementdb?retryWrites=true&w=majority';
const Mongo = new  MongoClient(url,{ useUnifiedTopology: true })
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(express.static(__dirname))
console.log(__dirname)
var customerName = '';
var EventManagerName = '';

router.get('/', function(req, res) {

});

//for login
router.post('/check',function (req,res)  {
    // sess = req.session;
    // sess.userName = req.body.userName
     Mongo.connect( async (err, client) => {
        var db =  await Mongo.db('EventMangementdb')
         var obj = await JSON.parse(JSON.stringify(req.body));

         var query = {Email : obj.userName}
                customerName = obj.userName;
            var a =  await db.collection('loginInfo').find(query).toArray();
            if(a.length <= 0 )
                return res.json({role : 'false'})
            else if(a[0].Password === obj.password) {
                if(a[0].Role === 'Customer')
                    return res.json({role: '/CustomerProfile.html'});
                else if(a[0].Role === 'Admin')
                    return res.json({role: '/adminProfile.html'});
                else if(a[0].Role === 'EM'){
                    EventManagerName = a[0].FirstName+a[0].LastName
                    return res.json({role: '/EventManagerProfile.html'});
            }}
            else
                return res.json({role : 'false'})
    })
})

//For Signup
router.post('/signup',function (req,res) {
    Mongo.connect(function (err,client) {
        var db= Mongo.db('EventMangementdb')
        const user = {
            FirstName:req.body.fname,
            LastName :req.body.lname,
            Email: req.body.email,
            Password: req.body.password,
            Age:req.body.age,
            Gender:req.body.genderSelect,
            DOB: req.body.dob,
            Address:req.body.address,
            Role: "Customer"
        }

        db.collection('loginInfo').insertOne(user,function (err,result) {
            assert.equal(null, err);
            console.log("added")
        })
        res.redirect('/')
    })
})

// Admin Func1
router.get('/getEventManagerList',async (req,res) => {
    const client = await Mongo.connect()
        .catch(err => { console.log(err); });
    if (!client) {
        return;
    }
    var db =  client.db('EventMangementdb')
    var cursor = await db.collection('loginInfo').find({Role:"EM"}).toArray()
    res.send(cursor)
})

//Admin addEM
router.post('/addEventManager',function (req,res) {
    Mongo.connect(function (err,client) {
        var db= Mongo.db('EventMangementdb')
        const user = {
            FirstName:req.body.fname,
            LastName :req.body.lname,
            Email: req.body.email,
            Password: req.body.password,
            Age:req.body.age,
            Gender:req.body.genderSelect,
            DOB: req.body.dob,
            Address:req.body.address,
            Role: "EM"
        }

        db.collection('loginInfo').insertOne(user,function (err,result) {
            assert.equal(null, err);
            console.log("added")
            res.redirect('/adminProfile.html')
        })

    })
})

//Admin delEM
router.post('/delEM',async (req,res) =>{
    const client = await Mongo.connect()
        .catch(err => { console.log(err + "hello"); });
    if (!client) {
        return;
    }
    var obj = await JSON.parse(JSON.stringify(req.body));
    console.log(obj[0])
    var db =  await client.db('EventMangementdb')

        for(var i=0;i<obj.length;++i){
            db.collection('loginInfo').deleteOne({_id : new mongoDB.ObjectID(obj[i])})
        }
    return  res.json({role:'/adminProfile.html'})

})

// Admin updateEM
router.post('/updateEM' ,async (req,res) =>{

    const client = await Mongo.connect()
        .catch(err => { console.log(err + "hello"); });
    if (!client) {
        return;
    }
    var obj = await JSON.parse(JSON.stringify(req.body));
    console.log(obj.val)

    var db =  await client.db('EventMangementdb')
    var cursor = await db.collection('loginInfo').find({_id : new mongoDB.ObjectID(obj.val)}).toArray()
    // console.log(cursor)
   return res.json({array : cursor})

})
router.post('/updateEventManager', async(req,res) =>{
    const client = await Mongo.connect()
        .catch(err => { console.log(err + "hello"); });
    if (!client) {
        return;
    }
    console.log(req.body)
    const user = {
        FirstName:req.body.fnameU,
        LastName :req.body.lnameU,
        Email: req.body.emailU,
        Password: req.body.passwordU,
        Age:req.body.ageU,
        Gender:req.body.genderSelect,
        DOB: req.body.dobU,
        Address:req.body.addressU,
        Role: 'EM'
    }
    var db =  client.db('EventMangementdb')
    db.collection('loginInfo').findOneAndReplace({_id : new mongoDB.ObjectID(req.body.IdHidden)} , user)
    res.redirect('/adminProfile.html')



})

//Admin addEvent
router.post('/AddEvent', async (req,res) => {

    Mongo.connect(function (err, client) {
        var db = Mongo.db('EventMangementdb')

        let form = new formidable.IncomingForm();
        form.keepExtensions = true;

        form.parse(req, (err, fields, file) => {
            if (err) {
                return res.status(400).json({
                    error: "problem with image"
                })
            }
            const {EventName, PricePerGuest,Location,MaxGuest,Description} = fields
            var oldPath = file.files.path;
            var newPath = path.join('Images')
                + '/' + file.files.name
            var rawData = fs.readFileSync(oldPath)
            fs.writeFile(newPath, rawData, function (err) {
                if (err) console.log(err)
                const user = {
                    EventName: EventName,
                    PricePerGuest: PricePerGuest,
                    Images: newPath,
                    MaxGuest: MaxGuest,
                    Location: Location,
                    Description: Description
                }
                db.collection('EventList').insertOne(user, function (err, result) {
                    assert.equal(null, err);
                    console.log("added")
                    res.redirect('/adminProfile.html')
                })

                // destructure the fields

                // if(!name || !description || !price || !category || !stock){
                //     return res.status(400).json({
                //         error: "Please include all fields"
                //     })
                // }
            })
        })
    })
})

//Admin delEvent
router.post('/delEvent',async (req,res) =>{
    const client = await Mongo.connect()
        .catch(err => { console.log(err); });
    if (!client) {
        return;
    }
    var obj = await JSON.parse(JSON.stringify(req.body));
    console.log(obj[0])
    var db =  await client.db('EventMangementdb')

    for(var i=0;i<obj.length;++i){
        db.collection('EventList').deleteOne({_id : new mongoDB.ObjectID(obj[i])})
    }
    return  res.json({role:'/adminProfile.html'})

})

//Admin updateEvent
router.post('/updateEvent' ,async (req,res) =>{

    const client = await Mongo.connect()
        .catch(err => { console.log(err + "hello"); });
    if (!client) {
        return;
    }
    var obj = await JSON.parse(JSON.stringify(req.body));
    console.log(obj.val)

    var db =  await client.db('EventMangementdb')
    var cursor = await db.collection('EventList').find({_id : new mongoDB.ObjectID(obj.val)}).toArray()
    // console.log(cursor)
    return res.json({array : cursor})

})
router.post('/updateEventShow', async(req,res) =>{
    Mongo.connect(function (err, client) {
        var db = Mongo.db('EventMangementdb')

        let form = new formidable.IncomingForm();
        form.keepExtensions = true;

        form.parse(req, (err, fields, file) => {
            if (err) {
                return res.status(400).json({
                    error: "problem with image"
                })
            }
            const {EventNameU, PricePerGuestU,LocationU,MaxGuestU,DescriptionU,IdHidden1} = fields
            console.log(oldPath)
            var oldPath = file.filesU.path;
            var newPath = path.join('Images')
                + '/' + file.filesU.name
            var rawData = fs.readFileSync(oldPath)
            console.log(newPath)
            fs.writeFile(newPath, rawData, function (err) {
                if (err) console.log(err)
                const user = {
                    EventName: EventNameU,
                    PricePerGuest: PricePerGuestU,
                    Images: newPath,
                    MaxGuest: MaxGuestU,
                    Location: LocationU,
                    Description: DescriptionU
                }
                db.collection('EventList').findOneAndReplace({_id : new mongoDB.ObjectID(IdHidden1)} ,user )
                    res.redirect('/adminProfile.html')
                })

                // destructure the fields

                // if(!name || !description || !price || !category || !stock){
                //     return res.status(400).json({
                //         error: "Please include all fields"
                //     })
                // }
            })
        })

})

//Admin showCarousel
router.get('/getCarouselImages' ,async(req,res)=> {
    const client = await Mongo.connect()
        .catch(err => { console.log(err + "hello"); });
    if (!client) {
        return;
    }
    var db =  await client.db('EventMangementdb')
    var cursor = await db.collection('CarouselImages').find({}).toArray()
    res.send(cursor)

})

router.post('/updateCaro' , async (req,res)=>{
    const client = await Mongo.connect()
        .catch(err => { console.log(err + "hello"); });
    if (!client) {
        return;
    }
    var obj = await JSON.parse(JSON.stringify(req.body));
    console.log(obj.val)

    var db =  await client.db('EventMangementdb')
    var cursor = await db.collection('CarouselImages').find({_id : new mongoDB.ObjectID(obj.val)}).toArray()
    // console.log(cursor)
    return res.json({array : cursor})

})
router.post('/updateCarolShow', async(req,res) =>{
    Mongo.connect(function (err, client) {
        var db = Mongo.db('EventMangementdb')

        let form = new formidable.IncomingForm();
        form.keepExtensions = true;

        form.parse(req, (err, fields, file) => {
            if (err) {
                return res.status(400).json({
                    error: "problem with image"
                })
            }
            const {SlideNo,IdHidden2} = fields
            console.log(oldPath)
            var oldPath = file.CaroImage.path;
            var newPath = path.join('Images')
                + '/' + file.CaroImage.name
            var rawData = fs.readFileSync(oldPath)
            console.log(newPath)
            fs.writeFile(newPath, rawData, function (err) {
                if (err) console.log(err)
                const user = {
                    SlideNo: SlideNo,
                    Images: newPath
                }
                db.collection('CarouselImages').findOneAndReplace({_id : new mongoDB.ObjectID(IdHidden2)} ,user )
                res.redirect('/adminProfile.html')
            })

            // destructure the fields

            // if(!name || !description || !price || !category || !stock){
            //     return res.status(400).json({
            //         error: "Please include all fields"
            //     })
            // }
        })
    })

})
//EM Func1
router.get('/getBookedEventsList' , async(req,res) =>{
    const client = await Mongo.connect()
        .catch(err => { console.log(err); });
    if (!client) {
        return;
    }
    var db =  client.db('EventMangementdb')
    var cursor = await db.collection('BookEventList').find({EventManager: EventManagerName}).toArray()
    res.send(cursor)
})

//EM Func2
router.get('/getFullEnqList',async (req,res)=>{
    const client = await Mongo.connect()
        .catch(err => { console.log(err); });
    if (!client) {
        return;
    }
    var db =  client.db('EventMangementdb')
    var cursor = await db.collection('CustomerEnquiry').find({}).toArray()
    res.send(cursor)

})

//Customer Func1.1
router.get('/getBookedEvents' ,async(req,res)=>{
    const client = await Mongo.connect()
        .catch(err => { console.log(err); });
    if (!client) {
        return;
    }
    var db =  client.db('EventMangementdb')
    var cursor = await db.collection('BookEventList').find({CustomerUserName: customerName}).toArray()
    res.send(cursor)

})

router.get('/getBookedEventsAdmin' ,async(req,res)=>{
    const client = await Mongo.connect()
        .catch(err => { console.log(err); });
    if (!client) {
        return;
    }
    var db =  client.db('EventMangementdb')
    var cursor = await db.collection('BookEventList').find({}).toArray()
    res.send(cursor)

})

//Customer Func1.2
router.post('/bookEvent',async (req,res) =>{

    const client = await Mongo.connect()
        .catch(err => { console.log(err); });
    if (!client) {
        return;
    }
    var db =  client.db('EventMangementdb')

    const Event = {
        CustomerUserName: customerName,
        EventName: req.body.EventName,
        EventManager:req.body.EventManager,
        EventDate:req.body.EventDate,
        EventTime:req.body.EventTime,
        Guest: req.body.GuestNo
    }


        db.collection('BookEventList').insertOne(Event,function (err,result) {
        assert.equal(null, err);
        console.log("added")
        res.redirect('/CustomerProfile.html')
    })


})

// Customer Func 1.3
router.get('/getEventList' ,async(req,res)=>{
    const client = await Mongo.connect()
        .catch(err => { console.log(err); });
    if (!client) {
        return;
    }
    var db =  client.db('EventMangementdb')
    var cursor = await db.collection('EventList').find({}).toArray()
    res.send(cursor)

})

//Customer,EM , Admin Func2(ProfileInfo)
router.get('/CustomerProfileInfo',async  (req,res) =>{
    const client = await Mongo.connect()
        .catch(err => { console.log(err); });
    if (!client) {
        return;
    }
    var db =  client.db('EventMangementdb')
    var cursor = await db.collection('loginInfo').find({Email : customerName}).toArray()
    res.send(cursor)
})
//Customer,EM, Admin Update func
router.post('/updateCustomerInfo',async (req,res) =>{

    Mongo.connect(function (err,client) {
        var db= Mongo.db('EventMangementdb')
        console.log(req.body.idHidden)
        const user = {
            FirstName:req.body.fname,
            LastName :req.body.lname,
            Email: req.body.email,
            Password: req.body.password,
            Age:req.body.age,
            Gender:req.body.genderSelect,
            DOB: req.body.dob,
            Address:req.body.address,
            Role: "Customer"
        }

        db.collection('loginInfo').findOneAndReplace( {_id : new mongoDB.ObjectID(req.body.idHidden)},user)
        res.redirect('/CustomerProfile.html')
    })

})
router.post('/updateEMInfo',async (req,res) =>{

    Mongo.connect(function (err,client) {
        var db= Mongo.db('EventMangementdb')
        console.log(req.body.idHidden)
        const user = {
            FirstName:req.body.fname,
            LastName :req.body.lname,
            Email: req.body.email,
            Password: req.body.password,
            Age:req.body.age,
            Gender:req.body.genderSelect,
            DOB: req.body.dob,
            Address:req.body.address,
            Role: "EM"
        }

        db.collection('loginInfo').findOneAndReplace( {_id : new mongoDB.ObjectID(req.body.idHidden)},user)
        res.redirect('EventManagerProfile.html')
    })

})
router.post('/updateAdminInfo',async (req,res) =>{

    Mongo.connect(function (err,client) {
        var db= Mongo.db('EventMangementdb')
        console.log(req.body.idHidden)
        const user = {
            FirstName:req.body.fname,
            LastName :req.body.lname,
            Email: req.body.email,
            Password: req.body.password,
            Age:req.body.age,
            Gender:req.body.genderSelect,
            DOB: req.body.dob,
            Address:req.body.address,
            Role: "Admin"
        }

        db.collection('loginInfo').findOneAndReplace( {_id : new mongoDB.ObjectID(req.body.idHidden)},user)
        res.redirect('adminProfile.html')
    })

})
//Customer Func3.1
router.get('/getEnqList',async (req,res)=>{
    const client = await Mongo.connect()
        .catch(err => { console.log(err); });
    if (!client) {
        return;
    }
    var db =  client.db('EventMangementdb')
    var cursor = await db.collection('CustomerEnquiry').find({CustomerName: customerName}).toArray()
    res.send(cursor)

})

//Customer Func3.2
router.post('/CustomerEnquiry',async (req,res) => {
    const client = await Mongo.connect()
        .catch(err => { console.log(err); });
    if (!client) {
        return;
    }
    var db =  client.db('EventMangementdb')
    const Enquiry = {
        CustomerName: customerName,
        Subject: req.body.Subject,
        Enquiry: req.body.CustomerEnq,
        Status: "Pending",
        Answer: "No Reply Till Yet"
    }

    db.collection('CustomerEnquiry').insertOne(Enquiry,function (err,result) {
        assert.equal(null, err);
        res.redirect('/CustomerProfile.html')
    })
})

router.post('/enqReplyEM' ,async(req,res)=>{

    const client = await Mongo.connect()
        .catch(err => { console.log(err); });
    if (!client) {
        return;
    }
    var db =  client.db('EventMangementdb')

    console.log(req.body + req.body.HiddenIdReply +" " + req.body.enqAns)

    db.collection('CustomerEnquiry').updateOne({_id : new mongoDB.ObjectID(req.body.HiddenIdReply)},{$set: {Status:"Replied", Answer: req.body.enqAns}})
    res.redirect('/EventManagerProfile.html')
})

router.post('/enqReplyAdmin' ,async(req,res)=>{

    const client = await Mongo.connect()
        .catch(err => { console.log(err); });
    if (!client) {
        return;
    }
    var db =  client.db('EventMangementdb')

    console.log(req.body + req.body.HiddenIdReply +" " + req.body.enqAns)

    db.collection('CustomerEnquiry').updateOne({_id : new mongoDB.ObjectID(req.body.HiddenIdReply)},{$set: {Status:"Replied", Answer: req.body.enqAns}})
    res.redirect('/adminProfile.html')
})







app.use('/',router)

app.set( 'port', ( process.env.PORT || 5000 ));
// Start node server
app.listen( app.get( 'port' ), function() {
    console.log( 'Node server running on port http://localhost:' + app.get( 'port' ));
});
