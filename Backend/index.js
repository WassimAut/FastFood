const API_URL=require('./config');
const port = 5000;
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require('path');
const cors = require("cors");
const jwt =require('jsonwebtoken');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use("/images", express.static("upload/images"));

//Database Connection
mongoose.connect(process.env.MONGODB_URI);
app.get("/",(req,res)=>{
    res.send("Welcome in fast food app");
})

// Shema for Creating Products
const Messages = mongoose.model("Messages",{
    name: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    message:{
        type:String,
        required:true
    },

    date: {
        type: Date,
        default: Date.now
    }
})

const Training = mongoose.model("Training",{
    id: {
        type:Number,
        required: true
    },
    name: {
        type:String,
        required: true
    },
    size:{
        type:Number,
        required:true
    }
})
const AvailableProducts = mongoose.model("AvailableProducts", {
    id: {
        type: Number,
        required: true,
    },

    category: {
        type: String,
        required: true,
    },

    image:{
        type:String,
        required:true
    }
    ,

    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    }
    

})

const Foodorders = mongoose.model("Foodorders", {
    order_details:{
        type:Object,
        reuired:true
    },

    
    date:{
        type: Date,
        default: Date.now
    }})

const Peoplewho_ordered = mongoose.model("Peoplewho_ordered", {
    Person_name: {
        type: String,
        required: true,
    },

    spent_amount: {
        type: Number,
        required: true,
    },


    date: {
        type: Date,
        default: Date.now
    },

    coupon:{
        type:Boolean,
        default:false,
    }
});

const Revenue = mongoose.model("Revenue", {
    
    date: {
        type: Date,
        default: Date.now
    },

    Total:{
        type: Number,
        required: true
    }
})

const Users = mongoose.model("Users",{
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })

app.post("/upload", upload.single('product'), (req, res) => {
    console.log("upload has been done")
    res.json({
        success: 1,
        image_url: `${API_URL}/images/${req.file.filename}`
    })
})

app.post("/training",async(req,res)=>{
    

    // await Training.deleteOne({name:"ahmed"})
    // await Training.updateOne({name:"wassim"},{$inc:{id:5}})

    // let current_data = await Training.find({})
    // let current_data = await Training.aggregate([
    //     {
    //         // $group:{_id:"$name",totalsizes:{$sum:"$size"}}
    //         // $group:{_id:"$name",totalsizes:"$id"}
    //         $project:{id:1}
    //     },
    //     {
    //         $sort:{id:-1}
    //    }
// ]
    // await Foodorders.insertMany([{product_id:25,category:"Burger",size:3},{product_id:35,category:"Sandwich",size:4}
    // ,{product_id:35,category:"Pizza",size:1},{product_id:2,category:"Pizza",size:2}])
    // await Foodorders.updateMany({ category: "sandwich" }, { $set: { category: "Sandwich" } })
    // let current_data = await Peoplewho_ordered.find({});
    // let startdate = new Date(req.body.startdate);
    // let enddate = new Date(req.body.enddate);
    // let consumers = await Peoplewho_ordered.aggregate([
    //     {
    //         $match:{date:{$gte:startdate,$lte:enddate}}
    // }])
    // console.log(new Date("2024-02-03"));
    // let query = req.query.type;
    // let data=[{Total:200},{Total:350},{Total:250},{Total:80}];
    // await Revenue.insertMany(data)

    let response = await Foodorders.aggregate([
        // {$addFields:{
        //     totalitems:{$sum:["$order_details.Pizza","$order_details.Burger,$order_details.Sandwich"]}
        // }}

        {$addFields:{
          embededdocument:{$objectToArray:"$order_details"}
        }},
        {$unwind:"$embededdocument"},
        {$group:{_id:"$embededdocument.k",total:{$sum:"$embededdocument.v"}}}


        // {
        //     $unwind:"$embededdocument"
        // }


    ])

    let data= await Foodorders.find({})
     
    res.json(response);
})
app.get("/availableproduct",async(req,res)=>{
    let all_product = await AvailableProducts.find({});
    console.log("availableproduct has been clicked");
    res.json({success:true,data:all_product});
})


app.post("/addproduct",upload.single("product"),async(req,res)=>{
    let allproduct = await AvailableProducts.aggregate([
        {
        $group:{_id:"$id",}
        },

        {
            $sort: {
              "_id": -1
        }}

    ])
    console.log(allproduct);
    let ID = allproduct[0]._id + 1;
    
    


    let product = new AvailableProducts({
    id : ID,
    category : req.body.category,
    name: req.body.name,
    image:req.body.image,
    price:req.body.price
    })

    await product.save();
    res.json({success:true})
})

