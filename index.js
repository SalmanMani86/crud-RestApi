import express from 'express';

const app =express();

//const port=process.env.port || 4500;

let data =[{ "name": "Arjun Tripathi", "course": "MCA", "roll_no": "14", "id": 1},
{ "name": "Rahul Durgapal", "course": "MCA", "roll_no": "36", "id": 2 },
{ "name": "Aman Yadav", "course": "MCA", "roll_no": "08", "id": 3}];

// Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true }));


app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the CRUD REST API');
});

app.get('/:id',(req,resp)=>{
    
    let found=data.find((item)=>{
        return item.id===parseInt(req.params.id);
    });

    if(found){
        resp.status(200).json(found);

    }else{
        resp.sendStatus(404);
    }
});



app.post('/',(req,resp)=>{
    let items=data.map(item =>item.id);

    let newId=items.length>0 ? Math.max.apply(Math,items)+1 : 1;

    let newItem={
        id:newId,
        name:req.body.name,
        course: req.body.course,
        rollno:req.body.roll_no,
    };
    data.push(newItem);

    resp.status(201).json({
        'message':"successfully created"
    });
});
   

app.put('/:id',(req,resp)=>{
    let found= data.find((items)=>{
        return items.id===parseInt(req.query.id);
    });

    if (found) {
        let updateData = {
            id: found.id,
            name: req.body.name,
            course: req.body.course,
            roll_no: req.body.roll_no
        };
        
        let targetIndex=data.indexOf(found);
        data.splice(targetIndex,1,updateData);
        resp.status(201).json({
            'message' : " Data Updated"
        });
        
    }
    else{
        resp.status(404).json({
            'message' : " unable to insert data because data inserted not matched" 
        });
    }
});

app.patch("/:id", function (req, res) {
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });

    if (found) {
        if (req.body.name) {
            found.name = req.body.name;
        }
        if (req.body.course) {
            found.course = req.body.course;
        }
        if (req.body.roll_no) {
            found.roll_no = req.body.roll_no;
        }
        res.status(201).json({ "message": "data updated" });
    }else{
        res.status(404).json({
            'message': 'unable to insert data because data inserted not matched'
        });
    }
});
app.delete("/:id", function (req, res) {

    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    let targetIndex=data.indexOf(found);
    if(found){
        data.splice(targetIndex,1);
        resp.status(204);
    }
    else{
        resp.status(404);
    }

});


app.listen(4500, () => {
    console.log('Server is running at http://localhost:4500');
});