module.exports.home =
  (_, res) => res.render('index', { title: 'Vendez les vôtres' });

module.exports.itemsSPA =
  async (_, res) => res.render('itemsSPA', { title : 'Annonces' });


