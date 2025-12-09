const API = "http://127.0.0.1:3000/municipios";

const limit = 3;
let offset = 0;
let lastScrollTop = 0
const listagem = document.getElementById("listagem");
const lista = document.getElementById("lista");
const btnCarregar = document.getElementById("btn");
const btnSalvar = document.getElementById("btnSalvar");
const btnMais = document.getElementById("btnmais");
const btnMenos = document.getElementById("btnmenos");

const campoMunicipio = document.getElementById("campoMunicipio")
const campoUF = document.getElementById("campoUF")
const campoCaracteristica = document.getElementById("campoCaracteristica")
// Eventos
btnCarregar.addEventListener("click", carregarMunicipios);
btnMais.addEventListener("click", carregarMaisMunicipios);
btnMenos.addEventListener("click", carregarMenosMunicipios);
btnSalvar.addEventListener("click", inserirMunicipio);

//--------------------------------------------------
// LISTAR MUNICÍPIOS
//--------------------------------------------------
async function carregarMunicipios() {
    try {
        offset = 0;
        const resposta = await fetch(API+"?limit="+limit+"&offset="+offset);
        const dados = await resposta.json();

        listagem.innerHTML = ""; // limpa

        dados.forEach(m => criarCard(m));
        
    } catch (erro) {
        console.error("Erro ao carregar:", erro.message);
    }
}

//--------------------------------------------------
// CRIAR CARD NO FRONT
//--------------------------------------------------
function criarCard(m) {

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h2>${m.id}</h2>
            <h3>${m.nome} (${m.estado})</h3>
            <p>${m.caracteristica}</p>
            <button class="btn-delete" onclick="deletar(${m.id})">Deletar</button>
            <button class="btn-alterar" onclick="alterarMunicipio(${m.id})>Alterar</button>
        `;

        listagem.appendChild(card);
}

//--------------------------------------------------
// INSERIR MUNICÍPIO (POST)
//--------------------------------------------------
async function inserirMunicipio() {
    const nome = document.getElementById("campoMunicipio").value;
    const estado = document.getElementById("campoUF").value;
    const caracteristica = document.getElementById("campoCaracteristica").value;

    const novoMunicipio = { nome, estado, caracteristica };

    try {
        const resposta = await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoMunicipio),
        });

        if (!resposta.ok) {
            throw new Error("Erro ao inserir!");
        }

        carregarMunicipios();

        document.getElementById("campoMunicipio").value = "";
        document.getElementById("campoUF").value = "";
        document.getElementById("campo").value = "";

    } catch (erro) {
        console.error("Erro ao inserir:", erro.message);
    }
}

async function deletar(idDeletar){
    
    try{
        const urlDelete = API+"/"+idDeletar
        const resposta = await fetch(urlDelete,
            {
                method: "DELETE"
            }
        )

        carregarMunicipios();
    }
    catch {
        console.log("error")
    }
}

async function alterarMunicipio(id) {
    document.getElementById("campoMunicipio").value = id;
    document.getElementById("campoUF").value = id;
    document.getElementById("campo").value = id;
}

async function carregarMaisMunicipios() {
    try {
        offset = offset + 3;
        console.log(offset)
        const resposta = await fetch(API+"?limit="+limit+"&offset="+offset);
        const dados = await resposta.json();

        listagem.innerHTML = ""; // limpa

        dados.forEach(m => criarCard(m));
        
    } catch (erro) {
        console.error("Erro ao carregar:", erro.message);
    }
}

async function carregarMenosMunicipios() {
    try {
        offset = offset - 3;
        console.log(offset)
        const resposta = await fetch(API+"?limit="+limit+"&offset="+offset);
        const dados = await resposta.json();

        listagem.innerHTML = ""; // limpa

        dados.forEach(m => criarCard(m));
        
    } catch (erro) {
        console.error("Erro ao carregar:", erro.message);
    }
}

window.addEventListener("scroll", async () => {
    let scrollTop = window.pageYOffset;

    console.log("scrolleeeiiiiii");

    if (scrollTop > lastScrollTop) { console.log("rolou pra baixo") 

    }else{
        console.log("Rolei para cima!!!")
    }

    lastScrollTop = lastScrollTop
    
});