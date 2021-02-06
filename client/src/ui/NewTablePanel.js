/* Copyright 2018 Kevin Zatloual. All rights reserved. */

import React from 'react';
import TableDnD from './TableDnD';


/** UI allowing the client to upload or select a table to import. */
export default class NewTablePanel extends React.Component {
  render() {
    return (
        <div>
          <h3>New Table</h3>
          <p>Select one of the following tables to import:</p>
          <ul>
            <li><a onClick={this.importTable.bind(this, 'Truly Linear Data', '/examples/fake-linear.csv')}
                   href="#linear">Truly Linear Data</a></li>
            <li><a onClick={this.importTable.bind(this, 'Truly Logistic Data', '/examples/fake-logistic.csv')}
                   href="#logistic">Truly Logistic Data</a></li>
            <li><a onClick={this.importTable.bind(this, 'Drafted WRs', '/examples/drafted-wrs.csv')}
                   href="#receivers">Drafted WRs</a></li>
            <li><a onClick={this.importTable.bind(this, 'ValueX Returns', '/examples/valuex-returns.csv')}
                   href="#valuex">ValueX Returns</a></li>
            <li><a onClick={this.importTable.bind(this, 'RB Types', '/examples/rb-types.csv')}
                   href="#rb_types">RB Types</a></li>
            <li><a onClick={this.importTable.bind(this, '2018 Drafted RBs', '/examples/drafted-rbs-2018.csv')}
                   href="#rbs_2018">Drafted RBs (2018)</a></li>
          </ul>

          <p>Or drag your own CSV file below.</p>
          <TableDnD onFileUpload={this.props.onFileUpload}/>
        </div>);
  }

  importTable(name, path, evt) {
    evt.preventDefault();
    evt.stopPropagation();

    this.props.onFileImport(name, path);

    window['gtag']('event', 'import', {event_label: path});
  }
}
