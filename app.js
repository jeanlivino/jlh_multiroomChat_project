const  app = require('./config/server');
const server = app.listen(80, function () { 
    console.log('Server on')
 })

 const io = require('socket.io').listen(server);

 // global variable
 app.set('io', io);

 // websocket
 io.on('connection', (socket)=>{
    console.log('usuario conectou');
    socket.on('msgToServer', (data)=>{
        socket.emit('msgToClient', {
            msg: `
            <div class="dialogo">
                <h4>${data.apelido}:</h4>
                <p>${data.msg}</p>
            </div>
        `
        })
        socket.broadcast.emit('msgToClient', {
            msg: `
            <div class="dialogo">
                <h4>${data.apelido}:</h4>
                <p>${data.msg}</p>
            </div>
        `
        })
    })
    socket.on('disconnect', ()=>{
        console.log('usuario desconectou');
    })
 })