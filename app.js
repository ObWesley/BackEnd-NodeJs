// importação dos modulos para o desenvolvimento 
const express = require("express");

const bodyParser = require("body-parser");

cost app = express();

const mongoose = require("mongoose")

const cors = require("cors");
const config = {
    origin: "*",
    optionsSuccessStattus: 200
}

const urldb = "mongodb+srv://wesleyoliveira:123senac@cluster0.pqtrm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(url, { userNewUrlParser: true, userUnifiedTopology: true });

const tbnoticias = mongoose.Schema({
    titulo: String,
    datapublicacao: String,
    texto: String,
    autor: String,
    img1: String,
    img2: String

});


const tbcadastro = mongoose.Schema({
    nomecolaborador: String,
    telefone: String,
    email: String,
    endereco: String,
    cpf: String,
    usuario: String,
    datacadastro: String,
    cargo: String,
    senha: String,
    Sexo: String,
    nascimento: String,
    rg: String,
    estadocivil: String,
    remuneracao: String

});

const tbadm = mongoose.Schema({
    nome: String,
    email: String,
    telefone: String,
    idade: String,
    senha: String
});


//vamos criar a estrutura da tabela de colaboradores
const tbcolab = mongoose.Schema({
    nome: String,
    email: String,
    telefone: String,
    idade: String,
    senha: String
});

const tbnoticia = mongoose.Schema({
    titulo: String,
    datadapublicacao: String,
    texto: String,
    autor: String,
    foto1: String,
    foto2: String
});

const tbcontato = mongoose.Schema({
    nomecliente: String,
    email: String,
    telefone: String,
    assunto: String,
    mensagem: String
});

const Administrador = mongoose.model("administrador", tbadm);

const Colaborador = mongoose.model("colaborador", tbcolab);

const Noticia = mongoose.model("noticia", tbnoticia);

const Contato = mongoose.model("contato", tbcontato);

const app = express();

app.use(cors());


app.use(bodyParser.json());


app.get("/", cors(config), (req, res) => {
    res.status(200).send({
        titulo: "Lojinha Tudo Aqui É Barato",
        texto: "Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker.",
        imagens: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHWOnr-ipzHDPFKNnGCSmFgZZmLmKU6kFCvg&usqp=CAU",
            "http://www.setorreciclagem.com.br/wp-content/uploads/2015/10/celulares-descartados.jpg"

        ]
    });
});

app.get("/noticias", cors(config), (req, res) => {
    Noticia.find().then((rs) => {
        res.status(200).send({ output: rs })
    });
});

//localizar uma noticia por seu id
app.get("/noticias/:id", cors(config), (req, res) => {
    Noticia.findById(req.params.id).then((rs) => {
        res.status(200).send({ output: rs })
    });
});




//rota para cadastar as noticias
app.post("/noticias/cadastro", cors(config), (req, res) => {

    const dados = new Produto(req.body);
    dados.save().then((rs) => {
        res.status(201).send({ output: "Dados cadastrados " + rs })
    }).catch((erro) => res.status(400).send({ output: "Erro na execução " + erro }))

});


//rota para apagar uma noticia
app.delete("/apagar/:id", cors(config), (req, res) => {
    Noticia.findByIdAndDelete(req.params.id).then((rs) => {
        res.status(200).send({ output: "Noticia apagada." });
    });
});


// ----------------------------------------------------------------------------------------------------------
//                                     FIM ROTAS NOTICIA
// ----------------------------------------------------------------------------------------------------------





// -----------------------------------------------------------------------------------------------------------
//                                        ROTA COLABORADOR
// -----------------------------------------------------------------------------------------------------------


//  Rota para exibir os cadastros dos colaboradores e administradores no bando de dados
app.get("/colaboradores", cors(config), (req, res) => {
    Colaborador.find().then((rs) => {
        res.status(200).send({ output: rs })
    });
});
//localizar um colaborador por seu id
app.get("/colaborador/:id", cors(config), (req, res) => {
    Colaborador.findById(req.params.id).then((rs) => {
        res.status(200).send({ output: rs })
    });
});



// Rota para cadastrar os colaboradores e administradores 
app.post("/colaborador/cadastro", cors(config), (req, res) => {
    // criando 7ª parte usando a ligação com a 6ª parte
    const dados = new Colaborador(req.body);
    dados.save().then((rs) => {
        res.status(201).send({ output: "Dados cadastrados " + rs })
    }).catch((erro) => res.status(400).send({ output: "Erro na execução" + erro }))

});



