// usando o express criar uma conexão
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

// conectando com o db clinicas_medicas
const db = mysql.createPool({
    host: 'localhost', // O host do banco. Ex: localhost
    user: 'root', // Um usuário do banco. Ex: user 
    password: '12345678', // A senha do usuário. Ex: user123
    database: 'clinicas_medicas' // A base de dados a qual a aplicação irá se conectar, deve ser a mesma onde foi executado o Código 1. Ex: node_mysql

});

// configurações de middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended:true }));

// fazendo um teste de requisção & resposta
// app.get("/especialidade", (req, res) => {
//     const sqlInsert = "INSERT INTO ESPECIALIDADE (CodEspec, NomeEspec, Descricao) VALUES ('PNM037','Pneumologia',' trata das doenças locais e sistêmicas relacionadas ao sistema respiratório');"
//     db.query(sqlInsert,(err,result)=>{
//         res.send('Inserindo espec!');
//     });
    
// });

// criando as rotas da API

// >>ESPECIALIDADE<<
//GET
app.get("/api/get/especialidades", (req,res) =>{
    const sqlSelectEspec = "SELECT * FROM ESPECIALIDADE;"
     db.query(sqlSelectEspec,(err,result)=>{
        if(err) {
            res.send("Error message: " + err.sqlMessage);
            console.log(err);
        } else{
            res.send(result);
            console.log(result);
        
        }
    });

});

//POST
app.post("/api/insert/especialidade", (req,res) =>{
    const codEspec = req.body.codEspec;
    const nomeEspec = req.body.nomeEspec;
    const descricao = req.body.descricao;

    const sqlInsertEspec = 
    "INSERT INTO ESPECIALIDADE (CodEspec, NomeEspec, Descricao) VALUES (?,?,?)";
    db.query(sqlInsertEspec, [codEspec,nomeEspec,descricao], (err,result) =>{
        if(err) {
            res.send("Error message: " + err.sqlMessage);
            console.log(err);
        } else{
            res.send(result);
            console.log(result);
        
        }
    }); 
});
//UPDATE
app.put("/api/update/especialidade", (req,res)=>{
    const codEspec = req.body.codEspec;
    const nomeEspec = req.body.nomeEspec;
    const descricao = req.body.descricao;

    const sqlUpdateEspec = 
    "UPDATE ESPECIALIDADE SET NomeEspec = ?, Descricao = ? WHERE  CodEspec = ? ";

    db.query(sqlUpdateEspec, [nomeEspec, descricao, codEspec], (err, result)=>{
        if(err) {
            res.send("Error message: " + err.sqlMessage);
            console.log(err);
        } else{
            res.send(result);
            console.log(result);
        
        }
    });

});
//DELETE 
app.delete("/api/delete/especialidade/:CodEspec", (req, res) =>{
    const codEspec = req.params.CodEspec;
    const sqlDeleteEspec = "DELETE FROM ESPECIALIDADE WHERE CodEspec = ?";
    db.query(sqlDeleteEspec, codEspec, (err, result) => {
        if(err) {
            res.send("Error message: " + err.sqlMessage);
            console.log(err);
        } else{
            res.send(result);
            console.log(result);
        
        }
    });
});

// >>CLINICA<<
//GET
app.get("/api/get/clinicas", (req,res) =>{
    const sqlSelectClinica = "SELECT * FROM CLINICA;"
     db.query(sqlSelectClinica,(err,result)=>{
        if(err) {
            res.send("Error message: " + err.sqlMessage);
            console.log(err);
        } else{
            res.send(result);
            console.log(result);
        
        }
    });

});
//POST
app.post("/api/insert/clinica", (req,res) =>{
    const nomeCli = req.body.nomeCli;
    const endereco = req.body.endereco;
    const telefone = req.body.telefone;
    const email = req.body.email;

    const sqlInsertClinica = 
    "INSERT INTO CLINICA (NomeCli, Endereco, Telefone, Email) VALUES (?,?,?,?)";
    db.query(sqlInsertClinica, [nomeCli, endereco, telefone, email], (err,result) =>{
        if(err) {
            res.send("Error message: " + err.sqlMessage);
            console.log(err);
        } else{
            res.send(result);
            console.log(result);
        
        }
    }); 
});
//UPDATE
app.put("/api/update/clinica", (req,res)=>{
    const codCli = req.body.codCli;
    const nomeCli = req.body.nomeCli;
    const endereco = req.body.endereco;
    const telefone = req.body.telefone;
    const email = req.body.email;

    const sqlUpdateClinica = 
    "UPDATE CLINICA SET NomeCli = ?, Endereco = ?, Telefone = ?, Email = ? WHERE  CodCli = ? ";

    db.query(sqlUpdateClinica, [nomeCli, endereco, telefone, email,codCli], (err, result)=>{
        if(err) {
            res.send("Error message: " + err.sqlMessage);
            console.log(err);
        } else{
            res.send(result);
            console.log(result);
        
        }
    });

});
//DELETE 
app.delete("/api/delete/clinica/:CodCli", (req, res) =>{
    const codCli = req.params.CodCli;
    const sqlDeleteClinica = "DELETE FROM CLINICA WHERE CodCli = ?";
    db.query(sqlDeleteClinica, codCli, (err, result) => {
        if(err) {
            res.send("Error message: " + err.sqlMessage);
            console.log(err);
        } else{
            res.send(result);
            console.log(result);
        
        }
    });
});

