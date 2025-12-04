const API = "http://127.0.0.1:3000/municipios";

const listagem = document.getElementById("listagem");
const btnCarregar = document.getElementById("btn");
const btnSalvar = document.getElementById("btnSalvar");

const campoMunicipio = document.getElementById("campoMunicipio")
const campoUF = document.getElementById("campoUF")
const campoCaracteristica = document.getElementById("campoCaracteristica")
// Eventos
btnCarregar.addEventListener("click", carregarMunicipios);
btnSalvar.addEventListener("click", inserirMunicipio);

//--------------------------------------------------
// LISTAR MUNICÍPIOS
//--------------------------------------------------
async function carregarMunicipios() {
    try {
        const resposta = await fetch(API);
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
            <h3>${m.nome} (${m.estado})</h3>
            <p>${m.caracteristica}</p>
            <button class="btn-delete" onclick="deletar(${m.id})">Deletar</button>
            <button class="btn-alterar" onclick="alterarMunicipio(${m.id})>Alterar</button>
        `;

        listagem.appendChild(card);
        alterarMunicipio();
        carregarMunicipios();
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