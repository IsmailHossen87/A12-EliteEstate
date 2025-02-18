require("dotenv").config();
const admin = require("firebase-admin");
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const firebaseAdminAccount = require("./assignment12-568f7-firebase-adminsdk-r7g25-b4357fd757.json");
// delete user form firebase
admin.initializeApp({
  credential: admin.credential.cert(firebaseAdminAccount),
  databaseURL: process.env.REAL_TIME,
});

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "https://assignment12-568f7.web.app",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hg2ad.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const userCollecton = client.db("EliteEstate").collection("user");
    const sellerCollection = client.db("EliteEstate").collection("items");
    const wishListCollection = client.db("EliteEstate").collection("wishList");
    const offerCollection = client.db("EliteEstate").collection("offer");
    const reviewCollection = client.db("EliteEstate").collection("review");
    const paymentCollection = client.db("EliteEstate").collection("payment");
    // JWT TOKEN POST
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "2hr",
      });
      res.send({ token });
    });
    // verify token
    const verifyToken = (req, res, next) => {
      if (!req.headers.authorization) {
        return res.status(401).send({ message: "UnAuthorize Acess" });
      }
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(401).send({ message: "UnAuthorize Acess" });
      }
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "UnAuthorize Acess" });
        }
        req.decoded = decoded;
        next();
      });
    };

    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await userCollecton.findOne(query);
      const isAdmin = user?.role === "admin";
      if (!isAdmin) {
        return res.status(403).send({ message: "forbidden access" });
      }
      next();
    };

    // google diye login korle data store hobe
    app.post("/user", async (req, res) => {
      const user = req.body;
      const filter = { email: user.email };
      const exitEmail = await userCollecton.findOne(filter);
      if (exitEmail) {
        return res.send(exitEmail);
      }
      const result = await userCollecton.insertOne(user);
      res.send(result);
    });
    app.get('/usersData',async(req,res)=>{
      // const data = req.body 
      const result = await userCollecton.find().toArray()
      res.send(result)
    })

    // agent
    app.post("/agentAdd", verifyToken, async (req, res) => {
      const data = req.body;
      const result = await sellerCollection.insertOne(data);
      res.send(result);
    });
    app.get("/myAdded/:email?", async (req, res) => {
      try {
        const email = req.params.email;
        const { search ,sort} = req.query;
        let filter = {};
        if (email) {
          filter.sellerEmail = email;
        }

        if (search) {
          filter.location = { $regex: search, $options: "i" }; 
        }
        let setSorting = {}
        if (sort) {
          setSorting = { minPrice: sort === "true" ? -1 : 1 };
        }
        const result = await sellerCollection
          .find(filter)
          .sort(setSorting)
          .toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching data from sellerCollection:", error);
        res
          .status(500)
          .send({ message: "Internal Server Error", error: error.message });
      }
    });
    // advertise er data dekhanor jonno 
    app.patch('/advertise/:id',async(req,res)=>{
      const id= req.params.id 
      const query = {_id: new ObjectId(id)}
      console.log(query)
      const filter = await sellerCollection.findOne(query)
      const update ={
        $set: { advertise: true }
      }
      const result = await sellerCollection.updateOne(filter,update)
      res.send(result)
    })

    //user show detais
    app.get("/details/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await sellerCollection.findOne(filter);
      res.send(result);
    });
    app.delete("/deleteItem/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await sellerCollection.deleteOne(filter);
      res.send(result);
    });
    // manage User admin
    app.get("/users", verifyToken, verifyAdmin, async (req, res) => {
      const user = req.body;
      const result = await userCollecton.find(user).toArray();
      res.send(result);
    });

    // delete user admin
    app.delete(
      "/usersDelete/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const user = await userCollecton.findOne(filter);
        if (!user) {
          return res.status(404).send({ message: "user not found in mongodb" });
        }
        if (user.firebaseUid) {
          await admin.auth().deleteUser(user.firebaseUid);
        }
        const result = await userCollecton.deleteOne(filter);
        res.send(result);
      }
    );

    // app.post("/usersDelete/:email", async (req, res) => {
    //   const { email } = req.params; // `req.body` না, `req.params` থেকে নিতে হবে
    //   console.log(email);
      
    //   if (!email) {
    //     return res.status(400).json({ error: "Email is required" });
    //   }      
    //   try {
    //     const userRecord = await admin.auth().getUserByEmail(email);
    //     const uid = userRecord.uid;
    
    //     const deleteUser = await userCollecton.deleteOne({ email: email });
    
    //     await admin.auth().deleteUser(uid);
    
    //     const userRef = admin.firestore().collection("users").doc(uid);
    //     await userRef.delete();
    
    //     if (deleteUser && deleteUser.deletedCount > 0) {
    //       return res.status(200).json({
    //         message: `User with email ${email} deleted successfully from both Firebase and database.`
    //       });
    //     } else {
    //       return res.status(404).json({
    //         error: `User with email ${email} not found in the database.`
    //       });
    //     }
    //   } catch (error) {
    //     console.error("Error deleting user:", error);
    //     res.status(500).json({ error: "Failed to delete user." });
    //   }
    // });
    // ;


    app.patch("/user/role", verifyToken, async (req, res) => {
      const { id, role } = req.body;
    
      if (!id || !role) {
        return res.status(400).send({ success: false, message: "User Id and role are required" });
      }
    
      const validRoles = ["admin", "agent", "fraud"];
      if (!validRoles.includes(role)) {
        return res.status(400).send({ success: false, message: "Invalid role provided" });
      }
    
      const filter = { _id: new ObjectId(id) };
      const update = role === "fraud" ? { $set: { status: "fraud" } } : { $set: { role } };
    
      const result = await userCollecton.updateOne(filter, update).catch(err => 
        res.status(500).send({ success: false, message: "Server error", error: err.message })
      );
    
      if (!result || result.modifiedCount === 0) {
        return res.status(404).send({ success: false, message: "User not found or no changes made" });
      }
    
      const updatedUser = await userCollecton.findOne(filter, { projection: { email: 1 } });
      if (!updatedUser?.email) {
        return res.status(404).send({ success: false, message: "Email not found for the user" });
      }
    
      const sellerHit = { sellerEmail: updatedUser.email };
      const findSellerCollection = await sellerCollection.find(sellerHit).toArray();
    
      const deleteResult = findSellerCollection.length > 0
        ? await sellerCollection.deleteMany(sellerHit)
        : { deletedCount: 0 };
    
      res.send({
        success: true,
        message: role === "fraud" ? "User marked as fraud" : `User role updated to ${role}`,
        email: updatedUser.email,
        deletedCount: deleteResult.deletedCount,
      });
    });
    
    // user,admin and agent k get kore niye daynamically role niye kaj korar jonno
    app.get("/user/role/:email", async (req, res) => {
      const email = req.params.email;
      const filter = { email: email };
      const user = await userCollecton.findOne(filter);
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      res.send({ role: user.role || "user" });
    });

    app.get("/offer/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await wishListCollection.findOne(filter);
      res.send(result);
    });
    app.post("/wishList", verifyToken, async (req, res) => {
      const data = req.body;
      const result = await wishListCollection.insertOne(data);
      res.send(result);
    });
    app.get("/wishList/:email", async (req, res) => {
      const email = req.params.email;
      const filter = { BuyerEmail: email };
      const result = await wishListCollection.find(filter).toArray();
      res.send(result);
    });
    // delete wishList
    app.delete("/wishList/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await wishListCollection.deleteOne(filter);
      res.send(result);
    });
    // offer
    app.post("/offer", verifyToken, async (req, res) => {
      const data = req.body;
      const result = await offerCollection.insertOne(data);
      res.send(result);
    });

    app.get("/SoldItem/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const filter = { BuyerEmail: email };
    
      try {
        const result = await offerCollection
          .aggregate([
            {
              $match: filter, 
            },
            {
              $addFields: {
                isAsString: { $toString: "$_id" },
              },
            },
            {
              $lookup: {
                from: "payment",
                localField: "isAsString",
                foreignField: "sellsId",
                as: "paymentDetails",
              },
            },
            {
              $addFields: {
                transsectionId: {
                  $arrayElemAt: ["$paymentDetails.transsectionId", 0],
                },
              },
            },
            {
              $project: {
                isAsString: 0,
                paymentDetails: 0,
              },
            },
          ])
          .toArray();
    
        res.send(result);
      } catch (error) {
        console.error("Error fetching sold items:", error);
        res.status(500).send({ error: "Failed to fetch sold items" });
      }
    });

    app.get("/agent/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const filter = {sellerEmail: email };
    
      try {
        const result = await offerCollection
          .aggregate([
            {
              $match: filter, 
            },
            {
              $addFields: {
                isAsString: { $toString: "$_id" },
              },
            },
            {
              $lookup: {
                from: "payment",
                localField: "isAsString",
                foreignField: "sellsId",
                as: "paymentDetails",
              },
            },
            {
              $addFields: {
                transsectionId: {
                  $arrayElemAt: ["$paymentDetails.transsectionId", 0],
                },
              },
            },
            {
              $project: {
                isAsString: 0,
                paymentDetails: 0,
              },
            },
          ])
          .toArray();
    
        res.send(result);
      } catch (error) {
        console.error("Error fetching sold items:", error);
        res.status(500).send({ error: "Failed to fetch sold items" });
      }
    });

    
    // user offer korle offer collection e pending k agent update kore dibe
    app.patch("/requestAccept", verifyToken, async (req, res) => {
      const { userId, status } = req.body;
      const filter = { _id: new ObjectId(userId) };
      const update = {
        $set: {
          status: status,
        },
      };
      const result = await offerCollection.updateOne(filter, update);
      if (result.modifiedCount > 0) {
        res.send({
          success: true,
          message: `Users stauts updated to ${status}`,
        });
      } else {
        res.status(404).send({
          success: false,
          message: "User not found or already in this Accepted",
        });
      }
    });

    app.patch("/updateData/:id", verifyToken, async (req, res) => {
      const item = req.body;
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const update = {
        $set: {
          name: item.name,
          location: item.location,
          minPrice: item.minPrice,
          maxPrice: item.maxPrice,
          image: item.image,
        },
      };
      const result = await sellerCollection.updateOne(filter, update);
      res.send(result);
    });
    // manage Properties admin
    app.get("/manageProperty", verifyToken, verifyAdmin, async (req, res) => {
      const data = req.body;
      const result = await sellerCollection.find(data).toArray();
      res.send(result);
    });

    app.patch("/status", verifyToken, async (req, res) => {
      const { userId, status } = req.body;
      if (!userId || !status) {
        return res
          .status(400)
          .send({ message: "UserId and Status are not required" });
      }
      const filter = { _id: new ObjectId(userId) };
      const update = {
        $set: {
          verification: status,
        },
      };
      const result = await sellerCollection.updateOne(filter, update);
      if (result.modifiedCount > 0) {
        res.send({ success: true, message: `User role updated to ${status}` });
      } else {
        res.status(404).send({
          success: false,
          message: "User not found or already in this role",
        });
      }
    });
    // review
    app.post("/reviews", verifyToken, async (req, res) => {
      const body = req.body;
      const result = await reviewCollection.insertOne(body);
      res.send(result);
    });
    app.get("/reviews/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const filter = { propertyId: id };
      const result = await reviewCollection.find(filter).toArray();
      res.send(result);
    });
    app.get("/reviews", async (req, res) => {
      const email = req.query.email;
      // const filter ={email:email}
      let review = {};
      if (email) {
        review.email = email;
      }
      const result = await reviewCollection
        .find(review)
        .sort({ addedAt: -1 })
        .toArray();
      res.send(result);
    });

    app.delete(
      "/reviewsDelete/:id",
      verifyToken,
      async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const result = await reviewCollection.deleteOne(filter);
        res.send(result);
      }
    );
    // payment
    app.post("/createPayment", async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);
      const paymentIntent = await stripe?.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });
      res.send({ clientSecret: paymentIntent?.client_secret });
    });
    app.post("/payment", verifyToken, async (req, res) => {
      const data = req.body;
      const result = await paymentCollection.insertOne(data);
      res.send(result);
   
    });
    app.get("/paymentHistory/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const filter = { sellerEmail: email };
      const result = await paymentCollection.find(filter).toArray();
      console.log(result)
      res.send(result);
    });

    // app.get("/paymentHistory/:email", verifyToken, async (req, res) => {
    //   const email = req.params.email;
    //   const filter = { sellerEmail: email };
    
    //   try {
    //     // Fetch payment history with total calculations
    //     const paymentHistory = await paymentCollection.find(filter).toArray();

    //     const totalSummary = await paymentCollection.aggregate([
    //       { $match: filter }, // Match specific seller's email
    //       {
    //         $group: {
    //           _id: null, 
    //           totalSoldAmount: { $sum: "$soldPrice" }, 
    //           totalCount: { $sum: 1 }, 
    //         },
    //       },
    //     ]).toArray();
    
    //     const summary = totalSummary[0] || { totalSoldAmount: 0, totalCount: 0 };
    
    //     res.send({ paymentHistory, summary });
    //   } catch (error) {
    //     console.error("Error fetching payment history:", error);
    //     res.status(500).send({ message: "Internal Server Error", error: error.message });
    //   }
    // });
    

  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("server is run");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