// >>MEDICO<<
//GET
app.get("/api/get/medicos", (req,res) =>{
    const sqlSelectMedico = "SELECT * FROM MEDICO;"
     db.query(sqlSelectMedico,(err,result)=>{
        if(err) {
            res.send("Error message: " + err.sqlMessage);
            console.log(err);
        } else{
            res.send(result);
            console.log(result);
        
        }
    });

});
//POST
app.post("/api/insert/medico", (req,res) =>{
    const nomeMed = req.body.nomeMed;
    const genero = req.body.genero; 
    const telefone = req.body.telefone;
    const email = req.body.email;
    const codEspec = req.body.codEspec;

    const sqlInsertMedico = 
    "INSERT INTO MEDICO (NomeMed, Genero, Telefone, Email, CodEspec) VALUES (?,?,?,?,?)";
    db.query(sqlInsertMedico, [nomeMed, genero, telefone, email, codEspec], (err,result) =>{
        if(err) {
            res.send("Error message: " + err.sqlMessage);
            console.log(err);
        } else{
            res.send(result);
            console.log(result);
        
        }
        
    }); 
});
//UPDATE
app.put("/api/update/medico", (req,res)=>{
    const nomeMed = req.body.nomeMed;
    const genero = req.body.genero; 
    const telefone = req.body.telefone;
    const email = req.body.email;
    const codEspec = req.body.codEspec;
    const codMed = req.body.codMed;

    const sqlUpdateMedico = 
    "UPDATE MEDICO SET  NomeMed = ?, Genero = ?, Telefone = ?, Email = ?, CodEspec = ? WHERE  CodMed = ? ";

    db.query(sqlUpdateMedico, [nomeMed, genero, telefone, email, codEspec, codMed], (err, result)=>{
        if(err) {
            res.send("Error message: " + err.sqlMessage);
            console.log(err);
        } else{
            res.send(result);
            console.log(result);
        }
    });

});
//DELETE 
app.delete("/api/delete/medico/:CodMed", (req, res) =>{
    const codMed = req.params.CodMed;
    const sqlDeleteMedico = "DELETE FROM MEDICO WHERE CodMed = ?";
    db.query(sqlDeleteMedico, codMed, (err, result) => {
        if(err) {
            res.send("Error message: " + err.sqlMessage);
            console.log(err);
        } else{
            res.send(result);
            console.log(result);
        }
    });
});

// >>PACIENTE<<
//GET
app.get("/api/get/pacientes", (req,res) =>{
    const sqlSelectPaciente = "SELECT * FROM PACIENTE;"
     db.query(sqlSelectPaciente,(err,result)=>{
        if(err) {
            res.send("Error message: " + err.sqlMessage);
            console.log(err);
        } else{
            res.send(result);
            console.log(result);
        
        }
    });

});
//POST
app.post("/api/insert/paciente", (req,res) =>{
    const cpfPac = req.body.cpfPac
    const nomePac = req.body.nomePac;
    const dataNascimento = req.body.dataNascimento;
    const genero = req.body.genero; 
    const telefone = req.body.telefone;
    const email = req.body.email;

    const sqlInsertPac = 
    "INSERT INTO PACIENTE (CpfPaciente, NomePac, DataNascimento, Genero, Telefone, Email) VALUES (?,?,?,?,?,?)";
    db.query(sqlInsertPac, [cpfPac, nomePac, dataNascimento, genero, telefone, email], (err,result) =>{
        if(err) {
            res.send("Error message: " + err.sqlMessage);
            console.log(err);
        } else{
            res.send(result);
            console.log(result);
        
        }
        
    }); 
});
//UPDATE
app.put("/api/update/paciente", (req,res)=>{
    const cpfPac = req.body.cpfPac
    const nomePac = req.body.nomePac;
    const dataNascimento = req.body.dataNascimento;
    const genero = req.body.genero; 
    const telefone = req.body.telefone;
    const email = req.body.email;

    const sqlUpdatePaciente = 
    "UPDATE PACIENTE SET  NomePac = ?, DataNascimento = ?, Genero = ?, Telefone = ?, Email = ? WHERE  CpfPaciente = ? ";

    db.query(sqlUpdatePaciente, [nomePac, dataNascimento, genero, telefone, email, cpfPac], (err, result)=>{
        if(err) {
            res.send("Error message: " + err.sqlMessage);
            console.log(err);
        } else{
            res.send(result);
            console.log(result);
        }
    });

});
//DELETE 
app.delete("/api/delete/paciente/:CpfPaciente", (req, res) =>{
    const cpfPaciente = req.params.CpfPaciente;
    const sqlDeletePaciente = "DELETE FROM PACIENTE WHERE CpfPaciente = ?";
    db.query(sqlDeletePaciente, cpfPaciente, (err, result) => {
        if(err) {
            res.send("Error message: " + err.sqlMessage);
            console.log(err);
        } else{
            res.send(result);
            console.log(result);
        }
    });
});

