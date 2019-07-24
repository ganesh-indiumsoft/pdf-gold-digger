const Extract = require('./../Extract');
const Model = require('./../model');
const VisitorBase = require('./VisitorBase');
const Geometry = require('../model/Geometry');

/**
 * Visits text data while parsing pdf
 */
class VisitorText extends VisitorBase {
  constructor(config, page) {
    super(config, page);
    this.txt = new Extract.ExtractText();
  }

  /**
   * pdf.OPS.beginText
   */
  beginText(args) {
    if (this.config.debug) console.log('beginText');
    if (this.config.skip) return;
    this.page.setCurrentObject(new Model.TextObject());
    // SHOULD determine if new line while extracting text cause it can begin in any time
    this.page.currentObject.newLine();

  }

  /**
   * pdf.OPS.setLeading
   */
  setLeading(args) {
    if (this.config.debug) console.log('setLeading');
    if (this.config.skip) return;
    this.page.leading = -args[0];
  }

  /**
   * pdf.OPS.setLeadingMoveText
   */
  setLeadingMoveText(args) {
    if(debug) console.log('setLeadingMoveText');
    if (this.config.skip) return;
    const x = args[0], y = args[1];
    this.page.leading = -y;
    this.moveText(x, y);
  }

  /**
   * pdf.OPS.setFont
   */
  setFont(args) {
    if (this.config.debug) console.log('setFont');
    if (this.config.skip) return;
    this.txt.setFont(args, this.page)
  }

  /**
   * pdf.OPS.showText
   */
  showText(args) {
    if (this.config.debug) console.log("showText");
    if (this.config.skip) return;
    this.txt.showText(args[0], this.page)
  }

  /**
   * pdf.OPS.showSpacedText
   */
  showSpacedText(args) {
    if (this.config.debug) console.log("showSpacedText");
    if (this.config.skip) return;
    this.txt.setText(args[0], this.page);
  }

  /**
   * pdf.OPS.moveText
   */
  moveText(args) {
    if (this.config.debug) console.log('moveText');
    if (this.config.skip) return;
    /*
    let el = this.page.currentObject.getLine();
    const x = args[0], y = args[1];
    const newLine = el.isNewLine(y);
    // new line
    if(newLine) {
      el.printText();
      el = this.page.currentObject.newLine();
    }
    // create new text element always after new line
    const el2 = el.newText();
    el2.x = this.page.currentObject.x += x;
    el2.y = this.page.currentObject.y += y;
    // assign to calculate bounding box
    el.setBBox(this.page.currentObject.x, this.page.currentObject.y);
     */
    this.page.currentObject.x = args[0];
    this.page.currentObject.y = args[1];
  }

  /**
   * pdf.OPS.endText
   */
  endText(args) {
    if (this.debug) console.log('endText');
    if (this.config.skip) return;
    this.page.currentObject = null;
  }

  /**
   * pdf.OPS.setCharSpacing
   */
  setCharSpacing(args) {
    if (this.debug) console.log('setCharSpacing');
    if (this.config.skip) return;
  }

  /**
   * pdf.OPS.setWordSpacing
   */
  setWordSpacing(args) {
    if (this.debug) console.log('setWordSpacing');
    if (this.config.skip) return;
  }

  /**
   * pdf.OPS.setHScale
   */
  setHScale(args) {
    if (this.debug) console.log('setHScale');
    if (this.config.skip) return;
  }

  /**
   * pdf.OPS.setTextMatrix
   */
  setTextMatrix(args) {
    if (this.debug) console.log('setWordSpacing');
    if (this.config.skip) return;
    const a = args[0], b = args[1], c = args[2], d = args[3], e = args[4], f = args[5];
    this.page.currentObject.textMatrix = this.page.currentObject.lineMatrix = [a, b, c, d, e, f];
    this.page.currentObject.x = 0;
    this.page.currentObject.y = 0;
  }

  /**
   * pdf.OPS.setTextRise
   */
  setTextRise(args) {
    if (this.debug) console.log('setTextRise');
    if (this.config.skip) return;
  }

  setTextRenderingMode(args) {
    if (this.debug) console.log('setTextRenderingMode');
    if (this.config.skip) return;
  }

  /**
   * pdf.OPS.nextLine
   */
  nextLine(args) {
    if (this.debug) console.log('nextLine');
    if (this.config.skip) return;
  }
}

module.exports = VisitorText