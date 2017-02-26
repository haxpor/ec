import bfet from 'bfet';

// IssuesManager parse issues.json and feed data for components that need it
class IssuesManager {
  static isParsed = false;

  static totalIssues;
  static totalOpenIssues;
  static totalClosedIssues;

  static openIssuesJson;
  static closedIssuesJson;

  static fetch() {
    return new Promise((resolve, reject) => {

      var prefix = window.location.origin.startsWith("https") ? "https://" : "http://";

      if (!this.isParsed) {
        bfet.get(prefix + "gens.wasin.io/ec/issues_open.json")
        .then((r1) => {
          bfet.get(prefix + "gens.wasin.io/ec/issues_closed.json").
            then((r2) => {
              // save all result
              this.openIssuesJson = r1;
              this.closedIssuesJson = r2;

              // parse all result
              this.parse();

              // now everything alright, set that we've parsed it
              this.isParsed = true;
              return resolve("OK");
            }, (e2) => {
              return reject(e2);
            });
        }, (e1) => {
          return reject(e1);
        });
      }
      else {
        return resolve("OK");
      }
    });
  }

  static forceParse() {
    this.isParsed = false;
    this.fetch();
  }

  static parse() {
    this._findTotalIssues();
  }

  static _findTotalIssues() {
    this.totalOpenIssues = this.openIssuesJson.length;
    this.totalClosedIssues = this.closedIssuesJson.length;
    this.totalIssues = this.totalOpenIssues + this.totalClosedIssues;
  }
}

export default IssuesManager;
