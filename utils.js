const orderedByRecent = (arr) => [...arr].sort((item1, item2) => item2 - item1);

module.exports = { orderedByRecent };
