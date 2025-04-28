class App{
    constructor(){
        //lista de reps
        this.repositorios = [];

        //pegando o formulario
        this.formulario = document.querySelector('form');

        //Registrar os eventos do formulario
        this.registrar_eventos();
    }
    registrar_eventos(){
        this.formulario.onsubmit = evento => this.adicionar_repositorio(evento);
    }

    adicionar_repositorio(evento){
        evento.preventDefault(); //evita q o form recarregue a pagina

        //add o rep na lista
        this.repositorios.push({
            nome: 'Nerd Fonts',
            descricao: 'Lens o Bina perouli',
            avatar_url: 'https://avatars0.githubusercontent.com/u/8083459?v=4',
            link: 'https://github.com/ryanoasis/nerd-fonts'
        });

        //renderizar a tela
        console.log(this.repositorios);
    }

}

new App();