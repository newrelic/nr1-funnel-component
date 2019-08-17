import React from "react";
import PropTypes from "prop-types";
import FunnelGraph from "funnel-graph-js";
import { get, camelCase } from "lodash";
import gql from "graphql-tag";
import colors from "nice-color-palettes";
import { NerdGraphQuery } from "nr1";

function get_color_set() {
  let num = Math.floor(Math.random() * 100);
  num = num >= 0 ? num : 0;
  return [colors[num][2]];
}

export default class FunnelComponent extends React.Component {
  static propTypes = {
    accountId: PropTypes.number.isRequired,
    launcherUrlState: PropTypes.object.isRequired,
    funnel: PropTypes.shape({
      event: PropTypes.string.isRequired,
      measure: PropTypes.string.isRequired //what are we funneling?
    }).isRequired,
    steps: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        nrql: PropTypes.string.isRequired //fragment of NRQL used ot construct the series of funnel queries
      })
    ),
    series: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        nrql: PropTypes.string.isRequired //fragment of NRQL used ot construct the series of funnel queries
      })
    )
  };

  constructor(props) {
    super(props);
  }

  _buildGql() {
    const { accountId, series } = this.props;
    return `{
      actor {
        account(id: ${accountId}) {
          ${series.map(s => {
            return `${camelCase(
              s.label
            )}:nrql(query: "${this._constructFunnelNrql(s)}") {
              results
            }`;
          })}
        }
      }
    }`;
  }

  _constructFunnelNrql(series) {
    const { funnel, steps } = this.props;
    const { duration } = this.props.launcherUrlState.timeRange;
    const since = `SINCE ${duration / 1000 / 60} MINUTES AGO`;
    return `FROM ${funnel.event} SELECT funnel(${funnel.measure} ${steps
      .map(step => `, WHERE ${step.nrql} as '${step.label}'`)
      .join(" ")}) WHERE ${series.nrql} ${since}`;
  }

  _getData() {
    const query = this._buildGql();
    //console.log("query", [NerdGraphQuery, query]); //eslint-disable-line
    return NerdGraphQuery.query({ query: gql`${query}` }).then(({ data }) => {
      const { series, steps } = this.props;
      const results = {
        subLabels: series.map(s => s.label),
        labels: steps.map(step => step.label),
        colors: series.map(s => get_color_set()), //eslint-disable-line
        values: []
      };
      //console.debug(data);
      series.forEach(s => {
        const _steps = get(
          data,
          `actor.account.${camelCase(s.label)}.results[0].steps`
        );
        if (results.values.length == 0) {
          _steps.forEach(step => {
            results.values.push([step]);
          });
        } else {
          _steps.forEach((step, i) => {
            results.values[i].push(step);
          });
        }
      });
      return results;
    });
  }

  shouldComponentUpdate(nextProps) {
    const next = JSON.stringify({
      funnel: nextProps.funnel,
      series: nextProps.series,
      steps: nextProps.steps
    });
    const current = JSON.stringify({
      funnel: this.props.funnel,
      series: this.props.series,
      steps: this.props.steps
    });
    const nextRange = nextProps.launcherUrlState
      ? nextProps.launcherUrlState.timeRange.duration
      : null;
    const currentRange = this.props.launcherUrlState
      ? this.props.launcherUrlState.timeRange.duration
      : null;
    if (next !== current || nextRange != currentRange) {
      this._getData().then(data => {
        this.graph.updateData(data);
      });
    }
    return true;
  }

  componentDidMount() {
    this._getData().then(data => {
      this.graph = new FunnelGraph({
        container: ".funnel",
        gradientDirection: "vertical",
        data: data,
        displayPercent: true,
        direction: "vertical",
        width: 200,
        height: 575,
        subLabelValue: "percent"
      });

      this.graph.draw();
    });
  }

  render() {
    return <div className="funnel" ref={ref => (this._ref = ref)}></div>;
  }
}
