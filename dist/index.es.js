/**
 * Created by rockyl on 2020-03-11.
 */
var _a;
//todo script,dynamic
var Protocols;
(function (Protocols) {
    Protocols["RES"] = "res://";
    Protocols["ENTITY"] = "entity://";
})(Protocols || (Protocols = {}));
var protocols = (_a = {},
    _a[Protocols.RES] = res,
    _a[Protocols.ENTITY] = entity,
    _a);
function res(app, key, value) {
    var trulyValue;
    var uuid = value.replace(Protocols.RES, '');
    trulyValue = app.getRes(uuid);
    return trulyValue;
}
function entity(app, key, value, pid) {
    var trulyValue;
    var uuid = transPrefabUUID(value.replace(Protocols.ENTITY, ''), pid);
    trulyValue = app.entityMap[uuid];
    return trulyValue;
}
function transPrefabUUID(uuid, pid) {
    return pid ? pid + '_' + uuid : uuid;
}
//# sourceMappingURL=protocols.js.map

/**
 * Created by rockyl on 2020-03-10.
 */
var prefabID = 0;
/**
 * 实例化节点树
 * @param app
 * @param docConfig
 */
function instantiate(app, docConfig) {
    var pid;
    if (docConfig.docType === 'prefab') {
        pid = ++prefabID;
    }
    var rootEntity = setupEntityTree(app, docConfig, pid);
    setupComponent(app, docConfig, rootEntity, pid);
    enableComponent(app, docConfig, rootEntity);
    return rootEntity;
}
/**
 * 装配实体树
 * @param app
 * @param config
 * @param pid
 */
function setupEntityTree(app, config, pid) {
    var entity = null;
    if (config) {
        var type = config.type, name = config.name, uuid = config.uuid, children = config.children;
        if (pid !== undefined && uuid !== undefined) {
            uuid = pid + '_' + uuid;
        }
        entity = app.createEntity(type);
        if (name) {
            entity['name'] = name;
        }
        entity['uuid'] = uuid;
        injectProps(app, entity, config.props);
        app.entityMap[uuid] = entity;
        if (children) {
            for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
                var child = children_1[_i];
                var childEntity = setupEntityTree(app, child, pid);
                app.addDisplayNode(childEntity, entity);
            }
        }
    }
    return entity;
}
/**
 * 装配组件
 * @param app
 * @param config
 * @param entity
 * @param pid
 */
function setupComponent(app, config, entity, pid) {
    for (var i = 0, li = entity.children.length; i < li; i++) {
        var child = entity.children[i];
        var childConfig = config.children[i];
        var comps = childConfig.comps;
        if (comps) {
            var compManager = child.entityAdaptor.components;
            for (var _i = 0, comps_1 = comps; _i < comps_1.length; _i++) {
                var comp = comps_1[_i];
                var component = compManager.addComponent(comp.id, false);
                component.enabled = comp.enabled;
                injectProps(app, component, comp.props, pid);
                compManager.$onAddComponent(component, true);
            }
        }
        setupComponent(app, childConfig, child, pid);
    }
}
/**
 * 使能组件
 * @param app
 * @param config
 * @param entity
 * @param pid
 */
function enableComponent(app, config, entity, pid) {
    for (var i = 0, li = entity.children.length; i < li; i++) {
        var child = entity.children[i];
        var comps = config.children[i].comps;
        if (comps) {
            var compManager = child.entityAdaptor.components;
            compManager.setActive(true);
        }
    }
}
/**
 * 注入属性
 * @param app
 * @param target
 * @param props
 * @param pid
 */
function injectProps(app, target, props, pid) {
    if (props) {
        for (var field in props) {
            var value = props[field];
            if (typeof value === 'object') { //复杂数据
                transComplexProps(app, target, field, value);
            }
            else {
                transBaseProps(app, target, field, value, pid);
            }
        }
    }
}
function transComplexProps(app, target, field, value, pid) {
    var trulyValue = value;
    var override = false;
    switch (value.type) {
        case 'raw':
            override = true;
            trulyValue = value.data;
            break;
        default:
            if (Array.isArray(value) && !target[field]) {
                target[field] = [];
            }
            injectProps(app, target[field], value, pid);
            break;
    }
    if (override) {
        target[field] = trulyValue;
    }
}
/**
 * 转换基础类型的属性
 * @param app
 * @param target
 * @param field
 * @param value
 * @param pid
 */
