const express =require('express');
const pug=require('pug');
const bodyparser=require('body-parser');
const path= require('path');
const pdf=require('pdfkit')

const app= express();
app.set('view engine','pug');

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname+'/public/')));

app.get('/',(req,res)=>
{
    res.render('home');
})

app.post('/details',(req,res)=>
{
    const doc= new pdf();
    let filename= req.body.name;
    filename= encodeURIComponent(filename)+'.pdf';
    res.setHeader('Content-disposition', 'attachment;filename="'+filename+'"')
    res.setHeader('Content-type','application/pdf');
    doc.font('Times-Roman',60)
    doc.text('Your Details are..',50,50).font('Times-Roman',20)
    doc.text("Name:",100,150).text(req.body.name,350,150);
    doc.text('Location:',100,200).text(req.body.location,350,200)
    doc.text('Email:',100,250).text(req.body.email,350,250)
    doc.text('Contact Details:',100,300).text(req.body.phone,350,300)
    doc.text('About Me:',100,350).text(req.body.aboutme,350,350)
    doc.text('Work Experience:',100,400).text(req.body.exp,350,400)
    doc.text('Skill Set:',100,450).text(req.body.skills,350,450)
    doc.text('Educational Qualifications:',100,500).text(req.body.edu,350,500)
    doc.text('Achievements:',100,550).text(req.body.ach,350,550)
    doc.pipe(res);
    doc.end();  
    

})

// app.listen(5000,()=>console.log("listening at 3000"));

module.exports=app;

