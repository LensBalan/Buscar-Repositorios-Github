import api from './api';

class App{
    constructor(){
        //lista de reps
        this.repositorios = [];

        //pegando o formulario
        this.formulario = document.querySelector('form');

        //Lista
        this.lista = document.querySelector('.list-group');

        //Registrar os eventos do formulario
        this.registrar_eventos();
    }
    registrar_eventos(){
        this.formulario.onsubmit = evento => this.adicionar_repositorio(evento);
    }

    async adicionar_repositorio(evento){
        evento.preventDefault(); //evita q o form recarregue a pagina

        //recuperar o valor do input
        let input = this.formulario.querySelector('input[id=repositorio]').value;

        //se o input vir vazio sai da aplicação
        if(input.lenght === 0){
            return; //sempre sai da funcao
        }

    this.apresentar_buscando();

    try{
        let response = await api.get(`/repos/${input}`);
        //console.log(response);

        let { name, description, html_url, owner: {avatar_url} } = response.data;

        //add o rep na lista
        this.repositorios.push({
            nome: name,
            descricao: description,
            avatar_url,
            link: html_url
        });

        this.renderizar_tela();

    }catch(erro){
        //limpar buncando
        this.lista.removeChild(document.querySelector('.list-group-item-warning'));

        //limpar erro existente
        let error = this.lista.querySelector('.list-group-item-danger');

        if(error !== null){
            this.lista.removeChild(error);
        }

        let li = document.createElement('li');
        li.setAttribute('class', 'list-group-item list-group-item-danger');
        let txtErro = document.createTextNode(`O repositório ${input} não existe.`);
        li.appendChild(txtErro);
        this.lista.appendChild(li);
    }

    }
/*
<li class="list-group-item list-group-item-action">
        <img src="https://avatars0.githubusercontent.com/u/8083459?v=4"/>
        <strong>Nerd Fonts</strong>
        <p>Iconic font agregator colection and pacturing</p>
        <a target="_blank" href="https://github.com/ryanoasis/nerd-fonts">Acessar</a>
</li>
*/
    apresentar_buscando(){
        let li = document.createElement('li');
        li.setAttribute('class', 'list-group-item list-group-item-warning');
        let txtBuscando = document.createTextNode(`Aguarde, Buscando o repositório...`);
        li.appendChild(txtBuscando);
        this.lista.appendChild(li);
    }


    renderizar_tela(){
        //limpar o conteudo antigo
        this.lista.innerHTML = '';

        //percorrer a lista de reps e criar os elementos
        this.repositorios.forEach(repositorios =>{

            //li
            let li = document.createElement('li');
            li.setAttribute('class', 'list-group-item list-group-item-action');

            //img
            let img = document.createElement('img');
            img.setAttribute('src', repositorios.avatar_url);
            li.appendChild(img);

            //strong
            let strong = document.createElement('strong');
            let txtNome = document.createTextNode(repositorios.nome);
            strong.appendChild(txtNome);
            li.appendChild(strong);

            //p
            let p = document.createElement('p');
            let txtDescricao = document.createTextNode(repositorios.descricao);
            p.appendChild(txtDescricao);
            li.appendChild(p);

            //a
            let a = document.createElement('a');
            a.setAttribute('target', '_blank');
            a.setAttribute('href', repositorios.link);
            let txtLink = document.createTextNode('Acessar');
            a.appendChild(txtLink);
            li.appendChild(a);

            //add li como filho da ul
            this.lista.appendChild(li);

            //limpar input
            this.formulario.querySelector('input[id=repositorio]').value = '';

            this.formulario.querySelector('input[id=repositorio]').focus();
        })
    }

}

new App();