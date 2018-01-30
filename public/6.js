webpackJsonp([6],{

/***/ 120:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(710)
}
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(712)
/* template */
var __vue_template__ = __webpack_require__(713)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\views\\static-resource\\project-list.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-37f27ca4", Component.options)
  } else {
    hotAPI.reload("data-v-37f27ca4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(252)
}
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(254)
/* template */
var __vue_template__ = __webpack_require__(255)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\views\\tables\\components\\canEditTable.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-87a363a0", Component.options)
  } else {
    hotAPI.reload("data-v-87a363a0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 252:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(253);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(5)("bc1e3080", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-87a363a0\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../../node_modules/less-loader/index.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./canEditTable.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-87a363a0\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../../node_modules/less-loader/index.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./canEditTable.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 253:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, "\n.show-edit-btn {\n  display: none;\n  margin-left: -10px;\n}\n.ivu-table-cell:hover .show-edit-btn {\n  display: inline-block;\n}\n", ""]);

// exports


/***/ }),

/***/ 254:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//

var editButton = function editButton(vm, h, currentRow, index) {
    return h('Button', {
        props: {
            type: currentRow.editting ? 'success' : 'primary',
            loading: currentRow.saving
        },
        style: {
            margin: '0 5px'
        },
        on: {
            'click': function click() {
                if (!currentRow.editting) {
                    if (currentRow.edittingCell) {
                        for (var name in currentRow.edittingCell) {
                            currentRow.edittingCell[name] = false;
                            vm.edittingStore[index].edittingCell[name] = false;
                        }
                    }
                    vm.edittingStore[index].editting = true;
                    vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                } else {
                    vm.edittingStore[index].saving = true;
                    vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                    var edittingRow = vm.edittingStore[index];
                    edittingRow.editting = false;
                    edittingRow.saving = false;
                    vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                    vm.$emit('input', vm.handleBackdata(vm.thisTableData));
                    vm.$emit('on-change', vm.handleBackdata(vm.thisTableData), index);
                }
            }
        }
    }, currentRow.editting ? '保存' : '编辑');
};
var deleteButton = function deleteButton(vm, h, currentRow, index) {
    return h('Poptip', {
        props: {
            confirm: true,
            title: '您确定要删除这条数据吗?',
            transfer: true
        },
        on: {
            'on-ok': function onOk() {
                vm.thisTableData.splice(index, 1);
                vm.$emit('input', vm.handleBackdata(vm.thisTableData));
                vm.$emit('on-delete', vm.handleBackdata(vm.thisTableData), index);
            }
        }
    }, [h('Button', {
        style: {
            margin: '0 5px'
        },
        props: {
            type: 'error',
            placement: 'top'
        }
    }, '删除')]);
};
var incellEditBtn = function incellEditBtn(vm, h, param) {
    if (vm.hoverShow) {
        return h('div', {
            'class': {
                'show-edit-btn': vm.hoverShow
            }
        }, [h('Button', {
            props: {
                type: 'text',
                icon: 'edit'
            },
            on: {
                click: function click(event) {
                    vm.edittingStore[param.index].edittingCell[param.column.key] = true;
                    vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                }
            }
        })]);
    } else {
        return h('Button', {
            props: {
                type: 'text',
                icon: 'edit'
            },
            on: {
                click: function click(event) {
                    vm.edittingStore[param.index].edittingCell[param.column.key] = true;
                    vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                }
            }
        });
    }
};
var saveIncellEditBtn = function saveIncellEditBtn(vm, h, param) {
    return h('Button', {
        props: {
            type: 'text',
            icon: 'checkmark'
        },
        on: {
            click: function click(event) {
                vm.edittingStore[param.index].edittingCell[param.column.key] = false;
                vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                vm.$emit('input', vm.handleBackdata(vm.thisTableData));
                vm.$emit('on-cell-change', vm.handleBackdata(vm.thisTableData), param.index, param.column.key);
            }
        }
    });
};
var cellInput = function cellInput(vm, h, param, item) {
    return h('Input', {
        props: {
            type: 'text',
            value: vm.edittingStore[param.index][item.key]
        },
        on: {
            'on-change': function onChange(event) {
                var key = item.key;
                vm.edittingStore[param.index][key] = event.target.value;
            }
        }
    });
};
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'canEditTable',
    props: {
        refs: String,
        columnsList: Array,
        value: Array,
        url: String,
        editIncell: {
            type: Boolean,
            default: false
        },
        hoverShow: {
            type: Boolean,
            default: false
        }
    },
    data: function data() {
        return {
            columns: [],
            thisTableData: [],
            edittingStore: []
        };
    },
    created: function created() {
        this.init();
    },

    methods: {
        init: function init() {
            var _this = this;

            var vm = this;
            var editableCell = this.columnsList.filter(function (item) {
                if (item.editable) {
                    if (item.editable === true) {
                        return item;
                    }
                }
            });
            var cloneData = JSON.parse(JSON.stringify(this.value));
            var res = [];
            res = cloneData.map(function (item, index) {
                var isEditting = false;
                if (_this.thisTableData[index]) {
                    if (_this.thisTableData[index].editting) {
                        isEditting = true;
                    } else {
                        for (var cell in _this.thisTableData[index].edittingCell) {
                            if (_this.thisTableData[index].edittingCell[cell] === true) {
                                isEditting = true;
                            }
                        }
                    }
                }
                if (isEditting) {
                    return _this.thisTableData[index];
                } else {
                    _this.$set(item, 'editting', false);
                    var edittingCell = {};
                    editableCell.forEach(function (item) {
                        edittingCell[item.key] = false;
                    });
                    _this.$set(item, 'edittingCell', edittingCell);
                    return item;
                }
            });
            this.thisTableData = res;
            this.edittingStore = JSON.parse(JSON.stringify(this.thisTableData));
            this.columnsList.forEach(function (item) {
                if (item.editable) {
                    item.render = function (h, param) {
                        var currentRow = _this.thisTableData[param.index];
                        if (!currentRow.editting) {
                            if (_this.editIncell) {
                                return h('Row', {
                                    props: {
                                        type: 'flex',
                                        align: 'middle',
                                        justify: 'center'
                                    }
                                }, [h('Col', {
                                    props: {
                                        span: '22'
                                    }
                                }, [!currentRow.edittingCell[param.column.key] ? h('span', currentRow[item.key]) : cellInput(_this, h, param, item)]), h('Col', {
                                    props: {
                                        span: '2'
                                    }
                                }, [currentRow.edittingCell[param.column.key] ? saveIncellEditBtn(_this, h, param) : incellEditBtn(_this, h, param)])]);
                            } else {
                                return h('span', currentRow[item.key]);
                            }
                        } else {
                            return h('Input', {
                                props: {
                                    type: 'text',
                                    value: currentRow[item.key]
                                },
                                on: {
                                    'on-change': function onChange(event) {
                                        var key = param.column.key;
                                        vm.edittingStore[param.index][key] = event.target.value;
                                    }
                                }
                            });
                        }
                    };
                }
                if (item.handle) {
                    item.render = function (h, param) {
                        var currentRowData = _this.thisTableData[param.index];
                        if (item.handle.length === 2) {
                            return h('div', [editButton(_this, h, currentRowData, param.index), deleteButton(_this, h, currentRowData, param.index)]);
                        } else if (item.handle.length === 1) {
                            if (item.handle[0] === 'edit') {
                                return h('div', [editButton(_this, h, currentRowData, param.index)]);
                            } else {
                                return h('div', [deleteButton(_this, h, currentRowData, param.index)]);
                            }
                        }
                    };
                }
            });
        },
        handleBackdata: function handleBackdata(data) {
            var clonedData = JSON.parse(JSON.stringify(data));
            clonedData.forEach(function (item) {
                delete item.editting;
                delete item.edittingCell;
                delete item.saving;
            });
            return clonedData;
        },
        OnSelectionChange: function OnSelectionChange(selection) {
            this.$emit('on-selection-change', selection);
        },
        OnSelectionAll: function OnSelectionAll(selection) {
            this.$emit('on-selection-all', selection);
        },
        OnSelect: function OnSelect(selection, raw) {
            this.$emit('on-select', { selection: selection, raw: raw });
        }
    },
    watch: {
        value: function value(data) {
            this.init();
        }
    }
});