app.post("/deletproduct",async(req,res)=>{
    await AvailableProducts.deleteOne({id:req.body.id});
    console.log("deleteproduct has been clicked");
    res.json({success:1})
})

const CheckAuthenticatedUser=(req,res,next)=>{
   let token= req.header("auth-token");
   if(!token){
    return res.status(401).send({errors:"please authenticated using a valid token"})
   }

   jwt.verify(token,process.env.Secret_Key,(err,decode)=>{
    if(err){
        return res.status(401).send("please authenticate using a valid token");
    }
    else{
        console.log(decode);
    }
   })
   
   next()
}
app.post("/submitorder",CheckAuthenticatedUser,async(req,res)=>{

    const order = new Foodorders({
        order_details:req.body.order_details
    })

    const Personal_data = new Peoplewho_ordered({
        Person_name:req.body.order_issuer,
        spent_amount:req.body.amount,
        coupon:req.body.coupon
    })

    const revenue = new Revenue({
        Total:req.body.amount
    })

    // console.log(order);
    // console.log(Personal_data)
    // console.log(revenue);
    
    await order.save();
    await Personal_data.save();
    await revenue.save();
    res.json({success:true})

})

app.post("/totalrevenue",async(req,res)=>{
    let query = req.query.type;
    let Alloperations;
    const startdate = new Date(req.body.startdate);
    const enddate = new Date(req.body.enddate);
    enddate.setHours(23, 59, 59, 999);
    if(query==="overview"){
        Alloperations = await Revenue.aggregate([
        {$match:{date:{$gte:startdate,$lte:enddate}}}
        ,
        {$group:{
            _id:null,totalrevune:{$sum:"$Total"}
        }}
    ])}

    else{
        Alloperations = await Revenue.aggregate([
            {$match:{date:{$gte:startdate,$lte:enddate}}}
            ,
            {$project: {
                dateFormatted: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                Total:1
              }},
            {$group:{
                _id:"$dateFormatted",totalrevenue:{$sum:"$Total"}
            }},
            {
                $sort:{_id:1}
            }

    ])}

    
    
   
    if(Alloperations.length>0){
       if(query==="overview"){
        res.json({data:Alloperations[0]["totalrevune"]})
       }
       else{
        console.log("data query from chart")
        console.log(Alloperations);
        res.json(Alloperations);
        
       }
       
    }

    else{
        if(query ==="overview"){
           res.json({data:0})
        }
        else{
            res.json([
                { _id: 'xxxxx', totalrevenue: 0 },
                { _id: 'xxxxx', totalrevenue: 0 },
                { _id: 'xxxxx', totalrevenue: 0 }])
        }
        
    }
    
})




app.post("/mostsold" ,async(req,res)=>{
    let startdate = new Date(req.body.startdate);
    let enddate = new Date(req.body.enddate);
    enddate.setHours(23, 59, 59, 999);
    let soldItems = await Foodorders.aggregate([
        {$match:{
            date:{$gte:startdate,$lte:enddate}
        }},
        {$addFields:{
            order_detailsArray:{$objectToArray:"$order_details"}
        }},

        {$unwind:"$order_detailsArray"},


        {
            $group: {
                _id: "$order_detailsArray.k",
                totalAmount: { $sum: "$order_detailsArray.v" }
            }
        },

        {
            $sort: { totalAmount: -1 }
        },

        {
            $limit: 1
        }
    ]);


  
  console.log(soldItems)
  if(soldItems.length>0){
    res.json({data:soldItems[0]["_id"]})
  }

  else{
    res.json({data:"None"})
  }

  
})

