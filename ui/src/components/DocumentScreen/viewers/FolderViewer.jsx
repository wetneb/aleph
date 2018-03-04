import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';

import SearchContext from 'src/components/search/SearchContext';
import { DocumentToolbar } from 'src/components/Toolbar';

import './FolderViewer.css';

class FolderViewer extends Component {
  constructor(props) {
    super(props);


  }

  render() {
    const { document } = this.props;

    if (!document || !document.id || !document.links) {
      return null;
    }
    
    const context = {
      'filter:parent.id': document.id
    };
    
    const aspects = {
      filter: false,
      countries: false,
      collections: false
    };
    
    return (
      <React.Fragment>
        <DocumentToolbar document={document} />
        <div id="children" className="FolderViewer">
          <SearchContext context={context} aspects={aspects} />
          {document.children === 0 && (
            <p className="folder-empty pt-text-muted">
              <FormattedMessage
                id="folder.empty"
                defaultMessage="This folder is empty."/>
            </p>
          )}
        </div>
      </React.Fragment>
    );
  }
}

FolderViewer = withRouter(FolderViewer)
export default FolderViewer;
