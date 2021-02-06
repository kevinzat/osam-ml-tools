/* Copyright 2018 Kevin Zatloual. All rights reserved. */

import React from 'react';
import { FormatNumber } from './FormatUtil';


/** Displays information about K-Means clusters. */
export default class KMeansClustersPanel extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.model.k === undefined)
      this.props.model.k = 10;

    this.state = {k: this.props.model.k};
  }

  handleK(k, evt) {
    evt.stopPropagation();
    evt.preventDefault();

    this.props.model.k = k;
    this.setState({k: this.props.model.k});
  }

  render() {
      const features = this.props.model.features;
      let fits = this.props.model.trainErrs;

      let frows = [];
      for (let i = 0 ; i < fits.length; i++) {
        frows.push(
            <tr key={i}>
              <td style={{paddingTop: '2px', paddingBottom: '0'}}>{i+1}</td>
              <td style={{paddingTop: '2px', paddingBottom: '0'}}>{FormatNumber(fits[i], 3)}</td>
            </tr>);
      }

      let kvalues = [];
      for (let i = 0 ; i < fits.length; i++) {
        let cls = (i+1 === this.state.k) ? 'dropdown-item active' : 'dropdown-item';
        kvalues.push(
            <a className={cls} href={"#k_" + i}
               onClick={this.handleK.bind(this, i+1)} key={i}>
              K = {i+1}
            </a>);
      }

      let [allCenters, allScales] = this.props.model.params;
      let centers = allCenters[this.state.k-1];
      let scales = allScales[this.state.k-1];

      let shcols = [];
      for (let j = 0; j < features.length; j++) {
        shcols.push(<th key={j}>{features[j].name}</th>);
      }

      let scols = [];
      for (let j = 0; j < scales.length; j++) {
        scols.push(<td key={j}>{FormatNumber(1.0 / scales[j], 3)}</td>);
      }

      let chcols = [<th key={0}>Number</th>];
      for (let j = 0; j < features.length; j++) {
        chcols.push(<th key={1+j}>{features[j].name}</th>);
      }

      let crows = [];
      for (let i = 0; i < centers.length; i++) {
        let ccols = [<td key={0}>{i+1}</td>];
        for (let j = 0; j < centers[i].length; j++)
          ccols.push(<td key={1+j}>{FormatNumber(centers[i][j], 3)}</td>);
        crows.push(<tr key={i}>{ccols}</tr>);
      }

      return (
          <div>
            <h2>Fit</h2>
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th width="33%">K</th>
                  <th width="67%">Avg Dist to Center</th>
                </tr>
              </thead>
              <tbody>
                {frows}
              </tbody>
            </table>

            <div style={{marginTop: '50px'}}>
              <div className="dropdown">
                <button className="btn btn-sm btn-secondary dropdown-toggle"
                        style={{backgroundColor: 'black'}}
                        type="button" id="kBtn" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                  K = {this.state.k}
                </button>
                <div className="dropdown-menu" aria-labelledby="kBtn">
                  {kvalues}
                </div>
              </div>
            </div>

            <h2 style={{marginTop: '50px'}}>Scales</h2>
            <table className="table table-borderless">
              <tbody>
                <tr>{shcols}</tr>
                <tr>{scols}</tr>
              </tbody>
            </table>

            <h2 style={{marginTop: '50px'}}>Centers</h2>
            <table className="table table-borderless">
              <thead>
                <tr style={{backgroundColor: '#f0f0f0'}}>{chcols}</tr>
              </thead>
              <tbody>{crows}</tbody>
            </table>
          </div>);
  }
}