// Rota para atualizar o cadastro
app.put("/atualizar/:id", cors(config), (req, res) => {


    Colaborador.findByIdAndUpdate(req.params.id, req.body, (erro, dados) => {
        if (erro) {
            res.status(400).send({ output: "Erro ao tentar atualizar " + erro });
            return;
        }
        res.status(200).send({ output: "atualizado com sucesso! " + dados });
    });


});
// Rota para apagar dados cadastrado
app.delete("/apagar/:id", cors(config), (req, res) => {
    Colaborador.findByIdAndDelete(req.params.id).then((rs) => {
        res.status(200).send({ output: "Colaborador apagado." });
    });
});


// =-------------------------------------------------------------------------------------------------------------
//                                              FIM ROTAS COLABORADOR
// --------------------------------------------------------------------------------------------------------------








// -------------------------------------------------------------------------------------------------------------
//                                              ROTAS ADMINISTRADOR
// -------------------------------------------------------------------------------------------------------------


//  Rota para exibir o cadastro de administradores no bando de dados
app.get("/administradores", cors(config), (req, res) => {
    Administrador.find().then((rs) => {
        res.status(200).send({ output: rs })
    });
});
//localizar um administrador por seu id
app.get("/administrador/:id", cors(config), (req, res) => {
    Administrador.findById(req.params.id).then((rs) => {
        res.status(200).send({ output: rs })
    });
});



// Rota para cadastrar os  administradores 
app.post("/administrador/cadastro", cors(config), (req, res) => {
    // criando 7ª parte usando a ligação com a 6ª parte
    const dados = new Administrador(req.body);
    dados.save().then((rs) => {
        res.status(201).send({ output: "Dados cadastrados " + rs })
    }).catch((erro) => res.status(400).send({ output: "Erro na execução" + erro }))

});



// Rota para atualizar o cadastro
app.put("/atualizar/:id", cors(config), (req, res) => {
    Administrador.findByIdAndUpdate(req.params.id, req.body, (erro, dados) => {
        if (erro) {
            res.status(400).send({ output: "Erro ao tentar atualizar " + erro });
            return;
        }
        res.status(200).send({ output: "atualizado com sucesso! " + dados });
    });


});
// Rota para apagar dados cadastrado
app.delete("/apagar/:id", cors(config), (req, res) => {
    Administrador.findByIdAndDelete(req.params.id).then((rs) => {
        res.status(200).send({ output: "Administrador apagado." });
    });
});



// ------------------------------------------------------------------------------------------------------------
//                                        FIM ROTAS ADMINISTRADOR
// ------------------------------------------------------------------------------------------------------------






// ------------------------------------------------------------------------------------------------------------
//                                       ROTAS DE CONTATO
// ------------------------------------------------------------------------------------------------------------

// Criando rota da tabela contato

app.get("/contatos", cors(config), (req, res) => {
    Contato.find().then((rs) => {
        res.status(200).send({ output: rs })
    });
});
//localizar um produto por seu id
app.get("/contato/:id", cors(config), (req, res) => {
    Contato.findById(req.params.id).then((rs) => {
        res.status(200).send({ output: rs })
    });
});



// Rota para cadastrar os colaboradores e administradores 
app.post("/contato/cadastro", cors(config), (req, res) => {
    // criando 7ª parte usando a ligação com a 6ª parte
    const dados = new Contato(req.body);
    dados.save().then((rs) => {
        res.status(201).send({ output: "Dados cadastrados " + rs })
    }).catch((erro) => res.status(400).send({ output: "Erro na execução" + erro }))

});



// Rota para atualizar o cadastro
app.put("/atualizar/:id", cors(config), (req, res) => {


    Contato.findByIdAndUpdate(req.params.id, req.body, (erro, dados) => {
        if (erro) {
            res.status(400).send({ output: "Erro ao tentar atualizar Contato " + erro });
            return;
        }
        res.status(200).send({ output: "Contato atualizado com sucesso! " + dados });
    });


});
// Rota para apagar contato cadastrado
app.delete("/apagar/:id", cors(config), (req, res) => {
    Contato.findByIdAndDelete(req.params.id).then((rs) => {
        res.status(200).send({ output: "Contato apagado." });
    });
});





// vamos configurar o servidor para responder na porta 3350
app.listen(3350, () => console.log("Servidor online ... "));

