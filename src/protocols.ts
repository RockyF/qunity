/**
 * Created by rockyl on 2020-03-11.
 */

import {Application} from "./Application";

//todo script,dynamic
export enum Protocols {
	RES = 'res://',
	ENTITY = 'entity://',
}

export const protocols = {
	[Protocols.RES]: res,
	[Protocols.ENTITY]: entity,
};

function res(app: Application, key: string, value: any): any {
	let trulyValue;

	const uuid = value.replace(Protocols.RES, '');
	trulyValue = app.getRes(uuid);

	return trulyValue;
}

function entity(app: Application, key: string, value: any, pid?: number): any {
	let trulyValue;

	const uuid = transPrefabUUID(value.replace(Protocols.ENTITY, ''), pid);
	trulyValue = app.entityMap[uuid];

	return trulyValue;
}

function transPrefabUUID(uuid, pid: number) {
	return pid ? pid + '_' + uuid : uuid;
}
