
module.exports = function(app) {

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  });
  
};