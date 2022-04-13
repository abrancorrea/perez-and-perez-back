const orderedByRecent = (arr) =>
  [...arr].sort(
    (item1, item2) => new Date(item2.created_at) - new Date(item1.created_at)
  );

module.exports = { orderedByRecent };
