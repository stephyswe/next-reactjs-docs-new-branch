const remark = require('remark');
const customHeaders = require('./remark-header-custom-ids'); // Custom header id's for i18n

module.exports = {
  remarkPlugins: [customHeaders],
};