/***/ }),

/***/ 255:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("Table", {
        ref: _vm.refs,
        attrs: {
          columns: _vm.columnsList,
          data: _vm.thisTableData,
          border: "",
          "disabled-hover": ""
        },
        on: {
          "on-selection-change": _vm.OnSelectionChange,
          "on-select-all": _vm.OnSelectionAll,
          "on-select": _vm.OnSelect
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-87a363a0", module.exports)
  }
}

/***/ }),

/***/ 710:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(711);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(5)("369c1404", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-37f27ca4\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./project-list.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-37f27ca4\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./project-list.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 711:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 712:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tables_components_canEditTable_vue__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tables_components_canEditTable_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__tables_components_canEditTable_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__libs_util__ = __webpack_require__(6);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      editInlineAndCellColumn: [{
        type: 'selection',
        width: 60,
        align: 'center'
      }, {
        title: '序号',
        width: 80,
        align: 'center',
        key: 'id'
      }, {
        title: '项目名称',
        align: 'center',
        key: 'name',
        width: 200,
        editable: true
      }, {
        title: '已有版本',
        align: 'center',
        key: 'version',
        width: 200
      }, {
        title: '项目描述',
        align: 'center',
        width: 400,
        key: 'remake',
        editable: true
      }, {
        title: '开源地址',
        align: 'center',
        width: 200,
        key: 'open_url',
        editable: true
      }, {
        title: '官方网站',
        align: 'center',
        width: 150,
        key: 'site',
        editable: true
      }, {
        title: 'README',
        align: 'center',
        width: 200,
        key: 'readme',
        editable: true
      }, {
        title: '操作',
        align: 'center',
        width: 180,
        key: 'handle',
        handle: ['edit', 'delete']
      }],
      editInlineAndCellData: [],
      saveTableData: [],
      editProjectData: {
        name: '',
        open_url: '',
        site: '',
        readme: '',
        remake: ''
      },
      ruleCustom: {
        name: { required: true, message: '名称不能为空', trigger: 'blur' }
      },
      selectId: [],
      tableSelectAllStatus: false,
      addModelStatus: false,
      modelLoading: true
    };
  },

  methods: {
    getListData: function getListData() {
      var _this = this;

      this.$axios.get('/api/project', {}).then(function (res) {
        if (res.success) {
          _this.editInlineAndCellData = _this.saveTableData = res.data.data;
        }
      });
    },
    handleDel: function handleDel(val, index) {
      var _this2 = this;

      this.$axios({ url: '/api/project', method: 'delete', data: { ids: this.saveTableData[index]['id'] } }).then(function (res) {
        if (res.success) {
          _this2.$Message.success('删除了第' + (index + 1) + '行数据');
          _this2.saveTableData.splice(index, 1);
        }
      });
      return false;
    },
    handleCellChange: function handleCellChange(val, index, key) {
      var _this3 = this;

      var data = {};
      data['id'] = this.saveTableData[index].id;
      data[key] = val[index][key];

      this.updateServerData(data).then(function (res) {
        if (res.success) {
          _this3.$Message.success('修改了第 ' + (index + 1) + ' 行列名为 ' + key + ' 的数据');
        } else {
          _this3.$Message.error('修改失败');
        }
      });
    },
    handleChange: function handleChange(val, index) {
      var _this4 = this;

      var data = {};

      this.getEditColum().forEach(function (value, i) {
        data[value] = val[index][value];
      });
      data['id'] = val[index]['id'];
      this.updateServerData(data).then(function (res) {
        if (res.success) {
          _this4.$Message.success('成功修改了第' + (index + 1) + '行数据');
        } else {
          _this4.$Message.error('修改失败');
        }
      });
    },
    getEditColum: function getEditColum() {
      var arr = [];
      this.editInlineAndCellColumn.forEach(function (val, index) {
        if (val.hasOwnProperty('editable') && val.editable) {
          arr.push(val.key);
        }
      });
      return arr;
    },
    updateServerData: function updateServerData(data) {
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        _this5.$axios.post('/api/project', data).then(function (res) {
          resolve(res);
        }).catch(function (e) {
          reject(e);
        });
      });
    },
    showAddModel: function showAddModel() {
      this.addModelStatus = true;
    },
    selectChange: function selectChange(val, raw) {
      this.selectId = __WEBPACK_IMPORTED_MODULE_1__libs_util__["a" /* default */].getIdFromData(val);
    },
    onModelOk: function onModelOk(formName) {
      var _this6 = this;

      this.$refs[formName].validate(function (valid) {
        if (valid) {
          // 服务器交互
          _this6.$axios.post('/api/project', _this6.editProjectData).then(function (res) {
            if (res.success) {
              if (!res.data.is_update) {
                _this6.editProjectData['id'] = res.data.last_id;
                _this6.editInlineAndCellData.push(_this6.editProjectData);
                //this.saveTableData.push(this.editProjectData)
                _this6.$Message.success('操作成功', 2);
                _this6.addModelStatus = false;
              } else {
                _this6.$Message.error('操作失败', 2);
              }
            }
          });
        }
      });
      setTimeout(function () {
        _this6.modelLoading = false;
        _this6.$nextTick(function () {
          _this6.modelLoading = true;
        });
      }, 2000);
      return false;
    },
    cancel: function cancel() {},
    deleteAll: function deleteAll() {
      var _this7 = this;

      var ids = this.selectId.join(',');
      this.$axios({ url: '/api/project', method: 'delete', data: { ids: ids } }).then(function (res) {
        if (res.success) {
          _this7.$Message.success('删除了第' + ids + '行数据');
          for (var i = 0; i < _this7.selectId.length; i++) {
            _this7.saveTableData.splice(_this7.selectId[i], 1);
          }
        }
      });
      return false;
    }
  },
  components: {
    canEditTable: __WEBPACK_IMPORTED_MODULE_0__tables_components_canEditTable_vue___default.a
  },
  created: function created() {
    this.getListData();
  }
});

