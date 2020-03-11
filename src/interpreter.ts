/**
 * Created by rockyl on 2020-03-10.
 */

import {IEntity} from "./IEntity";
import {Application} from "./Application";
import {protocols} from "./protocols";

let prefabID: number = 0;

/**
 * 实例化节点树
 * @param app
 * @param docConfig
 */
export function instantiate(app: Application, docConfig: any) {
	let pid;
	if (docConfig.docType === 'prefab') {
		pid = ++prefabID;
	}
	const rootEntity = setupEntityTree(app, docConfig, pid);
	setupComponent(app, docConfig, rootEntity, pid);

	return rootEntity;
}

function setupEntityTree(app: Application, config, pid?: number) {
	let entity: IEntity = null;
	if (config) {
		let {type, name, uuid, children} = config;
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
			for (let child of children) {
				const childEntity = setupEntityTree(app, child, pid);
				app.addDisplayNode(childEntity, entity);
			}
		}
	}

	return entity;
}

function setupComponent(app: Application, config, entity, pid?: number) {
	for (let i = 0, li = entity.children.length; i < li; i++) {
		const child: IEntity = entity.children[i];
		let comps = config.children[i].comps;
		if (comps) {
			for (let comp of comps) {
				let component = child.addComponent(comp.id);

				injectProps(app, component, comp.props, pid);
			}
		}
	}
}

function injectProps(app: Application, target: any, props: any, pid?: number) {
	if (props) {
		for (let field in props) {
			let value = props[field];
			let trulyValue = value;
			if (typeof value === 'string') {
				let hit;
				let protocolGroups = [protocols, app.options.protocols];
				for(let protocols of protocolGroups){
					for (let protocol in protocols) {
						if (value.indexOf(protocol) === 0) {
							let protocolFunc = protocols[protocol];
							trulyValue = protocolFunc(app, field, value, pid);
							hit = true;
							break;
						}
					}
					if(hit){
						break;
					}
				}
			}
			target[field] = trulyValue;
		}
	}
}

function transPrefabUUID(uuid, pid: number) {
	return pid ? pid + '_' + uuid : uuid;
}
