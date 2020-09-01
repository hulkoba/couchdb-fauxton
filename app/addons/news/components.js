// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations under
// the License.

import React from "react";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function LoadNewsButton(props) {
  return (
    <div>
      <p>
        When you click this button, you are requesting content and sharing your IP address with <a href="https://blog.couchdb.org/">blog.couchdb.org</a> which is edited by the Apache CouchDB PMC and maintained by <a href="https://wordpress.com/">wordpress.com</a>.
      </p>
      <p>
        If you don’t want to share your IP address, do not click the button.
      </p>
      <button className="btn btn-primary" onClick={props.showNews}>Load News</button>
      <label className="news-checkbox">
        <input type="checkbox"
          checked={props.isChecked}
          onChange={props.toggleCookieSave}
        />
        Remember my choice
      </label>
    </div>
  );
}

class NewsPage extends React.Component {
  constructor (props) {
    super(props);
    this.showNews = this.showNews.bind(this);
    this.toggleCookieSave = this.toggleCookieSave.bind(this);

    const hasCookie = !!cookies.get('allow-IP-sharing');
    this.state = {
      showNews: hasCookie ? true : false,
      hasCookie
    };
  }

  showNews() {
    this.setState({ showNews: true });
  }

  toggleCookieSave() {
    if (!this.state.hasCookie) {
      this.setState(() => {
        return { hasCookie: true };
      });
      cookies.set('allow-IP-sharing', 'true', { sameSite: 'Strict' });

    } else {
      this.setState(() => {
        return { hasCookie: false };
      });
      cookies.remove('allow-IP-sharing');
    }
  }

  render() {
    return (
      <div id="news-page" className="">
        {this.state.showNews ?
          <iframe src="https://blog.couchdb.org" width="100%" height="100%"></iframe>
          :
          <LoadNewsButton
            showNews={this.showNews}
            toggleCookieSave={this.toggleCookieSave}
            isChecked={this.state.hasCookie}
          ></LoadNewsButton>
        }
      </div>
    );
  }
}

export default {
  NewsPage: NewsPage
};