app.post("/salesdata",async(req,res)=>{
    let startdate = new Date(req.body.startdate);
    let enddate = new Date(req.body.enddate);
    enddate.setHours(23, 59, 59, 999);
    let soldItems = await Foodorders.aggregate([
        {
            $match: {
              date: { $gte: startdate, $lte: enddate }  
            }
          },
        
        {$addFields:{
            order_detailsArray:{$objectToArray:"$order_details"}
        }},

        {$unwind:"$order_detailsArray"},


        {
            $group: {
                _id: "$order_detailsArray.k",
                totalAmount: { $sum: "$order_detailsArray.v" }
            }
        },
        
        
    ]);
    // console.log("this is data for barchart ",soldItems)
    if(soldItems.length>0){
        res.json(soldItems)
    }
    else{
      res.json([{ _id: 'Sandwich', totalAmount: 0 },
      { _id: 'Burger', totalAmount: 0 },
      { _id: 'Pizza', totalAmount: 0 }])  
    }
    
})
app.get("/latesttransactions",async(req,res)=>{
    // let startdate =new Date(req.body.startdate);
    // let enddate = new Date(req.body.enddate);
    let Transactions = await Revenue.aggregate([
    //     {
    //     $match:{date:{$gte:startdate,$lte:enddate}}
    // },

    {$project:{
        Total:1,
        _id:0,
        date:1
    }},

    {$sort:{date:-1}},

    {$project:{
        Total:1,
        
    }},
    {
     $limit:5
    }
    // ,{
    //     $group:{
    //         _id:null,Total:{"$Total"}
    //     }
    // }
])
    console.log(Transactions[0]);
    if(Transactions.length>0){
        return res.json(Transactions);
    }

    res.json([{Total:0},{Total:0},{Total:0}])
    

})

app.post("/totalitemsold",async(req,res)=>{
    let startdate =new Date(req.body.startdate);
    let enddate = new Date(req.body.enddate);
    enddate.setHours(23, 59, 59, 999);
    let Totalitemsold = await Foodorders.aggregate([
        {$match:{date:{$gte:startdate,$lte:enddate}}},

        {$addFields:{
            order_detailsArray:{$objectToArray:"$order_details"}
        }},

        {$unwind:"$order_detailsArray"
        },

        {$group:{
            _id:null,
            totalsold:{$sum:"$order_detailsArray.v"}
        }},

    ])
    if(Totalitemsold.length>0){
       console.log("the new version of",Totalitemsold)
       let total = Totalitemsold[0].totalsold;
       res.json({data:total});
    
    }

    else{
       res.json({data:0}); 
    }
    
    
})
app.post("/bestconsumer",async(req,res)=>{
    let startdate = new Date(req.body.startdate);
    let enddate = new Date(req.body.enddate);
    enddate.setHours(23, 59, 59, 999);
    let consumers = await Peoplewho_ordered.aggregate([
        {
            $match:{date:{$gte:startdate,$lte:enddate}}},
        
        {
            $group: {
                _id:"$Person_name",
                totalAmount: {$sum:"$spent_amount"}
            }

        },
        {
            $sort: { totalAmount: -1 }
        },
        {
            $limit:3
        }
    ]

    )
    console.log("the consumers are",consumers)
    if (consumers.length>0){
        if(consumers.length === 1){
            res.json({first:consumers[0],second:{ _id: 'None', totalAmount: 0},third:{ _id: 'None', totalAmount: 0}})
        }
        else if(consumers.length === 2)
        res.json({first:consumers[0],second:consumers[1],third:{ _id: 'None', totalAmount: 0}});

        else{
        res.json({first:consumers[0],second:consumers[1],third:consumers[2]})
       }
    }

    else{
        res.json(NaN)
    }
})

app.post("/signup",async(req,res)=>{
    let Check = await Users.find({email:req.body.email});
    if(Check.length>0){
        return res.status(400).json({success:false,error:"This email has already been used"})
    }

    let Newuser = new Users({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    })

    let token = jwt.sign({data:{
        id:Newuser.id
        
    }},process.env.Secret_Key)

    await Newuser.save()
    res.json({success:true,token,username:req.body.username})
})

app.post("/login",async(req,res)=>{
    let user = await Users.find({email:req.body.email})
    
    if(user.length>0){
        
        if(user[0].password === req.body.password){
            let token =jwt.sign({data:{id:user[0]._id}},process.env.Secret_Key)
            res.json({success:true,token:token,username:user[0].username})
        }
        else{
            res.json({success:false,error:"Wrong Password"})
        }
    }

    else{
        res.json({success:false,error:"Invalid User"})
    }
})

app.post("/sendmessage", async(req,res)=>{
    let message = new Messages({
        
        name: req.body.name,
        message:req.body.message,
        email:req.body.email
})

    await message.save();
    res.json({success:true});
})


app.listen(port, (error) => {
    if (!error) {
        console.log("Server is Running on Port " + port);
    }
    else {
        console.log("Erro" + error);
    }
})
