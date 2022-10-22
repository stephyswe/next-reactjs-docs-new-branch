const remark = require('remark');
const customHeaders = require('./remark-header-custom-ids'); // Custom header id's for i18n
const smartyPants = require('./remark-smartypants'); // Cleans up typography

module.exports = {
  remarkPlugins: [customHeaders, smartyPants],
};
