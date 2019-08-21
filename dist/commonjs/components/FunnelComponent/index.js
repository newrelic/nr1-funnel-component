"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _taggedTemplateLiteral2 = require("babel-runtime/helpers/taggedTemplateLiteral");

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(["", ""], ["", ""]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _funnelGraphJs = require("funnel-graph-js");

var _funnelGraphJs2 = _interopRequireDefault(_funnelGraphJs);

var _lodash = require("lodash");

var _graphqlTag = require("graphql-tag");

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

var _niceColorPalettes = require("nice-color-palettes");

var _niceColorPalettes2 = _interopRequireDefault(_niceColorPalettes);

var _nr = require("nr1");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function get_color_set() {
  var num = Math.floor(Math.random() * 100);
  num = num >= 0 ? num : 0;
  return [_niceColorPalettes2.default[num][2]];
}

var FunnelComponent = function (_React$Component) {
  (0, _inherits3.default)(FunnelComponent, _React$Component);

  function FunnelComponent(props) {
    (0, _classCallCheck3.default)(this, FunnelComponent);
    return (0, _possibleConstructorReturn3.default)(this, (FunnelComponent.__proto__ || (0, _getPrototypeOf2.default)(FunnelComponent)).call(this, props));
  }

  (0, _createClass3.default)(FunnelComponent, [{
    key: "_buildGql",
    value: function _buildGql() {
      var _this2 = this;

      var _props = this.props,
          accountId = _props.accountId,
          series = _props.series;

      return "{\n      actor {\n        account(id: " + accountId + ") {\n          " + series.map(function (s) {
        return (0, _lodash.camelCase)(s.label) + ":nrql(query: \"" + _this2._constructFunnelNrql(s) + "\") {\n              results\n            }";
      }) + "\n        }\n      }\n    }";
    }
  }, {
    key: "_constructFunnelNrql",
    value: function _constructFunnelNrql(series) {
      var _props2 = this.props,
          funnel = _props2.funnel,
          steps = _props2.steps;
      var duration = this.props.launcherUrlState.timeRange.duration;

      var since = "SINCE " + duration / 1000 / 60 + " MINUTES AGO";
      return "FROM " + funnel.event + " SELECT funnel(" + funnel.measure + " " + steps.map(function (step) {
        return ", WHERE " + step.nrql + " as '" + step.label + "'";
      }).join(" ") + ") WHERE " + series.nrql + " " + since;
    }
  }, {
    key: "_getData",
    value: function _getData() {
      var _this3 = this;

      var query = this._buildGql();
      //console.log("query", [NerdGraphQuery, query]); //eslint-disable-line
      return _nr.NerdGraphQuery.query({ query: (0, _graphqlTag2.default)(_templateObject, query) }).then(function (_ref) {
        var data = _ref.data;
        var _props3 = _this3.props,
            series = _props3.series,
            steps = _props3.steps;

        var results = {
          subLabels: series.map(function (s) {
            return s.label;
          }),
          labels: steps.map(function (step) {
            return step.label;
          }),
          colors: series.map(function (s) {
            return get_color_set();
          }), //eslint-disable-line
          values: []
        };
        //console.debug(data);
        series.forEach(function (s) {
          var _steps = (0, _lodash.get)(data, "actor.account." + (0, _lodash.camelCase)(s.label) + ".results[0].steps");
          if (results.values.length == 0) {
            _steps.forEach(function (step) {
              results.values.push([step]);
            });
          } else {
            _steps.forEach(function (step, i) {
              results.values[i].push(step);
            });
          }
        });
        return results;
      });
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var _this4 = this;

      var next = (0, _stringify2.default)({
        funnel: nextProps.funnel,
        series: nextProps.series,
        steps: nextProps.steps
      });
      var current = (0, _stringify2.default)({
        funnel: this.props.funnel,
        series: this.props.series,
        steps: this.props.steps
      });
      var nextRange = nextProps.launcherUrlState ? nextProps.launcherUrlState.timeRange.duration : null;
      var currentRange = this.props.launcherUrlState ? this.props.launcherUrlState.timeRange.duration : null;
      if (next !== current || nextRange !== currentRange) {
        this._getData().then(function (data) {
          _this4.graph.updateData(data);
        });
      }
      return true;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this5 = this;

      var _props4 = this.props,
          height = _props4.height,
          width = _props4.width;

      this._getData().then(function (data) {
        _this5.graph = new _funnelGraphJs2.default({
          container: ".funnel",
          gradientDirection: "vertical",
          data: data,
          displayPercent: true,
          direction: "vertical",
          width: width,
          height: height,
          subLabelValue: "percent"
        });

        _this5.graph.draw();
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      return _react2.default.createElement("div", { className: "funnel", ref: function ref(_ref2) {
          return _this6._ref = _ref2;
        } });
    }
  }]);
  return FunnelComponent;
}(_react2.default.Component);

FunnelComponent.propTypes = {
  accountId: _propTypes2.default.number.isRequired,
  launcherUrlState: _propTypes2.default.object.isRequired,
  height: _propTypes2.default.number,
  width: _propTypes2.default.number,
  funnel: _propTypes2.default.shape({
    event: _propTypes2.default.string.isRequired,
    measure: _propTypes2.default.string.isRequired //what are we funneling?
  }).isRequired,
  steps: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    label: _propTypes2.default.string.isRequired,
    nrql: _propTypes2.default.string.isRequired //fragment of NRQL used ot construct the series of funnel queries
  })),
  series: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    label: _propTypes2.default.string.isRequired,
    nrql: _propTypes2.default.string.isRequired //fragment of NRQL used ot construct the series of funnel queries
  }))
};
FunnelComponent.defaultProps = {
  width: 200,
  height: 575
};
exports.default = FunnelComponent;