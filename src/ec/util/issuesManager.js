import bfet from 'bfet';

// IssuesManager parse issues.json and feed data for components that need it
class IssuesManager {
  static totalIssues;
  static totalOpenIssues;
  static totalClosedIssues;

  static openIssuesJson;
  static closedIssuesJson;

  static fetch() {
    return new Promise((resolve, reject) => {
      // request for issues_open
      bfet.get("https://gens.wasin.io/ec/issues_open.json")
        .then((result) => {
          // save result
          this.openIssuesJson = result.response;

          return bfet.get("https://gens.wasin.io/ec/issues_closed.json")
        }, (e) => {
          return reject(e);
        })
      // request for issues_closed
      .then((result) => {
        // save result
        this.closedIssuesJson = result.response;

        // set received values
        this.totalOpenIssues = this.openIssuesJson.length;
        this.totalClosedIssues = this.closedIssuesJson.length;
        this.totalIssues = this.totalOpenIssues + this.totalClosedIssues;

        return resolve("OK");
      }, (e) => {
        return reject(e);
      });
    });
  }

  static forceParse() {
    this.isParsed = false;
    this.fetch();
  }
}

export default IssuesManager;
