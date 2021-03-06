"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _FieldVirtualizedSelect = require("./FieldVirtualizedSelect");

var _FieldVirtualizedSelect2 = _interopRequireDefault(_FieldVirtualizedSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FieldSelect extends _react.Component {

  constructor(props, context) {

    super(props, context);

    _initialiseProps.call(this);

    const { _obj, _fld, _meta, mandatory } = props;
    const _val = _obj[_fld];

    this.state = {
      clearable: true,
      disabled: false,
      options: [_val],
      value: _val,
      multi: props.multi || false,
      searchable: true,
      selectedCreatable: null,
      mandatory: mandatory || _meta.mandatory
    };
  }

  render() {

    const { props, state, _loadOptions, _onChange } = this;
    const { _obj, _fld } = props;
    const { options, value, mandatory } = state;

    return _react2.default.createElement(_FieldVirtualizedSelect2.default, {
      name: _fld,
      async: true,
      cache: false,
      clearable: !mandatory,
      backspaceRemoves: false,
      labelKey: "presentation",
      valueKey: "ref",
      loadOptions: _loadOptions,
      minimumInput: 0,
      onChange: _onChange
      //onValueClick={this._goToGithubUser}
      , options: options,
      value: value
    });
  }
}
exports.default = FieldSelect;
FieldSelect.propTypes = {
  _obj: _react.PropTypes.object.isRequired,
  _fld: _react.PropTypes.string.isRequired,
  _meta: _react.PropTypes.object,

  multi: _react.PropTypes.bool, // множественный выбор - значение является массивом
  mandatory: _react.PropTypes.bool, // поле обязательно для заполнения

  handleValueChange: _react.PropTypes.func
};

var _initialiseProps = function () {
  this._loadOptions = input => {

    const selection = { _top: 40 };
    const { _obj, _fld, _meta } = this.props;

    if (input) {
      selection.presentation = { like: input };
    }
    if (_meta.choice_params) {
      _meta.choice_params.forEach(cp => {
        selection[cp.name] = cp.path;
      });
    }

    return _obj[_fld]._manager.get_option_list(selection).then(options => {
      this.setState({ options });
      return { options };
    });
  };

  this._onChange = value => {
    const { handleValueChange } = this.props;
    this.setState({ value });
    if (handleValueChange) {
      handleValueChange(value);
    }
  };
};