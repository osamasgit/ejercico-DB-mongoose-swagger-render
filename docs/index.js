const basicInfo = require('./basicInfo.js');
const tasks = require('./tasks.js');
const components = require('./components.js');
module.exports = {
    ...basicInfo,
    ...components,
    ...tasks
};
