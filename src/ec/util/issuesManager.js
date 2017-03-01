import bfet from 'bfet';
import Credential from '../user/credential';

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
      bfet.get("https://api.github.com/issues?filter=created&state=open", null, { 
        username: Credential.username,
        password: Credential.password
      }).then((result) => {
          // save result
          this.openIssuesJson = result.response;

          return bfet.get("https://api.github.com/issues?filter=created&state=closed", null, {
            username: Credential.username,
            password: Credential.password
          });
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
}

export default IssuesManager;