// >>CLINICA_MEDICO<<
//GET
app.get("/api/get/clinica-medico", (req,res) =>{
    const sqlSelectClinicaMedico = "SELECT * FROM CLINICA_MEDICO;"
     db.query(sqlSelectClinicaMedico,(err,result)=>{
        if(err) {
            res.send("Error message: " + err.sqlMessage);
            console.log(err);
        } else{
            res.send(result);
            console.log(result);
        
        }
    });

});
//POST
app.post("/api/insert/clinica-medico", (req,res) =>{
    const codCli = req.body.codCli
    const codMed = req.body.codMed
    const dataIngresso = req.body.dataIngresso
    const cargaHorariaSemanal = req.body.cargaHorariaSemanal

    const sqlInsertClinicaMedico = 
    "INSERT INTO CLINICA_MEDICO (CodCli, CodMed, DataIngresso, CargaHorariaSemanal) VALUES (?,?,?,?)";
    db.query(sqlInsertClinicaMedico, [codCli, codMed, dataIngresso, cargaHorariaSemanal], (err,result) =>{
        if(err) {
            res.send("Error message: " + err.sqlMessage);
            console.log(err);
        } else{
            res.send(result);
            console.log(result);
        }
        
    }); 
});
//UPDATE
app.put("/api/update/clinica-medico", (req,res)=>{
    const codCli = req.body.codCli
    const codMed = req.body.codMed
    const dataIngresso = req.body.dataIngresso
    const cargaHorariaSemanal = req.body.cargaHorariaSemanal
    const sqlUpdateClinicaMedico = 
    "UPDATE CLINICA_MEDICO SET DataIngresso = ?, CargaHorariaSemanal = ? WHERE CodCli = ? AND CodMed = ? ";

    db.query(sqlUpdateClinicaMedico, [dataIngresso, cargaHorariaSemanal, codCli, codMed ], (err, result)=>{
        if(err) {
            res.send("Error message: " + err.sqlMessage);
            console.log(err);
        } else{
            res.send(result);
            console.log(result);
        }
    });

});
//DELETE 

app.delete("/api/delete/clinica-medico/:CodMed", (req, res) =>{
    const codMed = req.params.CodMed;
    const sqlDeletePaciente = "DELETE FROM CLINICA_MEDICO WHERE CodMed = ?";
    db.query(sqlDeletePaciente, codMed, (err, result) => {
        if(err) {
            res.send("Error message: " + err.sqlMessage);
            console.log(err);
        } else{
            res.send(result);
            console.log(result);
        }
    });
});

// >> AGENDA_CONSULTA <<
//GET
app.get("/api/get/agenda-consulta", (req,res) =>{
    const sqlSelectAgendaConsulta = "SELECT * FROM AGENDA_CONSULTA;"
     db.query(sqlSelectAgendaConsulta,(err,result)=>{
        if(err) {
            res.send("Error message: " + err.sqlMessage);
            console.log(err);
        } else{
            res.send(result);
            console.log(result);
        
        }
    });

});
//POST
app.post("/api/insert/agenda-consulta", (req,res) =>{
    const codCli = req.body.codCli
    const codMed = req.body.codMed
    const cpfPaciente = req.body.cpfPaciente
    const dataHora = req.body.dataHora

    const sqlInsertAgendaConsulta = 
    "INSERT INTO AGENDA_CONSULTA (CodCli, CodMed, CpfPaciente, DataHora) VALUES (?,?,?,?)";
    db.query(sqlInsertAgendaConsulta, [codCli, codMed, cpfPaciente, dataHora], (err,result) =>{
        if(err) {
            res.send("Error message: " + err.sqlMessage);
            console.log(err);
        } else{
            res.send(result);
            console.log(result);
        }
        
    }); 
});



// SPECIAL QUERIES - getMedicosByClinica
// Médicos que atuam na respectiva clinica
app.get("/api/get/medicosByClinica/:CodCli", (req,res) =>{
    const codCli = req.params.CodCli
    const sqlSelectMedicosByClinica = 
    "SELECT m.NomeMed, m.Telefone, m.Email, m.CodEspec FROM MEDICO as m WHERE m.CodMed IN (SELECT cm.CodMed FROM CLINICA_MEDICO as cm WHERE cm.CodCli = ?)"
     db.query(sqlSelectMedicosByClinica, codCli, (err,result)=>{
        if(err) {
            res.send("Error message: " + err.sqlMessage);
            console.log(err);
        } else{
            res.send(result);
            console.log(result);
        
        }
    });

});

// colocando o servidor no ar
app.listen(3001,()=> {
    console.log('Running on port 3001');

});