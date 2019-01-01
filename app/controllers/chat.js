module.exports.iniciaChat = (application, req, res) => {
    let dadosForm = req.body;
    req.assert('apelido', 'Nome ou Apelido é obrigatório').notEmpty();
    req.assert('apelido', 'Nome ou Apelido deve conter entre 3 e 15 caracteres').len(3, 15);

    let errors = req.validationErrors();
    if(errors){
        res.render('index', {validacao : errors})
    } else{
        // get global variable
        application.get('io').emit('msgToClient', {
            msg: `
            <div class="dialogo">
                <h4>${dadosForm.apelido}:</h4>
                <p>Acabou de entrar no chat</p>
            </div>
        `})
        res.render('chat', {apelido: dadosForm.apelido});
    } 
}