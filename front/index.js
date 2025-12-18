const API = "http://127.0.0.1:3000/municipios";
const CLIENT_API_KEY = "SUA_CHAVE_SECRETA_MUITO_FORTE_123456";

// Variáveis comuns
let limit = 3;
let offset = 1;
let lastScrollTop = 0 // Armazena o valor da última scrollada

// Variáveis de elementos
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
        const resposta = await fetch(API+"?limit="+limit+"&offset="+offset, { headers: { 'minha_chave': CLIENT_API_KEY } }); // variável "resposta" armazena os registros da API através do fetch usando também como parâmetros as variáveis "limit" e "offset" 
        const dados = await resposta.json(); // "dados" recebe o conteúdo da variável "resposta" em formado .json

        listagem.innerHTML = ""; // limpa

        dados.forEach(m => criarCard(m)); // é criado um laço de repetição a partir de "dados" que cria um card para cada registro da variável "dados"

    } catch (erro) {
        console.log("Erro ao carregar:");
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
            <button class="btn-alterar" onclick="alterarMunicipio(${m.id})">Alterar</button>
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

async function deletar(idDeletar) {

    try {
        const urlDelete = API + "/" + idDeletar
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
    try {
        createElement('<input id="nomeAlterar"></input>' & '<input id="ufAlterar"></input>' & '<input id="caracteristicaAlterar"></input>')

        const resposta = await fetch(API, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoMunicipio),
        });


        if (!resposta.ok) {
            throw new Error("Erro ao alterar!");
        }

        carregarMunicipios();

        document.getElementById("campoMunicipio").value = "";
        document.getElementById("campoUF").value = "";
        document.getElementById("campo").value = "";

    } catch (erro) {
        console.error("Erro ao alterar:", erro.message);
    }
}

async function carregarMaisMunicipios() {
    try {
        offset = offset + 3; //offset diz quantas linhas serão puladas
        console.log(offset)
        const resposta = await fetch(API + "?limit=" + limit + "&offset=" + offset); //Variável resposta recebe as linhas da API, mas com parâmetros limit (para limitar a quantidade de registros que serão carregados) e offset(quantos registros serão pulados);
        const dados = await resposta.json(); // Transforma a variável resposta para formato .json através da função json() e armazena na variável "dados"

        listagem.innerHTML = ""; // limpa

        dados.forEach(m => criarCard(m)); // Cria um laço de repetição do tipo forEach a partir da variável "dados" que, para cada registro da variável "dados", cria um card

    } catch (erro) {
        console.error("Erro ao carregar:", erro.message);
    }
}

async function carregarMenosMunicipios() {
    try {
        offset = offset - 3; //offset diz quantas linhas serão puladas
        console.log(offset)
        const resposta = await fetch(API + "?limit=" + limit + "&offset=" + offset); //Variável resposta recebe as linhas da API, mas com parâmetros limit (para limitar a quantidade de registros que serão carregados) e offset(quantos registros serão pulados);
        const dados = await resposta.json(); // Transforma a variável resposta para formato .json através da função json() e armazena na variável "dados"

        listagem.innerHTML = ""; // limpa

        dados.forEach(m => criarCard(m)); // Cria um laço de repetição do tipo forEach a partir da variável "dados" que, para cada registro da variável "dados", cria um card

    } catch (erro) {
        console.error("Erro ao carregar:", erro.message);
    }
}