/***/ }),

/***/ 713:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "Row",
    { staticClass: "margin-top-10" },
    [
      _c(
        "Col",
        { attrs: { span: "24" } },
        [
          _c(
            "Card",
            [
              _c(
                "Button",
                {
                  attrs: { type: "success" },
                  on: {
                    click: function($event) {
                      _vm.showAddModel()
                    }
                  }
                },
                [_vm._v("新增")]
              ),
              _vm._v(" "),
              _c(
                "Button",
                {
                  attrs: { type: "warning" },
                  on: {
                    click: function($event) {
                      _vm.deleteAll()
                    }
                  }
                },
                [_vm._v("批量删除")]
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "Card",
            [
              _c(
                "p",
                { attrs: { slot: "title" }, slot: "title" },
                [
                  _c("Icon", { attrs: { type: "ios-keypad" } }),
                  _vm._v("\n\t\t\t项目列表\n    ")
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "Row",
                { attrs: { gutter: 12 } },
                [
                  _c("Col", { attrs: { span: "24" } }, [
                    _c(
                      "div",
                      { staticClass: "edittable-table-height-con" },
                      [
                        _c("can-edit-table", {
                          attrs: {
                            refs: "table4",
                            editIncell: true,
                            "columns-list": _vm.editInlineAndCellColumn
                          },
                          on: {
                            "on-cell-change": _vm.handleCellChange,
                            "on-change": _vm.handleChange,
                            "on-delete": _vm.handleDel,
                            "on-selection-change": _vm.selectChange,
                            "on-select-all": _vm.selectChange,
                            "on-select": _vm.selectChange
                          },
                          model: {
                            value: _vm.editInlineAndCellData,
                            callback: function($$v) {
                              _vm.editInlineAndCellData = $$v
                            },
                            expression: "editInlineAndCellData"
                          }
                        })
                      ],
                      1
                    )
                  ])
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "Modal",
        {
          attrs: { loading: _vm.modelLoading, title: "添加项目" },
          on: {
            "on-ok": function($event) {
              _vm.onModelOk("formCustom")
            }
          },
          model: {
            value: _vm.addModelStatus,
            callback: function($$v) {
              _vm.addModelStatus = $$v
            },
            expression: "addModelStatus"
          }
        },
        [
          _c(
            "Form",
            {
              ref: "formCustom",
              attrs: {
                model: _vm.editProjectData,
                rules: _vm.ruleCustom,
                "label-width": 80
              }
            },
            [
              _c(
                "FormItem",
                { attrs: { label: "项目名称", prop: "name" } },
                [
                  _c("Input", {
                    attrs: { type: "text" },
                    model: {
                      value: _vm.editProjectData.name,
                      callback: function($$v) {
                        _vm.$set(_vm.editProjectData, "name", $$v)
                      },
                      expression: "editProjectData.name"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "FormItem",
                { attrs: { label: "开源地址", prop: "open_url" } },
                [
                  _c("Input", {
                    attrs: { type: "text" },
                    model: {
                      value: _vm.editProjectData.open_url,
                      callback: function($$v) {
                        _vm.$set(_vm.editProjectData, "open_url", $$v)
                      },
                      expression: "editProjectData.open_url"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "FormItem",
                { attrs: { label: "官方网站", prop: "site" } },
                [
                  _c("Input", {
                    attrs: { type: "text" },
                    model: {
                      value: _vm.editProjectData.site,
                      callback: function($$v) {
                        _vm.$set(_vm.editProjectData, "site", $$v)
                      },
                      expression: "editProjectData.site"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "FormItem",
                { attrs: { label: "README地址", prop: "readme" } },
                [
                  _vm._t("label", [_vm._v("可以是地址也可以是内容")]),
                  _vm._v(" "),
                  _c("Input", {
                    attrs: { type: "textarea" },
                    model: {
                      value: _vm.editProjectData.readme,
                      callback: function($$v) {
                        _vm.$set(_vm.editProjectData, "readme", $$v)
                      },
                      expression: "editProjectData.readme"
                    }
                  })
                ],
                2
              ),
              _vm._v(" "),
              _c(
                "FormItem",
                { attrs: { label: "项目描述", prop: "name" } },
                [
                  _c("Input", {
                    attrs: { type: "textarea" },
                    model: {
                      value: _vm.editProjectData.remake,
                      callback: function($$v) {
                        _vm.$set(_vm.editProjectData, "remake", $$v)
                      },
                      expression: "editProjectData.remake"
                    }
                  })
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-37f27ca4", module.exports)
  }
}

/***/ })

});