import express from "express";
const router = express.Router();

let students =[
    {
        "id":1,
        "Nom":"monir",
        "degre":80
    },
    {
        "id":2,
        "Nom":"Rafi",
        "degre":90
    }

]

router.get("/",(req,rep) => {
    rep.json(students)
});

router.get("/:id",(req,rep) => {
    const id = Number(req.params.id);
    const unStudent = students.find((student) => student.id === id);
    if(unStudent){
        rep.send(`le nom est ${unStudent.Nom} et le degree est ${unStudent.degre}`)
    }else{
        rep.send("sutendt not found!!")
    }
});
router.delete("/:id",(req,rep)=>{
    const id = Number(req.params.id);
    const unStudent = students.find((student) => student.id !== id);
    rep.send(`le nom ${unStudent.Nom} est suprimer`)

});

router.post("/",(req,rep) =>{
    students.push(req.body);
    rep.send(`Le nom ${req.body.Nom} est ajoute`)
});

router.patch("/:id",(req,rep) => {
    const id = Number(req.params.id);
    const {Nom,degre} = req.body
    const unStudent = students.find((student) => student.id === id);
    if(Nom){
        unStudent.Nom = Nom;
    }
    if(degre){
        unStudent.degre = degre;
    }
    rep.send(`le nom est ${unStudent.Nom} et le degree est ${unStudent.degre}`)
});


export default router;
