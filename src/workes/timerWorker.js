self.onmessage = function(event) {
  console.log(`WORKER recebeu: ${event.data}`);

  self.postMessage('Olá, usuário');
}