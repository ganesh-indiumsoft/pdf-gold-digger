/**
 * Base visitor class with default constructor
 */
class VisitorBase {
  constructor(config, debug, objectList) {
    this.config = config;
    this.debug = debug;
    this.objectList = objectList;
  }
}

module.exports = VisitorBase;