function transBaseProps(app, target, field, value, pid) {
    var trulyValue = value;
    if (typeof value === 'string') {
        var hit = void 0;
        var protocolGroups = [protocols, app.options.protocols];
        for (var _i = 0, protocolGroups_1 = protocolGroups; _i < protocolGroups_1.length; _i++) {
            var protocols_1 = protocolGroups_1[_i];
            for (var protocol in protocols_1) {
                if (value.indexOf(protocol) === 0) {
                    var protocolFunc = protocols_1[protocol];
                    trulyValue = protocolFunc(app, field, value, pid);
                    hit = true;
                    break;
                }
            }
            if (hit) {
                break;
            }
        }
    }
    target[field] = trulyValue;
}
//# sourceMappingURL=interpreter.js.map

/**
 * Created by rockyl on 2020-03-08.
 */
/**
 * 应用
 */
var Application = /** @class */ (function () {
    function Application() {
        var _this = this;
        this._componentDefs = {};
        this._entityDefs = {};
        this.entityMap = {};
        /**
         * 主循环方法，需要在适配器的实现中调用
         * @param delta
         * @private
         */
        this._mainLoop = function (delta) {
            _this._options.traverseFunc(_this._options.stage, _this._onHit.bind(_this, delta));
        };
    }
    Object.defineProperty(Application.prototype, "options", {
        /**
         * 配置
         */
        get: function () {
            return this._options;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Application.prototype, "stage", {
        /**
         * 舞台实例
         */
        get: function () {
            return this._options.stage;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 装配适配器
     * @param options
     * @return mainLoop 主循环方法
     */
    Application.prototype.setupAdaptor = function (options) {
        this._options = options;
        return this._mainLoop;
    };
    /**
     * 实例化场景或者预制体
     * @param docConfig
     */
    Application.prototype.instantiate = function (docConfig) {
        return instantiate(this, docConfig);
    };
    /**
     * 注册组件类
     * @param id
     * @param def
     */
    Application.prototype.registerComponentDef = function (id, def) {
        if (def) {
            def['__class__'] = id;
            this._componentDefs[id] = def;
        }
    };
    /**
     * 批量注册组件类
     * @param defs {key: id, def}
     */
    Application.prototype.registerComponentDefs = function (defs) {
        if (defs) {
            for (var id in defs) {
                this.registerComponentDef(id, defs[id]);
            }
        }
    };
    /**
     * 注册实体类
     * @param type
     * @param def
     */
    Application.prototype.registerEntityDef = function (type, def) {
        if (def) {
            this._entityDefs[type] = def;
        }
    };
    /**
     * 批量注册实体类
     * @param defs
     */
    Application.prototype.registerEntityDefs = function (defs) {
        if (defs) {
            for (var type in defs) {
                this.registerEntityDef(type, defs[type].def);
            }
        }
    };
    /**
     * 创建实体实例
     * @param type
     */
    Application.prototype.createEntity = function (type) {
        var clazz = this._entityDefs[type];
        if (clazz) {
            var entity = new clazz();
            var entityAdaptor = new this._options.EntityAdaptor(entity, this);
            return entity;
        }
        else {
            throw new Error("type [" + type + "] not exists.");
        }
    };
    /**
     * 添加显示节点
     * @param node
     * @param parent
     */
    Application.prototype.addDisplayNode = function (node, parent) {
        this._options.addDisplayFunc(node, parent);
    };
    /**
     * 遍历显示节点
     * @param node
     * @param callback
     */
    Application.prototype.traverseDisplayNode = function (node, callback) {
        this._options.traverseFunc(node, callback);
    };
    /**
     * 冒泡显示节点
     * @param node
     * @param callback
     */
    Application.prototype.bubblingDisplayNode = function (node, callback) {
        this._options.bubblingFunc(node, callback);
    };
    /**
     * 加载资源
     * @param configs
     * @param onProgress
     * @param onComplete
     */
    Application.prototype.loadResource = function (configs, onProgress, onComplete) {
        this._options.loadResourceFunc(configs, onProgress, onComplete);
    };
    /**
     * 获取资源
     * @param name
     */
    Application.prototype.getRes = function (name) {
        return this._options.getResFunc(name);
    };
    /**
     * 遍历整个渲染树
     * @param delta
     * @param node
     * @private
     */
    Application.prototype._onHit = function (delta, node) {
        if (node['entityAdaptor']) {
            var entityAdaptor = node['entityAdaptor'];
            entityAdaptor.invokeLifecycle('update', delta);
        }
    };
    /**
     * 实例化组件
     * @param id
     */
    Application.prototype.$getComponentDef = function (id) {
        var def;
        var idType = typeof id;
        switch (idType) {
            case 'string':
                def = this._componentDefs[id];
                break;
            case 'function':
                def = id;
                break;
        }
        if (!def) {
            console.warn("component [" + id + "] not exists.");
            return;
        }
        var className = def['__class__'];
        if (!className) {
            console.warn("component [" + id + "] is not registered.");
            return;
        }
        return def;
    };
    return Application;
}());
//# sourceMappingURL=Application.js.map

/**
 * Created by rockyl on 2018/11/5.
 */
var HASH_CODE_INK = 0;
function getHashCode() {
    return ++HASH_CODE_INK;
}
/**
 * 哈希对象
 */
var HashObject = /** @class */ (function () {
    function HashObject() {
        this._hashCode = getHashCode();
    }
    Object.defineProperty(HashObject.prototype, "hashCode", {
        get: function () {
            return this._hashCode;
        },
        enumerable: true,
        configurable: true
    });
    return HashObject;
}());
//# sourceMappingURL=HashObject.js.map

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

/**
 * Created by rockyl on 2019-07-28.
 */
/**
 * 组件类
 */
var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    function Component() {
        var _this = _super.call(this) || this;
        _this._enabled = false;
        _this._started = false;
        return _this;
    }
    Object.defineProperty(Component.prototype, "entityAdaptor", {
        get: function () {
            return this._entityAdaptor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "entity", {
        get: function () {
            return this._entityAdaptor.entity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "enabled", {
        /**
         * 是否有效
         */
        get: function () {
            return this._enabled;
        },
        set: function (value) {
            if (this._enabled != value) {
                this._enabled = value;
                if (this._entityAdaptor && this._entityAdaptor.getActive()) {
                    if (value) {
                        this._started = false;
                        this.onEnable();
                    }
                    else {
                        this.onDisable();
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    Component.prototype.$awake = function (entityAdaptor) {
        this._entityAdaptor = entityAdaptor;
        this.awake();
    };
    /**
     * @private
     */
    Component.prototype.$destroy = function () {
        this._entityAdaptor = null;
        this.onDestroy();
    };
    /**
     * 当组件被唤醒时
     */
    Component.prototype.awake = function () {
    };
    /**
     * 当组件开始
     */
    Component.prototype.start = function () {
    };
    /**
     * 当生效时
     * 仅当实体唤醒状态
     */
    Component.prototype.onEnable = function () {
    };
    /**
     * 当失效时
     * 仅当实体唤醒状态
     */
    Component.prototype.onDisable = function () {
    };
    /**
     * 时钟更新
     * @param t
     */
    Component.prototype.update = function (t) {
    };
    /**
     * 当被销毁时
     */
    Component.prototype.onDestroy = function () {
    };
    /**
     * @private
     * @param delta
     */
    Component.prototype.$onUpdate = function (delta) {
        if (this._enabled) {
            if (!this._started) {
                this._started = true;
                this.start();
            }
            this.update(delta);
        }
    };
    /**
     * 当点击时
     * @param e
     */
    Component.prototype.onClick = function (e) {
    };
    /**
     * 当鼠标按下
     * @param e
     */
    Component.prototype.onMouseDown = function (e) {
    };
    /**
     * 当鼠标移动
     * @param e
     */
    Component.prototype.onMouseMove = function (e) {
    };
    /**
     * 当鼠标松开
     * @param e
     */
    Component.prototype.onMouseUp = function (e) {
    };
    /**
     * 当鼠标在实体外侧松开
     * @param e
     */
    Component.prototype.onMouseUpOutside = function (e) {
    };
    /**
     * 向下广播执行
     * @param methodName
     * @param args
     */
    Component.prototype.broadcast = function (methodName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this._entityAdaptor.app.traverseDisplayNode(this.entity, function (node) {
            node.invokeOnComponents && node.invokeOnComponents(methodName, args);
        });
    };
    /**
     * 向上冒泡执行
     * @param methodName
     * @param args
     */
    Component.prototype.bubbling = function (methodName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this._entityAdaptor.app.bubblingDisplayNode(this.entity, function (node) {
            node.invokeOnComponents && node.invokeOnComponents(methodName, args);
        });
    };
    return Component;
}(HashObject));
//# sourceMappingURL=Component.js.map

/**
 * Created by rockyl on 2019-07-29.
 */
/**
 * 组件管理类
 */
var ComponentManager = /** @class */ (function () {
    function ComponentManager(entityAdaptor, app) {
        this._components = [];
        this._app = app;
        this._entityAdaptor = entityAdaptor;
        this.applyProxy();
    }
    ComponentManager.prototype.applyProxy = function () {
        var _this = this;
        var entity = this._entityAdaptor.entity;
        entity.addComponent = function (componentId) {
            return _this.addComponent(componentId);
        };
        entity.removeComponent = function (componentId, index) {
            return _this.removeComponent(componentId, index);
        };
        entity.removeAllComponents = function () {
            _this.removeAllComponents();
        };
        entity.getComponent = function (componentId) {
            return _this.getComponent(componentId);
        };
        entity.getComponents = function (componentId) {
            return _this.getComponents(componentId);
        };
        entity.invokeOnComponents = function (methodName, args) {
            return _this.invokeOnComponents(methodName, args);
        };
    };
    /**
     * 遍历组件
     * @param callback
     */
    ComponentManager.prototype.eachComponent = function (callback) {
        this._components.some(callback);
    };
    /**
     * 设置激活状态
     * @param active
     */
    ComponentManager.prototype.setActive = function (active) {
        this.eachComponent(function (component) {
            if (component.enabled) {
                if (active) {
                    component.onEnable();
                }
                else {
                    component.onDisable();
                }
            }
        });
    };
    /**
     * 时钟更新
     * @param t
     */
    ComponentManager.prototype.onUpdate = function (t) {
        this.eachComponent(function (component) {
            if (component.enabled) {
                component.$onUpdate(t);
            }
        });
    };
    /**
     * 交互事件
     */
    ComponentManager.prototype.onInteract = function (type, e) {
        this.eachComponent(function (component) {
            if (component.enabled) {
                var method = 'on' + type[0].toUpperCase() + type.substr(1);
                if (component[method]) {
                    component[method](e);
                }
            }
        });
    };
    /**
     * 添加组件
     * @param componentId
     * @param awake
     */
    ComponentManager.prototype.addComponent = function (componentId, awake) {
        if (awake === void 0) { awake = true; }
        var component = this.$instantiateComponent(componentId);
        if (!component) {
            return;
        }
        this._add(component, undefined, awake);
        return component;
    };
    /**
     * 移除组件
     * @param componentId
     * @param index
     */
    ComponentManager.prototype.removeComponent = function (componentId, index) {
        var components;
        switch (typeof componentId) {
            case 'string':
                components = this._findByName(componentId);
                break;
            case 'function':
                components = this._find(componentId);
                break;
        }
        if (index !== undefined) {
            components = [components[index]];
        }
        this._remove(components);
        return components;
    };
    /**
     * 移除所有组件
     */
    ComponentManager.prototype.removeAllComponents = function () {
        this._removeAll();
    };
    /**
     * 获取组件
     * @param componentId
     */
    ComponentManager.prototype.getComponent = function (componentId) {
        switch (typeof componentId) {
            case 'string':
                return this._getByName(componentId);
            case 'function':
                return this._getOne(componentId);
        }
    };
    /**
     * 获取组件组
     * @param componentId
     */
    ComponentManager.prototype.getComponents = function (componentId) {
        switch (typeof componentId) {
            case 'string':
                return this._findByName(componentId);
            case 'function':
                return this._find(componentId);
        }
    };
    /**
     * 获取全部组件
     */
    ComponentManager.prototype.getAllComponents = function () {
        return this.all;
    };
    /**
     * 添加组件
     * @param component
     * @param index
     * @param awake
     */
    ComponentManager.prototype._add = function (component, index, awake) {
        if (awake === void 0) { awake = true; }
        if (index == undefined || index < 0 || index >= this._components.length) {
            index = this._components.length;
        }
        if (component.entityAdaptor == this._entityAdaptor) {
            index--;
        }
        var currentIndex = this._components.indexOf(component);
        if (currentIndex == index) {
            return;
        }
        if (currentIndex >= 0) {
            this._components.splice(currentIndex, 1);
        }
        this._components.splice(index, 0, component);
        if (currentIndex < 0) {
            this.$onAddComponent(component, awake);
        }
    };
    /**
     * 移除组件
     * @param components
     */
    ComponentManager.prototype._remove = function (components) {
        for (var _i = 0, components_1 = components; _i < components_1.length; _i++) {
            var component = components_1[_i];
            if (component) {
                this.$onRemoveComponent(component);
                var index = this._components.indexOf(component);
                this._components.splice(index, 1);
            }
        }
    };
    /**
     * 移除所有组件
     */
    ComponentManager.prototype._removeAll = function () {
        while (this._components.length > 0) {
            var component = this._components.shift();
            this.$onRemoveComponent(component);
        }
    };
    /**
     * 根据组件名称获取指定类的组件列表
     * @param componentId
     */
    ComponentManager.prototype._findByName = function (componentId) {
        var components = this._componentsNameMapping[componentId];
        if (!components) {
            components = this._componentsNameMapping[componentId] = this._components.filter(function (component) {
                return component.constructor['__class__'] === componentId;
            });
        }
        return components;
    };
    /**
     * 获取指定类的组件列表
     * @param clazz
     */
    ComponentManager.prototype._find = function (clazz) {
        var components = this._componentsDefMapping[clazz.name];
        if (!components) {
            components = this._componentsDefMapping[clazz.name] = this._components.filter(function (component) {
                return component instanceof clazz;
            });
        }
        return components;
    };
    /**
     * 获取指定类的组件
     * @param name
     */
    ComponentManager.prototype._getByName = function (name) {
        return this._findByName(name)[0];
    };
    /**
     * 获取指定类的组件
     * @param clazz
     */
    ComponentManager.prototype._getOne = function (clazz) {
        return this._find(clazz)[0];
    };
    Object.defineProperty(ComponentManager.prototype, "all", {
        /**
         * 获取所有组件
         */
        get: function () {
            return this._components;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 调用组件上的方法
     * @param methodName
     * @param args
     */
    ComponentManager.prototype.invokeOnComponents = function (methodName, args) {
        this.eachComponent(function (component) {
            //if (component.enabled) {
            if (component[methodName]) {
                component[methodName].apply(component, args);
            }
            //}
        });
    };
    /**
     * 当添加组件时
     * @param component
     * @param awake
     */
    ComponentManager.prototype.$onAddComponent = function (component, awake) {
        if (awake === void 0) { awake = true; }
        this._componentsNameMapping = {};
        this._componentsDefMapping = {};
        if (awake) {
            component.$awake(this._entityAdaptor);
        }
    };
    /**
     * 当移除组件时
     * @param component
     */
    ComponentManager.prototype.$onRemoveComponent = function (component) {
        this._componentsNameMapping = {};
        this._componentsDefMapping = {};
        component.enabled = false;
        component.$destroy();
    };
    ComponentManager.prototype.$instantiateComponent = function (componentId) {
        var def = this._app.$getComponentDef(componentId);
        return new def();
    };
    return ComponentManager;
}());
//# sourceMappingURL=ComponentManager.js.map

/**
 * Created by rockyl on 2020-03-07.
 */
/**
 * 实体适配器基类
 */
var EntityAdaptorBase = /** @class */ (function () {
    function EntityAdaptorBase(entity, app) {
        this._entity = entity;
        this._app = app;
        this._components = new ComponentManager(this, app);
        entity.entityAdaptor = this;
        this.applyProxy();
    }
    Object.defineProperty(EntityAdaptorBase.prototype, "components", {
        /**
         * @inheritDoc
         */
        get: function () {
            return this._components;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityAdaptorBase.prototype, "entity", {
        /**
         * @inheritDoc
         */
        get: function () {
            return this._entity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityAdaptorBase.prototype, "app", {
        /**
         * @inheritDoc
         */
        get: function () {
            return this._app;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    EntityAdaptorBase.prototype.getActive = function () {
        return this._entity.$active;
    };
    /**
     * @inheritDoc
     */
    EntityAdaptorBase.prototype.setActive = function (v) {
        if (v !== this.getActive()) {
            this._entity.$active = v;
            this._components.setActive(v);
        }
    };
    /**
     * 应用代理
     */
    EntityAdaptorBase.prototype.applyProxy = function () {
        var entity = this._entity;
        entity.$active = true;
        Object.defineProperty(entity, 'active', {
            get: function () {
                return this.entityAdaptor.getActive();
            }
        });
        entity.setActive = this.setActive.bind(this);
    };
    /**
     * 触发生命周期方法
     * @param type
     * @param args
     */
    EntityAdaptorBase.prototype.invokeLifecycle = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this.getActive()) {
            return;
        }
        switch (type) {
            case 'update':
                var delta = args[0];
                this._components.onUpdate(delta);
                break;
        }
    };
    /**
     * 触发交互事件方法
     * @param type
     * @param e
     */
    EntityAdaptorBase.prototype.invokeInteractionEvent = function (type, e) {
        if (!this.getActive()) {
            return;
        }
        this._components.onInteract(type, e);
    };
    return EntityAdaptorBase;
}());
//# sourceMappingURL=EntityAdaptor.js.map

/**
 * Created by rockyl on 2020-03-09.
 */
/**
 * 线性插值
 * @param begin number
 * @param end number
 * @param t number
 * @param allowOutOfBounds
 * @return number
 */
function lerp(begin, end, t, allowOutOfBounds) {
    if (allowOutOfBounds === void 0) { allowOutOfBounds = false; }
    if (!allowOutOfBounds) {
        t = Math.max(0, Math.min(1, t));
    }
    var sign = end - begin;
    sign = sign > 0 ? 1 : (sign < 0 ? -1 : 0);
    var distance = Math.abs(end - begin);
    return begin + distance * t * sign;
}
/**
 * 线性插值
 * @param begin
 * @param end
 * @param t number
 * @param allowOutOfBounds
 * @return number
 */
function lerpVector2(begin, end, t, allowOutOfBounds) {
    if (allowOutOfBounds === void 0) { allowOutOfBounds = false; }
    return {
        x: lerp(begin.x, end.x, t, allowOutOfBounds),
        y: lerp(begin.y, end.y, t, allowOutOfBounds),
    };
}
/**
 * 线性插值
 * @param begin
 * @param end
 * @param t number
 * @param allowOutOfBounds
 * @return number
 */
function lerpVector3(begin, end, t, allowOutOfBounds) {
    if (allowOutOfBounds === void 0) { allowOutOfBounds = false; }
    return {
        x: lerp(begin.x, end.x, t, allowOutOfBounds),
        y: lerp(begin.y, end.y, t, allowOutOfBounds),
        z: lerp(begin.z, end.z, t, allowOutOfBounds),
    };
}
//# sourceMappingURL=utils.js.map

export { Application, Component, ComponentManager, EntityAdaptorBase, HashObject, lerp, lerpVector2, lerpVector3 };
//# sourceMappingURL=index.es.js.map
